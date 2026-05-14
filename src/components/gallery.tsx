"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Bed, Bath, Maximize2, MapPin, ArrowUpRight, Clock } from "lucide-react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { FigMarker } from "./ui/fig-marker";
import { SectionLabel } from "./ui/section-label";
import { ButtonPrimary } from "./ui/button-primary";

// ─── Community data ────────────────────────────────────────────────────────────

type CommunityStatus = "Ongoing" | "Completed" | "Coming Soon";

interface CommunityData {
  slug: string;
  name: string;
  type: string;
  location: string;
  status: CommunityStatus;
  startingPrice: string;
  availability: string;
  concept: string;
  specs: {
    beds: number;
    baths: number;
    area: string;
  };
  image: string;
  index: string;
}

const communities: CommunityData[] = [
  {
    slug: "sydney-oaks",
    name: "Sydney Oaks",
    type: "Estate Collection",
    location: "Gwinnett County, GA",
    status: "Ongoing",
    startingPrice: "From low $400s",
    availability: "Available",
    concept: "A thoughtfully planned neighborhood with spacious lots and modern farmhouse architecture blending into the natural landscape.",
    specs: { beds: 4, baths: 3, area: "4,200 SQ. FT." },
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
    index: "01",
  },
  {
    slug: "elysian-gates",
    name: "Elysian Gates",
    type: "Gated Enclave",
    location: "Forsyth County, GA",
    status: "Ongoing",
    startingPrice: "From mid $500s",
    availability: "Available",
    concept: "Exclusive gated living featuring high-performance homes and private wooded backyards for ultimate seclusion.",
    specs: { beds: 5, baths: 4, area: "5,800 SQ. FT." },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82",
    index: "02",
  },
  {
    slug: "#",
    name: "Future Projects",
    type: "Upcoming Communities",
    location: "Metro Atlanta",
    status: "Coming Soon",
    startingPrice: "Register Interest",
    availability: "Coming Soon",
    concept: "New signatures in residential comfort are being drafted. Register for early access to our upcoming developments.",
    specs: { beds: 0, baths: 0, area: "" },
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef21?auto=format&fit=crop&w=1800&q=82",
    index: "03",
  },
];

// ─── Status badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: CommunityStatus }) {
  const isActive = status === "Ongoing";
  const isSoon = status === "Coming Soon";

  return (
    <div
      className={[
        "inline-flex items-center gap-4 px-5 py-2 rounded-full border text-[0.6rem] font-bold tracking-[0.25em] uppercase backdrop-blur-xl transition-all duration-300",
        isActive
          ? "border-white/10 bg-[#2D2D24]/90 text-white shadow-xl"
          : isSoon
          ? "border-white/5 bg-black/40 text-white/40"
          : "border-emerald-400/20 bg-black/40 text-emerald-400",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-rust animate-pulse" />
        )}
        <span>{status}</span>
      </div>
      
      {isActive && (
        <div className="w-8 h-px bg-white/30" />
      )}
    </div>
  );
}

// ─── Spec line ──────────────────────────────────────────────────────────────────

