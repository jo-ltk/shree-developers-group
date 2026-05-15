"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { SectionLabel } from "./ui/section-label";
import { ButtonGhost } from "./ui/button-ghost";
import { Annotation } from "./ui/annotation";

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
    type: "Estate Collection",
    location: "Gwinnett County",
    status: "Ongoing",
    price: "From low $400s",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
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
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82",
    index: "02",
    concept:
      "Exclusive gated living featuring high-performance homes and private wooded backyards for ultimate seclusion.",
    specs: { beds: 5, baths: 4, area: "5,800 SQ. FT." },
    availability: "Available",
  },
  {
    slug: "#",
    name: "Future Projects",
    type: "Upcoming Communities",
    location: "Metro Atlanta",
    status: "Coming Soon",
    price: "Register Interest",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
    index: "03",
    concept:
      "New signatures in residential comfort are being drafted. Register for early access to our upcoming developments.",
    specs: { beds: 0, baths: 0, area: "" },
    availability: "Coming Soon",
  },
];

function CommunityCard({ c }: { c: Community }) {
  const isSoon = c.status === "Coming Soon";
  const href = isSoon
    ? "/contact"
    : `/InteractiveSiteMap?project=${c.slug}`;

  const displayIndex = parseInt(c.index, 10);

  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 md:gap-5 w-full cursor-pointer no-underline"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-[#E8E3DB] aspect-[4/3] sm:aspect-[4/4.5] md:aspect-[4/5]">
        <Image
          src={c.image}
          alt={c.name}
          fill
          className={[
            "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105",
            isSoon ? "opacity-60 grayscale" : "opacity-100",
          ].join(" ")}
        />

        {/* Top Pills */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <div className="bg-white/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full max-w-[48%]">
            <Annotation className="!text-[#1C1208] !text-[0.5rem] sm:!text-[0.55rem] font-bold truncate">
              {c.type}
            </Annotation>
          </div>

          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full shrink-0">
            <span
              className={[
                "w-1.5 h-1.5 rounded-full flex-shrink-0",
                isSoon
                  ? "bg-[#1C1208]/40"
                  : "bg-emerald-500 animate-pulse",
              ].join(" ")}
            />

            <Annotation className="!text-[#1C1208] !text-[0.5rem] sm:!text-[0.55rem] font-bold whitespace-nowrap">
              {c.status}
            </Annotation>
          </div>
        </div>

        {/* CTA */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 w-full flex justify-center">
          <div className="bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg transition-all duration-300 gap-2 border border-white/50 group-hover:-translate-y-1 group-hover:bg-white max-w-full">
            <span className="text-[#1C1208] group-hover:text-[#D43F33] text-[0.52rem] sm:text-[0.58rem] font-bold tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-300">
              {isSoon ? "Register Interest" : "Interactive Map"}
            </span>

            <div className="w-5 h-5 rounded-full bg-[#1C1208]/5 group-hover:bg-[#D43F33]/10 flex items-center justify-center transition-colors duration-300">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#1C1208] group-hover:text-[#D43F33] transform transition-all duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-3 px-1 sm:px-2 text-center md:text-left">
        {/* Index */}
        <div
          className="text-[#1C1208]/55 font-medium shrink-0 pt-0.5"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          0/{displayIndex}
        </div>

        {/* Text */}
        <div className="flex flex-col items-center md:items-start gap-2 flex-1 min-w-0">
          <h3
            className="text-[#1C1208] uppercase font-bold leading-tight m-0"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              letterSpacing: "0.02em",
            }}
          >
            {c.name}
          </h3>

          <p
            className="text-[#1C1208]/70 leading-relaxed m-0"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.76rem",
            }}
          >
            {c.concept}
          </p>

          {/* Specs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
            <Annotation className="!text-[#1C1208] !text-[0.55rem] font-bold">
              {c.specs.beds > 0
                ? `${c.specs.beds} Bed | ${c.specs.baths} Bath`
                : c.price}
            </Annotation>

            {c.specs.beds > 0 && (
              <>
                <span className="w-px h-3 bg-[#1C1208]/15" />

                <Annotation className="!text-[#1C1208]/70 !text-[0.55rem] font-bold">
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
  return (
    <SectionWrapper
      id="gallery"
      dark={false}
      className="!pt-6 !pb-12 sm:!pt-7 sm:!pb-14 md:!pt-10 md:!pb-20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 mb-8 md:mb-12">
        <div className="flex flex-col items-center md:items-start gap-3 max-w-2xl">
          <SectionLabel className="justify-center md:justify-start">Featured Communities</SectionLabel>

          <SectionHeadline
            size="xl"
          >
            Communities built to last
          </SectionHeadline>
        </div>
      </div>

      {/* Grid */}
     <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10 mt-8 md:mt-12">
  {communities.map((c) => (
    <CommunityCard key={c.slug} c={c} />
  ))}
</div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10 pt-5 border-t border-dark/10">
        <span
          style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "0.45rem",
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(28,18,8,0.28)",
          }}
        >
          3 Communities · 2026
        </span>

        <ButtonGhost
          href="/projects"
          className="text-[0.55rem] tracking-[0.2em] w-fit"
        >
          View All Projects
        </ButtonGhost>
      </div>
    </SectionWrapper>
  );
}