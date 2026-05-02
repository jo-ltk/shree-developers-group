"use client";

import { useMemo, useState } from "react";

import { MapStage } from "./components/MapStage";
import { filters, lots } from "./data/lots";
import type { LotStatus } from "./types/site-map";

type Filter = "All" | LotStatus;

export function InteractiveSiteMapClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedLotId, setSelectedLotId] = useState(1);

  const selectedLot = lots.find((lot) => lot.id === selectedLotId) ?? lots[0];

  return (
    <main className="flex h-screen flex-col bg-neutral-50 overflow-hidden">
      {/* Top Bar: Filters */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm z-10">
        <h1 className="text-lg font-bold text-neutral-800">Sydney Oaks Site Map</h1>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Map */}
        <section className="flex-1 relative bg-neutral-200 overflow-hidden">
          <MapStage
            activeFilter={activeFilter}
            selectedLotId={selectedLotId}
            onSelectLot={setSelectedLotId}
          />
        </section>

        {/* Right Side: Sidebar */}
        <aside className="w-80 shrink-0 border-l bg-white overflow-y-auto p-6 shadow-xl">
          <div className="mb-6">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              selectedLot.status === 'Available' ? 'bg-green-100 text-green-700' :
              selectedLot.status === 'Sold' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {selectedLot.status}
            </span>
            <h2 className="mt-2 text-3xl font-black text-neutral-900">Lot {selectedLot.lotNumber}</h2>
            <p className="text-lg font-medium text-neutral-500">{selectedLot.title}</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-neutral-50 p-3">
                <p className="text-xs text-neutral-400 uppercase font-bold">Price</p>
                <p className="text-lg font-bold text-neutral-800">{selectedLot.price}</p>
              </div>
              <div className="rounded-lg bg-neutral-50 p-3">
                <p className="text-xs text-neutral-400 uppercase font-bold">Sq Ft</p>
                <p className="text-lg font-bold text-neutral-800">{selectedLot.sqft.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-800">{selectedLot.beds}</p>
                <p className="text-[10px] text-neutral-400 uppercase font-bold">Beds</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-800">{selectedLot.baths}</p>
                <p className="text-[10px] text-neutral-400 uppercase font-bold">Baths</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-800">{selectedLot.garage}</p>
                <p className="text-[10px] text-neutral-400 uppercase font-bold">Garage</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-neutral-400 uppercase font-bold mb-1">Story</p>
              <p className="text-sm font-medium text-neutral-700">{selectedLot.story}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-neutral-400 uppercase font-bold mb-2">Plan Details</p>
              <p className="text-sm leading-relaxed text-neutral-600">{selectedLot.description}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
