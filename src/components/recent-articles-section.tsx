"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

import { ensureGsapPlugins } from "@/lib/gsap";

const articles = [
  {
    title: "How We Choose A Residential Site",
    description:
      "A closer look at frontage, approach roads, service access, and the quieter details that make a project feel dependable for years.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=82",
  },
  {
    title: "The Value Of A Clear Handover",
    description:
      "Premium ownership is shaped by documentation, finishing checks, and simple communication during the weeks before possession.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=82",
  },
  {
    title: "Designing Communities With Breathing Room",
    description:
      "Why internal roads, landscape edges, and shared open areas matter as much as individual plans and specifications.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=82",
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
      className="bg-[#E8DFD2] py-28 text-[var(--text-primary)] lg:py-36"
    >
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div data-articles-heading className="mx-auto flex max-w-[48rem] flex-col items-center text-center">
          <div className="mb-7 flex flex-col items-center gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Builder Notes
            </p>
            <span className="h-px w-10 shrink-0 bg-[var(--color-accent)]" />
          </div>
          <h2
            className="text-[2.55rem] font-light leading-[1.06] tracking-normal text-[var(--text-primary)] sm:text-[3.25rem] lg:text-[4rem]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            A quieter journal of materials, sites, and{" "}
            <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
              decisions.
            </em>
          </h2>
          <p className="mt-6 text-[0.98rem] font-light leading-[1.85] text-[var(--text-primary)]">
            Short reads for buyers who want to understand the thinking behind a Shree development,
            from planning discipline to the details that make ownership simpler.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {articles.map((article, index) => (
            <article key={article.title} data-article-card className={index === 1 ? "md:mt-12" : ""}>
              <a
                href="#"
                className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-[rgba(183,170,152,0.35)] bg-[#FAF8F3] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(201,174,123,0.65)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[rgba(58,52,46,0.08)] transition-opacity duration-500 group-hover:opacity-0" />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    Note {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-5 text-[2rem] font-light leading-[1.08] tracking-normal text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {article.title}
                  </h3>
                  <p className="mt-5 text-[0.88rem] font-light leading-[1.8] text-[var(--text-primary)]">
                    {article.description}
                  </p>

                  <div className="mt-auto pt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    Read more
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
