"use client";

import { memo, useEffect, useMemo, useState } from "react";

import type { Hotspot, Lot, LotStatus, MapViewBox } from "../types/site-map";
import {
  applyHotspotOverrides,
  defaultHotspotRingSettings,
  hotspotCenter,
  hotspotRadiusForLot,
  parseLotHotspotsInHiddenSvg,
} from "../utils/hotspot-geometry";
import {
  buildRenderedHotspots,
  fetchSiteMapSvg,
  parseLoadedSiteMap,
  resolveSiteMapSvgUrl,
  type SiteMapAssetConfig,
} from "../utils/site-map-loader";
import { SITE_MAP_CANVAS } from "../utils/site-map-constants";
import { LotHotspotOverlay } from "./LotHotspotOverlay";
import { SiteMapCanvas } from "./SiteMapCanvas";

type Filter = "All" | LotStatus;

function SiteMapStageInner({
  activeFilter,
  selectedLotId,
  onSelectLot,
  lots,
  config,
}: {
  activeFilter: Filter;
  selectedLotId: number;
  onSelectLot: (lotId: number) => void;
  lots: Lot[];
  config: SiteMapAssetConfig;
}) {
  const [innerSvg, setInnerSvg] = useState("");
  const [viewBox, setViewBox] = useState<MapViewBox>(SITE_MAP_CANVAS.viewBox);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const mapUrl = useMemo(() => resolveSiteMapSvgUrl(config), [config]);
  const lotById = useMemo(() => new Map(lots.map((lot) => [lot.id, lot])), [lots]);

  const baseRingSettings = useMemo(
    () => defaultHotspotRingSettings(viewBox.width),
    [viewBox.width],
  );

  const ringSettings = useMemo(() => {
    const { settings } = applyHotspotOverrides(hotspots, config.mapId, baseRingSettings);
    return settings;
  }, [hotspots, config.mapId, baseRingSettings]);

  const adjustedHotspots = useMemo(() => {
    if (!hotspots.length) return hotspots;
    return applyHotspotOverrides(hotspots, config.mapId, baseRingSettings).hotspots;
  }, [hotspots, config.mapId, baseRingSettings]);

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const markup = await fetchSiteMapSvg(mapUrl);
        if (cancelled) return;

        const parsed = parseLoadedSiteMap(markup);
        setInnerSvg(parsed.innerSvg);
        setViewBox(parsed.viewBox);

        const scheduleHotspotParse = (callback: () => void) => {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(() => {
              if (!cancelled) callback();
            });
          } else {
            window.setTimeout(callback, 0);
          }
        };

        scheduleHotspotParse(() => {
          const parsedHotspots = parseLotHotspotsInHiddenSvg(
            markup,
            defaultHotspotRingSettings(parsed.viewBox.width),
          );
          if (!cancelled) {
            setHotspots(parsedHotspots);
          }
        });
      } catch (error) {
        if (!cancelled) {
          console.error(`Error loading ${config.mapId} site map:`, error);
          setLoadError("Unable to load map artwork.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadMap();
    return () => {
      cancelled = true;
    };
  }, [mapUrl, config.mapId]);

  const renderedHotspots = useMemo(
    () =>
      buildRenderedHotspots(adjustedHotspots, lotById, activeFilter, selectedLotId),
    [adjustedHotspots, lotById, activeFilter, selectedLotId],
  );

  const selectedHotspot = useMemo(
    () => renderedHotspots.find((entry) => entry.isSelected)?.hotspot,
    [renderedHotspots],
  );

  const selectedRingR = selectedHotspot
    ? hotspotRadiusForLot(selectedHotspot, ringSettings)
    : 0;

  const focusMaskId = `${config.mapId}-focus-aperture`;

  return (
    <SiteMapCanvas viewBox={viewBox}>
      {isLoading && (
        <foreignObject x={viewBox.x} y={viewBox.y} width={viewBox.width} height={viewBox.height}>
          <div className="flex h-full w-full items-center justify-center bg-[#EDE8DF]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1208]/30">
              Loading map…
            </p>
          </div>
        </foreignObject>
      )}

      {loadError && (
        <foreignObject x={viewBox.x} y={viewBox.y} width={viewBox.width} height={viewBox.height}>
          <div className="flex h-full w-full items-center justify-center bg-[#EDE8DF] px-6 text-center">
            <p className="text-xs text-[#1C1208]/50">{loadError}</p>
          </div>
        </foreignObject>
      )}

      {!loadError && innerSvg && (
        <g dangerouslySetInnerHTML={{ __html: innerSvg }} />
      )}

      <defs>
        <mask id={focusMaskId}>
          <rect
            x={viewBox.x}
            y={viewBox.y}
            width={viewBox.width}
            height={viewBox.height}
            fill="white"
          />
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

      {selectedLotId > 0 && (
        <rect
          x={viewBox.x}
          y={viewBox.y}
          width={viewBox.width}
          height={viewBox.height}
          fill="rgba(245,240,232,0.12)"
          mask={`url(#${focusMaskId})`}
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

export const SiteMapStage = memo(SiteMapStageInner);
