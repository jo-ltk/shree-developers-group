"use client";

import { useState } from "react";
import Image from "next/image";
import { FOUNDERS } from "@/data/founders";
import { SectionHeadline } from "@/components/ui/section-headline";
import { Annotation } from "@/components/ui/annotation";
import { cn } from "@/lib/utils";

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
          <span id="story-founders-heading">Meet Our Founders</span>
        </SectionHeadline>
        <p
          className="mt-2 max-w-[42ch] font-light leading-relaxed text-[#1C1208]/55 lg:mt-3"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
          }}
        >
          Five partners who built Shree Developers Group on craft, integrity, and
          a long-term vision for Georgia communities.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-5 lg:grid-cols-5 lg:gap-5 xl:gap-6">
        {FOUNDERS.map((founder) => (
          <FounderCard key={founder.id} founder={founder} />
        ))}
        <CompanyGridTile className="lg:hidden" />
      </div>
    </section>
  );
}

type Founder = (typeof FOUNDERS)[number];

function FounderCard({ founder }: { founder: Founder }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#1C1208]/[0.04] sm:aspect-[4/5]">
        <Image
          src={founder.image}
          alt={founder.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#1C1208]/10 transition-colors duration-500 group-hover:ring-[#B45309]/30" />
      </div>

      <div className="mt-2 space-y-1 sm:mt-3 sm:space-y-1.5 lg:mt-4 lg:space-y-2">
        <div className="space-y-0.5 sm:space-y-1 lg:space-y-1.5">
          <h3
            className="text-[0.72rem] font-semibold leading-tight text-[#1C1208] sm:text-[0.82rem] lg:text-[0.88rem]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {founder.name}
          </h3>
          <Annotation className="!text-[#1C1208]/45 !tracking-[0.14em] sm:!tracking-[0.18em]">
            {founder.role}
          </Annotation>
        </div>
        <p
          className={cn(
            "mt-2 max-w-[42ch] font-light leading-relaxed text-[#1C1208]/55 lg:mt-3",
            !expanded && "line-clamp-3 sm:line-clamp-none",
          )}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
          }}
        >
          {founder.description}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="mt-1.5 text-left text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[#B45309] transition-colors hover:text-[#1C1208] sm:hidden"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    </article>
  );
}

/** Fills the odd grid slot — circular logo mark, centered in the cell. */
function CompanyGridTile({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Shree Developers Group"
      className={cn(
        "flex h-full min-h-0 flex-col items-center justify-center pt-6 text-center sm:pt-8",
        className,
      )}
    >
      <div className="relative mx-auto aspect-square w-[68%] max-w-[5.25rem] sm:max-w-[5.75rem]">
        <div className="absolute inset-0 rounded-full border border-[#B45309]/20 bg-[#1C1208]/[0.03]" />
        <div className="absolute inset-[3px] rounded-full border border-[#1C1208]/8" />
        <div className="absolute inset-0 flex items-center justify-center p-[22%]">
          <Image
            src="/images/logo-black.png"
            alt="Shree Developers Group"
            width={96}
            height={48}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="mt-3 space-y-1 sm:mt-4">
        <p
          className="text-[0.78rem] italic leading-tight text-[#1C1208]/75 sm:text-[0.85rem]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Shree Developers
        </p>
        <Annotation className="!text-[#B45309]/70 !tracking-[0.18em]">
          Est. 2009 · GA
        </Annotation>
        <p
          className="mx-auto max-w-[11rem] font-light leading-snug text-[#1C1208]/45 text-[0.6rem] sm:text-[0.65rem]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Five partners, one vision.
        </p>
      </div>
    </aside>
  );
}
