"use client";

import { useEffect, useMemo, useState } from "react";
import { Lot, Hotspot, LotStatus, MapViewBox } from "../types/site-map";
import {
  applyHotspotOverrides,
  defaultHotspotRingSettings,
  hotspotCenter,
  hotspotRadiusForLot,
  parseLotHotspotsInHiddenSvg,
} from "../utils/hotspot-geometry";
import { SITE_MAP_CANVAS } from "../utils/site-map-constants";
import { LotHotspotOverlay } from "./LotHotspotOverlay";
import { SiteMapCanvas } from "./SiteMapCanvas";

type Filter = "All" | LotStatus;

const MAP_URL = "/svg/elysian-gates.svg";
const MAP_ID = "elysian-gates";

function parseViewBoxFromMarkup(markup: string): MapViewBox {
  const match = markup.match(/<svg[^>]*viewBox=["']([^"']+)["']/i);
  if (match?.[1]) {
    const values = match[1].trim().split(/\s+/).map(Number);
    if (values.length === 4 && values.every(Number.isFinite)) {
      return { x: values[0], y: values[1], width: values[2], height: values[3] };
    }
  }
  return SITE_MAP_CANVAS.viewBox;
}

export function ElysianGatesStage({
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
  const [svgMarkup, setSvgMarkup] = useState("");
  const [viewBox, setViewBox] = useState<MapViewBox>(SITE_MAP_CANVAS.viewBox);

  const lotById = useMemo(() => new Map(lots.map((lot) => [lot.id, lot])), [lots]);

  const baseRingSettings = useMemo(
    () => defaultHotspotRingSettings(viewBox.width),
    [viewBox.width],
  );

  const { hotspots, ringSettings } = useMemo(() => {
    if (!svgMarkup) {
      return { hotspots: [] as Hotspot[], ringSettings: baseRingSettings };
    }
    const parsed = parseLotHotspotsInHiddenSvg(svgMarkup, baseRingSettings);
    const { hotspots: adjusted, settings } = applyHotspotOverrides(
      parsed,
      MAP_ID,
      baseRingSettings,
    );
    return { hotspots: adjusted, ringSettings: settings };
  }, [svgMarkup, baseRingSettings]);

  useEffect(() => {
    fetch(MAP_URL)
      .then((res) => res.text())
      .then((data) => {
        setSvgMarkup(data);
        setViewBox(parseViewBoxFromMarkup(data));
      })
      .catch((err) => console.error("Error loading Elysian Gates SVG:", err));
  }, []);

  const renderedHotspots = useMemo(() => {
    return hotspots
      .map((h) => {
        const lot = lotById.get(h.id);
        if (!lot) return null;
        const matchesFilter = activeFilter === "All" || lot.status === activeFilter;
        const isSelected = selectedLotId === h.id;
        return { hotspot: h, lot, matchesFilter, isSelected };
      })
      .filter((item) => item !== null);
  }, [hotspots, lotById, activeFilter, selectedLotId]);

  const selectedHotspot = useMemo(
    () => renderedHotspots.find((h) => h.isSelected)?.hotspot,
    [renderedHotspots],
  );

  const selectedRingR = selectedHotspot
    ? hotspotRadiusForLot(selectedHotspot, ringSettings)
    : 0;

  return (
    <SiteMapCanvas viewBox={viewBox}>
      <defs>
        <mask id="elysian-focus-aperture">
          <rect x={viewBox.x} y={viewBox.y} width={viewBox.width} height={viewBox.height} fill="white" />
          {selectedHotspot && (() => {
            const { cx, cy } = hotspotCenter(selectedHotspot);
            return (
              <circle
                cx={cx}
                cy={cy}
                r={selectedRingR}
                fill="black"
                shapeRendering="geometricPrecision"
              />
            );
          })()}
        </mask>
      </defs>

      <g
        dangerouslySetInnerHTML={{
          __html: svgMarkup.replace(/<svg[^>]*>/i, "").replace(/<\/svg>/i, ""),
        }}
      />

      {selectedLotId > 0 && (
        <rect
          x={viewBox.x}
          y={viewBox.y}
          width={viewBox.width}
          height={viewBox.height}
          fill="rgba(245,240,232,0.12)"
          mask="url(#elysian-focus-aperture)"
          className="transition-all duration-700 ease-out"
          style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        />
      )}

      {renderedHotspots.map(({ hotspot, lot, matchesFilter, isSelected }) => (
        <LotHotspotOverlay
          key={hotspot.id}
          hotspot={hotspot}
          lot={lot}
          matchesFilter={matchesFilter}
          isSelected={isSelected}
          activeFilter={activeFilter}
          settings={ringSettings}
          onSelectLot={onSelectLot}
        />
      ))}
    </SiteMapCanvas>
  );
}
