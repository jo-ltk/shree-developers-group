"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { ButtonPrimary } from "./ui/button-primary";
import { ButtonGhost } from "./ui/button-ghost";
import { Annotation } from "./ui/annotation";

const headlineLines = [
  {
    words: ["Find", "your", "place"],
    italic: [],
  },
  {
    words: ["in", "Georgia's", "most"],
    italic: ["Georgia's"],
  },
  {
    words: ["thoughtfully", "designed", "communities"],
    italic: [],
  },
];

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const { gsap } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fillWords = gsap.utils.toArray<HTMLElement>("[data-fill-word]");

      if (reducedMotion) {
        gsap.set(fillWords, { clipPath: "inset(0% 0 0 0)" });
        return;
      }

      // Initial state
      gsap.set(fillWords, { clipPath: "inset(100% 0 0 0)" });

      gsap.to(fillWords, {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef}
      dark
      className="relative !py-8 md:!py-10 grid"
      style={{ gridTemplateRows: "auto 1fr auto" } as React.CSSProperties}
    >
      {/* Inset frame - bottom line only */}
      <div className="pointer-events-none absolute inset-7 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F5F0E8]/[0.08]" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between">
        <Annotation light>04 / 04</Annotation>
        <Annotation light>Georgia's Premier Developer</Annotation>
      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 py-4">
        <SectionHeadline
          light
          size="xl"
          className="!text-[clamp(2.6rem,5vw,5rem)] !leading-[1.02] max-w-7xl"
          noPeriod
        >
          {headlineLines.map((line, lIndex) => (
            <div
              key={lIndex}
              className="flex flex-wrap justify-center gap-x-[0.22em] gap-y-[0.06em]"
            >
              {line.words.map((word, wIndex) => {
                const isItalic = line.italic.includes(word);
                const isLastWord = lIndex === headlineLines.length - 1 && wIndex === line.words.length - 1;

                return (
                  <span
                    key={`${word}-${lIndex}-${wIndex}`}
                    className="relative inline-block overflow-hidden pb-[0.06em]"
                  >
                    {/* Ghost word */}
                    <span
                      className="block text-[#F5F0E8]/10"
                      style={isItalic ? { fontStyle: "italic" } : undefined}
                      aria-hidden="true"
                    >
                      {word}
                      {isLastWord && <span className="text-rust/10">.</span>}
                    </span>

                    {/* Reveal word */}
                    <span
                      data-fill-word
                      className={cn(
                        "pointer-events-none absolute inset-0 block",
                        word === "Georgia's" ? "text-rust" : "text-[#F5F0E8]"
                      )}
                      style={{
                        clipPath: "inset(100% 0 0 0)",
                        ...(isItalic ? { fontStyle: "italic" } : {}),
                      }}
                    >
                      {word}
                      {isLastWord && <span className="text-rust">.</span>}
                    </span>
                  </span>
                );
              })}
              {lIndex < headlineLines.length - 1 && <div className="w-full h-0" />}
            </div>
          ))}
        </SectionHeadline>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <ButtonPrimary href="#contact">Schedule a Tour</ButtonPrimary>
          <ButtonGhost href="mailto:sales@shreedevelopersgroup.com" className="!text-rust">
            Contact Sales
          </ButtonGhost>
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-end h-4">
        {/* Removed bottom text for height reduction */}
      </div>
    </SectionWrapper>
  );
}