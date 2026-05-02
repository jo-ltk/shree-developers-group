"use client";

import Image from "next/image";
import { ArrowLeft, Bath, BedDouble, Car, Home, Ruler, MessageCircle, Map, List } from "lucide-react";
import { useState, useRef, useCallback } from "react";

import { BrandMark } from "@/components/ui/brand-mark";
import { MapStage } from "./components/MapStage";
import { filters, lots } from "./data/lots";
import type { LotStatus } from "./types/site-map";

type Filter = "All" | LotStatus;
type MobileTab = "map" | "list";

function filterCount(filter: Filter) {
  if (filter === "All") return lots.length;
  return lots.filter((lot) => lot.status === filter).length;
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

export function InteractiveSiteMapClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedLotId, setSelectedLotId] = useState(lots[0]?.id ?? 1);
  const [mobileTab, setMobileTab] = useState<MobileTab>("list");

  const selectedLot = lots.find((lot) => lot.id === selectedLotId) ?? lots[0];
  const visibleLots =
    activeFilter === "All" ? lots : lots.filter((l) => l.status === activeFilter);

  // ── Scroll-zoom fix ────────────────────────────────────────────────────────
  // Intercept wheel events on the map wrapper before they reach MapStage's
  // internal zoom handler. Normalise and clamp so one wheel tick = tiny step.
  const lastWheelTime = useRef(0);
  const handleMapWheel = useCallback((e: React.WheelEvent<HTMLElement>) => {
    // Only slow down — don't call e.preventDefault() here because MapStage
    // may need the event. We just throttle so rapid wheel ticks are ignored.
    const now = Date.now();
    if (now - lastWheelTime.current < 80) {
      e.stopPropagation(); // drop the extra tick
    }
    lastWheelTime.current = now;
  }, []);

  function handleSelectLot(id: number) {
    setSelectedLotId(id);
    setMobileTab("map");
    document.getElementById("sb-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Shared sub-components ─────────────────────────────────────────────────

  const FilterBar = ({ compact = false }: { compact?: boolean }) => (
    <div className={`flex items-center gap-1.5 ${compact ? "flex-wrap" : ""}`}>
      {filters.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => setActiveFilter(f)}
          className={`flex items-center gap-1.5 border text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
            compact ? "h-8 px-2.5" : "h-8 px-3"
          } ${
            activeFilter === f
              ? "border-[#1C1208] bg-[#1C1208] text-[#FAF8F3]"
              : "border-[#E8DFD2] bg-transparent text-[#B7AA98] hover:border-[#B7AA98] hover:text-[#1C1208]"
          }`}
        >
          {f}
          <span className={`text-[9px] ${activeFilter === f ? "text-[rgba(250,248,243,0.5)]" : "text-[#B7AA98]"}`}>
            {filterCount(f)}
          </span>
        </button>
      ))}
    </div>
  );

  const LotRows = () => (
    <div>
      {visibleLots.map((lot) => (
        <button
          key={lot.id}
          type="button"
          onClick={() => handleSelectLot(lot.id)}
          className={`flex w-full items-center gap-3 border-b border-[rgba(232,223,210,0.6)] px-4 py-3.5 text-left transition-colors duration-150 lg:px-5 ${
            lot.id === selectedLotId ? "bg-[#f5ede0]" : "hover:bg-[#F2EADF]"
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
        </button>
      ))}
    </div>
  );

  const CtaButton = () => (
    <a
      href={`/contact?source=InteractiveSiteMap&lot=${selectedLot.lotNumber}`}
      className="flex h-12 w-full items-center justify-center gap-2.5 bg-[#1C1208] px-6 text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-200 hover:bg-[#2A1E10]"
      style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))", color: "#FAF8F3" }}
    >
      <MessageCircle className="h-3.5 w-3.5" />
      Request Lot Details
    </a>
  );

  const MapPanel = ({ className = "" }: { className?: string }) => (
    <section
      className={`relative overflow-hidden bg-[#F2EADF] ${className}`}
      onWheel={handleMapWheel}
    >
      <MapStage
        activeFilter={activeFilter}
        selectedLotId={selectedLotId}
        onSelectLot={handleSelectLot}
      />

      {/* Legend */}
      <div className="absolute bottom-5 left-5 z-20 border border-[#E8DFD2] bg-[rgba(250,248,243,0.92)] px-3.5 py-2.5 backdrop-blur-sm">
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
        className="absolute right-5 top-5 z-20 grid h-9 w-9 place-items-center border border-[#E8DFD2] bg-[rgba(250,248,243,0.92)] text-sm text-[#1C1208]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        N
      </div>
    </section>
  );

  // ── Spec icon grid — shared ───────────────────────────────────────────────
  const SpecGrid = ({ compact = false }: { compact?: boolean }) => (
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
          priority
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
          <FilterBar />
        </div>

        {/* Mobile Map / List toggle */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          {([
            { tab: "list" as MobileTab, Icon: List, label: "List" },
            { tab: "map"  as MobileTab, Icon: Map,  label: "Map"  },
          ]).map(({ tab, Icon, label }) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobileTab(tab)}
              className={`flex h-8 items-center gap-1.5 border px-3 text-[10px] font-medium uppercase tracking-[0.1em] transition-all ${
                mobileTab === tab
                  ? "border-[#1C1208] bg-[#1C1208] text-[#FAF8F3]"
                  : "border-[#E8DFD2] text-[#B7AA98]"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* ════════════════════════════════════
          DESKTOP  (lg+)
          Sticky map left | scrollable sidebar right
      ════════════════════════════════════ */}
      <div className="hidden flex-1 overflow-hidden lg:grid lg:grid-cols-[1fr_340px]">
        <MapPanel className="h-full" />

        <aside className="flex flex-col overflow-hidden border-l border-[#E8DFD2] bg-[#FAF8F3]">
          {/* Hero image */}
          <div className="relative aspect-video shrink-0 overflow-hidden bg-[#2A1E10]">
            <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover transition-opacity duration-500" sizes="340px" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(28,18,8,0.7)]" />
            <span className={`absolute bottom-3.5 left-3.5 border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] ${statusBadgeClass(selectedLot.status)}`}>
              {selectedLot.status}
            </span>
          </div>

          <div id="sb-scroll" className="flex-1 overflow-y-auto [scrollbar-color:#E8DFD2_transparent] [scrollbar-width:thin]">
            {/* Identity */}
            <div className="border-b border-[#E8DFD2] px-5 py-5">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B2A2A]">Selected Homesite</p>
              <h2 className="text-[2.6rem] font-light leading-none text-[#1C1208]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Lot {selectedLot.lotNumber}
              </h2>
              <p className="mt-1.5 text-[0.9rem] font-light leading-snug text-[#B7AA98]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {selectedLot.title}
              </p>
            </div>

            {/* Price / Area */}
            <div className="grid grid-cols-2 border-b border-[#E8DFD2]">
              <div className="border-r border-[#E8DFD2] px-5 py-4">
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B2A2A]">Price</p>
                <p className="text-[0.95rem] font-medium text-[#1C1208]">{selectedLot.price}</p>
              </div>
              <div className="px-5 py-4">
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B2A2A]">Area</p>
                <p className="text-[0.95rem] font-medium text-[#1C1208]">{selectedLot.sqft.toLocaleString()} sq ft</p>
              </div>
            </div>

            <SpecGrid />

            {/* Description */}
            <div className="border-b border-[#E8DFD2] px-5 py-5">
              <p className="mb-2 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B2A2A]">
                <Ruler className="h-3 w-3" /> Plan Details
              </p>
              <p className="text-[0.88rem] font-light leading-[1.85] text-[#1C1208]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {selectedLot.description}
              </p>
            </div>

            <p className="border-b border-[#E8DFD2] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#B7AA98]">
              All Homesites
            </p>
            <LotRows />
          </div>

          <div className="shrink-0 border-t border-[#E8DFD2] bg-[#FAF8F3] p-4">
            <CtaButton />
          </div>
        </aside>
      </div>

      {/* ════════════════════════════════════
          MOBILE  (below lg)
      ════════════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden lg:hidden">

        {/* Filter bar */}
        <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-[#E8DFD2] bg-[#FAF8F3] px-4 py-2 [scrollbar-width:none]">
          <FilterBar compact />
        </div>

        {/* ── MAP TAB ── */}
        {mobileTab === "map" && (
          <div className="flex flex-1 flex-col overflow-hidden">
            <MapPanel className="flex-1" />

            {/* Bottom selected-lot strip */}
            <div className="shrink-0 border-t border-[#E8DFD2] bg-[#FAF8F3]">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm bg-[#2A1E10]">
                  <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B2A2A]">Lot {selectedLot.lotNumber}</p>
                  <p className="mt-0.5 truncate text-[13px] font-medium text-[#1C1208]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {selectedLot.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#B7AA98]">{selectedLot.price} · {selectedLot.sqft.toLocaleString()} sq ft</p>
                </div>
                <span className={`shrink-0 border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] ${listBadgeClass(selectedLot.status)}`}>
                  {selectedLot.status}
                </span>
              </div>
              <SpecGrid compact />
              <div className="border-t border-[#E8DFD2] p-3">
                <CtaButton />
              </div>
            </div>
          </div>
        )}

        {/* ── LIST TAB ── */}
        {mobileTab === "list" && (
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Hero image */}
            <div className="relative shrink-0 overflow-hidden bg-[#2A1E10]" style={{ height: "42vw", maxHeight: 220 }}>
              <Image src={selectedLot.image} alt={selectedLot.title} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(28,18,8,0.2)] to-[rgba(28,18,8,0.78)]" />
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                <span className={`mb-2 inline-block border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] ${statusBadgeClass(selectedLot.status)}`}>
                  {selectedLot.status}
                </span>
                <h2 className="text-2xl font-light leading-none text-[#FAF8F3]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Lot {selectedLot.lotNumber}
                </h2>
                <p className="mt-1 text-[0.82rem] font-light text-[rgba(250,248,243,0.7)]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {selectedLot.title}
                </p>
              </div>
            </div>

            {/* Price + specs */}
            <div className="shrink-0 border-b border-[#E8DFD2] bg-[#FAF8F3]">
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
              <SpecGrid compact />
            </div>

            {/* Scrollable lot list */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#E8DFD2_transparent]">
              <p className="border-b border-[#E8DFD2] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#B7AA98]">
                All Homesites · {visibleLots.length} shown
              </p>
              <LotRows />
            </div>

            {/* Sticky CTA */}
            <div className="shrink-0 border-t border-[#E8DFD2] bg-[#FAF8F3] p-3">
              <CtaButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}