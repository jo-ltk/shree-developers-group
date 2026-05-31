"use client";

import { useEffect, useState } from "react";
import {
  Plane,
  ShoppingBag,
  Waves,
  TrainFront,
  Hospital,
  GraduationCap,
  Building2,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { ProjectLocationMap } from "@/components/project-location-map";
import type { ProjectData } from "@/lib/projects-data";

const categoryIconMap: Record<string, LucideIcon> = {
  airport: Plane,
  shopping: ShoppingBag,
  recreation: Waves,
  transit: TrainFront,
  healthcare: Hospital,
  school: GraduationCap,
  business: Building2,
};

function getCategoryIcon(category?: string) {
  if (!category) return MapPin;
  return categoryIconMap[category.toLowerCase()] ?? MapPin;
}

type LocationNearbySectionProps = NonNullable<ProjectData["locationNearbySection"]> & {
  projectName: string;
  coordinates: { lat: number; lng: number };
};

export function LocationNearbySection({
  sectionLabel,
  headline,
  headlineEmphasis,
  description,
  googleMapsUrl,
  nearbyLocations,
  projectName,
  coordinates,
  highlightRadius,
}: LocationNearbySectionProps) {
  const [darkMap, setDarkMap] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setDarkMap(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const mapMarkers = nearbyLocations
    .filter((loc) => loc.coordinates)
    .map((loc) => ({
      name: loc.name,
      coordinates: loc.coordinates!,
    }));

  const compactLayout = nearbyLocations.length <= 2;

  return (
    <SectionWrapper
      dark={false}
      className={
        compactLayout
          ? "!py-5 md:!py-6 bg-[#F5F0E8]"
          : "!py-8 md:!py-10 lg:!py-12 bg-[#F5F0E8]"
      }
    >
      <div
        className={`grid grid-cols-12 items-stretch ${
          compactLayout
            ? "gap-4 lg:grid-rows-1 lg:gap-6 lg:h-[200px]"
            : "gap-6 lg:gap-8 xl:gap-10"
        }`}
      >
        {/* Left — copy & nearby list */}
        <div
          data-reveal
          className={`col-span-12 lg:col-span-5 flex h-full flex-col items-center text-center lg:items-start lg:text-left ${
            compactLayout ? "justify-center" : ""
          }`}
        >
          <SectionLabel
            className={`justify-center lg:justify-start ${
              compactLayout ? "!mb-2" : "!mb-3 md:!mb-4"
            }`}
          >
            {sectionLabel}
          </SectionLabel>

          <SectionHeadline
            size={compactLayout ? "md" : "lg"}
            className={`font-display font-light leading-none text-balance ${
              compactLayout ? "mb-2" : "mb-3 md:mb-4"
            }`}
            noPeriod={Boolean(headlineEmphasis)}
          >
            {headlineEmphasis ? (
              <>
                {headline}{" "}
                <em className="font-normal italic">{headlineEmphasis}</em>
              </>
            ) : (
              headline
            )}
          </SectionHeadline>

          <p
            className={`max-w-lg font-light leading-snug text-dark/70 lg:max-w-none ${
              compactLayout
                ? "mb-3 text-sm sm:text-[0.9375rem]"
                : "mb-6 text-sm sm:text-base"
            }`}
          >
            {description}
          </p>

          {compactLayout ? (
            <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:max-w-none lg:justify-start">
              {nearbyLocations.map((location, index) => {
                const Icon = getCategoryIcon(location.category);
                const isHovered = hoveredIndex === index;

                return (
                  <button
                    key={location.name}
                    type="button"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    className={`inline-flex items-center gap-2 rounded-sm px-0 py-1 text-left transition-colors duration-300 ${
                      isHovered ? "text-rust" : "text-dark"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-rust" strokeWidth={1.75} aria-hidden />
                    <span className="text-sm font-semibold">{location.name}</span>
                    {location.distance && (
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wide text-rust">
                        {location.distance}
                      </span>
                    )}
                    {location.time && (
                      <span className="inline-flex items-center gap-1 font-sans text-[10px] font-medium uppercase tracking-wide text-dark/50">
                        <Clock className="h-3 w-3" aria-hidden />
                        {location.time}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <ul className="w-full max-w-xl space-y-0 border border-dark/10 bg-cream lg:max-w-none">
              {nearbyLocations.map((location, index) => {
                const Icon = getCategoryIcon(location.category);
                const isHovered = hoveredIndex === index;

                return (
                  <li key={location.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      className={`group flex w-full items-center gap-3 border-t border-dark/10 px-4 py-2.5 text-left transition-colors duration-300 first:border-t-0 sm:gap-4 sm:px-5 sm:py-3 ${
                        isHovered ? "bg-rust/5" : "bg-cream/55 hover:bg-rust/5"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-300 sm:h-9 sm:w-9 ${
                          isHovered
                            ? "border-rust/40 bg-rust/10 text-rust"
                            : "border-dark/15 text-rust"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-sm font-semibold text-dark">
                          {location.name}
                        </p>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                          {location.distance && (
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wide text-rust">
                              {location.distance}
                            </span>
                          )}
                          {location.time && (
                            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-medium uppercase tracking-wide text-dark/50">
                              <Clock className="h-3 w-3" aria-hidden />
                              {location.time}
                            </span>
                          )}
                        </div>
                      </div>
                      <MapPin
                        className={`h-3.5 w-3.5 shrink-0 transition-opacity duration-300 ${
                          isHovered ? "text-rust opacity-100" : "text-dark/20 opacity-60"
                        }`}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Right — interactive map */}
        <div
          data-reveal
          className="col-span-12 lg:col-span-7 flex h-full min-h-0 flex-col"
        >
          <div
            className={`group relative h-full min-h-0 flex-1 overflow-hidden rounded-sm border border-dark/10 bg-cream-deep shadow-[0_12px_32px_-20px_rgba(28,18,8,0.3)] transition-shadow duration-500 hover:shadow-[0_16px_40px_-18px_rgba(28,18,8,0.35)] ${
              compactLayout
                ? "min-h-[180px] sm:min-h-[200px]"
                : "min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 z-10 rounded-sm ring-1 ring-inset ring-dark/5 transition-opacity duration-500 group-hover:ring-rust/15" />
            <ProjectLocationMap
              center={coordinates}
              projectName={projectName}
              nearbyMarkers={mapMarkers}
              googleMapsUrl={googleMapsUrl}
              highlightRadius={highlightRadius}
              darkMap={darkMap}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
