"use client";
import { useState } from "react";
import {
  MapPin,
  Building2,
  Users,
  Navigation,
  Shield,
  Trees,
  Waves,
  Footprints,
  GraduationCap,
  Trophy,
  Home,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeadline } from "@/components/ui/section-headline";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { Annotation } from "./ui/annotation";
import { BodyText } from "./ui/body-text";
import { cn } from "@/lib/utils";

const features = [
  {
    num: "01",
    title: "Luxury Residences",
    icon: Building2,
  },
  {
    num: "02",
    title: "Family Community",
    icon: Users,
  },
  {
    num: "03",
    title: "Prime Connectivity",
    icon: Navigation,
  },
  {
    num: "04",
    title: "Premium Amenities",
    icon: Shield,
  },
];

const detailsSectionClass =
  "relative overflow-hidden min-h-0 md:min-h-[65svh] flex items-center bg-[#160E0A]";

export function CommunityDetails() {
  return (
    <section
      className={`${detailsSectionClass} pt-8 pb-0 md:pt-24 md:pb-0 lg:py-32`}
    >
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2200&auto=format&fit=crop"
          alt="Sydney Oaks"
          className="w-full h-full object-cover opacity-30 scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160E0A]/88 via-[#160E0A]/72 to-[#160E0A]/96" />
      </div>

      {/* TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(212,63,51,0.015) 3px, rgba(212,63,51,0.015) 4px)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-[2] w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-12 gap-0 md:gap-12 items-center">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap flex-1 min-w-0">
            <Annotation className="!text-[#D43F33] !font-bold responsive-stat-label">
              Community Details
            </Annotation>

            <SectionHeadline
              size="xl"
              className="text-white responsive-headline-xl m-0 leading-tight"
            >
              Sydney Oaks<span className="text-[#D43F33]">.</span>
            </SectionHeadline>

            <div className="flex items-center responsive-minimum-gap">
              <MapPin className="text-[#D43F33] w-[14px] h-[14px]" strokeWidth={2} />
              <Annotation className="!text-[#F5F0E8]/80 !font-medium responsive-stat-label">
                Cumming, Georgia
              </Annotation>
            </div>

            <BodyText
              className="!text-white/80 responsive-body-sm max-w-xl mx-auto lg:mx-0 m-0 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A 22-acre mixed-use townhome community featuring 3–4 bedroom
              homes, with 89 townhomes, 21,000 sq. ft.
              of retail, and 24,000 sq. ft. of office space — thoughtfully
              designed for connected living, convenience, and long-term value.
            </BodyText>

            {/* Actions Group */}
            <div className="flex flex-nowrap sm:flex-wrap items-center justify-center lg:justify-start responsive-minimum-gap w-full pt-4">
              <ButtonPrimary
                href="/projects/sydney-oaks"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Explore</span>
                <span className="hidden sm:inline">Explore Details</span>
              </ButtonPrimary>

              <ButtonPrimary
                href="#request-info"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !bg-white/5 border border-white/30 hover:!bg-white/10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Request info</span>
                <span className="hidden sm:inline">Request Information</span>
              </ButtonPrimary>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-8 lg:mt-0">
            <div className="-mx-6 sm:mx-0 grid grid-cols-2 gap-[1px] sm:gap-4 bg-white/10 sm:bg-transparent border-y sm:border-y-0 border-white/10">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="relative group bg-white/[0.02] border border-white/5 backdrop-blur-md py-3 px-2 sm:p-6 text-center hover:bg-white/[0.04] transition-all duration-500"
                >
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />

                  <div className="relative w-8 h-8 sm:w-14 sm:h-14 border border-[#D43F33]/20 flex items-center justify-center mx-auto mb-1 sm:mb-4 group-hover:border-[#D43F33]/50 transition-all duration-500">
                    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#D43F33]/40" />
                    <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#D43F33]/40" />
                    <item.icon
                      className="text-[#D43F33] transition-transform duration-500 group-hover:scale-110"
                      size={18}
                    />
                  </div>

                  <Annotation
                    className="!text-[#F5F0E8] !font-bold responsive-stat-label"
                  >
                    {item.title}
                  </Annotation>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const elysianFeatures = [
  {
    num: "01",
    title: "Lambert High School",
    icon: GraduationCap,
  },
  {
    num: "02",
    title: "Pickleball Courts",
    icon: Trophy,
  },
  {
    num: "03",
    title: "Gazebo",
    icon: Trees,
  },
  {
    num: "04",
    title: "Walking Trails",
    icon: Footprints,
  },
];

const hanoverFeatures = [
  { num: "01", title: "Resort Pool", icon: Waves },
  { num: "02", title: "Walkable Design", icon: Footprints },
  { num: "03", title: "Town & Estate Homes", icon: Building2 },
  { num: "04", title: "Clubhouse Living", icon: Users },
];

export function HanoverParkDetails({ stacked = false }: { stacked?: boolean }) {
  return (
    <section
      className={`${detailsSectionClass} ${
        stacked
          ? "pt-4 pb-0 md:pt-8 md:pb-0 lg:pt-16 lg:pb-0"
          : "pt-8 pb-0 md:py-24 lg:py-32"
      }`}
    >
      <div className="absolute inset-0">
        <img
          src="/images/hanover-park/hero.png"
          alt="Hanover Park at Stockbridge"
          className="w-full h-full object-cover opacity-30 scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160E0A]/88 via-[#160E0A]/72 to-[#160E0A]/96" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(212,63,51,0.015) 3px, rgba(212,63,51,0.015) 4px)",
        }}
      />

      <div className="relative z-[2] w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-12 gap-0 md:gap-12 items-center">
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap flex-1 min-w-0">
            <Annotation className="!text-[#D43F33] !font-bold responsive-stat-label">
              Community Details
            </Annotation>

            <SectionHeadline
              size="xl"
              className="text-white responsive-headline-xl m-0 leading-tight"
            >
              Hanover Park<span className="text-[#D43F33]">.</span>
            </SectionHeadline>

            <div className="flex items-center responsive-minimum-gap">
              <MapPin className="text-[#D43F33] w-[14px] h-[14px]" strokeWidth={2} />
              <Annotation className="!text-[#F5F0E8]/80 !font-medium responsive-stat-label">
                Stockbridge, Georgia
              </Annotation>
            </div>

            <BodyText
              className="!text-white/80 responsive-body-sm max-w-xl mx-auto lg:mx-0 m-0 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A resort-inspired neighborhood focused on wellness, leisure, and connection — with
              timeless brick and stone architecture, townhomes from 1,850 sq. ft., and single-family
              homes from 2,300 sq. ft.
            </BodyText>

            <div className="flex flex-nowrap sm:flex-wrap items-center justify-center lg:justify-start responsive-minimum-gap w-full pt-4">
              <ButtonPrimary
                href="/projects/hanover-park-at-stockbridge"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Explore</span>
                <span className="hidden sm:inline">Explore Details</span>
              </ButtonPrimary>

              <ButtonPrimary
                href="#request-info"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !bg-white/5 border border-white/30 hover:!bg-white/10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Request info</span>
                <span className="hidden sm:inline">Request Information</span>
              </ButtonPrimary>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-8 lg:mt-0">
            <div className="-mx-6 sm:mx-0 grid grid-cols-2 gap-[1px] sm:gap-4 bg-white/10 sm:bg-transparent border-y sm:border-y-0 border-white/10">
              {hanoverFeatures.map((item) => (
                <div
                  key={item.title}
                  className="relative group bg-white/[0.02] border border-white/5 backdrop-blur-md py-3 px-2 sm:p-6 text-center hover:bg-white/[0.04] transition-all duration-500"
                >
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />

                  <div className="relative w-8 h-8 sm:w-14 sm:h-14 border border-[#D43F33]/20 flex items-center justify-center mx-auto mb-1 sm:mb-4 group-hover:border-[#D43F33]/50 transition-all duration-500">
                    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#D43F33]/40" />
                    <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#D43F33]/40" />
                    <item.icon
                      className="text-[#D43F33] transition-transform duration-500 group-hover:scale-110"
                      size={18}
                    />
                  </div>

                  <Annotation className="!text-[#F5F0E8] !font-bold responsive-stat-label">
                    {item.title}
                  </Annotation>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ElysianGatesDetails({ stacked = false }: { stacked?: boolean }) {
  return (
    <section
      className={`${detailsSectionClass} ${
        stacked
          ? "pt-4 pb-0 md:pt-8 md:pb-0 lg:py-16"
          : "pt-8 pb-0 md:py-24 lg:py-32"
      }`}
    >
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="/images/elysian-gates/hero.jpg"
          alt="Elysian Gates"
          className="w-full h-full object-cover opacity-30 scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160E0A]/88 via-[#160E0A]/72 to-[#160E0A]/96" />
      </div>

      {/* TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(212,63,51,0.015) 3px, rgba(212,63,51,0.015) 4px)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-[2] w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-12 gap-0 md:gap-12 items-center">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap flex-1 min-w-0">
            <Annotation className="!text-[#D43F33] !font-bold responsive-stat-label">
              Community Details
            </Annotation>

            <SectionHeadline
              size="xl"
              className="text-white responsive-headline-xl m-0 leading-tight"
            >
              Elysian Gates<span className="text-[#D43F33]">.</span>
            </SectionHeadline>

            <div className="flex items-center responsive-minimum-gap">
              <MapPin className="text-[#D43F33] w-[14px] h-[14px]" strokeWidth={2} />
              <Annotation className="!text-[#F5F0E8]/80 !font-medium responsive-stat-label">
                Suwanee, Georgia
              </Annotation>
            </div>

            <BodyText
              className="!text-white/80 responsive-body-sm max-w-xl mx-auto lg:mx-0 m-0 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A private gated enclave on 44 acres with 28 estate homes — 5-bedroom residences
              zoned for Lambert High School and surrounded by pickleball courts,
              a gazebo, and walking trails.
            </BodyText>

            {/* Actions Group */}
            <div className="flex flex-nowrap sm:flex-wrap items-center justify-center lg:justify-start responsive-minimum-gap w-full pt-4">
              <ButtonPrimary
                href="/projects/elysian-gates"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Explore</span>
                <span className="hidden sm:inline">Explore Details</span>
              </ButtonPrimary>

              <ButtonPrimary
                href="#request-info"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !bg-white/5 border border-white/30 hover:!bg-white/10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Request info</span>
                <span className="hidden sm:inline">Request Information</span>
              </ButtonPrimary>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-8 lg:mt-0">
            <div className="-mx-6 sm:mx-0 grid grid-cols-2 gap-[1px] sm:gap-4 bg-white/10 sm:bg-transparent border-y sm:border-y-0 border-white/10">
              {elysianFeatures.map((item) => (
                <div
                  key={item.title}
                  className="relative group bg-white/[0.02] border border-white/5 backdrop-blur-md py-3 px-2 sm:p-6 text-center hover:bg-white/[0.04] transition-all duration-500"
                >
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />

                  <div className="relative w-8 h-8 sm:w-14 sm:h-14 border border-[#D43F33]/20 flex items-center justify-center mx-auto mb-1 sm:mb-4 group-hover:border-[#D43F33]/50 transition-all duration-500">
                    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#D43F33]/40" />
                    <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#D43F33]/40" />
                    <item.icon
                      className="text-[#D43F33] transition-transform duration-500 group-hover:scale-110"
                      size={18}
                    />
                  </div>

                  <Annotation
                    className="!text-[#F5F0E8] !font-bold responsive-stat-label"
                  >
                    {item.title}
                  </Annotation>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Newnan Crossing ────────────────────────────────────── */

const newnanFeatures = [
  { num: "01", title: "Fee-Simple Townhomes", icon: Home },
  { num: "02", title: "Modern Design", icon: Building2 },
  { num: "03", title: "I-85 Access", icon: Navigation },
  { num: "04", title: "Community Spaces", icon: Trees },
];

/** Configurable PDF URL — defaults to local web-compressed PDF or environment override */
export const NEWNAN_CROSSING_PDF_URL =
  process.env.NEXT_PUBLIC_NEWNAN_CROSSING_PDF_URL ||
  "/pdfs/newnan-crossing-overview.pdf";

function DownloadPdfButton({
  href,
  filename,
  className,
  children,
}: {
  href: string;
  filename?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const hasValidUrl = href && href.trim() !== "";
  const targetHref = hasValidUrl ? href : "#request-info";

  return (
    <a
      href={targetHref}
      {...(hasValidUrl ? { download: filename ?? true, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex h-[46px] sm:h-[52px] items-center gap-3 sm:gap-4 bg-rust px-5 sm:px-8",
        "!text-white no-underline overflow-hidden",
        "transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,63,51,0.27)]",
        "responsive-btn-text",
        className,
      )}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
      }}
    >
      {/* Corner accents */}
      <span className="absolute top-[5px] left-[5px] w-2 h-2 pointer-events-none border-t border-l border-white/30" />
      <span className="absolute bottom-[5px] right-[5px] w-2 h-2 pointer-events-none border-b border-r border-white/30" />

      <span className="uppercase font-bold whitespace-nowrap relative z-10">
        {children}
      </span>

      {/* Download icon box (matches arrow box in ButtonPrimary) */}
      <div className="flex items-center justify-center w-7 h-7 border border-white/30 flex-shrink-0 transition-transform duration-300 group-hover:translate-y-0.5 relative z-10">
        <Download size={12} className="text-white" strokeWidth={2.5} />
      </div>
    </a>
  );
}

export function NewnanCrossingDetails({ stacked = false }: { stacked?: boolean }) {
  return (
    <section
      className={`${detailsSectionClass} ${
        stacked
          ? "pt-4 pb-0 md:pt-8 md:pb-0 lg:pt-16 lg:pb-0"
          : "pt-8 pb-0 md:py-24 lg:py-32"
      }`}
    >
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2200&auto=format&fit=crop"
          alt="Newnan Crossing"
          className="w-full h-full object-cover opacity-30 scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160E0A]/88 via-[#160E0A]/72 to-[#160E0A]/96" />
      </div>

      {/* TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(212,63,51,0.015) 3px, rgba(212,63,51,0.015) 4px)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-[2] w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-12 gap-0 md:gap-12 items-center">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap flex-1 min-w-0">
            <Annotation className="!text-[#D43F33] !font-bold responsive-stat-label">
              Community Details
            </Annotation>

            <SectionHeadline
              size="xl"
              className="text-white responsive-headline-xl m-0 leading-tight"
            >
              Newnan Crossing<span className="text-[#D43F33]">.</span>
            </SectionHeadline>

            <div className="flex items-center responsive-minimum-gap">
              <MapPin className="text-[#D43F33] w-[14px] h-[14px]" strokeWidth={2} />
              <Annotation className="!text-[#F5F0E8]/80 !font-medium responsive-stat-label">
                Coweta County, Georgia
              </Annotation>
            </div>

            <BodyText
              className="!text-white/80 responsive-body-sm max-w-xl mx-auto lg:mx-0 m-0 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A thoughtfully planned 8.30-acre residential community featuring 33 fee-simple
              townhome lots — combining contemporary neighborhood design with strategic access
              to I-85, top-rated schools, shopping, and healthcare in one of Metro Atlanta&apos;s
              fastest-growing markets.
            </BodyText>

            {/* Actions Group */}
            <div className="flex flex-nowrap sm:flex-wrap items-center justify-center lg:justify-start responsive-minimum-gap w-full pt-4">
              <ButtonPrimary
                href="#request-info"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !bg-white/5 border border-white/30 hover:!bg-white/10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Request info</span>
                <span className="hidden sm:inline">Request Information</span>
              </ButtonPrimary>

              <DownloadPdfButton
                href={NEWNAN_CROSSING_PDF_URL}
                filename="Newnan-Crossing-Overview.pdf"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Download</span>
                <span className="hidden sm:inline">Download PDF</span>
              </DownloadPdfButton>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-8 lg:mt-0">
            <div className="-mx-6 sm:mx-0 grid grid-cols-2 gap-[1px] sm:gap-4 bg-white/10 sm:bg-transparent border-y sm:border-y-0 border-white/10">
              {newnanFeatures.map((item) => (
                <div
                  key={item.title}
                  className="relative group bg-white/[0.02] border border-white/5 backdrop-blur-md py-3 px-2 sm:p-6 text-center hover:bg-white/[0.04] transition-all duration-500"
                >
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />

                  <div className="relative w-8 h-8 sm:w-14 sm:h-14 border border-[#D43F33]/20 flex items-center justify-center mx-auto mb-1 sm:mb-4 group-hover:border-[#D43F33]/50 transition-all duration-500">
                    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#D43F33]/40" />
                    <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#D43F33]/40" />
                    <item.icon
                      className="text-[#D43F33] transition-transform duration-500 group-hover:scale-110"
                      size={18}
                    />
                  </div>

                  <Annotation
                    className="!text-[#F5F0E8] !font-bold responsive-stat-label"
                  >
                    {item.title}
                  </Annotation>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

