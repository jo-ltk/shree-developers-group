"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
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
      className="bg-background min-h-screen px-6 py-24 sm:px-8 md:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[110rem]">
        <div data-gallery-copy>
          <SectionHeading
            eyebrow="Featured Projects"
            title="A larger, more immersive project showcase with image-led cards and richer hover detail."
            description="The lead project plays as a near full-screen feature, while the supporting projects follow in larger editorial cards."
            align="center"
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-6 lg:mt-20 lg:gap-7">
          {featuredProjects.map((project) => (
            <div key={project.title} data-project-card className={`${project.layout} ${project.height}`}>
              <div className="border border-[#C6A96B]/15 bg-[#F5F3EF] p-6 sm:p-8 transition-all duration-500 hover:border-[#C6A96B]/40 hover:shadow-[0_8px_40px_rgba(198,169,107,0.08)] hover:-translate-y-1 flex flex-col group h-full cursor-pointer">
                
                {/* Image Container */}
                <div className="relative w-full flex-1 min-h-[220px] mb-6 sm:mb-8 overflow-hidden rounded-[2px]">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Text Content Container */}
                <div className="flex flex-col">
                  {/* Gold icon or number */}
                  <div className="text-[#C6A96B] font-medium text-lg sm:text-xl mb-4 tracking-widest">{project.index}</div>
                  
                  {/* Eyebrow or label */}
                  <div className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#787b78] mb-3">
                    {project.type} &mdash; {project.location}
                  </div>
                  
                  {/* Headline in Cormorant */}
                  <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.05] text-[#112025] mb-4">
                    {project.title}
                  </h3>
                  
                  {/* Body in Outfit light */}
                  <p className="font-outfit font-light text-[#787b78] leading-relaxed text-[0.95rem] sm:text-[1.05rem]">
                    {project.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
