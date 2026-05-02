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
        console.log("Starting SVG fetch...");
        const response = await fetch("/svg/siteMap-final.svg");
        console.log("Fetch response status:", response.status);
        if (!response.ok) throw new Error(`SVG request failed: ${response.status}`);
        const text = await response.text();
        console.log("SVG text loaded, length:", text.length);
        setSvgMarkup(text);
      } catch (error) {
        console.error("SVG Loading Error:", error);
      }
    }
    loadSvg();
  }, []);

  useEffect(() => {
    if (!svgMarkup) {
      console.log("No svgMarkup yet, skipping parser.");
      return;
    }

    const svg = artworkRef.current?.querySelector<SVGSVGElement>("svg") ?? null;
    if (!svg) {
      console.error("Artwork ref is present but no <svg> found inside it!");
      return;
    }

    const originalViewBox = readOriginalViewBox(svg);
    console.log("Parsed original viewBox:", originalViewBox);

    const parsedHotspots = Array.from(svg.querySelectorAll<SVGGElement>('g[id^="lot-"]'))
      .map((group) => {
        const rect = group.querySelector<SVGRectElement>("rect");
        const id = Number.parseInt(group.id.replace("lot-", ""), 10);

        if (!rect || !Number.isFinite(id)) return null;

        const originalX = parseNumber(rect.getAttribute("x"));
        const originalY = parseNumber(rect.getAttribute("y"));
        const originalWidth = parseNumber(rect.getAttribute("width"));
        const originalHeight = parseNumber(rect.getAttribute("height"));

        const width = originalWidth * 1.12;
        const height = originalHeight * 1.12;
        const x = originalX - (originalWidth * 0.06);
        const y = originalY - (originalHeight * 0.06);

        return { id, x, y, width, height };
      })
      .filter((hotspot): hotspot is Hotspot => Boolean(hotspot))
      .sort((a, b) => a.id - b.id);

    console.log(`Parsed ${parsedHotspots.length} hotspots`);
    setViewBox(originalViewBox);
    setHotspots(parsedHotspots);
  }, [svgMarkup]);

  return (
    <div className="absolute inset-0 bg-neutral-200 flex flex-col">
      <div className="flex-1 relative">
      <TransformWrapper
        centerOnInit
        limitToBounds={false}
        minScale={0.1}
        maxScale={10}
        initialScale={0.85}
        wheel={{ step: 0.1 }}
        panning={{ velocityDisabled: true, allowLeftClickPan: true, excluded: ["button"] }}
        doubleClick={{ disabled: true }}
      >
        <MapControls />
        <TransformComponent
          wrapperClass="!h-[calc(100vh-64px)] !w-full"
          contentClass="!w-full"
          contentStyle={{ width: "100%" }}
        >
          <div className="relative w-full" style={{ aspectRatio: `${viewBox.width} / ${viewBox.height}` }}>
            {/* The actual SVG artwork */}
            <div
              ref={artworkRef}
              className="absolute inset-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />

            {/* Hotspot overlay layer */}
            <svg
              className="absolute inset-0 z-10 h-full w-full"
              viewBox={svgViewBox}
              preserveAspectRatio="xMidYMid meet"
            >
              {hotspots.map((hotspot) => {
                const lot = lotById.get(hotspot.id);
                if (!lot) return null;

                const matchesFilter = activeFilter === "All" || lot.status === activeFilter;
                const isSelected = hotspot.id === selectedLotId;

                return (
                  <g 
                    key={hotspot.id} 
                    className="transition-opacity duration-300"
                    opacity={matchesFilter ? 1 : 0.1}
                  >
                    <rect
                      x={hotspot.x}
                      y={hotspot.y}
                      width={hotspot.width}
                      height={hotspot.height}
                      fill={isSelected ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 0, 0, 0.08)"}
                      stroke={isSelected ? "#eab308" : "rgba(255, 0, 0, 0.25)"}
                      strokeWidth={isSelected ? 4 : 1}
                      className={`transition-colors ${matchesFilter ? "cursor-pointer hover:fill-blue-500/20" : "cursor-default"}`}
                      pointerEvents={matchesFilter ? "auto" : "none"}
                      onClick={() => onSelectLot(hotspot.id)}
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
