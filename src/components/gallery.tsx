"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { allProjects } from "@/lib/projects-data";
import type { ProjectData } from "@/lib/projects-data";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { FigMarker } from "./ui/fig-marker";
import { CrosshairIcon } from "./ui/crosshair-icon";

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
      <div className="grid grid-cols-12 gap-px bg-dark/10 border border-dark/10">
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

      <FigMarker fig="fig. 08" label="Project Catalog" />
    </SectionWrapper>
  );
}

function ProjectCardLarge({ project }: { project: ProjectData }) {
  return (
    <article className="group relative overflow-hidden h-full">
      <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
      </div>

      <div className="absolute top-8 left-8 flex items-center gap-4 z-10">
        <Annotation light className="!text-cream/90">{project.index}</Annotation>
        <div className="h-px w-4 bg-rust/50" />
        <Annotation light className="!text-cream/70 uppercase">{project.location}</Annotation>
      </div>

      <div className="absolute bottom-10 left-10 max-w-[80%] text-cream z-10">
        <SectionHeadline size="md" light className="!text-[#F5F0E8] !text-[2.2rem] lg:!text-[2.8rem]">
          {project.title}
        </SectionHeadline>
        <BodyText size="sm" light className="mt-4 !text-[#F5F0E8]/70">
          {project.summary}
        </BodyText>
      </div>
      
      <div className="absolute top-8 right-8 z-10">
        <CrosshairIcon light className="opacity-30 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-700" />
      </div>
    </article>
  );
}

function ProjectCardSmall({ project }: { project: ProjectData }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <article className="relative overflow-hidden h-full">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
        </div>

        <div className="absolute top-6 left-6 z-10">
          <Annotation light className="!text-[#F5F0E8]/60">{project.index}</Annotation>
        </div>

        <div className="absolute bottom-8 left-8 right-8 text-cream z-10">
          <SectionHeadline size="md" light className="!text-[#F5F0E8] !text-[1.8rem] mb-4">
            {project.title}
          </SectionHeadline>
          <div className="inline-flex items-center gap-3 text-[0.6rem] font-bold tracking-[0.2em] uppercase !text-rust group-hover:!text-[#F5F0E8] transition-colors duration-500">
            EXPLORE STUDY
            <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10">
          <CrosshairIcon light className="opacity-10 group-hover:opacity-40 transition-opacity" />
        </div>
      </article>
    </Link>
  );
}