"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Car,
  ChevronDown,
  ChevronUp,
  Home,
  List,
  Map,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { BrandMark } from "@/components/ui/brand-mark";
import { ErrorBoundary } from "@/components/error-boundary";
import { MapSwitcher } from "./components/MapSwitcher";
import { filters, MAP_CONFIGS, type MapConfig } from "./data/lots";
import type { HomePlan, Lot, LotStatus } from "./types/site-map";

// Premium UI Components
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { StatItem } from "@/components/ui/stat-item";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { Ornament } from "@/components/ui/ornament";
import { ImagePanel } from "@/components/ui/image-panel";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { MapViewport } from "./components/MapViewport";

const SydneyOaksStage = dynamic(
  () =>
    import("./components/SydneyOaksStage").then((mod) => ({
      default: mod.SydneyOaksStage,
    })),
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#EDE8DF]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1208]/30">
          Loading map…
        </p>
      </div>
    ),
  },
);

const ElysianGatesStage = dynamic(
  () =>
    import("./components/ElysianGatesStage").then((mod) => ({
      default: mod.ElysianGatesStage,
    })),
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#EDE8DF]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1208]/30">
          Loading map…
        </p>
      </div>
    ),
  },
);

const HanoverParkStage = dynamic(
  () =>
    import("./components/HanoverParkStage").then((mod) => ({
      default: mod.HanoverParkStage,
    })),
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#EDE8DF]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1208]/30">
          Loading map…
        </p>
      </div>
    ),
  },
);

type Filter = "All" | LotStatus;
type MobileTab = "map" | "list";

function resolveLotDisplay(lot: Lot, planId?: string): Lot & { planName?: string } {
  if (!lot.availablePlans?.length) return lot;

  const plan =
    lot.availablePlans.find((entry) => entry.id === planId) ??
    lot.availablePlans.find((entry) => entry.id === lot.defaultPlanId) ??
    lot.availablePlans[0];

  return {
    ...lot,
    title: lot.title,
    beds: plan.beds,
    baths: plan.baths,
    sqft: plan.sqft,
    garage: plan.garage,
    story: plan.story,
    image: plan.image,
    planName: plan.name,
  };
}

function formatBedroomCount(count: number) {
  return `${count} ${count === 1 ? "Bedroom" : "Bedrooms"}`;
}

function defaultPlanIdForLot(lot: Lot) {
  return lot.defaultPlanId ?? lot.availablePlans?.[0]?.id ?? "";
}

function mapFiltersFor(config: MapConfig): Array<"All" | LotStatus> {
  return config.statusFilters ?? filters;
}

const MOBILE_FILTER_LABELS: Record<Filter, string> = {
  All: "All",
  Available: "Avail.",
  "Coming Soon": "Building",
  Future: "Upcoming",
  Sold: "Sold",
};

function filterCount(filter: Filter, lots: Lot[]) {
  if (filter === "All") return lots.length;
  const target = filter.toLowerCase().replace(/\s+/g, '-');
  return lots.filter((lot) => lot.status.toLowerCase().replace(/\s+/g, '-') === target).length;
}

function statusDisplayLabel(status: LotStatus) {
  if (status === "Sold") return "Sold Out";
  if (status === "Available") return "Available";
  return status;
}

function statusBadgeClass(status: LotStatus) {
  if (status === "Available")
    return "border-[#15803D]/40 bg-[#16A34A]/10 text-[#15803D]";
  if (status === "Sold")
    return "border-[#B91C1C]/45 bg-[#B91C1C]/12 text-[#B91C1C]";
  return "border-[#D43F33]/30 bg-[#D43F33]/5 text-[#D43F33]";
}

function listBadgeClass(status: LotStatus) {
  if (status === "Available")
    return "border-[#15803D]/45 text-[#15803D] bg-[#16A34A]/12";
  if (status === "Sold")
    return "border-[#B91C1C]/50 text-[#B91C1C] bg-[#B91C1C]/12";
  if (status === "Coming Soon")
    return "border-[#C9AE7B]/50 text-[#8B6A20] bg-[#C9AE7B]/12";
  if (status === "Future")
    return "border-[#1C1208]/20 text-[#1C1208]/55 bg-[#1C1208]/5";
  return "border-[#D43F33]/30 text-[#D43F33] bg-[#D43F33]/5";
}

