"use client";

import { memo } from "react";

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

export const LotHotspotOverlay = memo(function LotHotspotOverlay({
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
  const dimmed = activeFilter !== "All" && !matchesFilter;

  return (
    <g>
      <g pointerEvents="none" opacity={dimmed ? 0.55 : 1}>
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill={overlay.fill}
          stroke={overlay.stroke}
          strokeWidth={overlay.strokeWidth}
          className={isSelected ? "lot-pulse-ring" : undefined}
          style={{ transition: "fill 240ms ease, stroke 240ms ease, opacity 240ms ease" }}
          {...RING_RENDER_PROPS}
        />
      </g>

      {activeFilter !== "All" && matchesFilter && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR + 1}
          fill="none"
          stroke={lot.status === "Sold" ? "#B91C1C" : "#15803D"}
          strokeWidth={2.5}
          pointerEvents="none"
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
        className="cursor-pointer"
        onClick={() => onSelectLot(hotspot.id)}
      />
    </g>
  );
});
