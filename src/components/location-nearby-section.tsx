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

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 lg:!py-20 bg-[#F5F0E8]">
      <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-stretch">
        {/* Left — copy & nearby list */}
        <div
          data-reveal
          className="col-span-12 lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <SectionLabel className="justify-center lg:justify-start !mb-4 md:!mb-6">
            {sectionLabel}
          </SectionLabel>

          <SectionHeadline
            size="lg"
            className="font-display font-light leading-none text-balance mb-4 md:mb-5"
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

          <p className="mb-8 max-w-lg text-sm font-light leading-relaxed text-dark/70 sm:text-base lg:max-w-none">
            {description}
          </p>

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
                    className={`group flex w-full items-center gap-3 border-t border-dark/10 px-4 py-3.5 text-left transition-colors duration-300 first:border-t-0 sm:gap-4 sm:px-5 sm:py-4 ${
                      isHovered ? "bg-rust/5" : "bg-cream/55 hover:bg-rust/5"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-300 sm:h-10 sm:w-10 ${
                        isHovered
                          ? "border-rust/40 bg-rust/10 text-rust"
                          : "border-dark/15 text-rust"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 text-sm font-semibold text-dark sm:text-base">
                        {location.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
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
        </div>

        {/* Right — interactive map */}
        <div
          data-reveal
          className="col-span-12 lg:col-span-7 flex flex-col"
        >
          <div className="group relative flex-1 overflow-hidden rounded-sm border border-dark/10 bg-cream-deep shadow-[0_20px_50px_-24px_rgba(28,18,8,0.35)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-20px_rgba(28,18,8,0.4)] min-h-[320px] sm:min-h-[400px] lg:min-h-[520px]">
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
