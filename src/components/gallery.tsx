"use client";
import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { SectionLabel } from "./ui/section-label";
import { ButtonGhost } from "./ui/button-ghost";
import { BodyText } from "./ui/body-text";
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
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
    index: "01",
    concept: "A thoughtfully planned neighborhood with spacious lots and modern farmhouse architecture blending into the natural landscape.",
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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82",
    index: "02",
    concept: "Exclusive gated living featuring high-performance homes and private wooded backyards for ultimate seclusion.",
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
    index: "03",
    concept: "New signatures in residential comfort are being drafted. Register for early access to our upcoming developments.",
    specs: { beds: 0, baths: 0, area: "" },
    availability: "Coming Soon",
  },
];

function CommunityCard({ c }: { c: Community }) {
  const isSoon = c.status === "Coming Soon";
  const href = isSoon ? "/contact" : `/InteractiveSiteMap?project=${c.slug}`;
  const displayIndex = parseInt(c.index, 10);

  return (
    <Link href={href} className="group relative flex flex-col gap-5 md:gap-6 w-full cursor-pointer no-underline">
      
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-[#E8E3DB]">
        <Image
          src={c.image}
          alt={c.name}
          fill
          className={[
            "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105",
            isSoon ? "opacity-60 grayscale" : "opacity-100",
          ].join(" ")}
        />

        {/* Top Badges (Inside Image) */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          <div className="bg-white/90 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
            <Annotation className="!text-[#1C1208] !text-[0.5rem] font-bold">
              {c.type}
            </Annotation>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
            <span className={["w-1.5 h-1.5 rounded-full flex-shrink-0", isSoon ? "bg-[#1C1208]/40" : "bg-emerald-500 animate-pulse"].join(" ")} />
            <Annotation className="!text-[#1C1208] !text-[0.5rem] font-bold">
              {c.status}
            </Annotation>
          </div>
        </div>

        {/* Persistent Pill CTA */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-fit">
          <div className="bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 shadow-lg group-hover:shadow-[0_10px_40px_rgba(212,63,51,0.2)] transition-all duration-300 gap-3 border border-white/50 group-hover:-translate-y-1 group-hover:bg-white">
            <span className="text-[#1C1208] group-hover:text-[#D43F33] text-[0.55rem] sm:text-[0.6rem] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300">
              {isSoon ? "Register Interest" : "Interactive Map"}
            </span>
            <div className="w-5 h-5 rounded-full bg-[#1C1208]/5 group-hover:bg-[#D43F33]/10 flex items-center justify-center transition-colors duration-300">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1C1208] group-hover:text-[#D43F33] transform transition-all duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Details Container (Below Image) */}
      <div className="flex items-start gap-4 px-2">
        {/* Index */}
        <div 
          className="text-[#1C1208]/60 font-medium shrink-0 pt-1" 
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.05em" }}
        >
          0/{displayIndex}
        </div>
        
        <div className="flex flex-col gap-2.5">
          {/* Title */}
          <h3 
            className="text-[#1C1208] uppercase font-bold m-0 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", letterSpacing: "0.02em" }}
          >
            {c.name}
          </h3>
          
          {/* Concept */}
          <p 
            className="text-[#1C1208]/70 leading-relaxed m-0 pr-4"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem" }}
          >
            {c.concept}
          </p>

          {/* Specs / Price */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <Annotation className="!text-[#1C1208] !text-[0.55rem] font-bold">
              {c.specs.beds > 0 ? `${c.specs.beds} Bed | ${c.specs.baths} Bath` : c.price}
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
    <SectionWrapper id="gallery" dark={false} className="!py-16 md:!py-24">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 md:mb-12">
        <div className="flex flex-col gap-3">
          <SectionLabel>Featured Communities</SectionLabel>
          <SectionHeadline size="xl" className="">
            Communities built<br />to last
          </SectionHeadline>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 mt-12 md:mt-16">
        {communities.map((c) => (
          <CommunityCard key={c.slug} c={c} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 md:mt-8 pt-5 border-t border-dark/10">
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(28,18,8,0.28)" }}>
          3 Communities · 2026
        </span>
        <ButtonGhost href="/projects" className="text-[8px] tracking-[0.2em]">
          View All Projects
        </ButtonGhost>
      </div>

    </SectionWrapper>
  );
}