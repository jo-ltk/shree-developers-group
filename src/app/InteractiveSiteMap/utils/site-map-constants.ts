import type { MapViewBox } from "../types/site-map";

/** Shared SVG coordinate system for all vector site maps. */
export const SITE_MAP_CANVAS: { viewBox: MapViewBox } = {
  viewBox: { x: 0, y: 0, width: 3392, height: 2160 },
};

/** Lot ring radius as a fraction of canvas width — same visual size on every map. */
export const LOT_RING_RADIUS_RATIO = 0.0080;

/** Extra hit-target padding beyond the ring (fraction of canvas width). */
export const LOT_HIT_PADDING_RATIO = 0.0029;

export function lotRingRadiusForCanvas(
  viewBoxWidth = SITE_MAP_CANVAS.viewBox.width,
): number {
  return viewBoxWidth * LOT_RING_RADIUS_RATIO;
}

export function lotHitPaddingForCanvas(
  viewBoxWidth = SITE_MAP_CANVAS.viewBox.width,
): number {
  return viewBoxWidth * LOT_HIT_PADDING_RATIO;
}
