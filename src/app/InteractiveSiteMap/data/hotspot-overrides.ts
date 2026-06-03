/**
 * Manual lot-marker tweaks (position + size).
 *
 * How to use:
 * 1. Save the file and refresh the Interactive Site Map page.
 * 2. `dx` / `dy` move a marker in SVG units (+dx = right, +dy = down).
 * 3. `ringRadius` sets circle size for one map or one lot (try 18–24 on a 3392-wide canvas).
 * 4. `ringRadiusScale` multiplies the default size for the whole map (e.g. 1.15 = 15% bigger).
 *
 * Tip: nudge in steps of 3–8 until it lines up with the artwork.
 */

export type LotHotspotOverride = {
  dx?: number;
  dy?: number;
  ringRadius?: number;
};

export type MapHotspotOverrides = {
  /** Replace default ring size for every lot on this map */
  ringRadius?: number;
  /** Multiply default ring size (1 = default, 1.2 = 20% bigger) */
  ringRadiusScale?: number;
  /** Shift every lot on this map */
  offsetX?: number;
  offsetY?: number;
  /** Per-lot position (and optional size) tweaks */
  lots?: Partial<Record<number, LotHotspotOverride>>;
};

export const HOTSPOT_OVERRIDES: Record<string, MapHotspotOverrides> = {
  "sydney-oaks": {
    // ringRadiusScale: 1.1,
    // offsetX: 0,
    // offsetY: 0,
    lots: {
      // 16: { dx: 6, dy: -4 },
      // 19: { dx: -5, dy: 2, ringRadius: 22 },
    },
  },
  "elysian-gates": {
    offsetY: -6,
    lots: {
      // 27: { dy: -4 }, // extra nudge for a single lot if needed
    },
  },
};
