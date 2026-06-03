import { getProjectBySlug } from "@/lib/projects-data";

import type { Lot, LotStatus } from "../types/site-map";
import { defaultHotspotRingSettings } from "../utils/hotspot-geometry";
import { ELYSIAN_GATES_ESTATE_PLANS } from "./elysian-gates-plans";
import { formatPlanNameList } from "./project-floor-plans";
import { sydneyOaksPlanForLot } from "./sydney-oaks-lot-plans";
import {
  SYDNEY_OAKS_COMMUNITY_SUMMARY,
  SYDNEY_OAKS_TOWNHOME_PLANS,
} from "./sydney-oaks-plans";

const statuses: LotStatus[] = ["Available", "Coming Soon", "Future", "Sold"];
const planNames = [
  "The Ashford",
  "The Linden",
  "The Waverly",
  "The Carrington",
  "The Sinclair",
  "The Bellamy",
  "The Marlow",
  "The Ellison",
];

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1100&q=85",
];

function statusForLot(index: number): LotStatus {
  if (index % 11 === 0 || index % 17 === 0) return "Sold";
  if (index % 7 === 0) return "Future";
  if (index % 5 === 0) return "Coming Soon";
  return statuses[0];
}

/** Sydney Oaks homesite availability (interactive map + list). */
const SYDNEY_OAKS_SOLD_LOT_IDS = new Set([1, 2, 3, 6, 7, 9, 10, 11]);

const SYDNEY_OAKS_CONSTRUCTION_LOT_IDS = new Set([
  4, 5, 8, 12,
  ...Array.from({ length: 46 - 35 + 1 }, (_, i) => 35 + i),
]);

function sydneyOaksStatusForLot(id: number): LotStatus {
  if (SYDNEY_OAKS_SOLD_LOT_IDS.has(id)) return "Sold";
  if (SYDNEY_OAKS_CONSTRUCTION_LOT_IDS.has(id)) return "Available";
  return "Future";
}

function priceForLot(index: number, status: LotStatus) {
  if (status === "Sold") return "Sold";
  if (status === "Future") return "Pricing TBD";

  const base = 640000 + ((index * 13750) % 285000);
  return `From $${Math.round(base / 1000).toLocaleString()}k`;
}

function sydneyOaksPriceForLot(
  id: number,
  status: LotStatus,
  plan: ReturnType<typeof sydneyOaksPlanForLot>,
) {
  if (status === "Sold") return "Sold Out";
  if (SYDNEY_OAKS_CONSTRUCTION_LOT_IDS.has(id)) return "Construction Starting";
  if (status === "Future") return "Upcoming";
  return plan.price;
}

function sydneyOaksDescriptionForLot(
  id: number,
  status: LotStatus,
  planName: string,
  seriesLabel: string,
) {
  if (status === "Sold") {
    return `Home ${id} is sold out.`;
  }
  if (SYDNEY_OAKS_CONSTRUCTION_LOT_IDS.has(id)) {
    return `Home ${id} — construction starting. ${planName} townhome (${seriesLabel}).`;
  }
  return `Home ${id} — upcoming release. ${planName} townhome (${seriesLabel}).`;
}

function generateSydneyOaksLots(count: number): Lot[] {
  return Array.from({ length: count }, (_, offset) => {
    const id = offset + 1;
    const status = sydneyOaksStatusForLot(id);
    const plan = sydneyOaksPlanForLot(id);
    const seriesLabel = plan.seriesLetter ? `Series ${plan.seriesLetter}` : plan.name;

    return {
      id,
      lotNumber: `${id}`,
      title: `Home ${id} — ${plan.name}`,
      price: sydneyOaksPriceForLot(id, status, plan),
      beds: plan.beds,
      baths: plan.baths,
      sqft: plan.sqft,
      garage: plan.garage,
      story: plan.story,
      status,
      image: plan.image,
      description: sydneyOaksDescriptionForLot(id, status, plan.name, seriesLabel),
    };
  });
}

/** Elysian Gates homesite availability — edit sets to match sales (same model as Sydney Oaks). */
const ELYSIAN_GATES_SOLD_LOT_IDS = new Set([2, 10, 19, 21]);

const ELYSIAN_GATES_CONSTRUCTION_LOT_IDS = new Set([
  3, 4, 6, 7, 8, 9, 11, 13, 14, 16, 17, 18, 22, 23, 24, 27, 28,
]);

function elysianGatesStatusForLot(id: number): LotStatus {
  if (ELYSIAN_GATES_SOLD_LOT_IDS.has(id)) return "Sold";
  if (ELYSIAN_GATES_CONSTRUCTION_LOT_IDS.has(id)) return "Available";
  return "Future";
}

