import type { LotStatus } from "../types/site-map";

export type LotStatusOverlayStyle = {
  fill: string;
  stroke: string;
  strokeWidth: number;
};

/** Lot status rings: green = available, red = sold, dark = coming soon */
export function lotStatusOverlayStyle(
  status: LotStatus,
  selected = false,
): LotStatusOverlayStyle {
  const strokeWidth = selected ? 4.5 : 3;

  switch (status) {
    case "Available":
      return {
        fill: "rgba(22, 163, 74, 0.32)",
        stroke: selected ? "#D43F33" : "#15803D",
        strokeWidth,
      };
    case "Sold":
      return {
        fill: "rgba(185, 28, 28, 0.34)",
        stroke: selected ? "#D43F33" : "#B91C1C",
        strokeWidth,
      };
    case "Coming Soon":
    case "Future":
    default:
      return {
        fill: "rgba(28, 18, 8, 0.22)",
        stroke: selected ? "#D43F33" : "#1C1208",
        strokeWidth: selected ? 4.5 : 2.5,
      };
  }
}
