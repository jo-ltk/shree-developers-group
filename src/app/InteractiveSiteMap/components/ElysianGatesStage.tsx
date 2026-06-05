"use client";

import { memo } from "react";

import type { Lot, LotStatus } from "../types/site-map";
import { ELYSIAN_GATES_MAP } from "../data/site-map-assets";
import { SiteMapStage } from "./SiteMapStage";

type Filter = "All" | LotStatus;

function ElysianGatesStageInner({
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
      config={ELYSIAN_GATES_MAP}
      activeFilter={activeFilter}
      selectedLotId={selectedLotId}
      onSelectLot={onSelectLot}
      lots={lots}
    />
  );
}

export const ElysianGatesStage = memo(ElysianGatesStageInner);
