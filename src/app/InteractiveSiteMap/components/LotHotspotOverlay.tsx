"use client";

import type { Hotspot, Lot, LotStatus } from "../types/site-map";
import {
  hotspotCenter,
  hotspotRadiusForLot,
  type HotspotRingSettings,
} from "../utils/hotspot-geometry";
import { lotStatusOverlayStyle } from "../utils/lot-status-colors";

type Filter = "All" | LotStatus;

const RING_RENDER_PROPS = {
  shapeRendering: "geometricPrecision" as const,
};

export function LotHotspotOverlay({
  hotspot,
  lot,
  matchesFilter,
  isSelected,
  activeFilter,
  settings,
  onSelectLot,
}: {
  hotspot: Hotspot;
  lot: Lot;
  matchesFilter: boolean;
  isSelected: boolean;
  activeFilter: Filter;
  settings: HotspotRingSettings;
  onSelectLot: (lotId: number) => void;
}) {
  const { cx, cy } = hotspotCenter(hotspot);
  const ringR = hotspotRadiusForLot(hotspot, settings);
  const overlay = lotStatusOverlayStyle(lot.status, isSelected);

  return (
    <g>
      {matchesFilter && (
        <g pointerEvents="none">
          <circle
            cx={cx}
            cy={cy}
            r={ringR}
            fill={overlay.fill}
            stroke={overlay.stroke}
            strokeWidth={overlay.strokeWidth}
            className={isSelected ? "lot-pulse-ring" : undefined}
            style={{ transition: "fill 240ms ease, stroke 240ms ease" }}
            {...RING_RENDER_PROPS}
          />
        </g>
      )}

      {activeFilter !== "All" && matchesFilter && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR + 1}
          fill="none"
          stroke="#C9AE7B"
          strokeWidth={2.5}
          pointerEvents="none"
          {...RING_RENDER_PROPS}
        />
      )}

      {!matchesFilter && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="rgba(245, 240, 232, 0.75)"
          pointerEvents="none"
          style={{ transition: "fill 350ms ease" }}
          {...RING_RENDER_PROPS}
        />
      )}

      <rect
        data-map-lot
        x={hotspot.x}
        y={hotspot.y}
        width={hotspot.width}
        height={hotspot.height}
        fill="transparent"
        className={matchesFilter ? "cursor-pointer" : "cursor-default"}
        onClick={() => matchesFilter && onSelectLot(hotspot.id)}
      />
    </g>
  );
}