function SpecLine({
  specs,
  light,
}: {
  specs: CommunityData["specs"];
  light?: boolean;
}) {
  if (!specs.beds) return null;
  const cls = light ? "!text-[#F5F0E8]/50" : "!text-dark/50";
  return (
    <div
      className={`inline-flex items-center gap-3 text-[0.6rem] font-bold tracking-[0.18em] uppercase ${cls}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Bed className="w-3 h-3" />
        {specs.beds} Bed
      </span>
      <span className="w-1 h-1 rounded-full bg-current opacity-40" />
      <span className="inline-flex items-center gap-1.5">
        <Bath className="w-3 h-3" />
        {specs.baths} Bath
      </span>
      <span className="w-1 h-1 rounded-full bg-current opacity-40" />
      <span className="inline-flex items-center gap-1.5">
        <Maximize2 className="w-3 h-3" />
        {specs.area}
      </span>
    </div>
  );
}

// ─── Large card (col-span-8) ────────────────────────────────────────────────────

function CommunityCardLarge({ c }: { c: CommunityData }) {
  return (
    <article className="group relative overflow-hidden h-full min-h-[560px] flex flex-col">
      {/* Hero Image */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={c.image}
          alt={c.name}
          fill
          className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
        />
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-6 left-7 right-7 flex items-start justify-between z-20 pointer-events-none">
          <div className="flex flex-col gap-2">
            <SectionLabel className="!text-[#F5F0E8]/70 !border-white/20">
              {c.type}
            </SectionLabel>
            <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-bold tracking-[0.18em] uppercase text-[#F5F0E8]/60">
              <MapPin className="w-2.5 h-2.5" />
              {c.location}
            </span>
          </div>
          <StatusBadge status={c.status} />
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
          <Annotation light className="!text-rust mb-3">
            FIG. {c.index} / SIGNATURE COMMUNITY
          </Annotation>
          <SectionHeadline
            size="lg"
            light
            className="!text-[#F5F0E8] !text-[clamp(2.4rem,3.5vw,3.8rem)] leading-[1.02] mb-4"
          >
            {c.name}
          </SectionHeadline>
          <BodyText size="sm" light className="!text-[#F5F0E8]/65 mb-5 max-w-[480px] line-clamp-2">
            {c.concept}
          </BodyText>

          <div className="flex flex-wrap items-center gap-5 mb-7">
            <SpecLine specs={c.specs} light />
            <span className="h-3 w-px bg-white/20" />
            <Annotation light className="!text-[#F5F0E8]/70">
              {c.startingPrice}
            </Annotation>
            <span className="h-3 w-px bg-white/20" />
            <Annotation light className="!text-[#F5F0E8]/50">
              {c.availability}
            </Annotation>
          </div>

          <div className="pointer-events-auto">
            <ButtonPrimary href={`/projects/${c.slug}`}>
              Explore Community
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Small card (col-span-4) ────────────────────────────────────────────────────

function CommunityCardSmall({ c, dark }: { c: CommunityData; dark?: boolean }) {
  const isSoon = c.status === "Coming Soon";

  if (dark || isSoon) {
    return (
      <article className="group relative overflow-hidden bg-dark h-full min-h-[480px] flex flex-col p-8 justify-between border-r border-white/5 last:border-r-0">
        {/* subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/noise.png')] bg-repeat pointer-events-none z-0" />

        {/* Top */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <SectionLabel className="!text-[#F5F0E8]/40 !border-white/10">
              {c.type}
            </SectionLabel>
            <StatusBadge status={c.status} />
          </div>

          <Annotation light className="!text-rust mb-4">
            FIG. {c.index} / COMING SOON
          </Annotation>

          <SectionHeadline
            size="md"
            light
            className="!text-[#F5F0E8] !text-[2rem] leading-[1.1] mb-5"
          >
            {c.name}
          </SectionHeadline>

          <BodyText size="sm" light className="!text-[#F5F0E8]/50 mb-6 line-clamp-3">
            {c.concept}
          </BodyText>

          <div className="flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#F5F0E8]/40">
            <MapPin className="w-3 h-3" />
            {c.location}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          {/* decorative pulsing dot grid */}
          <div className="w-full h-px bg-white/10 mb-8" />

          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-4 h-4 text-rust/60" />
            <Annotation light className="!text-[#F5F0E8]/50">
              {c.startingPrice}
            </Annotation>
          </div>

          <ButtonPrimary href={c.slug === "#" ? "/contact" : `/projects/${c.slug}`}>
            Register Interest
          </ButtonPrimary>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden h-full min-h-[480px] flex flex-col border-r border-dark/5 last:border-r-0">
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={c.image}
          alt={c.name}
          fill
          className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
        />
        {/* Stronger Bottom Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80" />

        {/* Hover overlay link */}
        <Link 
          href={`/projects/${c.slug}`}
          className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-30 cursor-pointer"
        >
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
            <ArrowUpRight className="w-6 h-6 text-dark" />
          </div>
        </Link>

        {/* Top badges */}
        <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.16em] uppercase text-white/80 drop-shadow-md">
            <MapPin className="w-2.5 h-2.5" />
            {c.location}
          </div>
          <StatusBadge status={c.status} />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
          <Annotation light className="!text-rust mb-3 font-bold drop-shadow-md">
            FIG. {c.index}
          </Annotation>
          <SectionHeadline
            size="md"
            light
            className="!text-white !text-[2rem] leading-[1.1] mb-4 drop-shadow-lg"
          >
            {c.name}
          </SectionHeadline>
          <BodyText size="sm" light className="!text-white/80 mb-6 line-clamp-3 max-w-[320px]">
            {c.concept}
          </BodyText>

          <SpecLine specs={c.specs} light />

          <div className="mt-6 flex items-center gap-4">
            <Annotation light className="!text-white/90">
              {c.startingPrice}
            </Annotation>
            <span className="h-3 w-px bg-white/30" />
            <Annotation light className="!text-white/60">
              {c.availability}
            </Annotation>
          </div>

        </div>
      </div>
    </article>
  );
}

// ─── Gallery Section Board (Featured) ──────────────────────────────────────────

function GallerySectionBoard() {
  return (
    <div className="relative h-full min-h-[420px] flex flex-col group overflow-hidden bg-[#1A1C20]">
      <Image
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=82"
        alt="The Signature Gallery"
        fill
        className="object-cover opacity-70 transition-transform duration-[10000ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Atmospheric Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(212,63,51,0.08),transparent_50%)] pointer-events-none" />

      {/* Decorative Frame */}
      <div className="absolute inset-8 border border-white/10 pointer-events-none" />
      
      <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-16 z-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-px bg-rust" />
          <Annotation light className="!text-rust tracking-[0.4em] uppercase">Signature Portfolio</Annotation>
        </div>

        <SectionHeadline
          size="lg"
          light
          className="!text-[clamp(2.5rem,6vw,4.8rem)] leading-[0.95] mb-6 font-serif italic max-w-[600px] drop-shadow-2xl"
        >
          The Gallery
          <span className="text-rust">..</span>
        </SectionHeadline>
        
        <BodyText size="md" light className="!text-cream/80 max-w-[500px] leading-relaxed mb-10 drop-shadow-md">
          A visual record of architectural distinction and residential comfort. Explore our collection of ongoing and upcoming developments meticulously crafted for the modern era.
        </BodyText>

        <div className="flex flex-wrap gap-8 items-center">
          <Link
            href="/gallery"
            className="group/link inline-flex items-center gap-4 text-[0.7rem] font-bold tracking-[0.25em] !text-[#F5F0E8] uppercase"
          >
            Explore All Projects
            <div className="w-8 h-px bg-rust transition-all duration-300 group-hover/link:w-16" />
          </Link>
          <Link
            href="/contact"
            className="group/link inline-flex items-center gap-4 text-[0.7rem] font-bold tracking-[0.25em] !text-[#F5F0E8]/50 uppercase hover:!text-rust transition-colors"
          >
            Inquire Now
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-12 right-12 flex items-center gap-4 opacity-30 group-hover:opacity-60 transition-opacity">
        <span className="text-[0.55rem] font-bold tracking-[0.2em] text-white uppercase">Curated 2026 Collection</span>
      </div>
    </div>
  );
}

// ─── Contact Card (Small) ──────────────────────────────────────────────────────

function ContactCard() {
  return (
    <article className="group relative overflow-hidden h-full min-h-[480px] flex flex-col bg-[#1C1208]">
      <div className="relative flex-1 flex flex-col p-8 justify-end">
        {/* subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] bg-repeat pointer-events-none z-0" />
        
        {/* Hover overlay link */}
        <Link 
          href="/contact"
          className="absolute inset-0 bg-rust/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-30 cursor-pointer"
        >
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
            <ArrowUpRight className="w-6 h-6 text-dark" />
          </div>
        </Link>

        {/* Top label */}
        <div className="absolute top-8 left-8 z-20 pointer-events-none">
          <SectionLabel className="!text-[#F5F0E8]/40 !border-white/10">
            PRIVATE CONSULTATION
          </SectionLabel>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 pointer-events-none pb-4">
          <Annotation light className="!text-rust mb-3 font-bold uppercase tracking-widest">
            READY TO BEGIN?
          </Annotation>
          
          <SectionHeadline
            size="md"
            light
            className="!text-[#F5F0E8] !text-[2rem] leading-[1.1] mb-5"
          >
            Your next chapter
            <br />
            starts here
            <span className="text-rust">.</span>
          </SectionHeadline>
          
          <BodyText size="sm" light className="!text-[#F5F0E8]/40 mb-4 max-w-[320px] line-clamp-3">
            Schedule a private consultation to discuss our current availability and upcoming opportunities meticulously crafted for you.
          </BodyText>
        </div>
      </div>
    </article>
  );
}

// ─── Gallery section ────────────────────────────────────────────────────────────

export function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from("[data-gallery-reveal] > *", {
          autoAlpha: 0,
          y: 32,
          duration: 1,
          stagger: 0.14,
        });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const [elysian, sydney, future] = communities;

  return (
    <SectionWrapper
      id="gallery"
      ref={sectionRef}
      dark={false}
      className="!py-16 md:!py-20"
    >
      {/* Section header */}
      <div
        data-gallery-reveal
        className="grid grid-cols-12 gap-6 items-end mb-10 md:mb-12"
      >
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel counter="02 / 08">Signature Communities</SectionLabel>
          <SectionHeadline
            size="xl"
            className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98]"
          >
            Communities planned
            <br />
            for lasting comfort
          </SectionHeadline>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <BodyText size="md">
            Thoughtful planning, verified approvals, and disciplined
            construction come together to create addresses that remain
            dependable long after possession day.
          </BodyText>
        </div>
      </div>

      {/* ── Mosaic Grid (Pattern C) ─────────────────────────────────────── */}
      <div
        data-gallery-reveal
        className="grid grid-cols-12 gap-px bg-dark/10 border-y border-dark/10"
      >
        {/* ── TOP ROW ── */}

        {/* Gallery Section Board (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 bg-dark">
          <GallerySectionBoard />
        </div>

        {/* Dark editorial panel (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 bg-dark p-10 lg:p-12 flex flex-col justify-end min-h-[350px]">
          <Annotation light className="mb-6 !text-rust">FIG. 08 / FEATURED ADDRESS</Annotation>
          <SectionHeadline size="md" light className="mb-6 !text-[#F5F0E8] !text-[2.2rem] leading-[1.1]">
            Built with
            <br />
            measured intent
          </SectionHeadline>
          <BodyText size="sm" light className="mb-10 !text-[#F5F0E8]/60">
            Every project reflects a practical understanding of family life,
            spatial comfort, and long-term structural trust.
          </BodyText>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-4 text-[0.65rem] font-bold tracking-[0.25em] !text-[#F5F0E8] uppercase"
          >
            View Portfolio
            <div className="w-8 h-px bg-rust transition-all duration-300 group-hover:w-12" />
          </Link>
        </div>

        {/* ── BOTTOM ROW — 3 equal cards ── */}

        <div className="col-span-12 lg:col-span-4 bg-dark">
          <CommunityCardSmall c={elysian} />
        </div>

        <div className="col-span-12 lg:col-span-4 bg-dark">
          <CommunityCardSmall c={sydney} />
        </div>

        <div className="col-span-12 lg:col-span-4 bg-dark">
          <ContactCard />
        </div>
      </div>

      <FigMarker fig="fig. 02" label="Signature Communities" className="mt-20" />
    </SectionWrapper>
  );
}