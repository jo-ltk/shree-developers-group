"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Bath, BedDouble, Car, Home, MessageCircle, Map, List } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { BrandMark } from "@/components/ui/brand-mark";
import { ErrorBoundary } from "@/components/error-boundary";
import { SydneyOaksStage } from "./components/SydneyOaksStage";
import { ElysianGatesStage } from "./components/ElysianGatesStage";
import { HanoverParkStage } from "./components/HanoverParkStage";
import { MapSwitcher } from "./components/MapSwitcher";
import { filters, MAP_CONFIGS, type MapConfig } from "./data/lots";
import type { Lot, LotStatus } from "./types/site-map";

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

type Filter = "All" | LotStatus;
type MobileTab = "map" | "list";

function filterCount(filter: Filter, lots: Lot[]) {
  if (filter === "All") return lots.length;
  const target = filter.toLowerCase().replace(/\s+/g, '-');
  return lots.filter((lot) => lot.status.toLowerCase().replace(/\s+/g, '-') === target).length;
}

function statusBadgeClass(status: LotStatus) {
  if (status === "Available")
    return "border-[#C9AE7B]/40 bg-[#C9AE7B]/10 text-[#1C1208]";
  if (status === "Sold")
    return "border-[#1C1208]/20 bg-[#1C1208]/5 text-[#1C1208]/60";
  return "border-[#D43F33]/30 bg-[#D43F33]/5 text-[#D43F33]";
}

function listBadgeClass(status: LotStatus) {
  if (status === "Available")
    return "border-[#C9AE7B]/40 text-[#8B6A20] bg-[#C9AE7B]/10";
  if (status === "Sold")
    return "border-[#1C1208]/15 text-[#1C1208]/40 bg-[#1C1208]/5";
  return "border-[#D43F33]/30 text-[#D43F33] bg-[#D43F33]/5";
}

// ── Sub-components ─────────────────────────────────────────────────────────

