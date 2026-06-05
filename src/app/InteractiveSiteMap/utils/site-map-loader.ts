import type { Hotspot, MapViewBox } from "../types/site-map";
import { cloudinaryRawUrl } from "@/lib/cloudinary";
import { SITE_MAP_CANVAS } from "./site-map-constants";

export type SiteMapAssetConfig = {
  mapId: string;
  /** Local static SVG path (fallback). */
  svgPath: string;
  /** Optional Cloudinary raw asset public ID. */
  cloudinarySvgId?: string;
};

const svgCache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

export function parseViewBoxFromMarkup(markup: string): MapViewBox {
  const match = markup.match(/<svg[^>]*viewBox=["']([^"']+)["']/i);
  if (match?.[1]) {
    const values = match[1].trim().split(/\s+/).map(Number);
    if (values.length === 4 && values.every(Number.isFinite)) {
      return { x: values[0], y: values[1], width: values[2], height: values[3] };
    }
  }
  return SITE_MAP_CANVAS.viewBox;
}

export function stripSvgRoot(markup: string): string {
  return markup.replace(/<svg[^>]*>/i, "").replace(/<\/svg>/i, "");
}

export async function fetchSiteMapSvg(url: string): Promise<string> {
  const cached = svgCache.get(url);
  if (cached) return cached;

  const pending = inflight.get(url);
  if (pending) return pending;

  const request = fetch(url, { cache: "force-cache" })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`SVG request failed (${response.status}) for ${url}`);
      }
      const text = await response.text();
      svgCache.set(url, text);
      inflight.delete(url);
      return text;
    })
    .catch((error) => {
      inflight.delete(url);
      throw error;
    });

  inflight.set(url, request);
  return request;
}

export function resolveSiteMapSvgUrl(config: SiteMapAssetConfig): string {
  if (config.cloudinarySvgId) {
    return cloudinaryRawUrl(config.cloudinarySvgId);
  }
  return config.svgPath;
}

export type ParsedSiteMap = {
  svgMarkup: string;
  viewBox: MapViewBox;
  innerSvg: string;
};

export function parseLoadedSiteMap(markup: string): ParsedSiteMap {
  return {
    svgMarkup: markup,
    viewBox: parseViewBoxFromMarkup(markup),
    innerSvg: stripSvgRoot(markup),
  };
}

export type RenderedHotspot<TLot> = {
  hotspot: Hotspot;
  lot: TLot;
  matchesFilter: boolean;
  isSelected: boolean;
};

export function buildRenderedHotspots<TLot extends { id: number; status: string }>(
  hotspots: Hotspot[],
  lotById: Map<number, TLot>,
  activeFilter: string,
  selectedLotId: number,
): RenderedHotspot<TLot>[] {
  return hotspots
    .map((hotspot) => {
      const lot = lotById.get(hotspot.id);
      if (!lot) return null;
      const matchesFilter = activeFilter === "All" || lot.status === activeFilter;
      const isSelected = selectedLotId === hotspot.id;
      return { hotspot, lot, matchesFilter, isSelected };
    })
    .filter((item): item is RenderedHotspot<TLot> => item !== null);
}