function elysianGatesPriceForLot(id: number, status: LotStatus) {
  if (status === "Sold") return "Sold Out";
  if (ELYSIAN_GATES_CONSTRUCTION_LOT_IDS.has(id)) return "Construction Starting";
  if (status === "Future") return "Upcoming";
  return getProjectBySlug("elysian-gates")?.priceText ?? "From $1.3M";
}

function elysianGatesDescriptionForLot(id: number, status: LotStatus, planNames: string) {
  if (status === "Sold") {
    return `Homesite ${id} is sold out.`;
  }
  if (ELYSIAN_GATES_CONSTRUCTION_LOT_IDS.has(id)) {
    return `Homesite ${id} — construction starting. Build with the ${planNames} estate plans.`;
  }
  return `Homesite ${id} — upcoming release. Build with the ${planNames} estate plans.`;
}

function generateElysianGatesLots(count: number): Lot[] {
  const defaultPlan = ELYSIAN_GATES_ESTATE_PLANS[0];
  const planNames = formatPlanNameList(ELYSIAN_GATES_ESTATE_PLANS);

  return Array.from({ length: count }, (_, offset) => {
    const id = offset + 1;
    const status = elysianGatesStatusForLot(id);

    return {
      id,
      lotNumber: `${id}`,
      title: `Home ${id}`,
      price: elysianGatesPriceForLot(id, status),
      beds: defaultPlan.beds,
      baths: defaultPlan.baths,
      sqft: defaultPlan.sqft,
      garage: defaultPlan.garage,
      story: defaultPlan.story,
      status,
      image: defaultPlan.image,
      description: elysianGatesDescriptionForLot(id, status, planNames),
      availablePlans: ELYSIAN_GATES_ESTATE_PLANS,
      defaultPlanId: defaultPlan.id,
    };
  });
}

const generateLots = (
  count: number,
  seed: number = 1,
  resolveStatus: (id: number) => LotStatus = (id) => statusForLot(id + seed),
): Lot[] => {
  return Array.from({ length: count }, (_, offset) => {
    const id = offset + 1;
    const status = resolveStatus(id);
    const beds = 3 + ((id + seed) % 3);
    const baths = (id + seed) % 4 === 0 ? 3.5 : (id + seed) % 3 === 0 ? 2.5 : 2;
    const sqft = 1780 + (((id + seed) * 91) % 980);

    return {
      id,
      lotNumber: `${id}`,
      title: planNames[(id + seed) % planNames.length],
      price: priceForLot(id + seed, status),
      beds,
      baths,
      sqft,
      garage: (id + seed) % 6 === 0 ? 3 : 2,
      story: (id + seed) % 4 === 0 ? "Two Story" : "Single Story",
      status,
      image: images[(id + seed) % images.length],
      description:
        "A thoughtfully planned homesite with refined streetscape presence, flexible living areas, and premium finishes selected for everyday comfort.",
    };
  });
};

export const filters: Array<"All" | LotStatus> = [
  "All",
  "Available",
  "Coming Soon",
  "Future",
  "Sold",
];

export interface MapConfig {
  id: string;
  name: string;
  url: string;
  lots: Lot[];
  hotspotSettings: {
    ringRadius: number;
    hitPadding: number;
    strokeColor: string;
    strokeWidth: number;
  };
}

export const MAP_CONFIGS: MapConfig[] = [
  {
    id: 'sydney-oaks',
    name: 'Sydney Oaks',
    url: '/svg/siteMap-final.svg',
    lots: generateSydneyOaksLots(89),
    hotspotSettings: {
      ...defaultHotspotRingSettings(),
      strokeColor: "#8B2A2A",
      strokeWidth: 6,
    }
  },
  {
    id: 'elysian-gates',
    name: 'Elysian Gates',
    url: '/svg/elysian-gates.svg',
    lots: generateElysianGatesLots(28),
    hotspotSettings: {
      ...defaultHotspotRingSettings(),
      strokeColor: "#D43F33",
      strokeWidth: 2,
    }
  },
  {
    id: 'hanover-park-at-stockbridge',
    name: 'Hanover Park at Stockbridge',
    url: '/images/hanover-park/master-plan.jpg',
    lots: generateLots(72, 200, () => "Coming Soon"),
    hotspotSettings: {
      ...defaultHotspotRingSettings(),
      strokeColor: "#D43F33",
      strokeWidth: 2,
    },
  },
];

// For backward compatibility during refactor
export const lots = MAP_CONFIGS[0].lots;
export const lotById = new Map(lots.map((lot) => [lot.id, lot]));
export {
  ELYSIAN_GATES_ESTATE_PLANS,
  SYDNEY_OAKS_COMMUNITY_SUMMARY,
  SYDNEY_OAKS_TOWNHOME_PLANS,
};
