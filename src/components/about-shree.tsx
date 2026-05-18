"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { StatItem } from "@/components/ui/stat-item";
import { ShieldCheck, MapPinned } from "lucide-react";
import { Annotation } from "./ui/annotation";

const CHAPTERS = [
  {
    id: "who-we-are",
    label: "Who We Are",
    number: "01",
    tag: "Identity",
    heading: "About Shree Developers Group",
    body: "Shree Developers Group is a Georgia-based real estate development and vertical construction company focused on creating high-quality residential, commercial, and mixed-use communities built with a long-term vision for growth, functionality, and modern living.",
  },
  {
    id: "our-approach",
    label: "Our Approach",
    number: "02",
    tag: "Process",
    heading: "Founded on Craft",
    body: "Founded with a commitment to thoughtful development and strong construction standards, the company oversees every stage of the process — from land acquisition and site planning to infrastructure development, vertical construction, and final project delivery. With a hands-on approach and attention to detail, Shree Developers Group continues to build projects that combine architectural quality, practical design, and lasting investment value.",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    number: "03",
    tag: "Beliefs",
    heading: "Beyond Structures",
    body: "The company's philosophy is centered around creating developments that go beyond structures — spaces that contribute to the growth of neighborhoods, support evolving lifestyles, and strengthen the communities around them. Every project is approached with a focus on quality execution, efficient planning, and long-term sustainability.",
  },
  {
    id: "expertise",
    label: "Expertise",
    number: "04",
    tag: "Reach",
    heading: "Across Georgia",
    body: "Shree Developers Group develops single-family communities, townhomes, retail centers, office spaces, and mixed-use developments across Georgia, with experience spanning both horizontal and vertical construction. Through local market understanding and project management expertise, the company continues to deliver developments designed to meet the needs of modern homeowners, businesses, and investors.",
  },
  {
    id: "commitment",
    label: "Commitment",
    number: "05",
    tag: "Promise",
    heading: "Built for the Future",
    body: "Backed by a commitment to professionalism, construction integrity, and community-focused growth, Shree Developers Group remains dedicated to building environments that reflect trust, functionality, and enduring value for the future.",
  },
];

const CYCLE_MS = 5000;
const TICK_MS  = 50;

