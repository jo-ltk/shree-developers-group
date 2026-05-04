"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Bath, BedDouble, Car, Home, Ruler, MessageCircle, Map, List } from "lucide-react";
import { useState } from "react";

import { BrandMark } from "@/components/ui/brand-mark";
import { ErrorBoundary } from "@/components/error-boundary";
import { MapStage } from "./components/MapStage";
import { filters, lots } from "./data/lots";
import type { LotStatus } from "./types/site-map";

type Filter = "All" | LotStatus;
type MobileTab = "map" | "list";

function filterCount(filter: Filter) {
  if (filter === "All") return lots.length;
  const target = filter.toLowerCase().replace(/\s+/g, '-');
  return lots.filter((lot) => lot.status.toLowerCase().replace(/\s+/g, '-') === target).length;
}

function statusBadgeClass(status: LotStatus) {
  if (status === "Available")
    return "border-[rgba(201,174,123,0.7)] bg-[rgba(201,174,123,0.18)] text-[#FAF8F3]";
  if (status === "Sold")
    return "border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] text-[#FAF8F3]";
  return "border-[rgba(139,42,42,0.8)] bg-[rgba(139,42,42,0.25)] text-[#FAF8F3]";
}

function listBadgeClass(status: LotStatus) {
  if (status === "Available")
    return "border-[rgba(201,174,123,0.6)] text-[#8B6A20] bg-[rgba(201,174,123,0.1)]";
  if (status === "Sold")
    return "border-[#E8DFD2] text-[#B7AA98] bg-[#F2EADF]";
  return "border-[rgba(139,42,42,0.3)] text-[#8B2A2A] bg-[rgba(139,42,42,0.06)]";
}

// ── Sub-components moved outside to prevent re-mounting on state changes ─────

const FilterBar = ({ 
  activeFilter, 
  setActiveFilter,
}: { 
  activeFilter: Filter, 
  setActiveFilter: (f: Filter) => void,
}) => (
  <div className="flex items-center gap-1.5">
    {filters.map((f) => {
      const active = activeFilter === f;
      return (
        <button
          key={f}
          type="button"
          onClick={() => setActiveFilter(f)}
          className={`relative flex items-center gap-1.5 overflow-hidden border text-[10px] font-medium uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[color,border-color,background-color] duration-300 ease-out h-8 px-3 ${
            active
              ? "border-[#1C1208] bg-[#1C1208] text-[#FAF8F3] shadow-[0_10px_26px_-12px_rgba(28,18,8,0.52)]"
              : "border-[#E8DFD2] bg-[rgba(250,248,243,0.35)] text-[#B7AA98] hover:border-[#C9AE7B] hover:bg-[rgba(201,174,123,0.08)] hover:text-[#1C1208]"
          }`}
        >
          {active ? (
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.14)_0%,transparent_50%,transparent_60%,rgba(255,255,255,0.06)_100%)]" />
          ) : null}
          <span className="relative z-10">{f}</span>
          <span
            className={`relative z-10 text-[9px] ${active ? "text-[rgba(250,248,243,0.5)]" : "text-[#B7AA98]"}`}
          >
            {filterCount(f)}
          </span>
        </button>
      );
    })}
  </div>
);