function SoldOutBanner({
  message,
  compact = false,
  className = "",
}: {
  message: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={`border border-[#B91C1C]/30 bg-[#B91C1C]/[0.05] shadow-[inset_3px_0_0_#B91C1C] ${
        compact ? "mb-3 px-3.5 py-2.5" : "mb-4 px-4 py-3"
      } ${className}`}
      style={{ borderRadius: 2 }}
    >
      <p
        style={{
          color: "#B91C1C",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: compact ? "1.05rem" : "1.125rem",
          fontWeight: 500,
          lineHeight: 1.45,
          margin: 0,
        }}
      >
        {message}
      </p>
    </div>
  );
}

function LotStatusCallout({ lot, compact = false }: { lot: Lot; compact?: boolean }) {
  if (lot.status === "Sold") {
    return <SoldOutBanner message={lot.description} compact={compact} />;
  }

  return null;
}

// ── Sub-components ─────────────────────────────────────────────────────────

const FilterBar = ({ 
  activeFilter, 
  setActiveFilter,
  lots,
  mapFilters = filters,
}: { 
  activeFilter: Filter, 
  setActiveFilter: (f: Filter) => void,
  lots: Lot[],
  mapFilters?: Array<"All" | LotStatus>,
}) => (
  <div className="flex items-center gap-1">
    {mapFilters.map((f) => {
      const active = activeFilter === f;
      return (
        <button
          key={f}
          type="button"
          onClick={() => setActiveFilter(f)}
          className={`relative flex items-center gap-2 overflow-hidden px-4 h-9 transition-all duration-300 responsive-stat-label ${
            active
              ? "!text-[#1C1208]"
              : "!text-[#1C1208]/40 hover:!text-[#1C1208]"
          }`}
          style={{
            fontWeight: 600,
          }}
        >
          <span className="relative z-10">{f}</span>
          <span
            className={`relative z-10 text-[0.55rem] tabular-nums ${active ? "text-[#D43F33]" : "text-[#1C1208]/30"}`}
          >
            {filterCount(f, lots)}
          </span>
          {active && (
            <motion.div 
              layoutId="filter-accent"
              className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#D43F33]"
            />
          )}
        </button>
      );
    })}
  </div>
);

const FilterBarCompact = ({
  activeFilter,
  setActiveFilter,
  lots,
  mapFilters = filters,
}: {
  activeFilter: Filter;
  setActiveFilter: (f: Filter) => void;
  lots: Lot[];
  mapFilters?: Array<"All" | LotStatus>;
}) => (
  <div className="-mx-1 flex items-center gap-0.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {mapFilters.map((f) => {
      const active = activeFilter === f;
      return (
        <button
          key={f}
          type="button"
          onClick={() => setActiveFilter(f)}
          className={`relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 h-9 transition-all duration-300 responsive-stat-label ${
            active ? "!text-[#1C1208] bg-[#EDE8DF]" : "!text-[#1C1208]/45"
          }`}
          style={{ fontWeight: 600 }}
        >
          <span>{MOBILE_FILTER_LABELS[f]}</span>
          <span
            className={`text-[0.5rem] tabular-nums ${active ? "text-[#D43F33]" : "text-[#1C1208]/30"}`}
          >
            {filterCount(f, lots)}
          </span>
        </button>
      );
    })}
  </div>
);

const LotRows = ({ 
  visibleLots, 
  selectedLotId, 
  handleSelectLot, 
  reduceMotion 
}: { 
  visibleLots: Lot[], 
  selectedLotId: number, 
  handleSelectLot: (id: number) => void, 
  reduceMotion: boolean | null 
}) => (
  <div className="divide-y divide-[#1C1208]/5">
    {visibleLots.map((lot) => (
      <motion.button
        key={lot.id}
        type="button"
        onClick={() => handleSelectLot(lot.id)}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        className={`flex w-full min-w-0 items-center gap-3 px-4 py-3 text-left transition-colors duration-300 ${
          lot.id === selectedLotId
            ? "bg-[#EDE8DF]"
            : "bg-transparent hover:bg-[#EDE8DF]/50"
        }`}
      >
        <Annotation
          className="w-9 shrink-0 !text-2xl leading-none !text-[#1C1208]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          {lot.lotNumber.toString().padStart(2, '0')}
        </Annotation>
        <div className="min-w-0 flex-1">
          <Annotation className="truncate !text-[#1C1208] responsive-stat-label !font-bold">
            {lot.title}
          </Annotation>
          <div className="mt-1 flex items-center gap-2">
            <Annotation className="!text-[#1C1208]/40 responsive-stat-label !font-medium">
              {lot.availablePlans?.length
                ? `${lot.availablePlans.length} Floor Plans`
                : `${lot.sqft.toLocaleString()} SQ FT`}
            </Annotation>
          </div>
        </div>
        <Annotation className={`shrink-0 border px-2 py-0.5 !font-bold responsive-stat-label ${listBadgeClass(lot.status)}`}>
          {statusDisplayLabel(lot.status)}
        </Annotation>
      </motion.button>
    ))}
  </div>
);

