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
  const fillOpacity = selected ? 0.3 : 0.22;
  const strokeWidth = selected ? 4 : 2.5;

  switch (status) {
    case "Available":
      return {
        stroke: "#14532D",
        fill: `rgba(20, 83, 45, ${fillOpacity})`,
        strokeWidth,
      };
    case "Sold":
      return {
        stroke: "#991B1B",
        fill: `rgba(153, 27, 27, ${fillOpacity})`,
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
