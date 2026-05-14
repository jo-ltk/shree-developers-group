"use client";

import React, { useState, useEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeadline } from "@/components/ui/section-headline";
import { SectionLabel } from "@/components/ui/section-label";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { ButtonGhost } from "@/components/ui/button-ghost";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { FigMarker } from "@/components/ui/fig-marker";
import { ImagePanel } from "@/components/ui/image-panel";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Maximize2, 
  Download, 
  Droplets, 
  Wind, 
  ShieldCheck, 
  Trees, 
  Smartphone,
  School,
  Hospital,
  Plane,
  TrainFront,
  Instagram,
  MessageCircle,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ───────────────── TYPES ───────────────── */

interface Amenity {
  icon: React.ReactNode;
  label: string;
}

interface Landmark {
  label: string;
  distance: string;
  icon: React.ReactNode;
}

interface FloorPlan {
  type: string;
  dimensions: string;
  image: string;
}

/* ───────────────── DATA ───────────────── */

const projectData = {
  name: "Sydney Oaks",
  locationCity: "Suwanee, Georgia",
  specs: ["89+ RESIDENCES", "MIXED-USE", "GROWTH CORRIDOR"],
  heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  overview: {
    title: "A community designed for life.",
    description: "Sydney Oaks is a boutique residential enclave designed to deliver privacy, refined living, and a calm estate atmosphere through intentional low-density planning. U.S. buyers connect strongly with: top-tier schools, seamless commutes, neighborhood safety, and connected community living.",
    features: [
      "Neighborhood feel",
      "Connectivity",
      "Lifestyle",
      "Design quality",
      "Family-friendly environment"
    ]
  },
  gallery: [
    { src: "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=800", label: "EXTERIOR RENDERS" },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", label: "INTERIORS" },
    { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", label: "AMENITIES" },
    { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800", label: "STREETSCAPE" },
    { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800", label: "LIFESTYLE" },
  ],
  masterPlan: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=1600",
  floorPlans: [
    { type: "Luxury Villa Type A", dimensions: "4,200 SQ. FT.", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" },
    { type: "Luxury Villa Type B", dimensions: "3,800 SQ. FT.", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" },
    { type: "Executive Suite", dimensions: "2,400 SQ. FT.", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" },
  ] as FloorPlan[],
  amenities: [
    { icon: <Trees className="w-5 h-5" />, label: "Parks" },
    { icon: <Droplets className="w-5 h-5" />, label: "Pool" },
    { icon: <Smartphone className="w-5 h-5" />, label: "Gym" },
    { icon: <Wind className="w-5 h-5" />, label: "Landscaped garden" },
    { icon: <ShieldCheck className="w-5 h-5" />, label: "Security" },
    { icon: <Smartphone className="w-5 h-5" />, label: "Children’s play area" },
  ] as Amenity[],
  location: {
    mapImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200",
    landmarks: [
      { label: "Top-Rated Schools", distance: "5 mins", icon: <School className="w-4 h-4" /> },
      { label: "Northside Hospital", distance: "12 mins", icon: <Hospital className="w-4 h-4" /> },
      { label: "Atlanta Intl Airport", distance: "45 mins", icon: <Plane className="w-4 h-4" /> },
      { label: "MARTA Station", distance: "15 mins", icon: <TrainFront className="w-4 h-4" /> },
    ] as Landmark[]
  },
  whyChoose: [
    { title: "Premium location", description: "Heart of Suwanee's growth corridor." },
    { title: "Smart planning", description: "Architectural integrity and flow." },
    { title: "High appreciation potential", description: "Steady value growth in North Georgia." },
    { title: "Trusted developer", description: "Shree Developers Group quality guarantee." },
  ]
};

/* ───────────────── COMPONENTS ───────────────── */

export function CommunityDetails() {
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      // Reveal headline elements
      gsap.from("[data-detail-reveal]", {
        autoAlpha: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Parallax effect on hero image
      gsap.to("[data-hero-parallax]", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-parallax]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="community-details" ref={sectionRef} className="!pt-24 !pb-0" noPadding>
      {/* 01. SECTION HEADER */}
      <div className="px-8 md:px-12 lg:px-20 mb-20 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div data-detail-reveal>
              <SectionLabel counter="07 / 08">Community Details</SectionLabel>
            </div>
            <div data-detail-reveal>
              <SectionHeadline
                size="hero"
                className="!text-[clamp(3.5rem,8vw,9rem)] leading-[0.85] tracking-tight mt-4"
              >
                Each project gets a <br />
                <em className="italic text-rust font-normal">dedicated</em> description
              </SectionHeadline>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-6" data-detail-reveal>
            <BodyText size="lg" className="max-w-[420px] text-balance opacity-70">
              We approach every development as a singular architectural statement. 
              {projectData.name} represents our commitment to Suwanee&apos;s evolving urban fabric.
            </BodyText>
          </div>
        </div>
      </div>

      {/* Blueprint Grid Overlay for subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#D43F33 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* 02. CINEMATIC HERO BANNER */}
      <section className="relative w-full h-[90vh] min-h-[700px] overflow-hidden group mb-0">
        <div className="absolute inset-0 scale-110" data-hero-parallax>
          <img 
            src={projectData.heroImage} 
            alt={projectData.name}
            className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
          />
        </div>
        
        {/* Editorial Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
        
        {/* Grid lines overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="h-full w-px bg-white/20 absolute left-1/4" />
          <div className="h-full w-px bg-white/20 absolute left-1/2" />
          <div className="h-full w-px bg-white/20 absolute left-3/4" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32">
          <div className="max-w-[1450px] w-full px-8 md:px-12 lg:px-20 mx-auto">
            <div className="grid grid-cols-12 gap-8 items-end">
              <div className="col-span-12 lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-rust" />
                    <Annotation light className="!tracking-[0.4em]">RESIDENTIAL ENCLAVE</Annotation>
                  </div>
                  
                  <SectionHeadline size="hero" light className="mb-8 !text-[clamp(4rem,10vw,12rem)] leading-none -ml-1 md:-ml-2">
                    {projectData.name}
                  </SectionHeadline>
                  
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-12">
                    <div className="flex items-center gap-3 text-white/90">
                      <MapPin className="w-4 h-4 text-rust" />
                      <span className="uppercase tracking-[0.25em] text-[0.7rem] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {projectData.locationCity}
                      </span>
                    </div>
                    {projectData.specs.map(spec => (
                      <div key={spec} className="flex items-center gap-3 text-white/80">
                        <div className="w-1.5 h-1.5 bg-rust rotate-45" />
                        <span className="uppercase tracking-[0.2em] text-[0.65rem] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <ButtonPrimary href="#enquiry" className="!h-[60px] !px-12">Request Full Dossier</ButtonPrimary>
                    <ButtonGhost href="#enquiry" light className="!h-[60px] !px-10 border-white/20 hover:border-white">
                      Schedule Private Viewing
                    </ButtonGhost>
                  </div>
                </motion.div>
              </div>
              
              <div className="hidden lg:block lg:col-span-5">
                <div className="border-l border-white/20 pl-8 pb-4">
                  <Annotation light className="mb-4 block">INVESTMENT HIGHLIGHT</Annotation>
                  <p className="text-[#F5F0E8]/60 text-sm leading-relaxed max-w-[300px] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Positioned within Suwanee&apos;s most active growth corridor, 
                    Sydney Oaks offers a rare blend of architectural permanence 
                    and high appreciation potential.
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="text-white">
                      <span className="block text-2xl font-light mb-1">01<span className="text-rust">.</span></span>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">Architectural Integrity</span>
                    </div>
                    <div className="text-white">
                      <span className="block text-2xl font-light mb-1">02<span className="text-rust">.</span></span>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">Location Logic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <FigMarker fig="fig. 07" label="Sydney Oaks - Exterior Perspective" />
      </section>

      {/* 03. COMMUNITY OVERVIEW */}
      <section className="grid grid-cols-12 gap-px bg-[#1C1208]/10 border-b border-[#1C1208]/10">
        <div className="col-span-12 lg:col-span-7 bg-[#F5F0E8] p-8 md:p-20 lg:p-32" data-detail-reveal>
          <SectionLabel>Architecture of Life</SectionLabel>
          <SectionHeadline size="xl" className="!text-[clamp(3rem,5vw,6rem)] leading-[0.9] mb-12 max-w-[600px]">
            {projectData.overview.title}
          </SectionHeadline>
          <BodyText size="lg" className="mb-16 text-balance text-[#1C1208]/80 leading-relaxed italic">
            &ldquo;{projectData.overview.description}&rdquo;
          </BodyText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {projectData.overview.features.map((feature, i) => (
              <div key={feature} className="flex flex-col gap-4 group">
                <div className="flex items-center gap-4">
                  <span className="text-rust font-bold text-[0.6rem] tabular-nums">0{i + 1}</span>
                  <div className="h-px flex-1 bg-rust/20 group-hover:bg-rust/60 transition-colors" />
                </div>
                <span className="uppercase tracking-[0.2em] text-[0.7rem] font-bold text-[#1C1208]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 bg-[#EDE8DF] p-4 md:p-12 lg:p-20 flex flex-col justify-center">
          <div className="relative aspect-[3/4] overflow-hidden group shadow-2xl" data-detail-reveal>
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
              alt="Community Life"
              className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#1C1208]/30 group-hover:bg-[#1C1208]/10 transition-colors duration-700" />
            <CrosshairIcon className="absolute top-8 left-8" />
            <div className="absolute bottom-8 right-8 text-right">
              <Annotation light className="block mb-2">LIFESTYLE CURATION</Annotation>
              <div className="w-12 h-px bg-rust ml-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 04. CURATED GALLERY */}
      <section className="py-32 md:py-48 bg-[#F5F0E8] overflow-hidden">
        <div className="px-8 md:px-12 lg:px-20 mb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-6" data-detail-reveal>
              <SectionLabel>Visual Narrative</SectionLabel>
              <SectionHeadline size="xl" className="!text-[clamp(3.5rem,6vw,7rem)] leading-[0.85]">The <br />Gallery</SectionHeadline>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:pb-6" data-detail-reveal>
              <div className="flex items-start gap-8">
                <div className="w-px h-24 bg-rust/20 hidden md:block" />
                <BodyText className="max-w-[420px] opacity-60">
                  Explore the architectural restraint and material honesty that defines Sydney Oaks. 
                  Every angle has been considered to maximize light and frame the North Georgia landscape.
                </BodyText>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {projectData.gallery.map((img, i) => (
              <div 
                key={i} 
                data-detail-reveal
                className={cn(
                  "relative overflow-hidden group shadow-lg",
                  i === 0 ? "col-span-12 lg:col-span-8 aspect-[16/10]" : 
                  i === 1 ? "col-span-12 lg:col-span-4 aspect-[4/5] lg:-mt-20" :
                  i === 2 ? "col-span-12 lg:col-span-4 aspect-square" :
                  i === 3 ? "col-span-12 lg:col-span-4 aspect-square lg:translate-y-12" :
                  "col-span-12 lg:col-span-4 aspect-square"
                )}
              >
                <img 
                  src={img.src} 
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
                  <Annotation light className="mb-2 !tracking-[0.3em]">{img.label}</Annotation>
                  <div className="w-8 h-px bg-rust" />
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Maximize2 className="w-5 h-5 text-white/50 cursor-pointer hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. ARCHITECTURAL LOGIC (MASTER PLAN) */}
      <section className="bg-[#1C1208] text-[#F5F0E8] py-32 md:py-48 overflow-hidden relative">
        {/* Subtle background detail */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-rust/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="px-8 md:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="col-span-12 lg:col-span-5" data-detail-reveal>
              <SectionLabel light>Site Intelligence</SectionLabel>
              <SectionHeadline size="xl" light className="!text-[clamp(3rem,5vw,6rem)] leading-[0.9] mb-12">
                Master Plan <br />
                <em className="italic text-rust font-normal">& Layout Logic</em>
              </SectionHeadline>
              <BodyText light className="mb-16 opacity-60 leading-relaxed max-w-[480px]">
                Every plot, every road, and every green space is placed with intentionality. 
                The site plan maximizes natural light and ensures privacy for every residence through calculated setbacks.
              </BodyText>
              
              <div className="space-y-10">
                {[
                  { id: "01", title: "Plot Layout", desc: "Optimized for low-density luxury and site-specific orientation." },
                  { id: "02", title: "Amenities Zoning", desc: "Centralized access for all residents without compromising privacy." },
                  { id: "03", title: "Entry / Exit", desc: "Controlled access with 24/7 security and landscape screening." }
                ].map((item) => (
                  <div key={item.id} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-rust transition-colors">
                      <span className="text-rust font-bold text-[0.65rem] tabular-nums">{item.id}</span>
                    </div>
                    <div>
                      <h4 className="uppercase font-bold tracking-[0.25em] text-[0.7rem] mb-2 text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {item.title}
                      </h4>
                      <BodyText light size="sm" className="opacity-50 group-hover:opacity-80 transition-opacity">
                        {item.desc}
                      </BodyText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-7" data-detail-reveal>
              <div className="relative group">
                <div className="absolute -inset-8 border border-rust/20 translate-x-6 translate-y-6 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-1000" />
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-8">
                  <img 
                    src={projectData.masterPlan} 
                    alt="Master Plan"
                    className="w-full h-full object-contain grayscale invert brightness-[2] contrast-125 transition-all duration-[2000ms] group-hover:scale-105"
                  />
                  <CrosshairIcon light className="absolute -top-4 -left-4" />
                  <CrosshairIcon light className="absolute -bottom-4 -right-4" />
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <FigMarker fig="fig. 22" label="Site Plan Analysis" />
                  <div className="flex items-center gap-4 opacity-30">
                    <Annotation light>Suwanee, GA</Annotation>
                    <div className="w-8 h-px bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. FLOOR PLANS (DIMENSIONS OF LIVING) */}
      <section className="py-32 md:py-48 bg-[#F5F0E8] overflow-hidden">
        <div className="px-8 md:px-12 lg:px-20 mb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-6" data-detail-reveal>
              <SectionLabel>Structural Integrity</SectionLabel>
              <SectionHeadline size="xl" className="!text-[clamp(3.5rem,6vw,7rem)] leading-[0.85]">
                Floor <br />Plans
              </SectionHeadline>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:pb-6" data-detail-reveal>
              <BodyText className="max-w-[420px] opacity-60">
                Functional layouts meet architectural grandeur. Each plan is designed with 
                open-concept flow and dedicated zones for both social interaction and private retreat.
              </BodyText>
            </div>
          </div>
        </div>
        
        <div className="px-8 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* Nav */}
            <div className="lg:w-1/3 space-y-3" data-detail-reveal>
              {projectData.floorPlans.map((plan, i) => (
                <button
                  key={plan.type}
                  onClick={() => setActiveFloorPlan(i)}
                  className={cn(
                    "w-full p-8 text-left border transition-all duration-700 group relative overflow-hidden",
                    activeFloorPlan === i 
                      ? "bg-[#1C1208] border-[#1C1208] shadow-xl translate-x-2" 
                      : "bg-white/50 border-[#1C1208]/10 hover:border-[#1C1208]/30 hover:bg-white"
                  )}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h4 className={cn(
                        "uppercase font-bold tracking-[0.25em] text-[0.75rem] mb-2",
                        activeFloorPlan === i ? "text-white" : "text-[#1C1208]"
                      )} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {plan.type}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[0.6rem] tracking-[0.1em] font-medium",
                          activeFloorPlan === i ? "text-rust" : "text-[#1C1208]/40"
                        )} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {plan.dimensions}
                        </span>
                        <div className={cn(
                          "w-4 h-px",
                          activeFloorPlan === i ? "bg-rust/40" : "bg-[#1C1208]/10"
                        )} />
                        <span className={cn(
                          "text-[0.6rem] uppercase font-bold",
                          activeFloorPlan === i ? "text-white/40" : "text-[#1C1208]/20"
                        )} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Type {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rotate-45 transition-all duration-500",
                      activeFloorPlan === i ? "bg-rust scale-110" : "bg-[#1C1208]/10 scale-0"
                    )} />
                  </div>
                </button>
              ))}
              
              <div className="pt-10">
                <ButtonPrimary href="#" className="w-full !h-[60px] justify-between group">
                  Download Full Dossier
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </ButtonPrimary>
                <p className="mt-4 text-[0.55rem] uppercase tracking-[0.2em] text-[#1C1208]/30 text-center font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  PDF • 12.4 MB • Updated May 2026
                </p>
              </div>
            </div>
            
            {/* Display */}
            <div className="lg:w-2/3" data-detail-reveal>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFloorPlan}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white p-8 md:p-16 lg:p-24 border border-[#1C1208]/5 relative group shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#1C1208]/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-rust"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  
                  <img 
                    src={projectData.floorPlans[activeFloorPlan].image} 
                    alt={projectData.floorPlans[activeFloorPlan].type}
                    className="w-full h-auto mix-blend-multiply opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                  
                  <div className="absolute top-12 right-12 flex gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#1C1208]/10 flex items-center justify-center cursor-pointer hover:bg-[#1C1208] hover:text-white transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="mt-16 flex items-end justify-between border-t border-[#1C1208]/5 pt-8">
                    <div>
                      <Annotation className="!text-[#1C1208]/30 mb-1">UNIT IDENTIFIER</Annotation>
                      <span className="block font-bold text-xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        SYD-2026-{activeFloorPlan + 101}
                      </span>
                    </div>
                    <div className="text-right">
                      <Annotation className="!text-rust mb-1">TOTAL AREA</Annotation>
                      <span className="block font-bold text-xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {projectData.floorPlans[activeFloorPlan].dimensions}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* F. AMENITIES SECTION */}
      <section className="bg-[#EDE8DF] py-24 md:py-36">
        <div className="px-8 md:px-12 lg:px-20 mb-16">
          <SectionLabel>The Experience</SectionLabel>
          <SectionHeadline size="xl" className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98]">Curated Amenities</SectionHeadline>
        </div>
        
        <div className="px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#1C1208]/5">
            {projectData.amenities.map((amenity, i) => (
              <div key={amenity.label} className="bg-white/50 p-8 flex flex-col items-center text-center group hover:bg-[#1C1208] transition-colors duration-500">
                <div className="text-rust mb-4 group-hover:scale-110 transition-transform duration-500">
                  {amenity.icon}
                </div>
                <span className="uppercase tracking-[0.15em] text-[0.6rem] font-bold text-[#1C1208]/60 group-hover:text-white transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {amenity.label}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-16 relative aspect-[21/9] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1600" 
              alt="Pool side"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/60 to-transparent" />
            <Annotation light className="absolute bottom-6 left-6">PREMIUM RECREATION</Annotation>
          </div>
        </div>
      </section>

      {/* G. LOCATION ADVANTAGES */}
      <section className="py-24 md:py-36 bg-[#F5F0E8]">
        <div className="px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-12 gap-12 lg:gap-24">
            <div className="col-span-12 lg:col-span-8">
              <div className="relative aspect-video group overflow-hidden border border-[#1C1208]/10">
                <img 
                  src={projectData.location.mapImage} 
                  alt="Map Location"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-[#1C1208]/10" />
                
                {/* Map Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-rust/20 rounded-full animate-ping" />
                    <div className="w-4 h-4 bg-rust rotate-45 border-2 border-white shadow-xl relative z-10" />
                  </div>
                </div>
                
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-4 border border-[#1C1208]/10">
                  <SectionLabel className="mb-2">Interactive Map</SectionLabel>
                  <BodyText size="sm">Suwanee, Georgia</BodyText>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-center">
              <SectionLabel>Connectivity</SectionLabel>
              <SectionHeadline size="xl" className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] mb-8">Location Advantages</SectionHeadline>
              
              <div className="space-y-6">
                {projectData.location.landmarks.map((mark, i) => (
                  <div key={mark.label} className="flex items-center justify-between group border-b border-[#1C1208]/10 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-rust">{mark.icon}</div>
                      <span className="uppercase tracking-[0.1em] text-[0.7rem] font-bold text-[#1C1208]/80 group-hover:text-rust transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {mark.label}
                      </span>
                    </div>
                    <span className="text-[0.65rem] tabular-nums text-[#1C1208]/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {mark.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. WHY CHOOSE THIS PROJECT */}
      <section className="bg-[#1C1208] py-24 md:py-36 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rust/5 -skew-x-12 translate-x-1/2" />
        
        <div className="px-8 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-[800px]">
            <SectionLabel light>Investment Thesis</SectionLabel>
            <SectionHeadline size="xl" light className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] mb-16">Why choose <em className="italic">{projectData.name}</em></SectionHeadline>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {projectData.whyChoose.map((item, i) => (
                <div key={item.title}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-1.5 h-1.5 bg-rust rotate-45" />
                    <h4 className="uppercase font-bold tracking-[0.2em] text-[0.75rem] text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {item.title}
                    </h4>
                  </div>
                  <BodyText light size="sm">
                    {item.description}
                  </BodyText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* J. ENQUIRY SECTION */}
      <section id="enquiry" className="py-24 md:py-36 bg-[#F5F0E8]">
        <div className="px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-12 gap-12 lg:gap-24">
            <div className="col-span-12 lg:col-span-5">
              <SectionLabel>Contact Us</SectionLabel>
              <SectionHeadline size="xl" className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] mb-8">Start the conversation</SectionHeadline>
              <BodyText className="mb-12">
                Our advisors are available to provide detailed project briefings, pricing schedules, and site visit coordination.
              </BodyText>
              
              <div className="space-y-4">
                <a href="tel:#" className="flex items-center gap-4 p-5 bg-white border border-[#1C1208]/5 group hover:border-rust transition-all">
                  <div className="w-10 h-10 bg-[#1C1208]/5 flex items-center justify-center text-[#1C1208] group-hover:bg-rust group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <Annotation className="!text-[#1C1208]/30 mb-1">Call Now</Annotation>
                    <span className="font-bold tracking-widest text-[#1C1208]" style={{ fontFamily: "'Montserrat', sans-serif" }}>+1 (770) 555-0123</span>
                  </div>
                </a>
                
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center justify-center gap-3 p-5 bg-white border border-[#1C1208]/5 group hover:border-[#25D366] transition-all">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="uppercase font-bold tracking-[0.2em] text-[0.6rem]" style={{ fontFamily: "'Montserrat', sans-serif" }}>WhatsApp</span>
                  </a>
                  <a href="#" className="flex items-center justify-center gap-3 p-5 bg-white border border-[#1C1208]/5 group hover:border-[#E4405F] transition-all">
                    <Instagram className="w-4 h-4 text-[#E4405F]" />
                    <span className="uppercase font-bold tracking-[0.2em] text-[0.6rem]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-7">
              <form className="bg-white p-8 md:p-12 border border-[#1C1208]/5 space-y-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>Full Name</label>
                    <input type="text" className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none focus:border-rust transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>Phone Number</label>
                    <input type="tel" className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none focus:border-rust transition-colors" placeholder="+1 (000) 000-0000" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>Email Address</label>
                  <input type="email" className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none focus:border-rust transition-colors" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>Preferred Callback</label>
                  <select className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none focus:border-rust transition-colors appearance-none">
                    <option>Morning (9AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 7PM)</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <ButtonPrimary href="#" className="w-full">Submit Enquiry</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-t border-[#1C1208]/5">
        <FigMarker fig="fig. 31" label="Community Summary" />
      </div>
    </SectionWrapper>
  );
}
