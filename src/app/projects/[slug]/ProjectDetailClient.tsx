"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { ProjectData } from "@/lib/projects-data";
import { ensureGsapPlugins } from "@/lib/gsap";
import { NavbarAnimated } from "@/components/navbar-animated";
import { FooterSection } from "@/components/footer-section";

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL PAGE — Full portfolio view
   ═══════════════════════════════════════════════════════════════ */

export function ProjectDetailClient({ project }: { project: ProjectData }) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el as Element, {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el as Element, start: "top 85%", once: true },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-hidden bg-[#FAF8F3]">
      <NavbarAnimated />

      {/* ───── 1. HERO — Project Brief + Main Image ───── */}
      <HeroSection project={project} />

      {/* ───── 2. SITE PLAN & FLOOR PLANS ───── */}
      <PlansSection plans={project.plans} />

      {/* ───── 3. RENDERS & VIDEOS ───── */}
      <RendersSection renders={project.renders} />

      {/* ───── 4. SITE PROGRESS ───── */}
      <ProgressSection progress={project.progress} title={project.title} />

      {/* ───── BACK TO PROJECTS CTA ───── */}
      <section className="bg-[#1C1208] py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center lg:px-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAF8F3]/40">
            Explore more communities
          </p>
          <Link
            href="/#gallery"
            className="group flex h-[52px] items-center gap-3 border border-[#8B2A2A]/40 px-10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FAF8F3] transition-all duration-300 hover:border-[#8B2A2A] hover:bg-[#8B2A2A]/10"
          >
            ← Back to All Projects
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — Hero / Project Brief
   ═══════════════════════════════════════════════════════════════ */

function HeroSection({ project }: { project: ProjectData }) {
  const isActive = project.status === "active";

  return (
    <section className="relative">
      {/* Full-bleed hero image */}
      <div className="relative h-[60vh] min-h-[420px] sm:h-[70vh]">
        <Image
          src={project.image}
          alt={`${project.title} — Hero`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,18,8,0.1)_0%,rgba(28,18,8,0.7)_70%,rgba(28,18,8,0.92)_100%)]" />

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 sm:px-7 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B2A2A]">
                {project.index}
              </span>
              <span className="h-px w-8 bg-[#8B2A2A]/50" />
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                  isActive
                    ? "border-[#8B2A2A]/40 text-[#8B2A2A]"
                    : "border-[#FAF8F3]/20 text-[#FAF8F3]/50"
                }`}
              >
                {isActive && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B2A2A] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8B2A2A]" />
                  </span>
                )}
                {project.year}
              </span>
            </div>
            <h1
              className="max-w-[16ch] text-[3rem] font-light leading-[1.02] text-[#FAF8F3] sm:text-[4.5rem] lg:text-[6rem]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {project.title}
            </h1>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B2A2A]">
              {project.type} — {project.location}
            </p>
          </div>
        </div>
      </div>

      {/* Brief section */}
      <div className="bg-[#FAF8F3] px-5 py-16 sm:px-7 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:gap-20">
            {/* Highlight callout */}
            <div className="shrink-0 lg:w-[340px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B2A2A]">
                Project Highlight
              </p>
              <p
                className="mt-4 text-[1.8rem] font-light leading-[1.15] text-[#3A342E] sm:text-[2.2rem]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {project.highlight}
              </p>
            </div>

            {/* Brief text */}
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B7AA98]">
                Project Brief
              </p>
              <p className="mt-4 text-[1.02rem] font-light leading-[1.85] text-[#3A342E]">
                {project.brief}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — Site Plan & Floor Plans
   ═══════════════════════════════════════════════════════════════ */

function PlansSection({ plans }: { plans: ProjectData["plans"] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-[#F2EADF] px-5 py-16 sm:px-7 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-10 md:mb-16">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#E8DFD2] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8B2A2A]">
            <span>+</span> Plans & Layouts
          </span>
          <h2
            className="text-[2rem] font-light leading-[1.1] text-[#3A342E] sm:text-[2.8rem] lg:text-[3.5rem]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Site plan &{" "}
            <em className="text-[#8B2A2A]" style={{ fontStyle: "italic" }}>
              floor plans
            </em>
          </h2>
        </div>

        <div data-reveal className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          {/* Plan selector tabs */}
          <div className="flex flex-row gap-2 overflow-x-auto lg:w-[240px] lg:shrink-0 lg:flex-col lg:overflow-visible">
            {plans.map((plan, i) => (
              <button
                key={plan.label}
                onClick={() => setActiveIdx(i)}
                className={`whitespace-nowrap border px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  activeIdx === i
                    ? "border-[#8B2A2A]/40 bg-[#FAF8F3] text-[#8B2A2A]"
                    : "border-[#E8DFD2] bg-transparent text-[#B7AA98] hover:border-[#B7AA98] hover:text-[#3A342E]"
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>

          {/* Plan image viewer */}
          <div className="relative flex-1 overflow-hidden border border-[#E8DFD2] bg-[#FAF8F3]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={plans[activeIdx].image}
                alt={plans[activeIdx].label}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
            <div className="border-t border-[#E8DFD2] px-6 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B7AA98]">
                {plans[activeIdx].label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — Rendered Images & Videos
   ═══════════════════════════════════════════════════════════════ */

function RendersSection({ renders }: { renders: ProjectData["renders"] }) {
  return (
    <section className="bg-[#1C1208] px-5 py-16 sm:px-7 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-10 md:mb-16">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#3A2A18] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8B2A2A]">
            <span>+</span> Visual Gallery
          </span>
          <h2
            className="text-[2rem] font-light leading-[1.1] text-[#FAF8F3] sm:text-[2.8rem] lg:text-[3.5rem]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Renders &{" "}
            <em className="text-[#8B2A2A]" style={{ fontStyle: "italic" }}>
              walkthroughs
            </em>
          </h2>
        </div>

        <div data-reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {renders.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden border border-[#3A2A18] transition-all duration-500 hover:border-[#8B2A2A]/40"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[rgba(28,18,8,0.2)] transition-opacity duration-500 group-hover:opacity-0" />

                {/* Video indicator */}
                {item.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#FAF8F3]/60 bg-[rgba(28,18,8,0.5)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FAF8F3">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="bg-[#2A1E10] px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FAF8F3]/60">
                    {item.label}
                  </p>
                  {item.isVideo && (
                    <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8B2A2A]">
                      Video
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — Site Progress Timeline
   ═══════════════════════════════════════════════════════════════ */

function ProgressSection({
  progress,
  title,
}: {
  progress: ProjectData["progress"];
  title: string;
}) {
  return (
    <section className="bg-[#FAF8F3] px-5 py-16 sm:px-7 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-10 md:mb-16">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#E8DFD2] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8B2A2A]">
            <span>+</span> Progress
          </span>
          <h2
            className="text-[2rem] font-light leading-[1.1] text-[#3A342E] sm:text-[2.8rem] lg:text-[3.5rem]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {title}{" "}
            <em className="text-[#8B2A2A]" style={{ fontStyle: "italic" }}>
              updates
            </em>
          </h2>
        </div>

        {/* Timeline */}
        <div data-reveal className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-[#E8DFD2] lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-10 lg:space-y-16">
            {progress.map((entry, i) => (
              <div
                key={`${entry.date}-${i}`}
                className={`relative flex flex-col gap-4 pl-12 lg:flex-row lg:gap-12 lg:pl-0 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[12px] top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-[#8B2A2A] bg-[#FAF8F3] lg:left-1/2 lg:-translate-x-1/2">
                  <div className="h-[5px] w-[5px] rounded-full bg-[#8B2A2A]" />
                </div>

                {/* Content side */}
                <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:pl-16"}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B2A2A]">
                    {entry.date}
                  </p>
                  <p className="mt-2 text-[1rem] font-light leading-[1.7] text-[#3A342E]">
                    {entry.note}
                  </p>
                </div>

                {/* Image side (if available) */}
                <div className={`flex-1 ${i % 2 === 0 ? "lg:pl-16" : "lg:pr-16 lg:text-right"}`}>
                  {entry.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden border border-[#E8DFD2]">
                      <Image
                        src={entry.image}
                        alt={`${entry.date} — ${entry.note}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center border border-dashed border-[#E8DFD2] bg-[#F2EADF]/50">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B7AA98]">
                        No image available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
