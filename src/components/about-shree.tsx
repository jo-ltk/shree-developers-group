"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { StatItem } from "@/components/ui/stat-item";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { FigMarker } from "@/components/ui/fig-marker";
import { Ornament } from "@/components/ui/ornament";
import { RustLine } from "@/components/ui/rust-line";
import { ShieldCheck, MapPinned } from "lucide-react";
import { motion } from "framer-motion";

export function AboutShree() {
  return (
    <SectionWrapper id="about-shree" noPadding>

      {/* ── INTRO HEADER ── */}
      <div className="px-6 md:px-12 lg:px-20 py-16 border-b border-[#1C1208]/10 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-8 md:gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
          <SectionLabel className="justify-center md:justify-start">About Shree</SectionLabel>
          <SectionHeadline size="xl" className="text-center md:text-left">
            Rooted in Georgia, built for the future
          </SectionHeadline>
        </div>
        <div className="flex items-center gap-3 pb-1 shrink-0">
          <RustLine className="mb-0" />
          <Annotation>Est. 2009</Annotation>
        </div>
      </div>

      {/* ── A. FOUNDER STORY — equal 6/6 ── */}
      <div className="grid grid-cols-12 border-b border-[#1C1208]/10">
        {/* Image — col-span-6 */}
        <div className="col-span-12 lg:col-span-6 relative min-h-[520px] bg-[#1C1208] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900"
            alt="Founder of Shree Developers Group"
            className="absolute inset-0 w-full h-full object-cover opacity-55 grayscale brightness-90 transition-all duration-1000 hover:grayscale-0 hover:brightness-100"
          />
          {/* Blueprint corners */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#D43F33]/50 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#D43F33]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/85 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <Annotation light className="mb-2">Founder &amp; CEO</Annotation>
            <div
              className="text-[#F5F0E8] text-2xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Mr. Shree
            </div>
          </div>
        </div>

        {/* Text — col-span-6, same height, flex justify-center */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 md:px-12 lg:px-16 py-16 bg-[#F5F0E8]">
          <div className="flex justify-center lg:justify-start">
            <SectionLabel className="mb-4">Founder Story</SectionLabel>
          </div>
          <SectionHeadline size="md" className="mb-8 text-center lg:text-left">
            A journey of integrity
          </SectionHeadline>
          <BodyText size="lg" className="mb-6 mx-auto lg:mx-0 max-w-lg">
            Shree Developers Group began with a simple observation: the market
            was full of houses, but short on homes. Our founder, with over 15
            years of deep expertise in North Georgia&apos;s real estate, set out to
            build a development group where architectural restraint meets
            obsessive craftsmanship.
          </BodyText>
          <p
            className="relative border-l border-rust/40 pl-8 mb-10 text-[#1C1208]/80 mx-auto lg:mx-0 max-w-lg text-left"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              lineHeight: 1.65,
            }}
          >
            {/* Accent mark */}
            <span className="absolute top-0 left-0 w-1 h-5 bg-rust" />
            
            &quot;We don&apos;t just clear land; we curate environments. Every nail, every
            stone, and every blueprint is a promise of quality we&apos;ve kept for
            over a decade.&quot;
          </p>
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <RustLine className="mb-0" />
            <Annotation>Established 2009 · Suwanee, Georgia</Annotation>
          </div>
        </div>
      </div>

      {/* ── B. BRAND PHILOSOPHY — dark, equal 6/6 ── */}
      <div className="bg-[#1C1208] px-6 md:px-12 lg:px-20 py-16 md:py-20 relative overflow-hidden w-full">
        <div className="flex justify-center lg:justify-start">
          <SectionLabel light className="mb-6 !text-white">Brand Philosophy</SectionLabel>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:items-start w-full">
          {/* Left col */}
          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionHeadline size="lg" light className="mb-6 !text-white text-center lg:text-left mx-auto lg:mx-0">
              The Shree Way
            </SectionHeadline>
            <BodyText light size="lg" className="mb-8 max-w-xl !text-white/90 !font-light text-center lg:text-left mx-auto lg:mx-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
              We believe the finest homes are built on four pillars — Restraint,
              Craft, Tension, and Texture. Our materials speak for themselves:
              limestone, aged paper, terracotta, concrete. Timeless, never trendy.
            </BodyText>
            
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10 w-full">
              <div>
                <span className="uppercase text-rust font-bold tracking-widest text-[0.6rem] block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Vision</span>
                <BodyText light size="sm" className="!text-white/70">
                  To be the most trusted name in premium residential development.
                </BodyText>
              </div>
              <div>
                <span className="uppercase text-rust font-bold tracking-widest text-[0.6rem] block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mission</span>
                <BodyText light size="sm" className="!text-white/70">
                  To create intentional communities that foster connection and safety.
                </BodyText>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="w-full lg:col-span-5 flex flex-col gap-4">
            {[
              {
                Icon: ShieldCheck,
                title: "Licensed & Insured",
                body: "Full state certification for total peace of mind."
              },
              {
                Icon: MapPinned,
                title: "Local Expertise",
                body: "15 years of deep knowledge in Georgia's growth patterns."
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex items-center gap-5 p-6 border border-white/10 bg-white/[0.03] transition-colors hover:border-rust/50"
              >
                <Icon className="w-5 h-5 text-rust shrink-0" />
                <div>
                  <span className="uppercase text-white/40 font-bold tracking-widest text-[0.55rem] block mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {title}
                  </span>
                  <BodyText light size="sm" className="!text-white/80">
                    {body}
                  </BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── C. STATS — mosaic tile row ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 bg-[#1C1208]/8 w-full overflow-hidden">
        {[
          { value: "15+",  label: "Years of Experience", muted: false },
          { value: "24+",  label: "Projects Completed",  muted: false },
          { value: "100%", label: "Licensed & Insured",  muted: true  },
          { value: "GA",   label: "Local Expertise",     muted: true  },
        ].map(({ value, label, muted }, i) => (
          <div
            key={label}
            className={`px-8 py-10 flex flex-col items-center lg:items-start text-center lg:text-left
              ${muted ? "bg-[#EDE8DF]" : "bg-[#F5F0E8]"}
              ${i < 3 ? "border-r border-[#1C1208]/8" : ""}`}
          >
            <StatItem value={value} label={label} />
          </div>
        ))}
      </div>

      {/* ── CLOSING STAMP ── */}
    

    </SectionWrapper>
  );
}