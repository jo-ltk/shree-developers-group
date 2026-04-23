"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

import { ensureGsapPlugins } from "@/lib/gsap";

const articles = [
  {
    title: "Victoria Park: A Vision Realised, A Legacy Secured",
    description:
      "Victoria Park will be the centrepiece of Brisbane's 2032 Games. This milestone reshapes the city and sets a long-view legacy for public life.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "2024 End Of Year Wrap Up",
    description:
      "A look back at the work, partnerships, and city-shaping projects that defined the year, and the momentum carrying into the next one.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Knowledge Precincts As A Catalyst For Renewal",
    description:
      "How knowledge precincts can renew cities and regional places through stronger public interfaces, mixed programs, and long-term civic value.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
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
        .from(
          "[data-article-card]",
          {
            autoAlpha: 0,
            y: 28,
            duration: 0.85,
            stagger: 0.12,
          },
          "<0.14"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="articles"
      ref={sectionRef}
      className="bg-[var(--color-primary)] py-20 lg:py-28 text-[var(--text-light)]"
    >
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div data-articles-heading>
          <div className="flex items-center gap-4 mb-7">
            <span className="h-[1.5px] w-9 bg-[var(--color-accent)] flex-shrink-0" />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">Insight & Analysis</p>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
              className="text-[var(--text-light)] leading-[1.1] tracking-[-0.01em] max-w-[36rem]">
            Recent <em style={{ fontStyle: "italic" }} className="text-[var(--color-accent)]">Articles.</em>
          </h2>
          <div className="my-8 h-[1px] w-12 bg-[var(--color-accent)]/30" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {articles.map((article) => (
            <article key={article.title} data-article-card className="h-full">
              <a href="#" className="border border-[var(--color-secondary)]/10 bg-[var(--color-secondary)]/[0.03] p-8 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-secondary)]/[0.05] transition-all duration-300 flex flex-col group h-full cursor-pointer">
                
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] mb-6 sm:mb-8 overflow-hidden">
                  {/* Gold corner accents */}
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-[var(--color-accent)]/50 z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                  <div className="absolute -top-1 -left-1 h-6 w-6 border-t-2 border-l-2 border-[var(--color-accent)]/50 z-10 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" />

                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[var(--color-primary)]/10 transition-opacity duration-500 group-hover:bg-transparent" />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col flex-1">
                  {/* Eyebrow or label */}
                  <div className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase mb-4">
                    Article
                  </div>
                  
                  {/* Headline in Cormorant */}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "1.8rem" }}
                      className="text-[var(--text-light)] leading-[1.1] mb-4 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    {article.title}
                  </h3>
                  
                  {/* Body */}
                  <p className="text-[0.82rem] font-light leading-[1.75] text-[var(--text-light)]/60 mb-6">
                    {article.description}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-widest text-[var(--text-light)]/80 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    <span>Read more</span>
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
