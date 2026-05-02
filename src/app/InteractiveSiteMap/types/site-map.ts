export type LotStatus = "Available" | "Coming Soon" | "Future" | "Sold";

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
