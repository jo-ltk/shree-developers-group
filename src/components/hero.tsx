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

      intro
        .from("[data-hero-copy] > *", {
          autoAlpha: 0,
          y: 28,
          duration: 1,
          stagger: 0.14,
        })
        .from(
          "[data-hero-brand]",
          {
            autoAlpha: 0,
            y: 36,
            duration: 1.2,
          },
          "<0.2"
        )
        .from(
          "[data-hero-meta]",
          {
            autoAlpha: 0,
            y: 24,
            duration: 1,
            stagger: 0.14,
          },
          "<0.18"
        );

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
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
    >
      <div data-hero-bg className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-archipelago.png"
          alt="Architectural facade hero image"
          fill
          priority
          className="object-cover object-center brightness-[1.08] saturate-[1.04]"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,30,0.02),rgba(12,18,30,0.08)_34%,rgba(12,18,30,0.16)_68%,rgba(12,18,30,0.24))]" />

      <div className="relative mx-auto flex min-h-screen max-w-[120rem] flex-col justify-between px-5 pb-8 pt-24 text-primary-foreground sm:px-7 md:pt-28 lg:px-10 lg:pb-10">
        <div className="flex flex-1 items-start justify-center">
          <div data-hero-copy className="max-w-[62rem] text-center text-primary-foreground">
            <p className="font-sans text-[clamp(2.8rem,5.5vw,5.8rem)] font-light leading-[0.98] tracking-[-0.055em] text-primary-foreground drop-shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
              The right property exists,
            </p>
            <p className="mt-2 font-display text-[clamp(3rem,6vw,6.2rem)] italic leading-[0.94] tracking-[-0.04em] text-primary-foreground drop-shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
              finding it is our job
            </p>
            <p className="mx-auto mt-6 max-w-[36rem] text-[1.02rem] leading-8 text-primary-foreground/90 sm:text-[1.12rem]">
              We shape premium residential opportunities with clarity, discretion, and a more personal
              process from first conversation to final decision.
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
}
