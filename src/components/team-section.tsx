"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { ButtonGhost } from "./ui/button-ghost";
import { Annotation } from "./ui/annotation";
import { CrosshairIcon } from "./ui/crosshair-icon";

const commitments = [
  {
    title: "Clear Documentation",
    description: "Clear documentation before booking. Every detail is shared upfront for a composed decision.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=82",
    fig: "fig. 13",
  },
  {
    title: "Guided Choices",
    description: "Material choices explained without pressure, focusing on enduring quality and daily comfort.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
    fig: "fig. 14",
  },
  {
    title: "Disciplined Updates",
    description: "Construction updates shared with discipline, keeping you connected to your site's progress.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=82",
    fig: "fig. 15",
  },
  {
    title: "Dedicated Handover",
    description: "Handover support after possession. Our relationship continues with responsive post-sales care.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=82",
    fig: "fig. 16",
  },
];

export function TeamSection() {
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
            start: "top 78%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        })
        .from("[data-team-heading] > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.12,
        })
        .from("[data-commitment-card]", {
          autoAlpha: 0,
          y: 30,
          duration: 1,
          stagger: 0.15,
          delay: -0.5,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="team" ref={sectionRef} dark={false} className="!py-16 md:!py-20">
      {/* Asymmetric Header Grid */}
      <div data-team-heading className="flex flex-col items-center md:grid md:grid-cols-12 gap-8 md:gap-12 items-center md:items-end mb-10 md:mb-12 text-center md:text-left">
        <div className="col-span-12 lg:col-span-7 flex flex-col items-center md:items-start">
          <SectionLabel counter="07 / 08" className="justify-center md:justify-start">Our Promise</SectionLabel>
          <SectionHeadline 
            size="xl" 
            className="responsive-headline-xl"
          >
            Premium is not loud.
            <br />
            It is consistently cared for
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-center md:items-start">
          <BodyText size="md" className="mb-8 responsive-body-sm">
            Shree Developers Group works with a simple belief: real estate feels luxurious when 
            buyers understand what is being built, why it matters, and who stands behind it.
          </BodyText>
          <ButtonGhost href="#footer" className="responsive-btn-text">Start A Conversation</ButtonGhost>
        </div>
      </div>

      {/* Commitments Grid */}
      <div className="grid gap-px bg-border/20 md:grid-cols-2 lg:grid-cols-4">
        {commitments.map((item, index) => (
          <article
            key={item.title}
            data-commitment-card
            className="group relative bg-cream flex flex-col h-full transition-colors duration-700 hover:bg-creamDeep cursor-pointer"
          >
            <div className="flex items-start justify-between p-6 md:p-8">
              <Annotation>{item.fig}</Annotation>
              <CrosshairIcon className="opacity-30 group-hover:rotate-90 transition-all duration-700" />
            </div>

            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-[1.04]"
              />
              
              {/* Hover Overlay Button */}
              <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                  <ArrowUpRight className="w-8 h-8 text-dark" />
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-grow items-center md:items-start text-center md:text-left p-6 md:p-8 pt-8 md:pt-10">
              <Annotation className="mb-4 text-rust responsive-stat-label">Pillar 0{index + 1}</Annotation>
              <SectionHeadline size="md" noPeriod className="mb-4 transition-colors duration-300 group-hover:text-rust">
                {item.title}<span className="text-rust">.</span>
              </SectionHeadline>
              <BodyText size="sm" className="mb-8 flex-grow responsive-body-sm">
                {item.description}
              </BodyText>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-px w-0 bg-rust/30 transition-all duration-700 group-hover:w-full mt-auto" />
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

