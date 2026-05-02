"use client";

import { useLayoutEffect, useRef } from "react";
import { BookOpen } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

const articles = [
  {
    title: "How We Choose A Residential Site",
    description:
      "A closer look at frontage, approach roads, service access, and the quieter details that make a project feel dependable for years.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=82",
    date: "Oct 12, 2026",
  },
  {
    title: "The Value Of A Clear Handover",
    description:
      "Premium ownership is shaped by documentation, finishing checks, and simple communication during the weeks before possession.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=82",
    date: "Sep 28, 2026",
  },
  {
    title: "Designing Communities With Breathing Room",
    description:
      "Why internal roads, landscape edges, and shared open areas matter as much as individual plans and specifications.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=82",
    date: "Aug 15, 2026",
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
      className="relative overflow-hidden bg-[#FAF8F3] py-28 text-[var(--text-primary)] lg:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,174,123,0.55),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[50%] hidden w-px bg-[rgba(183,170,152,0.18)] lg:block" />

      <div className="relative mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div data-articles-heading className="mb-16 flex flex-col gap-8 md:mb-20 lg:mb-24 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-6 lg:w-[55%]">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1208]">
              Builder Notes
            </p>
            <h2
              className="font-medium leading-[1.05] tracking-tight text-[#1C1208]"
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" 
              }}
            >
              A quieter journal of materials, sites, and{" "}
              <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                decisions.
              </em>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:w-[35%] lg:items-end">
            <p 
              className="font-light leading-[1.6] text-[#1C1208]/70 lg:mt-4 lg:text-right"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
            >
              Short reads for buyers who want to understand the thinking behind a Shree development,
              from planning discipline to the details that make ownership simpler.
            </p>
            <a
              href="#"
              className="group mt-8 inline-flex h-[50px] items-center justify-center gap-3 border border-[#1C1208]/20 px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1208] transition-all duration-200 hover:-translate-y-px hover:border-[#1C1208]/40 hover:bg-[#1C1208]/5"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              Read Journal
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
              >
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.title}
              data-article-card
              className="group relative flex h-[28rem] flex-col justify-between overflow-hidden rounded-[8px] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-[#1C1208]" />
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05] group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-[#1C1208]/50 to-[#1C1208]/10" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9AE7B]">
                      Note {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="text-[#C9AE7B] transition-transform duration-300 group-hover:scale-110">
                      <BookOpen className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3
                    className="mt-10 leading-[1.15] text-[#FAF8F3]"
                    style={{ 
                      fontFamily: "'Cormorant Garamond', Georgia, serif", 
                      fontWeight: 400,
                      fontSize: "clamp(1.75rem, 2.2vw, 2.25rem)"
                    }}
                  >
                    {article.title}
                  </h3>
                </div>

                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF8F3]/60">
                    {article.date}
                  </p>
                  <p className="text-[0.95rem] font-light leading-[1.65] text-[#FAF8F3]/80">
                    {article.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9AE7B] transition-colors group-hover:text-white">
                    Read Article
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
