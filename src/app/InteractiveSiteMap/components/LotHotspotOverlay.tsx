"use client";

import type { Hotspot, Lot, LotStatus } from "../types/site-map";
import { lotStatusOverlayStyle } from "../utils/lot-status-colors";

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
  const overlay = lotStatusOverlayStyle(lot.status, isSelected);

  return (
    <g>
      {matchesFilter && (
        <g pointerEvents="none">
          <circle
            cx={cx}
            cy={cy}
            r={ringR + 1.5}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={overlay.strokeWidth + 2}
          />
          <circle
            cx={cx}
            cy={cy}
            r={ringR}
            fill={overlay.fill}
            stroke={overlay.stroke}
            strokeWidth={overlay.strokeWidth}
            className={isSelected ? "lot-pulse-ring" : undefined}
            style={{ transition: "fill 240ms ease, stroke 240ms ease" }}
          />
        </g>
      )}

      {activeFilter !== "All" && matchesFilter && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR + 2}
          fill="none"
          stroke="#C9AE7B"
          strokeWidth={3.5}
          pointerEvents="none"
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