const FilterBarCompact = ({ 
  activeFilter, 
  setActiveFilter,
}: { 
  activeFilter: Filter, 
  setActiveFilter: (f: Filter) => void,
}) => (
  <div className="flex items-center gap-1.5 flex-wrap">
    {filters.map((f) => {
      const active = activeFilter === f;
      return (
        <button
          key={f}
          type="button"
          onClick={() => setActiveFilter(f)}
          className={`relative flex items-center gap-1.5 overflow-hidden border text-[10px] font-medium uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[color,border-color,background-color] duration-300 ease-out h-8 px-2.5 ${
            active
              ? "border-[#1C1208] bg-[#1C1208] text-[#FAF8F3] shadow-[0_10px_26px_-12px_rgba(28,18,8,0.52)]"
              : "border-[#E8DFD2] bg-[rgba(250,248,243,0.35)] text-[#B7AA98] hover:border-[#C9AE7B] hover:bg-[rgba(201,174,123,0.08)] hover:text-[#1C1208]"
          }`}
        >
          {active ? (
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.14)_0%,transparent_50%,transparent_60%,rgba(255,255,255,0.06)_100%)]" />
          ) : null}
          <span className="relative z-10">{f}</span>
          <span
            className={`relative z-10 text-[9px] ${active ? "text-[rgba(250,248,243,0.5)]" : "text-[#B7AA98]"}`}
          >
            {filterCount(f)}
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
  visibleLots: typeof lots, 
  selectedLotId: number, 
  handleSelectLot: (id: number) => void, 
  reduceMotion: boolean | null 
}) => (
  <div>
    {visibleLots.map((lot) => (
      <motion.button
        key={lot.id}
        type="button"
        onClick={() => handleSelectLot(lot.id)}
        whileTap={reduceMotion ? undefined : { scale: 0.993 }}
        className={`flex w-full origin-left items-center gap-3 border-b border-[rgba(232,223,210,0.6)] px-4 py-3.5 text-left transition-colors duration-200 lg:px-5 ${
          lot.id === selectedLotId
            ? "bg-[#fbf4f4] shadow-[inset_3px_0_0_rgba(185,28,28,0.92)]"
            : "bg-transparent hover:bg-[#F2EADF]"
        }`}
      >
        <span
          className="min-w-[36px] text-2xl font-light leading-none text-[#1C1208]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {lot.lotNumber}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-medium text-[#1C1208]">{lot.title}</p>
          <p className="mt-0.5 text-[10px] text-[#B7AA98]">
            {lot.price} · {lot.sqft.toLocaleString()} sq ft
          </p>
        </div>
        <span className={`shrink-0 border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] ${listBadgeClass(lot.status)}`}>
          {lot.status}
        </span>
      </motion.button>
    ))}
  </div>
);

const CtaButton = ({ selectedLot, reduceMotion }: { selectedLot: typeof lots[0], reduceMotion: boolean | null }) => (
  <motion.a
    href={`/contact?source=InteractiveSiteMap&lot=${selectedLot.lotNumber}`}
    whileTap={reduceMotion ? undefined : { scale: 0.988 }}
    className="flex h-12 w-full items-center justify-center gap-2.5 bg-[linear-gradient(180deg,#26180D_0%,#1C1208_38%,#140C06_100%)] px-6 text-[10px] font-medium uppercase tracking-[0.16em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_40px_-22px_rgba(28,18,8,0.72)] transition-[filter,background-color] duration-300 hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_50px_-16px_rgba(201,174,123,0.22)]"
    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))", color: "#FAF8F3" }}
  >
    <MessageCircle className="h-3.5 w-3.5" />
    Request Lot Details
  </motion.a>
);

