import type { LotStatus } from "../types/site-map";

export type LotStatusOverlayStyle = {
  fill: string;
  stroke: string;
  strokeWidth: number;
};

const AVAILABLE_GREEN_STYLE = {
  fill: "rgba(22, 163, 74, 0.32)",
  stroke: "#15803D",
} as const;

const SOLD_RED_STYLE = {
  fill: "rgba(185, 28, 28, 0.52)",
  stroke: "#B91C1C",
} as const;

const UNDER_CONTRACT_AMBER_STYLE = {
  fill: "rgba(217, 119, 6, 0.45)",
  stroke: "#D97706",
} as const;

const UPCOMING_GREY_STYLE = {
  fill: "rgba(28, 18, 8, 0.2)",
  stroke: "#1C1208",
} as const;

/** Lot status rings: green = construction/available, red = sold, amber = under contract, grey = upcoming */
export function lotStatusOverlayStyle(
  status: LotStatus,
  selected = false,
): LotStatusOverlayStyle {
  const strokeWidth = selected ? 4.5 : 3;
  const selectedStroke = "#D43F33";

  switch (status) {
    case "Available":
      return {
        fill: AVAILABLE_GREEN_STYLE.fill,
        stroke: selected ? selectedStroke : AVAILABLE_GREEN_STYLE.stroke,
        strokeWidth,
      };
    case "Under Contract":
      return {
        fill: UNDER_CONTRACT_AMBER_STYLE.fill,
        stroke: selected ? selectedStroke : UNDER_CONTRACT_AMBER_STYLE.stroke,
        strokeWidth: selected ? 4.5 : 3.5,
      };
    case "Coming Soon":
      return {
        fill: "rgba(201, 174, 123, 0.38)",
        stroke: selected ? selectedStroke : "#8B6A20",
        strokeWidth,
      };
    case "Sold":
      return {
        fill: SOLD_RED_STYLE.fill,
        stroke: selected ? selectedStroke : SOLD_RED_STYLE.stroke,
        strokeWidth: selected ? 5 : 3.5,
      };
    case "Future":
    default:
      return {
        fill: UPCOMING_GREY_STYLE.fill,
        stroke: selected ? selectedStroke : UPCOMING_GREY_STYLE.stroke,
        strokeWidth: selected ? 4.5 : 2.5,
      };
  }
}