export function AboutShree() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);

  const cycleRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (cycleRef.current)  clearInterval(cycleRef.current);
    if (tickRef.current)   clearInterval(tickRef.current);
  };

  const startTimers = useCallback((currentActive: number, isPaused: boolean) => {
    clearTimers();
    if (isPaused) return;

    cycleRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % CHAPTERS.length);
      setProgress(0);
    }, CYCLE_MS);

    tickRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (TICK_MS / CYCLE_MS) * 100, 100));
    }, TICK_MS);
  }, []);

  useEffect(() => {
    setProgress(0);
    startTimers(active, paused);
    return clearTimers;
  }, [active, paused, startTimers]);

  const handleSelect = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  const ch = CHAPTERS[active];

  return (
    <SectionWrapper id="about-shree" noPadding fullWidth>

      {/* ── BRAND PHILOSOPHY ── */}
      <div className="bg-[#1C1208] px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-24 relative overflow-hidden w-full">
        <div className="flex justify-center mb-8 md:mb-16">
          <SectionLabel light className="!mb-0 !text-white">Brand Philosophy</SectionLabel>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-16 items-center lg:items-start w-full">
          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap">
            <SectionHeadline size="lg" light className="m-0 !text-white text-center lg:text-left mx-auto lg:mx-0 responsive-headline-xl">
              The Shree Way
            </SectionHeadline>
            <BodyText light className="responsive-body-sm m-0 max-w-xl !text-white/80 !font-light text-center lg:text-left mx-auto lg:mx-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
              The finest homes are built on four pillars: Restraint, Craft, Tension, and Texture.
              We use timeless materials that speak for themselves.
            </BodyText>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 w-full">
              <div>
                <Annotation className="!text-rust !font-bold responsive-stat-label block mb-2">Vision</Annotation>
                <BodyText light size="sm" className="responsive-body-sm !text-white/60">
                  To be the most trusted name in premium residences.
                </BodyText>
              </div>
              <div>
                <Annotation className="!text-rust !font-bold responsive-stat-label block mb-2">Mission</Annotation>
                <BodyText light size="sm" className="responsive-body-sm !text-white/60">
                  To create intentional communities with safety.
                </BodyText>
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col gap-4 mt-6 lg:mt-0">
            {[
              { Icon: ShieldCheck, title: "Licensed", body: "Full state certification." },
              { Icon: MapPinned,   title: "Expertise", body: "15 years in Georgia."    },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-2 sm:gap-5 p-3 sm:p-6 border border-white/10 bg-white/[0.03] transition-colors hover:border-rust/50"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-rust shrink-0" />
                <div>
                  <Annotation className="!text-white/40 !font-bold responsive-stat-label block mb-0.5 sm:mb-1">
                    {title}
                  </Annotation>
                  <BodyText light size="sm" className="responsive-body-sm !text-white/70">
                    {body}
                  </BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUR STORY — Tab Navigator (warm cream) ── */}
      <div className="bg-[#F5F0E8] w-full pt-8 pb-8 lg:pt-16 lg:pb-16">

        {/* ── Top header bar (Mobile/Tablet only) ── */}
        <div className="flex justify-center px-6 sm:px-8 md:px-12 pt-4 mb-8 lg:hidden">
          <SectionLabel className="!mb-0">Our Story</SectionLabel>
        </div>

        {/* ── Grid Layout: Tab rail + Content ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">

          {/* ── LEFT: Tab rail & Desktop Header ── */}
          <div className="flex flex-col lg:col-span-4 lg:border-r border-[#1C1208]/10 lg:pr-8">
            {/* Desktop-only Header */}
            <div className="hidden lg:flex flex-col items-start mb-8">
              <SectionLabel className="!mb-0 text-left">Our Story</SectionLabel>
            </div>

            <nav
              aria-label="Chapter navigation"
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible
                         shrink-0 border-b lg:border-b-0
                         scrollbar-hide [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CHAPTERS.map((c, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(i)}
                    className="group relative flex items-center text-left
                               px-5 lg:px-6 shrink-0 lg:w-full
                               border-b-2 lg:border-b-0 lg:border-r-[2px] lg:-mr-[1px]
                               transition-all duration-300 overflow-hidden"
                    style={{
                      borderColor: isActive ? "#B45309" : "transparent",
                      background:  isActive ? "rgba(28,18,8,0.04)" : "transparent",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    {/* Timer progress fill */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "rgba(28,18,8,0.03)",
                        transform: `scaleX(${isActive ? progress / 100 : i < active ? 1 : 0})`,
                        transformOrigin: "left",
                        transition: isActive ? "none" : "transform 0.4s ease",
                      }}
                    />
                    {/* Label */}
                    <span
                      className="relative text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: isActive ? "#1C1208" : "rgba(28,18,8,0.38)",
                      }}
                    >
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── RIGHT: Content panel ── */}
          <div className="flex-1 relative overflow-hidden lg:col-span-8 lg:col-start-5 mt-8 lg:mt-0 lg:pl-12 xl:pl-16 flex flex-col justify-between">
            <div className="relative w-full">
              {/* Slides */}
              {CHAPTERS.map((c, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={c.id}
                    aria-hidden={!isActive}
                    className={`${isActive ? "relative" : "absolute inset-x-0 top-0"} flex flex-col justify-start gap-4 px-8 sm:px-10 lg:px-0 pt-6 pb-6 lg:pt-0 lg:pb-8 w-full h-auto`}
                    style={{
                      opacity:    isActive ? 1 : 0,
                      transform:  isActive ? "translateY(0)" : "translateY(18px)",
                      transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Heading */}
                    <SectionHeadline
                      size="lg"
                      className="m-0 text-left"
                      style={{ maxWidth: "40ch" }}
                    >
                      {c.heading}
                    </SectionHeadline>

                    {/* Body */}
                    <p
                      className="leading-relaxed font-light"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "rgba(28,18,8,0.6)",
                        fontSize: "clamp(0.82rem, 1.35vw, 0.95rem)",
                        maxWidth: "none",
                      }}
                    >
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ── Bottom dot strip ── */}
            <div className="flex items-center gap-1.5 px-8 sm:px-10 lg:px-0 pt-4 pb-4">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(i)}
                  aria-label={c.label}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === active ? 22 : 6,
                    height: 6,
                    background: i === active ? "#B45309" : "rgba(28,18,8,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#1C1208]/10 gap-px w-full overflow-hidden border-y border-[#1C1208]/10">
        {[
          { value: "15+",  label: "Years of Experience", muted: false },
          { value: "24+",  label: "Projects Completed",  muted: false },
          { value: "100%", label: "Licensed & Insured",  muted: true  },
          { value: "GA",   label: "Local Expertise",     muted: true  },
        ].map(({ value, label, muted }) => (
          <div
            key={label}
            className={`px-4 sm:px-8 py-6 sm:py-10 flex flex-col items-center lg:items-start text-center lg:text-left
              ${muted ? "bg-[#EDE8DF]" : "bg-[#F5F0E8]"}`}
          >
            <StatItem value={value} label={label} />
          </div>
        ))}
      </div>

    </SectionWrapper>
  );
}