"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Lot, Hotspot, LotStatus, MapViewBox } from "../types/site-map";
import { MapControls } from "./MapControls";

type Filter = "All" | LotStatus;

const FALLBACK_VIEWBOX: MapViewBox = { x: 0, y: 0, width: 3392, height: 2160 };
const MAP_URL = "/svg/siteMap-final.svg";

// SYDNEY OAKS SPECIFIC SETTINGS
const SETTINGS = {
  padding: 0.3,
  radiusOffset: 5,
  cxOffsetFactor: 1.27,
  cyOffsetFactor: 2.0,
  strokeColor: "#D43F33",
  strokeWidth: 6,
};

/**
 * Parses the viewBox from the raw SVG string
 */
function parseViewBoxFromMarkup(markup: string): MapViewBox {
  const match = markup.match(/<svg[^>]*viewBox=["']([^"']+)["']/i);
  if (match && match[1]) {
    const values = match[1].trim().split(/\s+/).map(Number);
    if (values.length === 4 && values.every(Number.isFinite)) {
      return { x: values[0], y: values[1], width: values[2], height: values[3] };
    }
  }
  return FALLBACK_VIEWBOX;
}

export function SydneyOaksStage({
  activeFilter,
  selectedLotId,
  onSelectLot,
  lots,
}: {
  activeFilter: Filter;
  selectedLotId: number;
  onSelectLot: (lotId: number) => void;
  lots: Lot[];
}) {
  const artworkRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<any>(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [viewBox, setViewBox] = useState<MapViewBox>(FALLBACK_VIEWBOX);

  const lotById = useMemo(() => new Map(lots.map((lot) => [lot.id, lot])), [lots]);

  useEffect(() => {
    fetch(MAP_URL)
      .then((res) => res.text())
      .then((data) => {
        setSvgMarkup(data);
        setViewBox(parseViewBoxFromMarkup(data));
      })
      .catch((err) => console.error("Error loading Sydney Oaks SVG:", err));
  }, []);

  useEffect(() => {
    if (!svgMarkup) return;
    
    // We need a temporary element to parse the SVG and find lot groups
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgMarkup, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return;

    const lotGroups = Array.from(svg.querySelectorAll<SVGGElement>('g[id*="lot-"]'));
    
    // To get accurate bounding boxes, we must temporarily append to body (hidden)
    // because getBBox() requires the element to be in the layout tree.
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.visibility = "hidden";
    container.style.pointerEvents = "none";
    container.appendChild(svg.cloneNode(true));
    document.body.appendChild(container);

    const tempSvg = container.querySelector("svg")!;
    const tempLotGroups = Array.from(tempSvg.querySelectorAll<SVGGElement>('g[id*="lot-"]'));

    const parsed = tempLotGroups.map((group) => {
      const path = group.querySelector<SVGPathElement>("path");
      const idMatch = group.id.match(/lot-(\d+)/i);
      const id = idMatch ? Number.parseInt(idMatch[1], 10) : 0;
      if (!id) return null;

      const target = path || group;
      const bbox = target.getBBox();
      
      const size = Math.max(bbox.width, bbox.height);
      const finalSize = size * (1 + SETTINGS.padding * 2);

      return {
        id,
        x: bbox.x + bbox.width / 2 - finalSize / 2,
        y: bbox.y + bbox.height / 2 - finalSize / 2,
        width: finalSize,
        height: finalSize,
      };
    }).filter((h): h is Hotspot => h !== null);

    document.body.removeChild(container);
    setHotspots(parsed);
  }, [svgMarkup]);

  const renderedHotspots = useMemo(() => {
    return hotspots.map((h) => {
      const lot = lotById.get(h.id);
      if (!lot) return null;
      const matchesFilter = activeFilter === "All" || lot.status === activeFilter;
      const isSelected = selectedLotId === h.id;
      return { hotspot: h, lot, matchesFilter, isSelected };
    }).filter(item => item !== null);
  }, [hotspots, lotById, activeFilter, selectedLotId]);

  const selectedHotspot = useMemo(() => 
    renderedHotspots.find(h => h.isSelected)?.hotspot, 
  [renderedHotspots]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F5F0E8]">
      <TransformWrapper ref={transformRef} centerOnInit minScale={0.5} maxScale={3}>
        <MapControls 
          onZoomIn={() => transformRef.current?.zoomIn()} 
          onZoomOut={() => transformRef.current?.zoomOut()} 
          onReset={() => transformRef.current?.resetTransform()} 
        />
        <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
          <div ref={artworkRef} className="h-full w-full cursor-grab active:cursor-grabbing">
            <svg viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`} className="h-full w-full">
                <defs>
                    <mask id="sydney-focus-aperture">
                        <rect x={viewBox.x} y={viewBox.y} width={viewBox.width} height={viewBox.height} fill="white" />
                        {selectedHotspot && (
                            <circle 
                                cx={selectedHotspot.x + selectedHotspot.width / SETTINGS.cxOffsetFactor} 
                                cy={selectedHotspot.y + selectedHotspot.height / SETTINGS.cyOffsetFactor} 
                                r={selectedHotspot.width / 2 + SETTINGS.radiusOffset} 
                                fill="black" 
                            />
                        )}
                    </mask>
                </defs>

              <g dangerouslySetInnerHTML={{ __html: svgMarkup.replace(/<svg[^>]*>/i, "").replace(/<\/svg>/i, "") }} />
              
              {selectedLotId > 0 && (
                <rect
                  x={viewBox.x} y={viewBox.y}
                  width={viewBox.width} height={viewBox.height}
                  fill="rgba(245,240,232,0.12)"
                  mask="url(#sydney-focus-aperture)"
                  className="transition-all duration-700 ease-out"
                  style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                />
              )}

              {renderedHotspots.map(({ hotspot, matchesFilter, isSelected }) => (
                <g key={hotspot.id}>
                    {/* Glow ring */}
                    {activeFilter !== "All" && matchesFilter && (
                        <circle
                            cx={hotspot.x + hotspot.width / SETTINGS.cxOffsetFactor}
                            cy={hotspot.y + hotspot.height / SETTINGS.cyOffsetFactor}
                            r={hotspot.width / 2 + SETTINGS.radiusOffset}
                            className="fill-none"
                            stroke="rgba(201,174,123,0.75)" strokeWidth={3}
                            style={{ filter: "drop-shadow(0 0 8px rgba(201,174,123,0.7))" }}
                        />
                    )}

                    {/* Fog overlay */}
                    {!matchesFilter && (
                        <circle
                            cx={hotspot.x + hotspot.width / SETTINGS.cxOffsetFactor}
                            cy={hotspot.y + hotspot.height / SETTINGS.cyOffsetFactor}
                            r={hotspot.width / 2 + SETTINGS.radiusOffset}
                            fill="rgba(245,240,232,0.82)"
                        />
                    )}

                  {isSelected && (
                    <circle
                      cx={hotspot.x + hotspot.width / SETTINGS.cxOffsetFactor}
                      cy={hotspot.y + hotspot.height / SETTINGS.cyOffsetFactor}
                      r={hotspot.width / 2 + SETTINGS.radiusOffset}
                      className="fill-none lot-pulse-ring"
                      stroke={SETTINGS.strokeColor}
                      strokeWidth={SETTINGS.strokeWidth}
                    />
                  )}

                  <rect
                    x={hotspot.x} y={hotspot.y}
                    width={hotspot.width} height={hotspot.height}
                    fill="transparent"
                    className={matchesFilter ? "cursor-pointer" : "cursor-default"}
                    onClick={() => matchesFilter && onSelectLot(hotspot.id)}
                  />
                </g>
              ))}
            </svg>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
