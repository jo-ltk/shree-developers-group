"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { SectionLabel } from "./ui/section-label";
import { Annotation } from "./ui/annotation";
import { BodyText } from "./ui/body-text";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { FeaturedCommunitiesCarousel } from "./ui/featured-communities-carousel";
import { isDedicatedProjectSlug } from "@/lib/projects-data";

type Status = "Ongoing" | "Completed" | "Coming Soon";

interface Community {
  slug: string;
  name: string;
  type: string;
  location: string;
  status: Status;
  price: string;
  image: string;
  index: string;
  concept: string;
  specs: {
    beds: number;
    baths: number;
    area: string;
  };
  availability: string;
}

const communities: Community[] = [
  {
    slug: "sydney-oaks",
    name: "Sydney Oaks",
    type: "89 Town Homes",
    location: "Gwinnett County",
    status: "Ongoing",
    price: "From low $400s",
    image: "/svg/sydney-oaks.svg",
    index: "01",
    concept:
      "A thoughtfully planned neighborhood with spacious lots and modern farmhouse architecture blending into the natural landscape.",
    specs: { beds: 4, baths: 3, area: "4,200 SQ. FT." },
    availability: "Available",
  },
  {
    slug: "elysian-gates",
    name: "Elysian Gates",
    type: "Gated Enclave",
    location: "Forsyth County",
    status: "Ongoing",
    price: "From mid $500s",
    image: "/svg/elysian-gates.svg",
    index: "02",
    concept:
      "Exclusive gated living featuring high-performance homes and private wooded backyards for ultimate seclusion.",
    specs: { beds: 5, baths: 4, area: "5,800 SQ. FT." },
    availability: "Available",
  },
  {
    slug: "hanover-park-at-stockbridge",
    name: "Hanover Park at Stockbridge",
    type: "Townhomes & Single-Family",
    location: "Stockbridge, GA",
    status: "Ongoing",
    price: "Register for Updates",
    image: "/images/hanover-park/gallery-03.jpg",
    index: "03",
    concept:
      "A resort-inspired neighborhood with pool, putting green, pickleball courts, and walkable community living.",
    specs: { beds: 3, baths: 2, area: "FROM 1,850 SQ FT" },
    availability: "Available",
  },
  {
    slug: "the-pointe",
    name: "The Pointe",
    type: "Retail & Single-Family",
    location: "Market Place Blvd · Exit 14",
    status: "Coming Soon",
    price: "Register Interest",
    image: "/images/the-pointe/hero.jpg",
    index: "04",
    concept:
      "A mixed-use destination with 40,000 sq. ft. of retail and 89 single-family homes just off Exit 14 on Market Place Blvd.",
    specs: { beds: 0, baths: 0, area: "89 SINGLE-FAMILY HOMES" },
    availability: "Coming Soon",
  },
];

