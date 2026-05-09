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

const articles = [
  {
    title: "How We Choose A Residential Site",
    description:
      "A closer look at frontage, approach roads, service access, and the quieter details that make a project feel dependable for years.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=82",
    date: "Oct 12, 2026",
    fig: "fig. 09",
  },
  {
    title: "The Value Of A Clear Handover",
    description:
      "Premium ownership is shaped by documentation, finishing checks, and simple communication during the weeks before possession.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=82",
    date: "Sep 28, 2026",
    fig: "fig. 10",
  },
  {
    title: "Designing Communities With Breathing Room",
    description:
      "Why internal roads, landscape edges, and shared open areas matter as much as individual plans and specifications.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=82",
    date: "Aug 15, 2026",
    fig: "fig. 11",
  },
];

export function RecentArticlesSection() {
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
        .from("[data-articles-heading] > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.12,
        })
        .from("[data-article-card]", {
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
    <SectionWrapper id="articles" ref={sectionRef} dark={false} className="!py-16 md:!py-20">
      {/* Asymmetric Header Grid (7/5 Split) */}
      <div data-articles-heading className="grid grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel counter="06 / 08">Builder Notes</SectionLabel>
          <SectionHeadline size="xl" className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98]">
            A quieter journal of materials,
            <br />
            sites, and <em className="italic">decisions</em>
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <BodyText size="md" className="mb-8">
            Short reads for buyers who want to understand the thinking behind a Shree development, 
            from planning discipline to the details that make ownership simpler.
          </BodyText>
          <ButtonGhost href="#">Read Full Journal</ButtonGhost>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-px bg-border/20 md:grid-cols-3">
        {articles.map((article, index) => (
          <article
            key={article.title}
            data-article-card
            className="group relative bg-cream flex flex-col h-full cursor-pointer"
          >
            <div className="flex items-start justify-between p-6 md:p-8">
              <Annotation>{article.fig}</Annotation>
              <CrosshairIcon className="opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
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

            <div className="flex flex-col flex-grow p-6 md:p-8 pt-8 md:pt-10">
              <Annotation className="mb-4 text-rust">{article.date}</Annotation>
              <SectionHeadline size="md" noPeriod className="mb-4 transition-colors duration-300 group-hover:text-rust">
                {article.title}<span className="text-rust">.</span>
              </SectionHeadline>
              <BodyText size="sm" className="mb-8 flex-grow">
                {article.description}
              </BodyText>
              
              <div className="mt-auto">
                <ButtonGhost href="#" className="text-[0.65rem]">
                  Read Article
                </ButtonGhost>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-rust/10 transition-colors duration-500 group-hover:border-rust/30" />
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

