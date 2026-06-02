"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FOUNDERS,
  getFounderBioPreview,
  PROFESSIONAL_PARTNERS,
  PROFESSIONAL_PARTNERS_CLOSING,
  PROFESSIONAL_PARTNERS_INTRO,
} from "@/data/founders";
import { SectionHeadline } from "@/components/ui/section-headline";
import { Annotation } from "@/components/ui/annotation";
import { cn } from "@/lib/utils";

const bodyStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
} as const;

export function StoryFoundersStrip({ className }: { className?: string }) {
  return (
    <section
      data-story-reveal
      aria-labelledby="story-founders-heading"
      className={cn(
        "mt-10 border-t border-[#1C1208]/10 pt-10 lg:mt-14 lg:pt-12",
        className,
      )}
    >
      <div className="mb-6 lg:mb-10">
        <SectionHeadline size="md" className="m-0 text-left">
          <span id="story-founders-heading">Meet Our Leadership</span>
        </SectionHeadline>
        <p
          className="mt-2 max-w-[42ch] font-light leading-relaxed text-[#1C1208]/55 lg:mt-3"
          style={bodyStyle}
        >
          The founders behind Shree Developers Group — building distinctive
          communities across Georgia with craft, integrity, and vision.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start sm:gap-x-6 sm:gap-y-8">
        {FOUNDERS.map((founder) => (
          <FounderCard key={founder.id} founder={founder} />
        ))}
      </div>

      <ProfessionalPartnersSection />
    </section>
  );
}

type Founder = (typeof FOUNDERS)[number];

function FounderCard({ founder }: { founder: Founder }) {
  const [expanded, setExpanded] = useState(false);
  const { paragraphs: visibleParagraphs, hasMore } = getFounderBioPreview(
    founder.description,
    expanded,
  );

  return (
    <article className="group w-full after:table after:clear-both after:content-['']">
      <div className="relative float-left mr-3 mb-2 aspect-[3/4] w-[7.25rem] overflow-hidden bg-[#1C1208]/[0.04] sm:mr-4 sm:w-[8.5rem] lg:w-[9.5rem]">
        <Image
          src={founder.image}
          alt={founder.name}
          fill
          sizes="(min-width: 1024px) 152px, (min-width: 640px) 136px, 116px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#1C1208]/10 transition-colors duration-500 group-hover:ring-[#B45309]/30" />
      </div>

      <h3
        className="text-[0.88rem] font-semibold leading-tight text-[#1C1208] sm:text-[0.95rem]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {founder.name}
      </h3>
      <Annotation className="!text-[#1C1208]/45 !tracking-[0.14em] sm:!tracking-[0.16em]">
        {founder.role}
      </Annotation>

      <div className="mt-2 space-y-3 font-light leading-relaxed text-[#1C1208]/55" style={bodyStyle}>
        {visibleParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="clear-both mt-2 block text-left text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[#B45309] transition-colors hover:text-[#1C1208] sm:text-[0.65rem]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </article>
  );
}

function ProfessionalPartnersSection() {
  const [expanded, setExpanded] = useState(false);
  const visiblePartners = expanded
    ? PROFESSIONAL_PARTNERS
    : PROFESSIONAL_PARTNERS.slice(0, 2);

  return (
    <div className="mt-6 border-t border-[#1C1208]/10 pt-6 lg:mt-8 lg:pt-8">
      <h3
        className="m-0 text-left text-[clamp(1.2rem,2vw,1.9rem)] leading-[1.18] tracking-tight text-[#1C1208]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
      >
        Our Professional Partners
      </h3>

      <p className="mt-3 max-w-[52ch] font-light leading-relaxed text-[#1C1208]/55" style={bodyStyle}>
        {PROFESSIONAL_PARTNERS_INTRO}
      </p>

      <div className="mt-8 space-y-6">
        {visiblePartners.map((partner) => (
          <div key={partner.id} className="border-l-2 border-[#B45309]/35 pl-4 sm:pl-5">
            <h4
              className="text-[0.82rem] font-semibold text-[#1C1208] sm:text-[0.88rem]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {partner.title}
            </h4>
            <p className="mt-1.5 font-light leading-relaxed text-[#1C1208]/55" style={bodyStyle}>
              {partner.description}
            </p>
          </div>
        ))}

        {expanded && (
          <p className="font-light leading-relaxed text-[#1C1208]/55" style={bodyStyle}>
            {PROFESSIONAL_PARTNERS_CLOSING}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="mt-4 text-left text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[#B45309] transition-colors hover:text-[#1C1208] sm:text-[0.65rem]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