function CommunityCard({
  c,
  isActive,
  featuredMobile = false,
  slidePosition,
  slideTotal,
}: {
  c: Community;
  isActive?: boolean;
  featuredMobile?: boolean;
  slidePosition?: number;
  slideTotal?: number;
}) {
  const hasProjectPage = isDedicatedProjectSlug(c.slug);
  const isSoon = c.status === "Coming Soon" && !hasProjectPage;
  const href = isSoon
    ? "/#request-info"
    : hasProjectPage
      ? `/projects/${c.slug}`
      : `/InteractiveSiteMap?project=${c.slug}`;

  return (
    <Link
      href={href}
      className={`group relative flex w-full cursor-pointer flex-col no-underline transition-all duration-500 ${
        featuredMobile ? "gap-6" : "gap-4 md:gap-5"
      } ${isActive === false && !featuredMobile ? "opacity-40 blur-[1px]" : "opacity-100"}`}
    >
      <div
        className={[
          "relative w-full overflow-hidden bg-[#E8E3DB]",
          featuredMobile
            ? "aspect-[4/5] min-h-[22rem]"
            : "aspect-[4/3] sm:aspect-[4/4.5] md:aspect-[4/5]",
        ].join(" ")}
      >
        <Image
          key={`${c.slug}-${c.image}`}
          src={c.image}
          alt={c.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          unoptimized={c.slug === "the-pointe"}
          className={[
            "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105",
            isSoon && c.slug !== "the-pointe"
              ? "opacity-60 grayscale"
              : "opacity-100",
          ].join(" ")}
        />

        <div
          className={`absolute left-3 right-3 z-10 flex items-start gap-2 ${
            featuredMobile ? "top-4" : "top-3"
          }`}
        >
          <div
            className={`min-w-0 flex-1 overflow-hidden rounded-full border border-white/20 bg-white/90 backdrop-blur-md ${
              featuredMobile ? "px-3.5 py-1.5" : "px-2.5 py-1"
            }`}
          >
            <Annotation
              className={`block !font-bold truncate !text-[#1C1208] ${
                featuredMobile ? "!text-[0.65rem] !tracking-[0.18em]" : "responsive-stat-label"
              }`}
            >
              {c.type}
            </Annotation>
          </div>

          <div
            className={`flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/90 backdrop-blur-md ${
              featuredMobile ? "px-3.5 py-1.5" : "px-2.5 py-1"
            }`}
          >
            <span
              className={[
                "w-1.5 h-1.5 rounded-full flex-shrink-0",
                isSoon ? "bg-[#1C1208]/40" : "bg-emerald-500 animate-pulse",
              ].join(" ")}
            />
            <Annotation
              className={`!font-bold whitespace-nowrap !text-[#1C1208] ${
                featuredMobile ? "!text-[0.65rem] !tracking-[0.18em]" : "responsive-stat-label"
              }`}
            >
              {c.status}
            </Annotation>
          </div>
        </div>

        <div
          className={`absolute left-1/2 z-20 flex w-full -translate-x-1/2 justify-center px-3 ${
            featuredMobile ? "bottom-5" : "bottom-4"
          }`}
        >
          <div
            className={`flex max-w-full items-center justify-center rounded-full border border-white/50 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white ${
              featuredMobile
                ? "gap-2.5 px-6 py-3 shadow-[0_8px_32px_rgba(28,18,8,0.12)]"
                : "gap-2 px-4 py-2 sm:px-5 sm:py-2.5"
            }`}
          >
            <span
              className={`font-bold uppercase whitespace-nowrap text-[#1C1208] transition-colors duration-300 group-hover:text-[#D43F33] ${
                featuredMobile
                  ? "text-[0.7rem] tracking-[0.2em]"
                  : "responsive-btn-text"
              }`}
            >
              {isSoon
                ? "Register Interest"
                : hasProjectPage
                  ? "View Project"
                  : "Interactive Map"}
            </span>

            <div className="w-5 h-5 rounded-full bg-[#1C1208]/5 group-hover:bg-[#D43F33]/10 flex items-center justify-center transition-colors duration-300">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1C1208] group-hover:text-[#D43F33] transform transition-all duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:text-left ${
          featuredMobile ? "gap-5 px-6" : "px-1 sm:px-2"
        }`}
      >
        {slidePosition != null && slideTotal != null ? (
          <Annotation
            className={`shrink-0 !font-medium !text-[#1C1208]/55 pt-0.5 ${
              featuredMobile ? "!text-[0.7rem] !tracking-[0.22em]" : "responsive-stat-label"
            }`}
            aria-hidden={featuredMobile ? "true" : undefined}
          >
            {slidePosition}/{slideTotal}
          </Annotation>
        ) : null}

        <div
          className={`flex min-w-0 flex-1 flex-col items-center gap-2 md:items-start ${
            featuredMobile ? "gap-3.5" : ""
          }`}
        >
          <h3
            className="m-0 font-bold uppercase leading-tight text-[#1C1208]"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: featuredMobile
                ? "clamp(1.35rem, 5.5vw, 1.75rem)"
                : "clamp(1rem, 3vw, 1.25rem)",
              letterSpacing: "0.02em",
            }}
          >
            {c.name}
          </h3>
          <BodyText
            className={`m-0 leading-relaxed !text-[#1C1208]/70 ${
              featuredMobile
                ? "!text-[0.9375rem] !leading-[1.65] max-w-[22rem]"
                : "responsive-body-sm"
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {c.concept}
          </BodyText>
          <div
            className={`flex flex-wrap items-center justify-center gap-2.5 pt-1 md:justify-start ${
              featuredMobile ? "gap-3 pt-0.5" : ""
            }`}
          >
            <Annotation
              className={`!font-bold !text-[#1C1208] ${
                featuredMobile ? "!text-[0.7rem] !tracking-[0.2em]" : "responsive-stat-label"
              }`}
            >
              {c.specs.beds > 0 ? `${c.specs.beds} Bed | ${c.specs.baths} Bath` : c.price}
            </Annotation>
            {c.specs.beds > 0 && (
              <>
                <span className="w-px h-3 bg-[#1C1208]/15" />
                <Annotation
                  className={`!font-bold !text-[#1C1208]/70 ${
                    featuredMobile ? "!text-[0.7rem] !tracking-[0.2em]" : "responsive-stat-label"
                  }`}
                >
                  {c.price}
                </Annotation>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  return (
    <SectionWrapper id="gallery" dark={false} className="!pt-14 !pb-12 md:!pt-24 md:!pb-4 overflow-hidden">
      {/* Desktop Version */}
      <div className="hidden md:block">
        <div className="flex flex-col items-center md:items-start text-center md:text-left responsive-minimum-gap mb-8 md:mb-12">
          <SectionLabel className="!mb-0 justify-center md:justify-start">Featured Communities</SectionLabel>
          <SectionHeadline size="xl" className="responsive-headline-xl m-0">
            Communities built to last
          </SectionHeadline>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-8 md:mt-12">
          {communities.map((c, idx) => (
            <CommunityCard
              key={c.slug}
              c={c}
              slidePosition={idx + 1}
              slideTotal={communities.length}
            />
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden" ref={containerRef}>
        <div className="mb-10 flex flex-col gap-4">
          <SectionLabel className="!mb-0 !text-[0.7rem] !tracking-[0.28em]">
            Featured Living
          </SectionLabel>
          <SectionHeadline
            size="xl"
            className="!text-[clamp(2.75rem,10vw,3.5rem)] !leading-[1.05] tracking-tight m-0"
          >
            Communities built <br /> to last
          </SectionHeadline>
        </div>

        <div className="relative -mx-6 w-[calc(100%+3rem)] overflow-visible">
          <FeaturedCommunitiesCarousel isInView={isInView}>
            {communities.map((c, idx) => (
              <CommunityCard
                key={c.slug}
                c={c}
                featuredMobile
                slidePosition={idx + 1}
                slideTotal={communities.length}
              />
            ))}
          </FeaturedCommunitiesCarousel>
        </div>
      </div>
    </SectionWrapper>
  );
}
