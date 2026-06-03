import { HOTSPOT_OVERRIDES } from "../data/hotspot-overrides";
import type { Hotspot } from "../types/site-map";
import {
  lotHitPaddingForCanvas,
  lotRingRadiusForCanvas,
  SITE_MAP_CANVAS,
} from "./site-map-constants";

export type HotspotRingSettings = {
  /** Fixed ring radius in SVG user units (not derived from lot artwork). */
  ringRadius: number;
  /** Extra padding around the ring for pointer hit targets. */
  hitPadding: number;
};

export function defaultHotspotRingSettings(
  viewBoxWidth = SITE_MAP_CANVAS.viewBox.width,
): HotspotRingSettings {
  return {
    ringRadius: lotRingRadiusForCanvas(viewBoxWidth),
    hitPadding: lotHitPaddingForCanvas(viewBoxWidth),
  };
}

export function hotspotCenter(hotspot: Hotspot) {
  return {
    cx: hotspot.x + hotspot.width / 2,
    cy: hotspot.y + hotspot.height / 2,
  };
}

export function hotspotRadius(settings: HotspotRingSettings) {
  return settings.ringRadius;
}

export function hotspotRadiusForLot(
  hotspot: Hotspot,
  settings: HotspotRingSettings | undefined,
) {
  const fallback = settings?.ringRadius ?? lotRingRadiusForCanvas();
  return hotspot.ringRadius ?? fallback;
}

export function buildHotspotFromLotGroup(
  group: SVGGElement,
  settings: HotspotRingSettings,
): Hotspot | null {
  const idMatch = group.id.match(/lot-(\d+)/i);
  const id = idMatch ? Number.parseInt(idMatch[1], 10) : 0;
  if (!id) return null;

  const bbox = group.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const hitSize = settings.ringRadius * 2 + settings.hitPadding * 2;

  return {
    id,
    x: cx - hitSize / 2,
    y: cy - hitSize / 2,
    width: hitSize,
    height: hitSize,
  };
}

export function applyHotspotOverrides(
  hotspots: Hotspot[],
  mapId: string,
  settings: HotspotRingSettings,
): { hotspots: Hotspot[]; settings: HotspotRingSettings } {
  const overrides = HOTSPOT_OVERRIDES[mapId];
  if (!overrides) return { hotspots, settings };

  let ringRadius = settings.ringRadius;
  if (overrides.ringRadius != null) {
    ringRadius = overrides.ringRadius;
  } else if (overrides.ringRadiusScale != null) {
    ringRadius *= overrides.ringRadiusScale;
  }

  const nextSettings: HotspotRingSettings = { ...settings, ringRadius };
  const globalDx = overrides.offsetX ?? 0;
  const globalDy = overrides.offsetY ?? 0;

  const adjusted = hotspots.map((hotspot) => {
    const lotOverride = overrides.lots?.[hotspot.id];
    const dx = globalDx + (lotOverride?.dx ?? 0);
    const dy = globalDy + (lotOverride?.dy ?? 0);
    const lotRadius = lotOverride?.ringRadius ?? ringRadius;

    const { cx, cy } = hotspotCenter(hotspot);
    const hitSize = lotRadius * 2 + settings.hitPadding * 2;
    const newCx = cx + dx;
    const newCy = cy + dy;
    const useCustomRadius = lotOverride?.ringRadius != null;

    return {
      ...hotspot,
      x: newCx - hitSize / 2,
      y: newCy - hitSize / 2,
      width: hitSize,
      height: hitSize,
      ringRadius: useCustomRadius ? lotRadius : undefined,
    };
  });

  return { hotspots: adjusted, settings: nextSettings };
}

export function parseLotHotspotsInHiddenSvg(
  svgMarkup: string,
  settings: HotspotRingSettings,
): Hotspot[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgMarkup, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) return [];

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.visibility = "hidden";
  container.style.pointerEvents = "none";
  container.appendChild(svg.cloneNode(true));
  document.body.appendChild(container);

  try {
    const tempSvg = container.querySelector("svg");
    if (!tempSvg) return [];

    return Array.from(tempSvg.querySelectorAll<SVGGElement>('g[id*="lot-"]'))
      .map((group) => buildHotspotFromLotGroup(group, settings))
      .filter((hotspot): hotspot is Hotspot => hotspot !== null)
      .sort((a, b) => a.id - b.id);
  } finally {
    document.body.removeChild(container);
  }
}
