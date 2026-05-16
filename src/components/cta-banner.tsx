"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { cn } from "@/lib/utils";

import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { ButtonPrimary } from "./ui/button-primary";
import { ButtonGhost } from "./ui/button-ghost";
import { Annotation } from "./ui/annotation";
import { CrosshairIcon } from "./ui/crosshair-icon";

const headlineLines = [
  {
    words: ["Find", "your", "place", "in", "Georgia's"],
    italic: [],
  },
  {
    words: ["most", "thoughtfully", "designed"],
    italic: [],
  },
  {
    words: ["communities"],
    italic: [],
  },
];

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const { gsap } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const fillWords = gsap.utils.toArray<HTMLElement>(
        "[data-fill-word]",
        sectionRef.current
      );

      if (fillWords.length === 0) return;

      if (reducedMotion) {
        gsap.set(fillWords, {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
        });

        return;
      }

      // Initial state: hidden by clip-path from bottom
      gsap.set(fillWords, {
        clipPath: "inset(100% 0 0 0)",
      });

      // Scrubbed reveal - trigger on the headline container for precision
      gsap.to(fillWords, {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 30%",
          scrub: 0.4,
        },
      });

      // Parallax for background
      gsap.to("[data-cta-bg]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef}
      dark
      noPadding
      className="relative min-h-[52vh] md:min-h-[58vh] flex flex-col overflow-hidden"
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 z-0">
        <div
          data-cta-bg
          className="absolute inset-0 scale-110"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2200"
            alt="Architectural Visual"
            className="w-full h-full object-cover grayscale brightness-[0.38]"
          />
        </div>

        {/* OVERLAYS */}

        <div className="absolute inset-0 bg-[#1C1208]/65 mix-blend-multiply" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-transparent to-[#1C1208]/40" />

        {/* GRID */}

        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="h-full w-px bg-white absolute left-1/4" />
          <div className="h-full w-px bg-white absolute left-1/2" />
          <div className="h-full w-px bg-white absolute left-3/4" />
        </div>
      </div>

      {/* CONTENT */}

      <div className="relative z-10 flex-1 flex flex-col px-8 md:px-12 lg:px-20 py-8 md:py-24 max-w-[1550px] mx-auto w-full">
        {/* TOP BAR */}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-rust" />

            <Annotation
              light
              className="!tracking-[0.4em] responsive-stat-label"
            >
              THE FINAL SELECTION
            </Annotation>
          </div>

          <CrosshairIcon
            light
            className="opacity-30"
          />
        </div>

        {/* CENTER */}

        <div
          ref={containerRef}
          className="flex-1 flex flex-col items-center justify-center text-center responsive-minimum-gap"
        >
          <SectionHeadline
            light
            size="xl"
            className="max-w-5xl responsive-headline-xl m-0"
            noPeriod
          >
            {headlineLines.map((line, lIndex) => (
              <div
                key={lIndex}
                className="flex flex-wrap justify-center gap-x-[0.22em]"
              >
                {line.words.map((word, wIndex) => {
                  const isLastWord =
                    lIndex === headlineLines.length - 1 &&
                    wIndex === line.words.length - 1;

                  return (
                    <span
                      key={`${word}-${lIndex}-${wIndex}`}
                      className="relative inline-block overflow-hidden pb-[0.05em]"
                    >
                      {/* GHOST */}

                      <span
                        className="block text-white/20"
                        aria-hidden="true"
                      >
                        {word}

                        {isLastWord && (
                          <span className="text-rust/20">.</span>
                        )}
                      </span>

                      {/* REVEAL */}

                      <span
                        data-fill-word
                        className="absolute inset-0 block text-white"
                      >
                        {word}

                        {isLastWord && (
                          <span className="text-rust">.</span>
                        )}
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </SectionHeadline>

          {/* SUBTEXT */}

          <div className="max-w-2xl mx-auto">
            <BodyText
              light
              size="lg"
              className="!text-white/75 responsive-body-sm"
            >
              Architecting legacies through restraint and craftsmanship.
              Your future home is a conversation away.
            </BodyText>
          </div>

          {/* BUTTONS */}

          <div className="flex items-center justify-center gap-2 sm:gap-5 mt-8">
            <ButtonPrimary
              href="#contact"
              className="!h-12 px-2 sm:!px-10 whitespace-nowrap !text-[9px] sm:!text-[10px] shrink-0"
            >
              Schedule Tour
            </ButtonPrimary>

            <ButtonGhost
              href="mailto:sales@shreedevelopersgroup.com"
              light
              className="!h-12 px-2 sm:!px-10 border-white/30 hover:border-white whitespace-nowrap !text-white/90 !text-[9px] sm:!text-[10px] shrink-0"
            >
              Contact Sales
            </ButtonGhost>
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <Annotation light className="opacity-40 responsive-stat-label">
              ESTABLISHED 2009
            </Annotation>

            <div className="w-1 h-1 bg-rust rotate-45" />

            <Annotation light className="opacity-40 responsive-stat-label">
              SUWANEE, GEORGIA
            </Annotation>
          </div>

          <Annotation
            light
            className="!text-white/30 responsive-stat-label !font-bold"
          >
            SHREE DEVELOPERS GROUP © 2026
          </Annotation>
        </div>
      </div>

      {/* CORNERS */}

      <div className="absolute top-8 left-8 w-5 h-5 border-t border-l border-white/20 pointer-events-none" />

      <div className="absolute bottom-8 right-8 w-5 h-5 border-b border-r border-white/20 pointer-events-none" />
    </SectionWrapper>
  );
}