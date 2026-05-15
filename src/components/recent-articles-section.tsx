"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    title: "Home Buyers Tips in Georgia",
    description:
      "Practical guidance for families navigating Georgia’s fast-growing luxury residential market, from financing to selecting the right community.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=82",
    date: "May 14, 2026",
    fig: "01",
  },

  {
    title: "Community Development News",
    description:
      "Updates on evolving residential corridors, infrastructure expansion, and the future vision shaping connected communities in Georgia.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=82",
    date: "May 08, 2026",
    fig: "02",
  },

  {
    title: "Construction Updates",
    description:
      "A closer look at active construction milestones, site progress, material selections, and structural execution across our developments.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=82",
    date: "Apr 28, 2026",
    fig: "03",
  },

  {
    title: "Design Stories",
    description:
      "How restrained architecture, tactile materials, warm palettes, and thoughtful spatial planning shape timeless residential experiences.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=82",
    date: "Apr 18, 2026",
    fig: "04",
  },

  {
    title: "Real Estate Insights",
    description:
      "Market observations, buyer behavior trends, appreciation potential, and investment perspectives within Georgia’s premium housing sector.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=82",
    date: "Apr 10, 2026",
    fig: "05",
  },

  {
    title: "Project Launches",
    description:
      "Introducing newly planned residential communities, curated amenities, architectural concepts, and future-ready living environments.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=82",
    date: "Apr 04, 2026",
    fig: "06",
  },
];

export function RecentArticlesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleArticles = showAll ? articles : articles.slice(0, 3);

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
      <div data-articles-heading className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 items-center md:items-end mb-10 md:mb-12 text-center md:text-left">
        <div className="col-span-12 lg:col-span-7 flex flex-col items-center md:items-start">
          <SectionLabel className="justify-center md:justify-start">Media & Blog</SectionLabel>
          <SectionHeadline size="xl" >
            Insights, updates,
            <br />
            and design stories
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-center md:items-start">
          <BodyText size="md" className="mb-8">
            Short reads for buyers who want to understand the thinking behind a Shree development, 
            from planning discipline to the details that make ownership simpler.
          </BodyText>
          <ButtonGhost href="#">Read Full Journal</ButtonGhost>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-px bg-border/20 md:grid-cols-3 mb-10">
        <AnimatePresence mode="popLayout">
          {visibleArticles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={index >= 3 ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index - 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
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

            <div className="flex flex-col flex-grow items-center md:items-start text-center md:text-left p-6 md:p-8 pt-8 md:pt-10">
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
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {!showAll && articles.length > 3 && (
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            onClick={() => setShowAll(true)}
            className="group relative flex items-center gap-3 px-8 py-4 bg-dark text-cream rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <span className="relative z-10 text-[0.65rem] uppercase font-bold tracking-[0.25em]">Show More Stories</span>
            <div className="relative z-10 w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-3.5 h-3.5 text-cream" />
            </div>
            
            {/* Hover Background Animation */}
            <div className="absolute inset-0 bg-rust translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

