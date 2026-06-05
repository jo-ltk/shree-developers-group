"use client";

import { memo } from "react";

import type { Lot, LotStatus } from "../types/site-map";
import { SYDNEY_OAKS_MAP } from "../data/site-map-assets";
import { SiteMapStage } from "./SiteMapStage";

type Filter = "All" | LotStatus;

function SydneyOaksStageInner({
  activeFilter,
  selectedLotId,
  onSelectLot,
  lots,
}: {
  activeFilter: Filter;
  selectedLotId: number;
  onSelectLot: (lotId: number) => void;
  lots: Lot[];
}) {
  return (
    <SiteMapStage
      config={SYDNEY_OAKS_MAP}
      activeFilter={activeFilter}
      selectedLotId={selectedLotId}
      onSelectLot={onSelectLot}
      lots={lots}
    />
  );
}

export const SydneyOaksStage = memo(SydneyOaksStageInner);
