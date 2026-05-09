"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { allProjects } from "@/lib/projects-data";
import type { ProjectData } from "@/lib/projects-data";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { FigMarker } from "./ui/fig-marker";
import { SectionLabel } from "./ui/section-label";

export function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = allProjects.slice(0, 4);

  return (
   <SectionWrapper id="gallery" ref={sectionRef} dark={false} className="!py-16 md:!py-20">
      <div data-gallery-reveal className="grid grid-cols-12 gap-6 items-end mb-10 md:mb-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel counter="03 / 08">Signature Communities</SectionLabel>
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

      {/* Editorial Mosaic Grid */}
      <div data-gallery-reveal className="grid grid-cols-12 gap-px bg-dark/10 border border-dark/10">
        <div className="col-span-12 lg:col-span-8 bg-cream">
          <ProjectCardLarge project={featured[0]} />
        </div>

        <div className="col-span-12 lg:col-span-4 bg-dark p-10 lg:p-12 flex flex-col justify-end min-h-[400px]">
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

        <div className="col-span-12 lg:col-span-4 bg-cream">
          <ProjectCardSmall project={featured[1]} />
        </div>
        <div className="col-span-12 lg:col-span-4 bg-cream">
          <ProjectCardSmall project={featured[2]} />
        </div>
        <div className="col-span-12 lg:col-span-4 bg-cream">
          <ProjectCardSmall project={featured[3]} />
        </div>
      </div>

      <FigMarker fig="fig. 08" label="Project Catalog" className="mt-20" />
    </SectionWrapper>
  );
}

function ProjectCardLarge({ project }: { project: ProjectData }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <article className="relative overflow-hidden h-full cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
          />
          {/* Gradient only on lg+ where text overlays the image */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
          
          {/* Hover Overlay Button */}
          <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
              <ArrowUpRight className="w-8 h-8 text-dark" />
            </div>
          </div>
        </div>

        {/* Index + location badge — sits over image on all sizes */}
        <div className="absolute top-4 left-4 flex items-center gap-3 z-30 lg:top-8 lg:left-8 lg:gap-4 pointer-events-none">
          <Annotation light className="!text-cream/90">{project.index}</Annotation>
          <div className="h-px w-3 lg:w-4 bg-rust/50" />
          <Annotation light className="!text-cream/70 uppercase">{project.location}</Annotation>
        </div>

        {/* Mobile: text block BELOW the image, dark bg for readability */}
        <div className="lg:hidden bg-dark px-6 py-6 relative z-30 pointer-events-none">
          <SectionHeadline size="md" light className="!text-[#F5F0E8] !text-[1.6rem] leading-[1.15]">
            {project.title}
          </SectionHeadline>
          <BodyText size="sm" light className="mt-3 !text-[#F5F0E8]/70">
            {project.summary}
          </BodyText>
        </div>

        {/* Desktop: text overlaid on image as before */}
        <div className="hidden lg:block absolute bottom-10 left-10 max-w-[80%] text-cream z-30 pointer-events-none">
          <SectionHeadline size="md" light className="!text-[#F5F0E8] !text-[2.8rem]">
            {project.title}
          </SectionHeadline>
          <BodyText size="sm" light className="mt-4 !text-[#F5F0E8]/70">
            {project.summary}
          </BodyText>
        </div>
      </article>
    </Link>
  );
}

function ProjectCardSmall({ project }: { project: ProjectData }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <article className="relative overflow-hidden h-full cursor-pointer">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
          
          {/* Hover Overlay Button */}
          <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
              <ArrowUpRight className="w-8 h-8 text-dark" />
            </div>
          </div>
        </div>

        <div className="absolute top-6 left-6 z-30 pointer-events-none">
          <Annotation light className="!text-[#F5F0E8]/60">{project.index}</Annotation>
        </div>

        <div className="absolute bottom-8 left-8 right-8 text-cream z-30 pointer-events-none">
          <SectionHeadline size="md" light className="!text-[#F5F0E8] !text-[1.8rem] mb-4">
            {project.title}
          </SectionHeadline>
          <div className="inline-flex items-center gap-3 text-[0.6rem] font-bold tracking-[0.2em] uppercase !text-rust group-hover:!text-[#F5F0E8] transition-colors duration-500">
            EXPLORE STUDY
            <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}