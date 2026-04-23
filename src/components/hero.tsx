"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

import { ensureGsapPlugins } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

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

      intro.from("[data-hero-copy] > *", {
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
      className="relative isolate overflow-hidden bg-[#0F1113] text-[#F5F3EF]"
    >
      {/* Background image */}
      <div data-hero-bg className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-main.png"
          alt="Architectural facade hero image"
          fill
          priority
          className="object-cover object-center brightness-[0.78] saturate-[1.04]"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1113]/95 via-[#0F1113]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F1113]/80" />

      {/* Main content */}
      <div className="relative mx-auto flex min-h-screen max-w-[120rem] flex-col justify-center px-5 pb-8 pt-32 sm:px-7 md:pt-28 lg:px-20 lg:pb-10">
        <div className="flex w-full max-w-[52rem] flex-col items-start justify-center">
          <div data-hero-copy className="text-left text-[#F5F3EF]">

            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-7">
              <span className="h-[1.5px] w-9 bg-[var(--color-accent)] flex-shrink-0" />
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
                Building Spaces. Building Trust.
              </p>
            </div>

            {/* Headline */}
            <h1
              className="leading-[1.05] tracking-[-0.01em] text-[#F5F3EF]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(3rem, 5.5vw, 4.75rem)",
              }}
            >
              Crafting Landmarks,
            </h1>
            <h1
              className="mt-1 leading-[1.05] tracking-[-0.01em] text-[#F5F3EF]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(3rem, 5.5vw, 4.75rem)",
              }}
            >
              Building{" "}
              <em className="not-italic text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                Trust.
              </em>
            </h1>

            {/* Body */}
            <p className="mt-6 max-w-[38rem] text-[1.05rem] leading-[1.8] text-[#F5F3EF]/70 font-light tracking-[0.015em]">
              Shree Developers is committed to delivering exceptional residential
              and commercial spaces with quality, transparency and innovation.
            </p>

            {/* Divider */}
            <div className="my-8 h-[1px] w-12 bg-[var(--color-accent)]/30" />

            {/* Buttons — stack vertically on mobile, side by side on sm+ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

              {/* Primary CTA */}
              <a
                href="#projects"
                className="group relative flex h-[50px] items-center justify-center gap-3 bg-[var(--color-accent)] px-8 text-[11px] font-bold tracking-[0.18em] text-[#0F1113] uppercase transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                Explore Projects
                <svg
                  width="14"
                  height="14"
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
              </a>

              {/* Ghost CTA */}
              <a
                href="#about"
                className="group flex h-[50px] items-center justify-center gap-3 border border-[var(--color-accent)]/40 bg-transparent px-7 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] uppercase transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:-translate-y-px"
              >
                About Us
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Stats bar — bottom right, desktop only */}
      <div className="absolute bottom-10 right-10 z-10 hidden lg:flex border border-[var(--color-accent)]/18 bg-[#0F1113]/70 backdrop-blur-sm">
        {[
          { num: "15+", label: "Years" },
          { num: "50+", label: "Projects" },
          { num: "1000+", label: "Families" },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`px-7 py-[18px] text-center ${
              i < 2 ? "border-r border-[var(--color-accent)]/15" : ""
            }`}
          >
            <p
              className="text-[var(--color-accent)] leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.75rem",
                fontWeight: 400,
              }}
            >
              {s.num}
            </p>
            <p className="mt-[5px] text-[9.5px] font-medium tracking-[0.15em] text-[#F5F3EF]/45 uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}