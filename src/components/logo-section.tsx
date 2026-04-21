"use client";

import { useLayoutEffect, useRef } from "react";

import { BrandMark } from "@/components/ui/brand-mark";
import { ensureGsapPlugins } from "@/lib/gsap";

export function LogoSection() {
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
            start: "top 72%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        })
        .from("[data-logo-shell]", {
          autoAlpha: 0,
          y: 32,
          duration: 1,
        })
        .from(
          "[data-logo-mark]",
          {
            autoAlpha: 0,
            scale: 0.92,
            duration: 1.15,
          },
          "<0.08"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "color-mix(in oklab, var(--secondary) 34%, white)",
      }}
    >
      <div className="mx-auto flex min-h-[84svh] max-w-[120rem] items-center justify-center px-6 py-24 sm:px-8 md:py-28 lg:px-10 lg:py-36">
        <div data-logo-shell className="flex items-center justify-center">
          <div data-logo-mark>
            <BrandMark
              variant="image"
              className="text-[9rem] sm:text-[12rem] lg:text-[16rem]"
              dotStyle={{
                backgroundColor: "color-mix(in oklab, var(--ring) 72%, white)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