const MapPanel = ({ 
  className = "", 
  activeFilter, 
  selectedLotId, 
  handleSelectLot 
}: { 
  className?: string, 
  activeFilter: Filter, 
  selectedLotId: number, 
  handleSelectLot: (id: number) => void 
}) => (
  <section
    className={`site-map-shell relative overflow-hidden rounded-[3px] bg-[linear-gradient(168deg,#FAF8F3_0%,#EDE4D6_48%,#E4DACE_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(28,18,8,0.06),0_34px_80px_-42px_rgba(28,18,8,0.42)] ring-1 ring-[rgba(232,223,210,0.72)] lg:rounded-none lg:shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(28,18,8,0.05)] lg:ring-0 ${className}`}
  >
    <ErrorBoundary fallback={
      <div className="flex h-full w-full items-center justify-center bg-[#EDE4D6] p-8 text-center">
        <div>
          <p className="text-sm font-medium text-[#8B2A2A]">Map Load Error</p>
          <p className="mt-1 text-xs text-[#B7AA98]">The interactive sitemap could not be initialized.</p>
        </div>
      </div>
    }>
      <MapStage
        activeFilter={activeFilter}
        selectedLotId={selectedLotId}
        onSelectLot={handleSelectLot}
      />
    </ErrorBoundary>

    {/* Legend */}
    <div className="absolute bottom-5 left-5 z-20 rounded-sm border border-[rgba(232,223,210,0.92)] bg-[linear-gradient(180deg,rgba(255,253,246,0.95)_0%,rgba(250,248,243,0.9)_100%)] px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_18px_40px_-18px_rgba(28,18,8,0.28)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_22px_48px_-14px_rgba(201,174,123,0.18)]">
      {[
        { label: "Available", color: "#C9AE7B" },
        { label: "Sold",      color: "#888780" },
        { label: "Reserved",  color: "#8B2A2A" },
      ].map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2 py-0.5">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
          <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#B7AA98]">{label}</span>
        </div>
      ))}
    </div>

    {/* Compass */}
    <div
      className="absolute right-5 top-5 z-20 grid h-9 w-9 place-items-center rounded-sm border border-[rgba(232,223,210,0.92)] bg-[linear-gradient(145deg,rgba(255,253,246,0.94)_0%,rgba(237,229,217,0.88)_100%)] text-sm text-[#1C1208] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_32px_-16px_rgba(28,18,8,0.35)] backdrop-blur-sm"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      N
    </div>
  </section>
);

const SpecGrid = ({ selectedLot, compact = false }: { selectedLot: typeof lots[0], compact?: boolean }) => (
  <div className={`grid grid-cols-4 ${compact ? "border-t border-[#E8DFD2]" : "border-b border-[#E8DFD2]"}`}>
    {[
      { label: "Beds",   value: selectedLot.beds,   Icon: BedDouble },
      { label: "Baths",  value: selectedLot.baths,  Icon: Bath },
      { label: "Garage", value: selectedLot.garage, Icon: Car },
      { label: "Story",  value: selectedLot.story === "Two Story" ? "2" : "1", Icon: Home },
    ].map(({ label, value, Icon }) => (
      <div key={label} className={`flex flex-col items-center gap-1 border-r border-[#E8DFD2] last:border-r-0 ${compact ? "py-2.5" : "py-5"}`}>
        <Icon className={`${compact ? "h-3.5 w-3.5" : "h-4 w-4"} text-[#8B2A2A]`} />
        <span className={`${compact ? "text-sm" : "text-lg"} font-medium leading-none text-[#1C1208]`}>{value}</span>
        <span className={`${compact ? "text-[8px]" : "text-[9px]"} font-semibold uppercase tracking-[0.1em] text-[#B7AA98]`}>{label}</span>
      </div>
    ))}
  </div>
);

