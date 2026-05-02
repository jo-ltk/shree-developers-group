"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { ensureGsapPlugins } from "@/lib/gsap";
import { allProjects } from "@/lib/projects-data";
import type { ProjectData } from "@/lib/projects-data";

export function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      // Header animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "[data-gallery-header]",
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from("[data-gallery-header] > *", {
          autoAlpha: 0,
          y: 28,
          duration: 0.95,
          stagger: 0.14,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Triple the items for a smooth infinite marquee loop
  const repeatedProjects = [...allProjects, ...allProjects, ...allProjects];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#FAF8F3] py-24 md:py-36 lg:py-48 rounded-t-[2.5rem] lg:rounded-t-[4rem] mt-[-2.5rem] lg:mt-[-4rem] relative z-10 overflow-hidden"
    >
      <style>{`
        @keyframes marquee-right {
          from { transform: translateX(-33.3333%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-[90rem] px-5 sm:px-7 lg:px-20">
        <div data-gallery-header className="mb-16 flex flex-col gap-8 md:mb-20 lg:mb-24 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <h2
            className="font-medium leading-[1.05] tracking-tight text-[#1C1208] lg:w-[55%]"
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" 
            }}
          >
            Communities composed for daily comfort.
          </h2>
          <p 
            className="font-light leading-[1.6] text-[#1C1208]/70 lg:mt-4 lg:w-[35%] lg:text-right"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
          >
            Each development is presented with measured planning, dependable
            approvals, and a clear ownership journey — so the premium
            feeling begins before the first site visit.
          </p>
        </div>
      </div>

      {/* ───── Infinite Scrolling Marquee ───── */}
      <div className="group relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee-right border-y border-dashed border-[#1C1208]/20">
          {repeatedProjects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} />
          ))}
        </div>
      </div>

      {/* ───── Bottom CTA ───── */}
      <div className="mt-16 flex flex-col items-center gap-6 text-center md:mt-24">
        <a
          href="/gallery"
          className="group relative flex h-[52px] items-center justify-center gap-3 rounded-full border border-[#1C1208]/20 bg-[#1C1208]/5 px-10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1C1208] transition-all duration-300 hover:-translate-y-px hover:border-[#1C1208]/40 hover:bg-[#1C1208]/10"
        >
          View Full Portfolio
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12H19M19 12L12 5M19 12L12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <article className="relative flex h-[28rem] w-[20rem] shrink-0 flex-col justify-between overflow-hidden border-r border-dashed border-[#1C1208]/30 p-8 sm:h-[32rem] sm:w-[24rem] lg:h-[36rem] lg:w-[28rem] lg:p-10">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.location}`}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Dark overlay: subtle at top, solid dark at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208]/20 via-[#1C1208]/40 to-[#1C1208]/95" />
      </div>

      {/* Top Left Number */}
      <div 
        className="text-[2.5rem] font-light text-[#FAF8F3] sm:text-[3rem]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {project.index}
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 flex flex-col gap-3 text-[#FAF8F3]">
        <h3
          className="text-[2rem] font-light leading-[1.05] tracking-normal sm:text-[2.4rem] lg:text-[2.8rem]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {project.title}
        </h3>
        <p className="text-[0.9rem] font-light leading-[1.6] text-[#FAF8F3]/80 sm:text-[1rem]">
          {project.summary}
        </p>

        {/* Explore link overlayed on hover */}
        <div className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FAF8F3]/80 transition-colors duration-300 hover:text-[#FAF8F3]"
          >
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/link:translate-x-1">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
