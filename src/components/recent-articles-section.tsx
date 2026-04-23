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
          <div className="h-px w-full bg-[#C6A96B]/20" />
          <div className="py-6 sm:py-8 lg:py-10">
            <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#C6A96B]">
              Insight & Analysis
            </p>
            <h2 className="font-cormorant text-[3.5rem] leading-[1.05] text-[#112025] sm:text-[4.4rem] lg:text-[5.4rem]">
              Recent Articles
            </h2>
          </div>
          <div className="h-px w-full bg-[#C6A96B]/20" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {articles.map((article) => (
            <article key={article.title} data-article-card className="h-full">
              <a href="#" className="border border-[#C6A96B]/15 bg-[#F5F3EF] p-6 sm:p-8 transition-all duration-500 hover:border-[#C6A96B]/40 hover:shadow-[0_8px_40px_rgba(198,169,107,0.08)] hover:-translate-y-1 flex flex-col group h-full cursor-pointer">
                
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] mb-6 sm:mb-8 overflow-hidden rounded-[2px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col flex-1">
                  {/* Eyebrow or label */}
                  <div className="text-[#C6A96B] text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                    Article
                  </div>
                  
                  {/* Headline in Cormorant */}
                  <h3 className="font-cormorant text-3xl sm:text-[2.2rem] leading-[1.1] text-[#112025] mb-4 transition-colors duration-300 group-hover:text-[#C6A96B]">
                    {article.title}
                  </h3>
                  
                  {/* Body in Outfit light */}
                  <p className="font-outfit font-light text-[#787b78] leading-relaxed text-[0.95rem] sm:text-[1.05rem] mb-6">
                    {article.description}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-widest text-[#112025] transition-colors duration-300 group-hover:text-[#C6A96B]">
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
