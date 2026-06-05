import type { SiteMapAssetConfig } from "../utils/site-map-loader";

export const ELYSIAN_GATES_MAP: SiteMapAssetConfig = {
  mapId: "elysian-gates",
  svgPath: "/svg/elysian-gates.svg",
  cloudinarySvgId: process.env.NEXT_PUBLIC_SITE_MAP_ELYSIAN_SVG,
};

export const SYDNEY_OAKS_MAP: SiteMapAssetConfig = {
  mapId: "sydney-oaks",
  svgPath: "/svg/siteMap-final.svg",
  cloudinarySvgId: process.env.NEXT_PUBLIC_SITE_MAP_SYDNEY_SVG,
};
