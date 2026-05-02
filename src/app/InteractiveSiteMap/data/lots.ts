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

export const lots: Lot[] = Array.from({ length: 89 }, (_, offset) => {
  const id = offset + 1;
  const status = statusForLot(id);
  const beds = 3 + (id % 3);
  const baths = id % 4 === 0 ? 3.5 : id % 3 === 0 ? 2.5 : 2;
  const sqft = 1780 + ((id * 91) % 980);

  return {
    id,
    lotNumber: `${id}`,
    title: planNames[id % planNames.length],
    price: priceForLot(id, status),
    beds,
    baths,
    sqft,
    garage: id % 6 === 0 ? 3 : 2,
    story: id % 4 === 0 ? "Two Story" : "Single Story",
    status,
    image: images[id % images.length],
    description:
      "A thoughtfully planned homesite with refined streetscape presence, flexible living areas, and premium finishes selected for everyday comfort.",
  };
});

export const lotById = new Map(lots.map((lot) => [lot.id, lot]));

export const filters: Array<"All" | LotStatus> = [
  "All",
  "Available",
  "Coming Soon",
  "Future",
  "Sold",
];
