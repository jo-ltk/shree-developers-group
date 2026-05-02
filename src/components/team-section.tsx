"use client";

import { useLayoutEffect, useRef } from "react";
import { FileText, Palette, HardHat, Key } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

const commitments = [
  {
    title: "Clear Documentation",
    description: "Clear documentation before booking. Every detail is shared upfront for a composed decision.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=82",
    icon: <FileText className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "Guided Choices",
    description: "Material choices explained without pressure, focusing on enduring quality and daily comfort.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
    icon: <Palette className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "Disciplined Updates",
    description: "Construction updates shared with discipline, keeping you connected to your site's progress.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=82",
    icon: <HardHat className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "Dedicated Handover",
    description: "Handover support after possession. Our relationship continues with responsive post-sales care.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=82",
    icon: <Key className="h-6 w-6" strokeWidth={1.5} />,
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
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAF8F3] py-28 text-[var(--text-primary)] lg:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,174,123,0.55),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[50%] hidden w-px bg-[rgba(183,170,152,0.18)] lg:block" />

      <div className="relative mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div data-team-heading className="mb-16 flex flex-col gap-8 md:mb-20 lg:mb-24 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-6 lg:w-[55%]">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1208]">
              Our Promise
            </p>
            <h2
              className="font-medium leading-[1.05] tracking-tight text-[#1C1208]"
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" 
              }}
            >
              Premium is not loud. It is{" "}
              <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                consistently cared for.
              </em>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:w-[35%] lg:items-end">
            <p 
              className="font-light leading-[1.6] text-[#1C1208]/70 lg:mt-4 lg:text-right"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
            >
              Shree Developers Group works with a simple belief: real estate feels luxurious when
              buyers understand what is being built, why it matters, and who stands behind it.
            </p>
            <a
              href="#footer"
              className="group mt-8 inline-flex h-[50px] items-center justify-center gap-3 border border-[#1C1208]/20 px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1208] transition-all duration-200 hover:-translate-y-px hover:border-[#1C1208]/40 hover:bg-[#1C1208]/5"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              Start A Conversation
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

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {commitments.map((commitment, index) => (
            <article
              key={commitment.title}
              className="group relative flex h-[28rem] flex-col justify-between overflow-hidden rounded-[8px] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-[#1C1208]" />
              <img
                src={commitment.image}
                alt={commitment.title}
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05] group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-[#1C1208]/50 to-[#1C1208]/10" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9AE7B]">
                      0{index + 1}
                    </p>
                    <div className="text-[#C9AE7B] transition-transform duration-300 group-hover:scale-110">
                      {commitment.icon}
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
                    {commitment.title}
                  </h3>
                </div>

                <div className="mt-8">
                  <p className="text-[0.95rem] font-light leading-[1.65] text-[#FAF8F3]/80">
                    {commitment.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
