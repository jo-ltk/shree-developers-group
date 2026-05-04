"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { lotById } from "../data/lots";
import type { Hotspot, LotStatus, MapViewBox } from "../types/site-map";
import { MapControls } from "./MapControls";

type Filter = "All" | LotStatus;

const FALLBACK_VIEWBOX: MapViewBox = {
  x: 0,
  y: 0,
  width: 3392,
  height: 2160,
};

function parseNumber(value: string | null) {
  const number = Number.parseFloat(value ?? "");
  return Number.isFinite(number) ? number : 0;
}

function readOriginalViewBox(svg: SVGSVGElement | null): MapViewBox {
  const values = svg?.getAttribute("viewBox")?.trim().split(/\s+/).map(Number);

  if (values?.length === 4 && values.every(Number.isFinite)) {
    return {
      x: values[0],
      y: values[1],
      width: values[2],
      height: values[3],
    };
  }

  return FALLBACK_VIEWBOX;
}

export function MapStage({
  activeFilter,
  selectedLotId,
  onSelectLot,
}: {
  activeFilter: Filter;
  selectedLotId: number;
  onSelectLot: (lotId: number) => void;
}) {
  const artworkRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [viewBox, setViewBox] = useState<MapViewBox>(FALLBACK_VIEWBOX);

  const svgViewBox = useMemo(
    () => `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`,
    [viewBox],
  );

  useEffect(() => {
    async function loadSvg() {
      try {
        setIsLoading(true);
        const response = await fetch("/svg/siteMap-final.svg");
        if (!response.ok) throw new Error(`SVG request failed: ${response.status}`);
        const text = await response.text();
        setSvgMarkup(text);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[MapStage] SVG failed to load. Check /public/svg/siteMap-final.svg exists and CSP allows fetch from same origin.', error);
        }
        console.error("SVG Loading Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSvg();
  }, []);

  useEffect(() => {
    if (!svgMarkup) return;

    const svg = artworkRef.current?.querySelector<SVGSVGElement>("svg") ?? null;
    if (!svg) return;

    const originalViewBox = readOriginalViewBox(svg);
    const lotGroups = Array.from(svg.querySelectorAll<SVGGElement>('g[id*="lot-"]'));

    const parsedHotspots = lotGroups
      .map((group) => {
        const rect = group.querySelector<SVGRectElement>("rect");
        const path = group.querySelector<SVGPathElement>("path");
        const idMatch = group.id.match(/lot-(\d+)/i);
        const id = idMatch ? Number.parseInt(idMatch[1], 10) : Number.parseInt(group.id.replace(/[^\d]/g, ""), 10);

        if (!Number.isFinite(id)) return null;

        let originalX, originalY, originalWidth, originalHeight;

        if (rect) {
          originalX = parseNumber(rect.getAttribute("x"));
          originalY = parseNumber(rect.getAttribute("y"));
          originalWidth = parseNumber(rect.getAttribute("width"));
          originalHeight = parseNumber(rect.getAttribute("height"));
        } else if (path) {
          const bbox = path.getBBox();
          originalX = bbox.x;
          originalY = bbox.y;
          originalWidth = bbox.width;
          originalHeight = bbox.height;
        } else {
          const bbox = group.getBBox();
          originalX = bbox.x;
          originalY = bbox.y;
          originalWidth = bbox.width;
          originalHeight = bbox.height;
        }

        // MAGIC NUMBER APPROXIMATION:
        const width = originalWidth * 1.12;
        const height = originalHeight * 1.12;
        const x = originalX - originalWidth * 0.06;
        const y = originalY - originalHeight * 0.06;

        return { id, x, y, width, height };
      })
      .filter((hotspot): hotspot is Hotspot => hotspot !== null)
      .sort((a, b) => a.id - b.id);

    setViewBox(originalViewBox);
    setHotspots(parsedHotspots);
  }, [svgMarkup]);

  const renderedHotspots = useMemo(() => {
    return hotspots.map((hotspot) => {
      const lot = lotById.get(hotspot.id);
      if (!lot) return null;
      const matchesFilter = 
        activeFilter === "All" || 
        lot.status.toLowerCase().replace(/\s+/g, '-') === activeFilter.toLowerCase().replace(/\s+/g, '-');
      const isSelected = hotspot.id === selectedLotId;
      return { hotspot, lot, matchesFilter, isSelected };
    }).filter(item => item !== null);
  }, [hotspots, activeFilter, selectedLotId]);

  return (
    <div className="site-map-premium-shell absolute inset-0 flex flex-col bg-[#F2EADF] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(28,18,8,0.06)]">
      <div className="site-map-stage-framing relative flex-1">
      <TransformWrapper
        centerOnInit
        limitToBounds={false}
        minScale={0.1}
        maxScale={10}
        initialScale={0.85}
        smooth
        wheel={{ step: 0.055 }}
        pinch={{ step: 0.035 }}
        panning={{
          velocityDisabled: false,
          allowLeftClickPan: true,
          excluded: ["button", "INPUT", "TEXTAREA", "SELECT", "OPTION"],
        }}
        zoomAnimation={{
          animationTime: 340,
          animationType: "easeOutCubic",
        }}
        doubleClick={{ disabled: true }}
      >
        <MapControls />
        <TransformComponent
          wrapperClass="!h-full !w-full"
          contentClass="!w-full"
          contentStyle={{ width: "100%" }}
        >
          <div className="site-map-plane relative w-full" style={{ aspectRatio: `${viewBox.width} / ${viewBox.height}` }}>
            {/* Loading Skeleton / Shimmer */}
            {isLoading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#F2EADF]">
                <div className="relative h-full w-full overflow-hidden bg-[#EDE4D6]">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent" />
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B7AA98]">Loading Map Architecture...</p>
                  </div>
                </div>
              </div>
            )}

            {/* The actual SVG artwork */}
            <div
              ref={artworkRef}
              className="absolute inset-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />

            {/* Hotspot overlay layer — visuals only; hit targets use same hotspot bounds */}
            <svg
              className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible [isolation:isolate]"
              viewBox={svgViewBox}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Feathered mask for a natural lens focus effect */}
                <filter id="mask-blur">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
                <mask id="focus-aperture">
                  <rect x="0" y="0" width={viewBox.width} height={viewBox.height} fill="white" />
                  {(() => {
                    const selectedHotspot = hotspots.find(h => h.id === selectedLotId);
                    if (!selectedHotspot) return null;
                    return (
                      <rect 
                        x={selectedHotspot.x - 4} 
                        y={selectedHotspot.y - 4} 
                        width={selectedHotspot.width + 8} 
                        height={selectedHotspot.height + 8} 
                        rx={16} 
                        ry={16} 
                        fill="black" 
                        filter="url(#mask-blur)"
                      />
                    );
                  })()}
                </mask>
              </defs>

              {/* Sophisticated 'Frosted Glass' Focus Layer — Blurs without dimming the map */}
              {selectedLotId > 0 && (
                <rect 
                  x="0" 
                  y="0" 
                  width={viewBox.width} 
                  height={viewBox.height} 
                  fill="rgba(255, 253, 246, 0.12)" 
                  mask="url(#focus-aperture)"
                  className="transition-all duration-700 ease-out"
                  style={{ 
                    backdropFilter: 'blur(8px)', 
                    WebkitBackdropFilter: 'blur(8px)' 
                  }}
                />
              )}
              {renderedHotspots.map(({ hotspot, lot, matchesFilter, isSelected }) => {
                return (
                  <g key={hotspot.id} className={`site-map-lot-group ${matchesFilter ? "site-map-lot-group--interactive" : ""}`}>
                    {/* 1. GOLD GLOW — renders behind everything */}
                    {activeFilter !== "All" && matchesFilter && (
                      <rect
                        x={hotspot.x - 2} 
                        y={hotspot.y - 2}
                        width={hotspot.width + 4} 
                        height={hotspot.height + 4}
                        rx={12}
                        fill="none"
                        stroke="rgba(201,174,123,0.75)"
                        strokeWidth={3}
                        pointerEvents="none"
                        style={{ filter: "drop-shadow(0 0 8px rgba(201,174,123,0.7))", transition: 'opacity 350ms ease' }}
                      />
                    )}

                    {/* 2. FOG OVERLAY — renders over artwork, must not block pointer events */}
                    {!matchesFilter && (
                      <rect
                        x={hotspot.x} 
                        y={hotspot.y}
                        width={hotspot.width} 
                        height={hotspot.height}
                        rx={10}
                        fill="rgba(245,240,232,0.82)"
                        pointerEvents="none"
                        style={{ transition: 'fill 350ms ease' }}
                      />
                    )}

                    {/* 3. PULSE RING — selected lot indicator */}
                    {isSelected && (
                      <rect
                        x={hotspot.x - 4} 
                        y={hotspot.y - 4}
                        width={hotspot.width + 8} 
                        height={hotspot.height + 8}
                        rx={14}
                        fill="none"
                        stroke="#8B2A2A"
                        strokeWidth={3}
                        pointerEvents="none"
                        className="lot-pulse-ring"
                      />
                    )}

                    {/* 4. HIT TARGET — must be LAST so it sits on top of everything */}
                    <rect
                      role="button"
                      tabIndex={matchesFilter ? 0 : -1}
                      aria-label={`Select homesite Lot ${lot.lotNumber}`}
                      x={hotspot.x} 
                      y={hotspot.y}
                      width={hotspot.width} 
                      height={hotspot.height}
                      rx={10}
                      fill="transparent"
                      stroke="transparent"
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
        </TransformComponent>
      </TransformWrapper>
      </div>
    </div>
  );
}
