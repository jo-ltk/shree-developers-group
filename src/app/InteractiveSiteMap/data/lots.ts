import type { Lot, LotStatus } from "../types/site-map";

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

function priceForLot(index: number, status: LotStatus) {
  if (status === "Sold") return "Sold";
  if (status === "Future") return "Pricing TBD";

  const base = 640000 + ((index * 13750) % 285000);
  return `From $${Math.round(base / 1000).toLocaleString()}k`;
}

const generateLots = (count: number, seed: number = 1): Lot[] => {
  return Array.from({ length: count }, (_, offset) => {
    const id = offset + 1;
    const status = statusForLot(id + seed);
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
    padding: number;
    radiusOffset: number;
    cxOffsetFactor: number;
    cyOffsetFactor: number;
    strokeColor: string;
    strokeWidth: number;
  };
}

export const MAP_CONFIGS: MapConfig[] = [
  {
    id: 'sydney-oaks',
    name: 'Sydney Oaks',
    url: '/svg/siteMap-final.svg',
    lots: generateLots(89, 0),
    hotspotSettings: {
      padding: 0.3,
      radiusOffset: 5,
      cxOffsetFactor: 1.27, // Your manual change
      cyOffsetFactor: 2.0,  // Increase to move UP, Decrease to move DOWN
      strokeColor: "#8B2A2A",
      strokeWidth: 6,
    }
  },
  {
    id: 'elysian-gates',
    name: 'Elysian Gates',
    url: '/svg/elysian-gates.svg',
    lots: generateLots(120, 100),
    hotspotSettings: {
      padding: 0.25,
      radiusOffset: 4,
      cxOffsetFactor: 1.05,
      cyOffsetFactor: 2.10,  // Increase to move UP, Decrease to move DOWN
      strokeColor: "#D43F33",
      strokeWidth: 2,
    }
  }
];

// For backward compatibility during refactor
export const lots = MAP_CONFIGS[0].lots;
export const lotById = new Map(lots.map((lot) => [lot.id, lot]));
