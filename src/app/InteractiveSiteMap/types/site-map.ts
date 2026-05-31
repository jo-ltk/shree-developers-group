export type LotStatus = "Available" | "Coming Soon" | "Future" | "Sold";

export type HomePlan = {
  id: string;
  name: string;
  seriesLetter?: string;
  sqft: number;
  beds: number;
  baths: number;
  garage: number;
  story: "Single Story" | "Two Story";
  image: string;
  price: string;
};

export type Lot = {
  id: number;
  lotNumber: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  garage: number;
  story: "Single Story" | "Two Story";
  status: LotStatus;
  image: string;
  description: string;
  /** When set, any home site can be built with any of these floor plans */
  availablePlans?: HomePlan[];
  defaultPlanId?: string;
};

export type Hotspot = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type MapViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};
