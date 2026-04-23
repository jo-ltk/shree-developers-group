"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { ensureGsapPlugins } from "@/lib/gsap";

const featuredProjects = [
  {
    index: "01",
    title: "Halcyon Coves",
    location: "Gold Coast",
    type: "Coastal Residential Community",
    year: "2026",
    summary:
      "A calm waterfront address shaped through generous setbacks, layered landscape, and a hospitality-led arrival sequence.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80",
    size: "featured" as const,
    layout: "md:col-span-2 xl:col-span-6",
    height: "min-h-[72svh] sm:min-h-[78svh] xl:min-h-[88svh]",
  },
  {
    index: "02",
    title: "Harbour Quarter",
    location: "Sydney",
    type: "Mixed-Use Precinct",
    year: "2025",
    summary:
      "A dense urban block organized around public movement, layered retail, and premium residential outlooks.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80",
    size: "medium" as const,
    layout: "xl:col-span-3",
    height: "min-h-[34rem] sm:min-h-[38rem] xl:min-h-[44rem]",
  },
  {
    index: "03",
    title: "Southbank Terrace",
    location: "Melbourne",
    type: "Residential Collection",
    year: "2024",
    summary:
      "A restrained apartment series balancing softer interiors with a more sculpted street presence.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    size: "medium" as const,
    layout: "xl:col-span-3",
    height: "min-h-[34rem] sm:min-h-[38rem] xl:min-h-[44rem]",
  },
  {
    index: "04",
    title: "Lakeside Pavilion",
    location: "Brisbane",
    type: "Hospitality & Public Realm",
    year: "2027",
    summary:
      "A civic-facing hospitality concept pairing generous shade, water views, and a more social ground plane.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80",
    size: "regular" as const,
    layout: "xl:col-span-2",
    height: "min-h-[24rem] sm:min-h-[28rem] xl:min-h-[32rem]",
  },
  {
    index: "05",
    title: "Head to Health Kids",
    location: "Nerang",
    type: "Community Health",
    year: "2025",
    summary:
      "A family-focused health environment designed to feel welcoming, intuitive, and quietly optimistic.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    size: "regular" as const,
    layout: "xl:col-span-2",
    height: "min-h-[24rem] sm:min-h-[28rem] xl:min-h-[32rem]",
  },
  {
    index: "06",
    title: "Aurora Commons",
    location: "Sunshine Coast",
    type: "Education & Public Interface",
    year: "2026",
    summary:
      "A flexible public-facing campus edge where learning spaces and communal life are carefully blended.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    size: "regular" as const,
    layout: "xl:col-span-2",
    height: "min-h-[24rem] sm:min-h-[28rem] xl:min-h-[32rem]",
  },
];

export function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        })
        .from("[data-gallery-copy] > *", {
          autoAlpha: 0,
          y: 28,
          duration: 0.95,
          stagger: 0.14,
        })
        .from(
          "[data-project-card]",
          {
            autoAlpha: 0,
            y: 34,
            duration: 0.95,
            stagger: 0.1,
          },
          "<0.12"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[var(--color-primary)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div data-gallery-copy className="flex flex-col items-center text-center max-w-[48rem] mx-auto">
          <div className="flex items-center gap-4 mb-7">
            <span className="h-[1.5px] w-9 bg-[var(--color-accent)] flex-shrink-0" />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">Featured Projects</p>
            <span className="h-[1.5px] w-9 bg-[var(--color-accent)] flex-shrink-0" />
          </div>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
              className="text-[var(--text-light)] leading-[1.1] tracking-[-0.01em]">
            A larger, more immersive project showcase with image-led cards and richer <em style={{ fontStyle: "italic" }} className="text-[var(--color-accent)]">hover detail.</em>
          </h2>
          <div className="my-8 h-[1px] w-12 bg-[var(--color-accent)]/30" />
          
          <p className="text-[0.82rem] font-light leading-[1.75] text-[var(--text-light)]/55">
            The lead project plays as a near full-screen feature, while the supporting projects follow in larger editorial cards.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-6 lg:mt-20 lg:gap-7">
          {featuredProjects.map((project) => (
            <div key={project.title} data-project-card className={`${project.layout} ${project.height}`}>
              <div className="group relative overflow-hidden border border-[var(--color-secondary)]/10 bg-[var(--color-primary)] transition-all duration-500 hover:border-[var(--color-accent)]/50 flex flex-col h-full cursor-pointer">

                {/* Gold top accent bar */}
                <div className="h-[2px] w-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/50 to-transparent flex-shrink-0" />

                {/* Image */}
                <div className="relative flex-1 min-h-[240px] overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/30 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-[var(--color-primary)]/80 backdrop-blur-sm border border-[var(--color-accent)]/30 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    <span className="text-[9px] font-semibold tracking-[0.15em] text-[var(--color-accent)] uppercase">{project.year}</span>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-4 right-4 bg-[var(--color-accent)] px-3 py-1">
                    <span className="text-[9px] font-bold tracking-[0.12em] text-[var(--text-primary)] uppercase">{project.type}</span>
                  </div>

                  {/* Name over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-accent)] uppercase mb-1">{project.location}</p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "1.6rem" }}
                        className="text-[var(--text-light)] leading-tight">{project.title}</h3>
                  </div>
                </div>

                {/* 4 section tabs */}
                <div className="grid grid-cols-4 border-t border-[var(--color-secondary)]/08 flex-shrink-0">
                  {["Brief", "Plans", "Renders", "Progress"].map((tab, i) => (
                    <div key={tab} className={`py-2.5 text-center border-r border-[var(--color-secondary)]/08 last:border-r-0 ${i === 0 ? "bg-[var(--color-accent)]/10" : ""}`}>
                      <span className="text-[8.5px] font-semibold tracking-[0.12em] text-[var(--text-light)]/40 uppercase">{tab}</span>
                      {i === 0 && <div className="h-[1.5px] w-4 bg-[var(--color-accent)] mx-auto mt-1" />}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="p-6 flex-shrink-0">
                  <p className="text-[0.82rem] font-light leading-[1.75] text-[var(--text-light)]/55 mb-5">{project.summary}</p>

                  {/* CTA */}
                  <div className="group/btn flex h-[44px] w-full items-center justify-center gap-3 bg-[var(--color-accent)] text-[10px] font-bold tracking-[0.18em] text-[var(--text-primary)] uppercase transition-all duration-200 hover:brightness-110"
                       style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                    View Full Project
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                         className="transition-transform duration-200 group-hover/btn:translate-x-1">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