const FilterBar = ({ 
  activeFilter, 
  setActiveFilter,
  lots,
}: { 
  activeFilter: Filter, 
  setActiveFilter: (f: Filter) => void,
  lots: Lot[],
}) => (
  <div className="flex items-center gap-1">
    {filters.map((f) => {
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
}: { 
  activeFilter: Filter, 
  setActiveFilter: (f: Filter) => void,
  lots: Lot[],
}) => (
  <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none]">
    {filters.map((f) => {
      const active = activeFilter === f;
      return (
        <button
          key={f}
          type="button"
          onClick={() => setActiveFilter(f)}
          className={`relative flex items-center gap-2 whitespace-nowrap px-3 h-8 transition-all duration-300 responsive-stat-label ${
            active
              ? "!text-[#1C1208]"
              : "!text-[#1C1208]/40"
          }`}
          style={{
            fontWeight: 600,
          }}
        >
          <span>{f}</span>
          <span className={`text-[0.5rem] tabular-nums ${active ? "text-[#D43F33]" : "text-[#1C1208]/30"}`}>
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
              {lot.sqft.toLocaleString()} SQ FT
            </Annotation>
            <span className="h-0.5 w-0.5 rounded-full bg-[#1C1208]/20" />
            <Annotation className="!text-[#1C1208]/40 responsive-stat-label !font-medium">
              {lot.price}
            </Annotation>
          </div>
        </div>
        <Annotation className={`shrink-0 border px-2 py-0.5 !font-bold responsive-stat-label ${listBadgeClass(lot.status)}`}>
          {lot.status}
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
      <MapViewport>
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
      { label: "Beds",   value: selectedLot.beds,   Icon: BedDouble },
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

export function InteractiveSiteMapClient({
  initialProject,
}: {
  initialProject?: Promise<{ project?: string }>;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [mobileTab, setMobileTab] = useState<MobileTab>("map");
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
  
  const selectedMap = MAP_CONFIGS.find(m => m.id === selectedMapId) || MAP_CONFIGS[0];
  const lots = selectedMap.lots;
  
  // Track selected lot per map
  const [mapLotSelection, setMapLotSelection] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    MAP_CONFIGS.forEach(m => initial[m.id] = m.lots[0]?.id ?? 1);
    return initial;
  });

  const selectedLotId = mapLotSelection[selectedMapId];
  const selectedLot = lots.find((lot) => lot.id === selectedLotId) ?? lots[0];
  
  const visibleLots =
    activeFilter === "All" 
      ? lots 
      : lots.filter((l) => l.status.toLowerCase().replace(/\s+/g, '-') === activeFilter.toLowerCase().replace(/\s+/g, '-'));

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleSelectLot(id: number) {
    setMapLotSelection(prev => ({ ...prev, [selectedMapId]: id }));
    setMobileTab("map");
    const sb = document.getElementById("sb-scroll");
    if (sb) sb.scrollTo({ top: 0, behavior: "auto" });
  }

  function handleFilterChange(f: Filter) {
    setActiveFilter(f);
    const target = f.toLowerCase().replace(/\s+/g, '-');
    const filtered = f === "All" 
      ? lots 
      : lots.filter((l) => l.status.toLowerCase().replace(/\s+/g, '-') === target);
    
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
                label={selectedLot.status.toUpperCase()}
                counter={selectedLot.lotNumber.toString().padStart(2, '0')}
                priority
             />
          </div>

          <div
            id="sb-scroll"
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:thin] [scrollbar-color:#1C120820_transparent]"
          >
            <article className="min-w-0 max-w-full px-5 py-6 xl:px-6 xl:py-8">
              <SectionLabel counter={`LOT ${selectedLot.lotNumber.toString().padStart(2, '0')}`}>
                Selected Homesite
              </SectionLabel>
              
              <SectionHeadline size="md" className="mb-3 break-words">
                {selectedLot.title}
              </SectionHeadline>

              <BodyText size="sm" className="mb-6 text-[#1C1208]/60">
                {selectedLot.description}
              </BodyText>

              <div className="mb-5 grid min-w-0 grid-cols-2 gap-2 border-t border-[#1C1208]/10 pt-4">
                 <StatItem compact value={selectedLot.price} label="Price" />
                 <StatItem compact value={`${selectedLot.sqft.toLocaleString()}`} label="Total SQ FT" separator />
              </div>

              <SpecGrid selectedLot={selectedLot} compact />

              <div className="mt-8">
                <ButtonPrimary href="/#request-info" className="w-full">
                  Request Lot Details
                </ButtonPrimary>
              </div>

              <Ornament className="my-8" />

              <div className="mb-4 flex min-w-0 items-center justify-between gap-2">
                <SectionLabel className="mb-0 shrink-0">
                   All Homesites
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

        <div className="flex shrink-0 items-center justify-between border-b border-[#1C1208]/10 bg-[#F5F0E8] px-4 py-2">
          <div className="flex-1 min-w-0">
            <FilterBarCompact 
              activeFilter={activeFilter} 
              setActiveFilter={handleFilterChange} 
              lots={lots}
            />
          </div>
          <div className="ml-4 shrink-0">
            <MapSwitcher 
              selectedMapId={selectedMapId} 
              setSelectedMapId={setSelectedMapId} 
              configs={MAP_CONFIGS} 
              variant="mobile"
            />
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

          {/* Bottom selected-lot strip — clean single row */}
          <motion.div
            key={`m-strip-${selectedLot.id}`}
            layout={false}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="shrink-0 border-t border-[#1C1208]/10 bg-[#F5F0E8] px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] max-[430px]:px-3 max-[430px]:py-2.5 max-[430px]:pb-[calc(env(safe-area-inset-bottom)+0.5rem)]"
          >
            <div className="flex items-center gap-3 max-[430px]:gap-2.5">
              <div
                className="h-16 w-16 max-[430px]:h-12 max-[430px]:w-12 shrink-0 overflow-hidden border border-[#1C1208]/12 bg-[#EDE8DF]"
                style={{ borderRadius: 3 }}
              >
                <img
                  src={selectedLot.image}
                  alt={selectedLot.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-1.5 max-[430px]:mb-0 max-[430px]:gap-1">
                  <Annotation className="!font-bold responsive-stat-label !text-[#D43F33] max-[430px]:!text-[9px] max-[430px]:!tracking-[0.12em]">
                    Lot {selectedLot.lotNumber}
                  </Annotation>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#1C1208]/20" />
                  <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]/40 max-[430px]:!text-[9px] max-[430px]:!tracking-[0.12em]">
                    {selectedLot.price}
                  </Annotation>
                </div>

                <h3
                  className="mb-0.5 truncate text-xl font-light leading-tight text-[#1C1208] max-[430px]:mb-0 max-[430px]:text-base"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {selectedLot.title}
                </h3>

                <div className="flex items-center gap-2 max-[430px]:gap-1.5">
                  <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]/35 max-[430px]:!text-[8px] max-[430px]:!tracking-[0.1em]">
                    {selectedLot.beds} Beds
                  </Annotation>
                  <span className="h-2 w-px bg-[#1C1208]/12" />
                  <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]/35 max-[430px]:!text-[8px] max-[430px]:!tracking-[0.1em]">
                    {selectedLot.baths} Baths
                  </Annotation>
                  <span className="h-2 w-px bg-[#1C1208]/12" />
                  <Annotation className="!font-bold responsive-stat-label !text-[#1C1208]/35 max-[430px]:!text-[8px] max-[430px]:!tracking-[0.1em]">
                    {selectedLot.sqft.toLocaleString()} sq ft
                  </Annotation>
                </div>
              </div>

              <ButtonPrimary
                href="/#request-info"
                className="shrink-0 !h-10 !px-4 !text-[0.55rem] !tracking-[0.2em] max-[430px]:!h-9 max-[430px]:!gap-2 max-[430px]:!px-3 max-[430px]:!text-[0.5rem] max-[430px]:[&>div]:!h-6 max-[430px]:[&>div]:!w-6"
              >
                Inquire
              </ButtonPrimary>
            </div>
          </motion.div>
        </div>

        {/* ── LIST TAB ── */}
        {mobileTab === "list" && (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#1C120820_transparent]">
              <div className="px-4 py-6 border-b border-[#1C1208]/10">
                <SectionLabel counter={`${visibleLots.length} PLOTS`}>
                   Available Homesites
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