const MapPanel = ({ 
  className = "", 
  activeFilter, 
  selectedLotId, 
  handleSelectLot,
  selectedMap,
}: { 
  className?: string, 
  activeFilter: Filter, 
  selectedLotId: number, 
  handleSelectLot: (id: number) => void,
  selectedMap: MapConfig,
}) => (
  <section
    className={`relative overflow-hidden bg-[#F5F0E8] ${className}`}
  >
    <ErrorBoundary fallback={
      <div className="flex h-full w-full items-center justify-center bg-[#EDE8DF] p-8 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D43F33]">Map Load Error</p>
          <p className="mt-2 text-xs text-[#1C1208]/40">The interactive sitemap could not be initialized.</p>
        </div>
      </div>
    }>
      <MapViewport
        showStatusLegend={selectedMap.id !== "hanover-park-at-stockbridge"}
        legendMode={selectedMap.legendMode ?? "full"}
      >
        {selectedMap.id === "sydney-oaks" ? (
          <SydneyOaksStage
            activeFilter={activeFilter}
            selectedLotId={selectedLotId}
            onSelectLot={handleSelectLot}
            lots={selectedMap.lots}
          />
        ) : selectedMap.id === "hanover-park-at-stockbridge" ? (
          <HanoverParkStage />
        ) : (
          <ElysianGatesStage
            activeFilter={activeFilter}
            selectedLotId={selectedLotId}
            onSelectLot={handleSelectLot}
            lots={selectedMap.lots}
          />
        )}
      </MapViewport>
    </ErrorBoundary>

    {/* Compass — desktop only */}
    <div className="absolute right-8 top-8 z-20 hidden lg:flex flex-col items-center gap-1 opacity-40">
      <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]">N</Annotation>
      <div className="h-8 w-px bg-[#1C1208]" />
    </div>
  </section>
);

const SpecGrid = ({ selectedLot, compact = false }: { selectedLot: Lot, compact?: boolean }) => (
  <div className="grid min-w-0 grid-cols-4 border-t border-[#1C1208]/10">
    {[
      { label: "Bedrooms", value: selectedLot.beds, Icon: BedDouble },
      { label: "Baths",  value: selectedLot.baths,  Icon: Bath },
      { label: "Garage", value: selectedLot.garage, Icon: Car },
      { label: "Story",  value: selectedLot.story === "Two Story" ? "2" : "1", Icon: Home },
    ].map(({ label, value }) => (
      <div key={label} className={`flex min-w-0 flex-col items-center gap-1 border-r border-[#1C1208]/10 px-0.5 last:border-r-0 ${compact ? "py-3" : "py-6"}`}>
        <BodyText className={`${compact ? "text-lg" : "text-2xl"} !font-light leading-none !text-[#1C1208]`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {value}
        </BodyText>
        <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]/40 truncate max-w-full text-center">
          {label}
        </Annotation>
      </div>
    ))}
  </div>
);

