"use client";

import type { Hotspot, Lot, LotStatus } from "../types/site-map";
import { lotStatusRingStyle } from "../utils/lot-status-colors";

type Filter = "All" | LotStatus;

type HotspotSettings = {
  radiusOffset: number;
  cxOffsetFactor: number;
  cyOffsetFactor: number;
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
  settings: HotspotSettings;
  onSelectLot: (lotId: number) => void;
}) {
  const cx = hotspot.x + hotspot.width / settings.cxOffsetFactor;
  const cy = hotspot.y + hotspot.height / settings.cyOffsetFactor;
  const ringR = hotspot.width / 2 + settings.radiusOffset;
  const ring = lotStatusRingStyle(lot.status, isSelected);

  return (
    <g>
      {/* Status ring — stroke + soft fill */}
      <circle
        cx={cx}
        cy={cy}
        r={ringR}
        fill={ring.fill}
        stroke={ring.stroke}
        strokeWidth={ring.strokeWidth}
        pointerEvents="none"
        className={isSelected ? "lot-pulse-ring" : undefined}
        style={{ transition: "fill 280ms ease, stroke 280ms ease, stroke-width 280ms ease" }}
      />

      {activeFilter !== "All" && matchesFilter && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR + 2}
          className="fill-none"
          stroke="rgba(201,174,123,0.75)"
          strokeWidth={3}
          pointerEvents="none"
          style={{ filter: "drop-shadow(0 0 8px rgba(201,174,123,0.7))" }}
        />
      )}

      {!matchesFilter && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="rgba(245,240,232,0.82)"
          pointerEvents="none"
          style={{ transition: "fill 350ms ease" }}
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
