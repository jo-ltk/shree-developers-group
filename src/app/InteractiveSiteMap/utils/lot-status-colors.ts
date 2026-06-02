import type { LotStatus } from "../types/site-map";

export type LotStatusRingStyle = {
  stroke: string;
  fill: string;
  strokeWidth: number;
};

/** Hotspot ring colors: green = available, black = coming soon / future, red = sold */
export function lotStatusRingStyle(
  status: LotStatus,
  selected = false,
): LotStatusRingStyle {
  const fillOpacity = selected ? 0.24 : 0.14;
  const strokeWidth = selected ? 4 : 2;

  switch (status) {
    case "Available":
      return {
        stroke: "#16A34A",
        fill: `rgba(22, 163, 74, ${fillOpacity})`,
        strokeWidth,
      };
    case "Sold":
      return {
        stroke: "#DC2626",
        fill: `rgba(220, 38, 38, ${fillOpacity})`,
        strokeWidth,
      };
    case "Coming Soon":
    case "Future":
    default:
      return {
        stroke: "#1C1208",
        fill: `rgba(28, 18, 8, ${fillOpacity})`,
        strokeWidth,
      };
  }
}
