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
      className="bg-background px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[112rem]">
        <div data-articles-heading>
          <div className="h-px w-full bg-foreground/18" />
          <div className="py-6 sm:py-8 lg:py-10">
            <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-foreground/70">
              Insight & Analysis
            </p>
            <h2 className="font-sans text-[3rem] font-normal leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[4.4rem] lg:text-[5.4rem]">
              Recent Articles
            </h2>
          </div>
          <div className="h-px w-full bg-foreground/18" />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {articles.map((article) => (
            <article key={article.title} data-article-card className="group cursor-pointer border-b border-foreground/12 pb-6">
              <a href="#" className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="pt-5 sm:pt-6">
                  <h3 className="max-w-[16ch] font-sans text-[2rem] font-normal leading-[1.02] tracking-[-0.05em] text-foreground transition-colors duration-300 group-hover:text-secondary">
                    {article.title}
                  </h3>
                  <p className="mt-4 max-w-[30rem] text-[1rem] leading-8 text-foreground/78">
                    {article.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium text-foreground transition-colors duration-300 group-hover:text-secondary">
                    <span>Read more</span>
                    <span aria-hidden="true">-&gt;</span>
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
