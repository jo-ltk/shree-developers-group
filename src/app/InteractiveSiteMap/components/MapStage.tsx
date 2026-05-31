"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Lot, Hotspot, LotStatus, MapViewBox } from "../types/site-map";

type Filter = "All" | LotStatus;

const FALLBACK_VIEWBOX: MapViewBox = { x: 0, y: 0, width: 3392, height: 2160 };
function parseNumber(value: string | null) {
  const n = Number.parseFloat(value ?? "");
  return Number.isFinite(n) ? n : 0;
}

function readOriginalViewBox(svg: SVGSVGElement | null): MapViewBox {
  const values = svg?.getAttribute("viewBox")?.trim().split(/\s+/).map(Number);
  if (values?.length === 4 && values.every(Number.isFinite)) {
    return { x: values[0], y: values[1], width: values[2], height: values[3] };
  }
  return FALLBACK_VIEWBOX;
}

export function MapStage({
  activeFilter,
  selectedLotId,
  onSelectLot,
  mapUrl,
  lots,
  settings,
}: {
  activeFilter: Filter;
  selectedLotId: number;
  onSelectLot: (lotId: number) => void;
  mapUrl: string;
  lots: Lot[];
  settings: {
    padding: number;
    radiusOffset: number;
    cxOffsetFactor: number;
    cyOffsetFactor: number;
    strokeColor: string;
    strokeWidth: number;
  };
}) {
  const artworkRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [viewBox, setViewBox] = useState<MapViewBox>(FALLBACK_VIEWBOX);

  const lotById = useMemo(() => new Map(lots.map((lot) => [lot.id, lot])), [lots]);

  const svgViewBox = useMemo(
    () => `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`,
    [viewBox],
  );

  // Load SVG
  useEffect(() => {
    async function loadSvg() {
      try {
        setIsLoading(true);
        const response = await fetch(mapUrl);
        if (!response.ok) throw new Error(`SVG request failed: ${response.status}`);
        const text = await response.text();
        setSvgMarkup(
          text.replace(/<svg([^>]*)>/, '<svg$1 preserveAspectRatio="xMidYMid meet">')
        );
      } catch (error) {
        console.error("SVG Loading Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSvg();
  }, [mapUrl]);

  // Parse hotspots once SVG is in DOM
  useEffect(() => {
    if (!svgMarkup) return;
    const svg = artworkRef.current?.querySelector<SVGSVGElement>("svg") ?? null;
    if (!svg) return;

    setViewBox(readOriginalViewBox(svg));

    const lotGroups = Array.from(svg.querySelectorAll<SVGGElement>('g[id*="lot-"]'));
    const parsed = lotGroups
      .map((group) => {
        const rect = group.querySelector<SVGRectElement>("rect");
        const path = group.querySelector<SVGPathElement>("path");
        const idMatch = group.id.match(/lot-(\d+)/i);
        const id = idMatch
          ? Number.parseInt(idMatch[1], 10)
          : Number.parseInt(group.id.replace(/[^\d]/g, ""), 10);
        if (!Number.isFinite(id)) return null;

        const target = path || group;
        const bbox = target.getBBox();
        const svgRoot = svg;
        const matrix = svgRoot.getScreenCTM()?.inverse().multiply(target.getScreenCTM()!);

        let ox, oy, ow, oh;
        if (matrix) {
          const pt = svgRoot.createSVGPoint();
          pt.x = bbox.x;
          pt.y = bbox.y;
          const topLeft = pt.matrixTransform(matrix);

          pt.x = bbox.x + bbox.width;
          pt.y = bbox.y + bbox.height;
          const bottomRight = pt.matrixTransform(matrix);

          ox = topLeft.x;
          oy = topLeft.y;
          ow = bottomRight.x - topLeft.x;
          oh = bottomRight.y - topLeft.y;
        } else {
          ox = bbox.x; oy = bbox.y; ow = bbox.width; oh = bbox.height;
        }

        // Force a square hotspot for a perfect circle selection
        const size = Math.max(ow, oh);
        const padding = settings.padding; // Use dynamic padding
        const finalSize = size * (1 + padding * 2);

        return {
          id,
          x: ox + ow / 2 - finalSize / 2,
          y: oy + oh / 2 - finalSize / 2,
          width: finalSize,
          height: finalSize,
        };
      })
      .filter((h): h is Hotspot => h !== null)
      .sort((a, b) => a.id - b.id);

    setHotspots(parsed);
  }, [svgMarkup, settings]);

  const renderedHotspots = useMemo(() => {
    return hotspots
      .map((hotspot) => {
        const lot = lotById.get(hotspot.id);
        if (!lot) return null;
        const matchesFilter =
          activeFilter === "All" ||
          lot.status.toLowerCase().replace(/\s+/g, "-") ===
            activeFilter.toLowerCase().replace(/\s+/g, "-");
        return { hotspot, lot, matchesFilter, isSelected: hotspot.id === selectedLotId };
      })
      .filter(Boolean);
  }, [hotspots, activeFilter, selectedLotId]);

  return (
    <div className="site-map-premium-shell absolute inset-[2px] flex flex-col bg-[#F5F0E8] overflow-hidden">
      <div className="relative flex-1">
        <div className="absolute inset-0 w-full h-full">
            <div
              className="site-map-plane relative w-full h-full"
              style={{ aspectRatio: `${viewBox.width} / ${viewBox.height}` }}
            >
              {/* Loading shimmer */}
              {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#F5F0E8]">
                  <div className="relative h-full w-full overflow-hidden bg-[#EDE8DF]">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent" />
                    <div className="flex h-full w-full items-center justify-center">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1208]/30"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Loading Architecture...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SVG artwork */}
              <div
                ref={artworkRef}
                className="absolute inset-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />

              {/* Hotspot overlay */}
              <svg
                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                viewBox={svgViewBox}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="mask-blur">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                  <mask id="focus-aperture">
                    <rect x="0" y="0" width={viewBox.width} height={viewBox.height} fill="white" />
                    {(() => {
                      const sh = hotspots.find((h) => h.id === selectedLotId);
                      if (!sh) return null;
                      return (
                        <rect
                          x={sh.x - 4} y={sh.y - 4}
                          width={sh.width + 8} height={sh.height + 8}
                          rx={16} ry={16}
                          fill="black"
                          filter="url(#mask-blur)"
                        />
                      );
                    })()}
                  </mask>
                </defs>

                {selectedLotId > 0 && (
                  <rect
                    x="0" y="0"
                    width={viewBox.width} height={viewBox.height}
                    fill="rgba(245,240,232,0.12)"
                    mask="url(#focus-aperture)"
                    className="transition-all duration-700 ease-out"
                    style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                  />
                )}

                {renderedHotspots.map((item) => {
                  if (!item) return null;
                  const { hotspot, lot, matchesFilter, isSelected } = item;
                  return (
                    <g key={hotspot.id}>
                      {/* Gold glow ring — filtered lots */}
                      {activeFilter !== "All" && matchesFilter && (
                        <circle
                          cx={hotspot.x + hotspot.width / settings.cxOffsetFactor}
                          cy={hotspot.y + hotspot.height / settings.cyOffsetFactor}
                          r={hotspot.width / 2 + settings.radiusOffset}
                          className="fill-none stroke-[#D43F33]/20"
                          stroke="rgba(201,174,123,0.75)" strokeWidth={3}
                          pointerEvents="none"
                          style={{ filter: "drop-shadow(0 0 8px rgba(201,174,123,0.7))", transition: "opacity 350ms ease" }}
                        />
                      )}

                      {/* Fog overlay — non-matching lots */}
                      {!matchesFilter && (
                        <circle
                          cx={hotspot.x + hotspot.width / settings.cxOffsetFactor}
                          cy={hotspot.y + hotspot.height / settings.cyOffsetFactor}
                          r={hotspot.width / 2 + settings.radiusOffset}
                          fill="rgba(245,240,232,0.82)"
                          pointerEvents="none"
                          style={{ transition: "fill 350ms ease" }}
                        />
                      )}

                      {/* Active Selection Ring */}
                      {isSelected && (
                        <circle
                          cx={hotspot.x + hotspot.width / settings.cxOffsetFactor}
                          cy={hotspot.y + hotspot.height / settings.cyOffsetFactor}
                          r={hotspot.width / 2 + settings.radiusOffset}
                          className="fill-none lot-pulse-ring"
                          stroke={settings.strokeColor}
                          strokeWidth={settings.strokeWidth}
                          pointerEvents="none"
                        />
                      )}

                      {/* Hit target */}
                      <rect
                        data-map-lot
                        role="button"
                        tabIndex={matchesFilter ? 0 : -1}
                        aria-label={`Select Home ${lot.lotNumber}`}
                        x={hotspot.x} y={hotspot.y}
                        width={hotspot.width} height={hotspot.height}
                        rx={10} fill="transparent" stroke="transparent"
                        pointerEvents={matchesFilter ? "auto" : "none"}
                        className={matchesFilter ? "cursor-pointer" : "cursor-default"}
                        onClick={() => matchesFilter && onSelectLot(hotspot.id)}
                        onKeyDown={(e) => {
                          if (!matchesFilter) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectLot(hotspot.id);
                          }
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-6 right-6 z-20 pointer-events-none opacity-40">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C1208]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              fig. 04 / Site Layout
            </span>
            <div className="h-px w-12 bg-[#1C1208]/30" />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1208]/60"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Masterplan v2.4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}