export function InteractiveSiteMapClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedLotId, setSelectedLotId] = useState(lots[0]?.id ?? 1);
  const [mobileTab, setMobileTab] = useState<MobileTab>("list");

  const reduceMotion = useReducedMotion();
  const fadeShift = reduceMotion
    ? { initial: {}, animate: {}, exit: {}, transition: { duration: 0 } }
    : ({
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { type: "spring", stiffness: 420, damping: 36 },
      } as const);

  const fadeOnly = reduceMotion
    ? { initial: {}, animate: {}, exit: {}, transition: { duration: 0 } }
    : ({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      } as const);

  const imageReveal = reduceMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : ({
        initial: { scale: 1.085, opacity: 0.91 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.54, ease: [0.16, 1, 0.3, 1] },
      } as const);

  const selectedLot = lots.find((lot) => lot.id === selectedLotId) ?? lots[0];
  const visibleLots =
    activeFilter === "All" 
      ? lots 
      : lots.filter((l) => l.status.toLowerCase().replace(/\s+/g, '-') === activeFilter.toLowerCase().replace(/\s+/g, '-'));

  // ── Shared sub-components ─────────────────────────────────────────────────

  function handleSelectLot(id: number) {
    setSelectedLotId(id);
    // On mobile, switch to map view when a lot is selected from the list
    setMobileTab("map");
    const sb = document.getElementById("sb-scroll");
    if (sb) sb.scrollTo({ top: 0, behavior: "auto" });
  }

  function handleFilterChange(f: Filter) {
    setActiveFilter(f);
    // Auto-select first visible lot if current selection is filtered out
    const target = f.toLowerCase().replace(/\s+/g, '-');
    const filtered = f === "All" 
      ? lots 
      : lots.filter((l) => l.status.toLowerCase().replace(/\s+/g, '-') === target);
    
    if (filtered.length > 0 && !filtered.some((l) => l.id === selectedLotId)) {
      setSelectedLotId(filtered[0].id);
      // Reset sidebar scroll when selection changes via filter
      const sb = document.getElementById("sb-scroll");
      if (sb) sb.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#FAF8F3] text-[#1C1208]">

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#E8DFD2] bg-[#FAF8F3] px-4 lg:h-16 lg:gap-4 lg:px-8">
        <a
          href="/"
          aria-label="Back to homepage"
          className="grid h-9 w-9 shrink-0 place-items-center border border-[#E8DFD2] text-[#1C1208] transition-colors hover:border-[#8B2A2A] hover:text-[#8B2A2A]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </a>

        <BrandMark
          variant="black"
          className="h-12 w-36 lg:h-14 lg:w-44"
          imageClassName="object-left"
          alt="Shree Developers Group"
        />

        <div className="hidden h-7 w-px shrink-0 bg-[#E8DFD2] lg:block" />

        <span
          className="hidden text-sm font-light tracking-wide text-[#B7AA98] lg:block"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Interactive Site Map
        </span>

        {/* Desktop filters */}
        <div className="ml-auto hidden items-center gap-1.5 lg:flex">
          <FilterBar 
            activeFilter={activeFilter} 
            setActiveFilter={handleFilterChange} 
          />
        </div>

        {/* Mobile Map / List toggle */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          {([
            { tab: "list" as MobileTab, Icon: List, label: "List" },
            { tab: "map"  as MobileTab, Icon: Map,  label: "Map"  },
          ]).map(({ tab, Icon, label }) => {
            const active = mobileTab === tab;
            return (
              <motion.button
                key={tab}
                type="button"
                whileTap={reduceMotion ? undefined : { scale: 0.962 }}
                onClick={() => setMobileTab(tab)}
                className={`flex h-8 items-center gap-1.5 border px-3 text-[10px] font-medium uppercase tracking-[0.1em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[color,border-color,background-color] duration-300 ${
                  active
                    ? "border-[#1C1208] bg-[#1C1208] text-[#FAF8F3] shadow-[0_12px_28px_-16px_rgba(28,18,8,0.62)]"
                    : "border-[#E8DFD2] bg-[rgba(250,248,243,0.5)] text-[#B7AA98] hover:border-[#C9AE7B] hover:text-[#1C1208]"
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </motion.button>
            );
          })}
        </div>
      </header>

      {/* ════════════════════════════════════
          DESKTOP  (lg+)
          Sticky map left | scrollable sidebar right
      ════════════════════════════════════ */}
      <div className="hidden flex-1 overflow-hidden lg:grid lg:grid-cols-[1fr_340px]">
        <MapPanel 
          className="h-full" 
          activeFilter={activeFilter} 
          selectedLotId={selectedLotId} 
          handleSelectLot={handleSelectLot} 
        />

        <aside className="relative flex flex-col overflow-hidden border-l border-[#E8DFD2] bg-[#FAF8F3] shadow-[inset_1px_0_0_rgba(255,255,255,0.75)]">
          <motion.div
            key={`d-hero-${selectedLot.id}`}
            layout={false}
            initial={reduceMotion ? false : { opacity: 0.92 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-video shrink-0 overflow-hidden bg-[#2A1E10] shadow-[0_26px_50px_-32px_rgba(28,18,8,0.65)]"
          >
              {!reduceMotion ? (
                <motion.div
                  key={selectedLot.image}
                  className="absolute inset-0"
                  initial={{ scale: 1.07, opacity: 0.88 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="340px" priority />
                </motion.div>
              ) : (
                <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="340px" priority />
              )}
              <motion.div
                key={`d-hero-grad-${selectedLot.id}`}
                {...(reduceMotion ? {} : { initial: { opacity: 0.7 }, animate: { opacity: 1 }, transition: { duration: 0.4 } })}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(28,18,8,0.7)]"
              />
              <span className={`absolute bottom-3.5 left-3.5 border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] shadow-[0_12px_30px_-12px_rgba(28,18,8,0.55)] backdrop-blur-[2px] ${statusBadgeClass(selectedLot.status)}`}>
                {selectedLot.status}
              </span>
            </motion.div>

          <div id="sb-scroll" className="flex-1 overflow-y-auto [scrollbar-color:#E8DFD2_transparent] [scrollbar-width:thin]">
            <motion.article
              key={`d-details-${selectedLot.id}`}
              layout={false}
              initial={reduceMotion ? false : { opacity: 0.9, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className=""
            >
                <div className="px-5 py-5">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B2A2A]">Selected Homesite</p>
                  <h2 className="text-[2.6rem] font-light leading-none text-[#1C1208]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Lot {selectedLot.lotNumber}
                  </h2>
                  <p className="mt-1.5 text-[0.9rem] font-light leading-snug text-[#B7AA98]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {selectedLot.title}
                  </p>
                </div>

                <div className="grid grid-cols-2 border-t border-b border-[#E8DFD2]">
                  <div className="border-r border-[#E8DFD2] px-5 py-4">
                    <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B2A2A]">Price</p>
                    <p className="text-[0.95rem] font-medium text-[#1C1208]">{selectedLot.price}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B2A2A]">Area</p>
                    <p className="text-[0.95rem] font-medium text-[#1C1208]">{selectedLot.sqft.toLocaleString()} sq ft</p>
                  </div>
                </div>

            <SpecGrid selectedLot={selectedLot} />

            <div className="border-b border-[#E8DFD2] px-5 py-5">
              <p className="mb-2 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B2A2A]">
                <Ruler className="h-3 w-3" /> Plan Details
              </p>
              <p className="text-[0.88rem] font-light leading-[1.85] text-[#1C1208]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {selectedLot.description}
              </p>
            </div>
          </motion.article>

        <p className="border-b border-[#E8DFD2] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#B7AA98]">
          All Homesites
        </p>
        <LotRows 
          visibleLots={visibleLots} 
          selectedLotId={selectedLotId} 
          handleSelectLot={handleSelectLot} 
          reduceMotion={reduceMotion} 
        />
      </div>

      <div className="shrink-0 border-t border-[#E8DFD2] bg-[#FAF8F3] p-4">
        <CtaButton selectedLot={selectedLot} reduceMotion={reduceMotion} />
      </div>
        </aside>
      </div>

      {/* ════════════════════════════════════
          MOBILE  (below lg)
      ════════════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden lg:hidden">

        <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-[#E8DFD2] bg-[#FAF8F3] px-4 py-2 [scrollbar-width:none]">
          <FilterBarCompact 
            activeFilter={activeFilter} 
            setActiveFilter={handleFilterChange} 
          />
        </div>

        {/* ── MAP STACK (always mounted so the map doesn’t reload / flash) ── */}
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
          />

          {/* Bottom selected-lot strip — no exit fade (avoids white “blink”) */}
          <motion.div
            key={`m-strip-${selectedLot.id}`}
            layout={false}
            initial={reduceMotion ? false : { opacity: 0.94, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 42 }
            }
            className="shrink-0 border-t border-[#E8DFD2] bg-[linear-gradient(180deg,#FFFDFB_0%,#FAF8F3_62%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_-26px_50px_-32px_rgba(28,18,8,0.16)]"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm bg-[#2A1E10] shadow-[0_12px_28px_-12px_rgba(28,18,8,0.55)] ring-1 ring-[rgba(232,223,210,0.55)]">
                {!reduceMotion ? (
                  <motion.div key={selectedLot.image} className="absolute inset-0" {...imageReveal}>
                    <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="80px" />
                  </motion.div>
                ) : (
                  <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="80px" />
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B2A2A]">Lot {selectedLot.lotNumber}</p>
                <p className="truncate text-[13px] font-medium text-[#1C1208]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {selectedLot.title}
                </p>
                <p className="text-[10px] text-[#B7AA98]">
                  {selectedLot.price} · {selectedLot.sqft.toLocaleString()} sq ft
                </p>
              </div>
              <span className={`shrink-0 border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] ${listBadgeClass(selectedLot.status)}`}>
                {selectedLot.status}
              </span>
            </div>
            <SpecGrid selectedLot={selectedLot} compact />
            <div className="border-t border-[#E8DFD2] bg-[rgba(250,248,243,0.65)] p-3">
              <CtaButton selectedLot={selectedLot} reduceMotion={reduceMotion} />
            </div>
          </motion.div>
        </div>

        {/* ── LIST TAB ── */}
        {mobileTab === "list" && (
          <div className="flex flex-1 flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-hero-${selectedLot.id}`}
                {...fadeOnly}
                className="relative shrink-0 overflow-hidden bg-[#2A1E10] shadow-[0_22px_50px_-30px_rgba(28,18,8,0.72)]"
                style={{ height: "42vw", maxHeight: 220 }}
              >
                {!reduceMotion ? (
                  <motion.div key={selectedLot.image} className="absolute inset-0" {...imageReveal}>
                    <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="100vw" priority />
                  </motion.div>
                ) : (
                  <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="100vw" priority />
                )}
                <motion.div
                  {...(reduceMotion ? {} : { initial: { opacity: 0.82 }, animate: { opacity: 1 }, transition: { duration: 0.42 } })}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(28,18,8,0.2)] to-[rgba(28,18,8,0.78)]"
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                  <span className={`mb-2 inline-block border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] shadow-[0_14px_32px_-12px_rgba(28,18,8,0.62)] backdrop-blur-[3px] ${statusBadgeClass(selectedLot.status)}`}>
                    {selectedLot.status}
                  </span>
                  <h2 className="text-2xl font-light leading-none text-[#FAF8F3]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Lot {selectedLot.lotNumber}
                  </h2>
                  <p className="mt-1 text-[0.82rem] font-light text-[rgba(250,248,243,0.7)]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {selectedLot.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Price + specs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-summary-${selectedLot.id}`}
                {...fadeShift}
                className="shrink-0 border-b border-[#E8DFD2] bg-[#FAF8F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <div className="grid grid-cols-2 border-b border-[#E8DFD2]">
                  <div className="border-r border-[#E8DFD2] px-4 py-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B2A2A]">Price</p>
                    <p className="mt-1 text-sm font-medium text-[#1C1208]">{selectedLot.price}</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B2A2A]">Area</p>
                    <p className="mt-1 text-sm font-medium text-[#1C1208]">{selectedLot.sqft.toLocaleString()} sq ft</p>
                  </div>
                </div>
                <SpecGrid selectedLot={selectedLot} compact />
              </motion.div>
            </AnimatePresence>

            {/* Scrollable lot list */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#E8DFD2_transparent]">
              <p className="border-b border-[#E8DFD2] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#B7AA98]">
                All Homesites · {visibleLots.length} shown
              </p>
              <LotRows 
                visibleLots={visibleLots} 
                selectedLotId={selectedLotId} 
                handleSelectLot={handleSelectLot} 
                reduceMotion={reduceMotion} 
              />
            </div>

            {/* Sticky CTA */}
            <div className="shrink-0 border-t border-[#E8DFD2] bg-[#FAF8F3] p-3">
              <CtaButton selectedLot={selectedLot} reduceMotion={reduceMotion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}