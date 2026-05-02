"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

import { ensureGsapPlugins } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const buttons = (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <a
        href="#gallery"
        className="group relative flex h-[50px] items-center justify-center gap-3 bg-[var(--color-accent)] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#3A342E] transition-all duration-200 hover:-translate-y-px hover:brightness-110"
        style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
      >
        Explore Projects
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" />
        </svg>
      </a>

      <a
        href="#team"
        className="group flex h-[50px] items-center justify-center gap-3 border border-[var(--color-support)] bg-transparent px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)]"
      >
        Our Promise
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" />
        </svg>
      </a>
    </div>
  );

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro.from(["[data-hero-copy] > *", "[data-hero-bottom-bar]"], {
        autoAlpha: 0,
        y: 28,
        duration: 1,
        stagger: 0.14,
      });

      gsap.to("[data-hero-bg]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#FAF8F3] text-[var(--text-primary)]"
    >
      <div data-hero-bg className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-main.png"
          alt="Warmly lit premium residential community by Shree Developers Group"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,243,0.98)_0%,rgba(250,248,243,0.92)_45%,rgba(250,248,243,0.45)_70%,rgba(250,248,243,0.05)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#FAF8F3_0%,rgba(250,248,243,0)_100%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-[120rem] flex-col justify-center px-5 pb-32 pt-32 sm:px-7 md:pt-28 lg:px-20 lg:pb-36">
        <div className="flex w-full max-w-[56rem] flex-col items-start justify-center">
          <div data-hero-copy className="text-left text-[var(--text-primary)]">
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1208]">
                Shree Developers Group
              </p>
            </div>

            <h1
              className="max-w-[13ch] font-medium leading-[0.98] tracking-tight text-[#1C1208]"
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(3rem, 5vw, 5rem)"
              }}
            >
              Homes with quiet luxury and{" "}
              <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                lasting trust.
              </em>
            </h1>

            <p 
              className="mt-6 max-w-[40rem] font-medium leading-[1.8] text-[#1C1208]/90"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)" }}
            >
              Warmly planned residences, dependable delivery, and refined communities shaped
              for families who value clarity, comfort, and a builder they can return to with confidence.
            </p>

            <div className="mt-8 lg:hidden">
              {buttons}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Bottom Bar (Buttons + Stats) */}
      <div data-hero-bottom-bar className="absolute inset-x-0 bottom-8 z-10 hidden w-full max-w-[120rem] items-end justify-between px-20 mx-auto lg:flex">
        {buttons}
        <div className="flex border border-[rgba(183,170,152,0.35)] bg-[rgba(250,248,243,0.85)] backdrop-blur-md">
          {[
            { num: "15+", label: "Years of delivery" },
            { num: "50+", label: "Completed projects" },
            { num: "1000+", label: "Families served" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-5 text-left ${i < 2 ? "border-r border-[rgba(183,170,152,0.35)]" : ""}`}
            >
              <p
                className="text-[2rem] leading-none text-[var(--color-accent)]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
              >
                {s.num}
              </p>
              <p className="mt-2 text-[9.5px] font-semibold uppercase leading-[1.5] tracking-[0.16em] text-[var(--text-primary)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