const PlanChips = ({
  plans,
  selectedPlanId,
  onSelect,
}: {
  plans: HomePlan[];
  selectedPlanId: string;
  onSelect: (id: string) => void;
}) => (
  <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {plans.map((plan) => {
      const active = plan.id === selectedPlanId;
      return (
        <button
          key={plan.id}
          type="button"
          onClick={() => onSelect(plan.id)}
          className={`flex shrink-0 items-center gap-2 border px-3 py-2 text-left transition-colors ${
            active
              ? "border-[#D43F33] bg-[#EDE8DF]"
              : "border-[#1C1208]/12 bg-cream"
          }`}
        >
          <div className="h-9 w-9 shrink-0 overflow-hidden border border-[#1C1208]/10 bg-[#EDE8DF]">
            <img src={plan.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <Annotation className={`!font-bold !text-[10px] ${active ? "!text-[#D43F33]" : "!text-[#1C1208]"}`}>
              {plan.name}
            </Annotation>
            <BodyText size="sm" className="!text-[9px] !text-[#1C1208]/55 whitespace-nowrap">
              {plan.sqft.toLocaleString()} sq ft
            </BodyText>
          </div>
        </button>
      );
    })}
  </div>
);

const PlanPicker = ({
  plans,
  selectedPlanId,
  onSelect,
  compact = false,
}: {
  plans: HomePlan[];
  selectedPlanId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
}) => (
  <div className={compact ? "mb-4" : "mb-5"}>
    <Annotation className={`mb-2 !font-bold ${compact ? "!text-[10px]" : ""}`}>
      Available Floor Plans
    </Annotation>
    {!compact && (
      <p className="mb-3 text-xs leading-relaxed text-[#1C1208]/55">
        Any home site can be built with any of these plans.
      </p>
    )}
    <div className="grid grid-cols-1 gap-2">
      {plans.map((plan) => {
        const active = plan.id === selectedPlanId;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan.id)}
            className={`flex items-center gap-3 border px-3 text-left transition-colors ${
              compact ? "py-2.5" : "py-3"
            } ${
              active
                ? "border-[#D43F33] bg-[#EDE8DF]"
                : "border-[#1C1208]/10 bg-cream hover:border-[#1C1208]/20"
            }`}
          >
            <div
              className={`shrink-0 overflow-hidden border border-[#1C1208]/10 bg-[#EDE8DF] ${
                compact ? "h-12 w-12" : "h-14 w-14"
              }`}
            >
              <img src={plan.image} alt={`${plan.name} floor plan`} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <Annotation className={`!font-bold ${active ? "!text-[#D43F33]" : "!text-[#1C1208]"}`}>
                {plan.name}
                {plan.seriesLetter ? ` · Series ${plan.seriesLetter}` : ""}
              </Annotation>
              <BodyText size="sm" className="mt-1 !text-[#1C1208]/60">
                {formatBedroomCount(plan.beds)} · {plan.baths} Bath · {plan.sqft.toLocaleString()} sq ft
              </BodyText>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const MobileLotDetails = ({
  selectedLot,
  baseSelectedLot,
  selectedPlanId,
  onSelectPlan,
  expanded,
  onToggleExpanded,
  collapsed,
  onToggleCollapsed,
  variant,
}: {
  selectedLot: Lot & { planName?: string };
  baseSelectedLot: Lot;
  selectedPlanId: string;
  onSelectPlan: (id: string) => void;
  expanded: boolean;
  onToggleExpanded: () => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  variant: "sheet" | "panel";
}) => {
  const hasPlans = Boolean(baseSelectedLot.availablePlans?.length);
  const isSheet = variant === "sheet";
  const isCollapsed = Boolean(isSheet && collapsed);

  return (
    <div
      className={
        isSheet
          ? "shrink-0 border-t border-[#1C1208]/10 bg-[#F5F0E8] pb-[calc(env(safe-area-inset-bottom)+0.5rem)] transition-[max-height] duration-300 ease-out"
          : "border-b border-[#1C1208]/10 bg-[#F5F0E8]"
      }
    >
      {isSheet && onToggleCollapsed ? (
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Show home details" : "Collapse panel to show more map"}
          className="flex w-full flex-col items-center gap-1 px-4 pb-1 pt-2.5 touch-manipulation max-[430px]:px-3"
        >
          <div className="h-1 w-10 rounded-full bg-[#1C1208]/20" />
          {isCollapsed ? (
            <ChevronUp className="h-3 w-3 opacity-35" aria-hidden />
          ) : (
            <ChevronDown className="h-3 w-3 opacity-35" aria-hidden />
          )}
        </button>
      ) : null}

      {isCollapsed ? (
        <div className="flex items-center gap-2.5 px-4 pb-2.5 max-[430px]:gap-2 max-[430px]:px-3">
          <div
            className="h-11 w-11 shrink-0 overflow-hidden border border-[#1C1208]/12 bg-[#EDE8DF] max-[430px]:h-10 max-[430px]:w-10"
            style={{ borderRadius: 3 }}
          >
            <img src={selectedLot.image} alt={selectedLot.title} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <Annotation className="!font-bold !text-[#D43F33] responsive-stat-label max-[430px]:!text-[9px]">
                Home {selectedLot.lotNumber}
              </Annotation>
              <Annotation
                className={`border px-1.5 py-0.5 !font-bold ${listBadgeClass(selectedLot.status)} responsive-stat-label max-[430px]:!text-[8px]`}
              >
                {statusDisplayLabel(selectedLot.status)}
              </Annotation>
            </div>
            <p
              className="mt-0.5 truncate font-light text-[#1C1208] max-[430px]:text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem" }}
            >
              {selectedLot.title}
            </p>
          </div>
        </div>
      ) : (
      <div className={`px-4 ${isSheet ? "pt-1 max-[430px]:px-3 max-[430px]:pt-0.5" : "py-5"}`}>
        <div className="flex items-start gap-3 max-[430px]:gap-2.5">
          <div
            className={`shrink-0 overflow-hidden border border-[#1C1208]/12 bg-[#EDE8DF] ${
              isSheet ? "h-16 w-16 max-[430px]:h-14 max-[430px]:w-14" : "h-20 w-20"
            }`}
            style={{ borderRadius: 3 }}
          >
            <img src={selectedLot.image} alt={selectedLot.title} className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Annotation
                className={`!font-bold !text-[#D43F33] ${isSheet ? "responsive-stat-label max-[430px]:!text-[9px]" : ""}`}
              >
                Home {selectedLot.lotNumber}
              </Annotation>
              <Annotation
                className={`border px-2 py-0.5 !font-bold ${listBadgeClass(selectedLot.status)} ${
                  isSheet ? "responsive-stat-label max-[430px]:!text-[8px]" : "text-[0.55rem]"
                }`}
              >
                {statusDisplayLabel(selectedLot.status)}
              </Annotation>
            </div>

            {selectedLot.status === "Sold" && !isSheet ? (
              <LotStatusCallout lot={selectedLot} compact />
            ) : null}

            <h3
              className={`font-light leading-tight text-[#1C1208] ${
                isSheet ? "text-xl max-[430px]:text-base" : "text-2xl"
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {selectedLot.title}
            </h3>

            {"planName" in selectedLot && selectedLot.planName ? (
              <Annotation className="mt-1 !font-bold !text-[#D43F33] max-[430px]:!text-[9px]">
                {selectedLot.planName} · {selectedLot.sqft.toLocaleString()} sq ft
              </Annotation>
            ) : null}

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]/40 max-[430px]:!text-[8px]">
                {formatBedroomCount(selectedLot.beds)} · {selectedLot.baths} Bath
              </Annotation>
            </div>
          </div>
        </div>

        {hasPlans && !expanded && (
          <div className="mt-3">
            <Annotation className="mb-2 !font-bold !text-[9px] !text-[#1C1208]/45 uppercase tracking-[0.14em]">
              Select floor plan
            </Annotation>
            <PlanChips
              plans={baseSelectedLot.availablePlans!}
              selectedPlanId={selectedPlanId}
              onSelect={onSelectPlan}
            />
          </div>
        )}

        {isSheet && (
          <button
            type="button"
            onClick={onToggleExpanded}
            className="mt-3 flex w-full items-center justify-center gap-2 border border-[#1C1208]/10 bg-[#EDE8DF]/60 py-2.5 text-[#1C1208] transition-colors active:bg-[#EDE8DF]"
          >
            <Annotation className="!font-bold !text-[10px] !tracking-[0.16em]">
              {expanded ? "Show less" : hasPlans ? "Floor plans & full details" : "Full details"}
            </Annotation>
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5 opacity-50" />
            )}
          </button>
        )}

        <AnimatePresence initial={false}>
          {(expanded || !isSheet) && (
            <motion.div
              key="mobile-lot-details-expanded"
              initial={isSheet ? { height: 0, opacity: 0 } : false}
              animate={{ height: "auto", opacity: 1 }}
              exit={isSheet ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className={isSheet ? "mt-4 max-h-[min(52dvh,380px)] overflow-y-auto overscroll-contain [scrollbar-width:thin]" : ""}>
                {hasPlans && expanded && (
                  <PlanPicker
                    plans={baseSelectedLot.availablePlans!}
                    selectedPlanId={selectedPlanId}
                    onSelect={onSelectPlan}
                    compact
                  />
                )}

                <div className="mb-4 border-t border-[#1C1208]/10 pt-4">
                  <StatItem
                    compact
                    value={selectedLot.sqft.toLocaleString()}
                    label="Total SQ FT"
                  />
                </div>

                <SpecGrid selectedLot={selectedLot} compact />

                {selectedLot.status !== "Sold" ? (
                  <div className="mt-5">
                    <ButtonPrimary href="/#request-info" className="w-full">
                      Request Home Details
                    </ButtonPrimary>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isSheet && !expanded && selectedLot.status !== "Sold" && (
          <div className="mt-3">
            <ButtonPrimary
              href="/#request-info"
              className="w-full !h-11 max-[430px]:!h-10 !text-[0.55rem]"
            >
              Inquire
            </ButtonPrimary>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export function InteractiveSiteMapClient({
  initialProject,
}: {
  initialProject?: Promise<{ project?: string }>;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [mobileTab, setMobileTab] = useState<MobileTab>("map");
  const [mobileDetailsExpanded, setMobileDetailsExpanded] = useState(false);
  const [mobileSheetCollapsed, setMobileSheetCollapsed] = useState(false);
  const [selectedMapId, setSelectedMapId] = useState(MAP_CONFIGS[0].id);
  
  // Read the `project` search param on mount and auto-select the matching map
  useEffect(() => {
    if (!initialProject) return;
    initialProject.then((params) => {
      const project = params?.project?.toLowerCase().trim();
      if (!project) return;
      const match = MAP_CONFIGS.find(
        (m) => m.id === project || m.name.toLowerCase() === project
      );
      if (match) {
        setSelectedMapId(match.id);
      }
    });
  }, [initialProject]);

  const reduceMotion = useReducedMotion();

  const [mapLotSelection, setMapLotSelection] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    MAP_CONFIGS.forEach((map) => {
      initial[map.id] = map.lots[0]?.id ?? 1;
    });
    return initial;
  });
  
  const selectedMap = MAP_CONFIGS.find(m => m.id === selectedMapId) || MAP_CONFIGS[0];
  const lots = selectedMap.lots;
  const mapFilters = mapFiltersFor(selectedMap);

  useEffect(() => {
    setActiveFilter("All");
  }, [selectedMapId]);

  const selectedLotId = mapLotSelection[selectedMapId];
  const baseSelectedLot = lots.find((lot) => lot.id === selectedLotId) ?? lots[0];
  const [selectedPlanId, setSelectedPlanId] = useState(() =>
    defaultPlanIdForLot(baseSelectedLot),
  );

  useEffect(() => {
    setSelectedPlanId(defaultPlanIdForLot(baseSelectedLot));
  }, [baseSelectedLot.id, selectedMapId]);

  useEffect(() => {
    setMobileDetailsExpanded(false);
    setMobileSheetCollapsed(false);
  }, [selectedLotId, selectedMapId]);

  const selectedLot = resolveLotDisplay(baseSelectedLot, selectedPlanId);
  
  const visibleLots =
    activeFilter === "All"
      ? lots
      : lots.filter(
          (l) =>
            l.status.toLowerCase().replace(/\s+/g, "-") ===
            activeFilter.toLowerCase().replace(/\s+/g, "-"),
        );

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleSelectLot(id: number) {
    setMapLotSelection((prev) => ({ ...prev, [selectedMapId]: id }));
    const sb = document.getElementById("sb-scroll");
    if (sb) sb.scrollTo({ top: 0, behavior: "auto" });
  }

  function handleFilterChange(f: Filter) {
    setActiveFilter(f);
    const target = f.toLowerCase().replace(/\s+/g, "-");
    const filtered =
      f === "All"
        ? lots
        : lots.filter((l) => l.status.toLowerCase().replace(/\s+/g, "-") === target);

    if (filtered.length > 0 && !filtered.some((l) => l.id === selectedLotId)) {
      handleSelectLot(filtered[0].id);
    }
  }

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-[#F5F0E8] text-[#1C1208]">

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <header className="flex h-16 shrink-0 items-center border-b border-[#1C1208]/10 bg-[#F5F0E8] px-6 lg:px-10">
        <Link
          href="/"
          aria-label="Back to homepage"
          className="flex items-center gap-2 group mr-8"
        >
          <div className="grid h-8 w-8 place-items-center border border-[#1C1208]/10 transition-colors group-hover:border-[#D43F33] group-hover:bg-[#D43F33]">
             <ArrowLeft className="h-3 w-3 text-[#1C1208] group-hover:text-white transition-colors" />
          </div>
          <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]/40 group-hover:!text-[#1C1208] transition-colors hidden sm:block">
            Back
          </Annotation>
        </Link>

        <BrandMark
          variant="black"
          className="h-10 w-32 lg:h-12 lg:w-40"
          imageClassName="object-left"
          alt="Shree Developers Group"
        />

        <div className="ml-10 hidden h-8 w-px bg-[#1C1208]/10 lg:block" />

        <div className="ml-10 hidden lg:block">
           <Annotation className="opacity-100 mb-0">Interactive Site Map</Annotation>
        </div>

        {/* Map Switcher Dropdown (Desktop) */}
        <div className="ml-8 hidden lg:block">
          <MapSwitcher 
            selectedMapId={selectedMapId} 
            setSelectedMapId={setSelectedMapId} 
            configs={MAP_CONFIGS} 
            variant="desktop"
          />
        </div>

        {/* Desktop filters */}
        <div className="ml-auto hidden items-center lg:flex">
          <FilterBar 
            activeFilter={activeFilter} 
            setActiveFilter={handleFilterChange} 
            lots={lots}
            mapFilters={mapFilters}
          />
        </div>

        {/* Mobile Map / List toggle */}
        <div className="ml-auto flex items-center gap-px bg-[#1C1208]/10 p-0.5 lg:hidden">
          {([
            { tab: "list" as MobileTab, Icon: List, label: "List" },
            { tab: "map"  as MobileTab, Icon: Map,  label: "Map"  },
          ]).map(({ tab, Icon, label }) => {
            const active = mobileTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setMobileTab(tab)}
                className={`flex h-8 items-center gap-2 px-4 transition-all duration-300 ${
                  active
                    ? "bg-[#F5F0E8] text-[#1C1208]"
                    : "text-[#1C1208]/40"
                }`}
              >
                <Icon className="h-3 w-3" />
                <Annotation className="!font-bold responsive-stat-label">{label}</Annotation>
              </button>
            );
          })}
        </div>
      </header>

      {/* ════════════════════════════════════
          DESKTOP (lg+)
      ════════════════════════════════════ */}
      <div className="hidden min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,clamp(300px,32vw,400px))]">
        <MapPanel 
          className="min-h-0 h-full border-r border-[#1C1208]/10" 
          activeFilter={activeFilter} 
          selectedLotId={selectedLotId} 
          handleSelectLot={handleSelectLot} 
          selectedMap={selectedMap}
        />

        <aside className="relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-[#F5F0E8]">
          <div className="shrink-0 max-h-[min(28vh,200px)] overflow-hidden lg:max-h-[min(30vh,220px)]">
             <ImagePanel 
                src={selectedLot.image} 
                alt={selectedLot.title}
                aspectRatio="aspect-[5/3]"
                className="w-full"
                label={statusDisplayLabel(selectedLot.status).toUpperCase()}
                counter={selectedLot.lotNumber.toString().padStart(2, '0')}
                priority
             />
          </div>

          <div
            id="sb-scroll"
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:thin] [scrollbar-color:#1C120820_transparent]"
          >
            <article className="min-w-0 max-w-full px-5 py-6 xl:px-6 xl:py-8">
              <SectionLabel counter={`HOME ${selectedLot.lotNumber.toString().padStart(2, "0")}`}>
                Selected Home
              </SectionLabel>
              
              <SectionHeadline size="md" className="mb-1 break-words">
                {selectedLot.title}
              </SectionHeadline>

              {"planName" in selectedLot && selectedLot.planName ? (
                <Annotation className="mb-3 !font-bold !text-[#D43F33]">
                  {selectedLot.planName} Plan · {selectedLot.sqft.toLocaleString()} sq ft
                </Annotation>
              ) : null}

              <LotStatusCallout lot={selectedLot} />

              {selectedLot.status !== "Sold" && selectedLot.description ? (
                <BodyText size="sm" className="mb-4 text-[#1C1208]/60">
                  {selectedLot.description}
                </BodyText>
              ) : null}

              {baseSelectedLot.availablePlans?.length ? (
                <PlanPicker
                  plans={baseSelectedLot.availablePlans}
                  selectedPlanId={selectedPlanId}
                  onSelect={setSelectedPlanId}
                />
              ) : null}

              <div className="mb-5 border-t border-[#1C1208]/10 pt-4">
                 <StatItem compact value={`${selectedLot.sqft.toLocaleString()}`} label="Total SQ FT" />
              </div>

              <SpecGrid selectedLot={selectedLot} compact />

              <div className="mt-8">
                {baseSelectedLot.status !== "Sold" ? (
                  <ButtonPrimary href="/#request-info" className="w-full">
                    Request Home Details
                  </ButtonPrimary>
                ) : null}
              </div>

              <Ornament className="my-8" />

              <div className="mb-4 flex min-w-0 items-center justify-between gap-2">
                <SectionLabel className="mb-0 shrink-0">
                   All Homes
                </SectionLabel>
                <Annotation className="shrink-0">{visibleLots.length} Results</Annotation>
              </div>

              <div className="min-w-0 border border-[#1C1208]/10 bg-[#EDE8DF]/30">
                <LotRows 
                  visibleLots={visibleLots} 
                  selectedLotId={selectedLotId} 
                  handleSelectLot={handleSelectLot} 
                  reduceMotion={reduceMotion} 
                />
              </div>
            </article>
          </div>
          
          <div className="pointer-events-none absolute top-4 right-4">
             <CrosshairIcon className="opacity-20" />
          </div>
        </aside>
      </div>

      {/* ════════════════════════════════════
          MOBILE (below lg)
      ════════════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden lg:hidden">

        <div className="flex shrink-0 flex-col gap-2 border-b border-[#1C1208]/10 bg-[#F5F0E8] px-4 py-2.5 max-[430px]:px-3 max-[430px]:py-2">
          <FilterBarCompact
            activeFilter={activeFilter}
            setActiveFilter={handleFilterChange}
            lots={lots}
            mapFilters={mapFilters}
          />
          <div className="flex items-center justify-between gap-3 border-t border-[#1C1208]/8 pt-2">
            <div className="min-w-0 flex-1">
              <MapSwitcher
                selectedMapId={selectedMapId}
                setSelectedMapId={setSelectedMapId}
                configs={MAP_CONFIGS}
                variant="mobile"
              />
            </div>
            <Annotation className="shrink-0 !text-[9px] !text-[#1C1208]/35 !tracking-[0.12em]">
              {visibleLots.length} homes
            </Annotation>
          </div>
        </div>

        {/* ── MAP STACK ── */}
        <div
          className={
            mobileTab === "map"
              ? "flex min-h-0 flex-1 flex-col overflow-hidden"
              : "invisible pointer-events-none absolute inset-0 flex flex-col overflow-hidden"
          }
        >
          <MapPanel 
            className="min-h-0 flex-1" 
            activeFilter={activeFilter} 
            selectedLotId={selectedLotId} 
            handleSelectLot={handleSelectLot} 
            selectedMap={selectedMap}
          />

          <MobileLotDetails
            selectedLot={selectedLot}
            baseSelectedLot={baseSelectedLot}
            selectedPlanId={selectedPlanId}
            onSelectPlan={setSelectedPlanId}
            expanded={mobileDetailsExpanded}
            onToggleExpanded={() => setMobileDetailsExpanded((open) => !open)}
            collapsed={mobileSheetCollapsed}
            onToggleCollapsed={() => setMobileSheetCollapsed((open) => !open)}
            variant="sheet"
          />
        </div>

        {/* ── LIST TAB ── */}
        {mobileTab === "list" && (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:#1C120820_transparent]">
              <MobileLotDetails
                selectedLot={selectedLot}
                baseSelectedLot={baseSelectedLot}
                selectedPlanId={selectedPlanId}
                onSelectPlan={setSelectedPlanId}
                expanded
                onToggleExpanded={() => undefined}
                variant="panel"
              />
              <div className="px-4 py-4 border-b border-[#1C1208]/10 max-[430px]:px-3">
                <SectionLabel counter={`${visibleLots.length} HOMES`}>
                  Available Homes
                </SectionLabel>
              </div>
              <LotRows
                visibleLots={visibleLots}
                selectedLotId={selectedLotId}
                handleSelectLot={handleSelectLot}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}