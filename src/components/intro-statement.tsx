"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { BodyText } from "./ui/body-text";

const statementLines = [
  ["We", "shape", "residences", "that", "feel", "settled", "from", "day", "one."],
  ["Every", "site", "is", "planned", "with", "clarity,", "warmth,", "and", "care."],
  ["For", "families", "and", "investors,", "Shree", "means", "a", "promise", "kept."],
];

export function IntroStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const { gsap } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      statementLines.forEach((_, lineIndex) => {
        const fillWords = gsap.utils.toArray<HTMLElement>(
          `[data-fill-word][data-line="${lineIndex}"]`,
          sectionRef.current
        );

        if (fillWords.length === 0) return;

        if (reducedMotion) {
          gsap.set(fillWords, { clipPath: "inset(0% 0 0 0)" });
          return;
        }

        gsap.set(fillWords, { clipPath: "inset(100% 0 0 0)" });

        gsap.to(fillWords, {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `[data-line-block="${lineIndex}"]`,
            start: "top 72%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about" ref={sectionRef} dark={false} className="!py-16 md:!py-20">
      <div className="flex flex-col items-center justify-center text-center">
        
        {/* Eyebrow */}
        <div className="flex items-center justify-center mb-10 md:mb-12">
          <div className="h-px w-8 bg-rust/30" />
          <SectionLabel className="mb-0 mx-6">Built The Shree Way</SectionLabel>
          <div className="h-px w-8 bg-rust/30" />
        </div>

        {/* Lines */}
        <div className="max-w-[80rem] mx-auto w-full">
          <div className="flex flex-col items-center justify-center space-y-3 lg:space-y-5">
            {statementLines.map((line, lineIndex) => {
              const isLastLine = lineIndex === statementLines.length - 1;

              return (
                <div
                  key={`line-${lineIndex}`}
                  data-line-block={lineIndex}
                  className="flex flex-wrap justify-center gap-x-[0.22em] gap-y-[0.06em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(2.2rem, 5vw, 5rem)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {line.map((word, wordIndex) => {
                    const cleanWord = word.replace(/[.,]/g, "");
                    const isItalic =
                      cleanWord === "settled" ||
                      cleanWord === "warmth" ||
                      cleanWord === "Shree" ||
                      cleanWord === "promise";
                    const isLastWord = isLastLine && wordIndex === line.length - 1;

                    return (
                      <span
                        key={`${word}-${lineIndex}-${wordIndex}`}
                        className="relative inline-block overflow-hidden pb-[0.06em]"
                      >
                        {/* Ghost word */}
                        <span
                          className="block text-dark/10"
                          style={isItalic ? { fontStyle: "italic" } : undefined}
                          aria-hidden="true"
                        >
                          {isLastWord ? word.replace(".", "") : word}
                          {isLastWord && <span className="text-rust/10">.</span>}
                        </span>

                        {/* Reveal word */}
                        <span
                          data-fill-word
                          data-line={lineIndex}
                          className="pointer-events-none absolute inset-0 block text-dark"
                          style={{
                            clipPath: "inset(100% 0 0 0)",
                            ...(isItalic ? { fontStyle: "italic" } : {}),
                          }}
                        >
                          {isLastWord ? word.replace(".", "") : word}
                          {isLastWord && <span className="text-rust">.</span>}
                        </span>
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Supporting text */}
        <div className="max-w-[40rem] mx-auto mt-10 lg:mt-12">
          <BodyText size="lg" className="italic !text-dark/60">
            A home should feel considered before the first visit and
            dependable long after possession. Architecting legacies through
            restraint and craftsmanship.
          </BodyText>
        </div>
      </div>
    </SectionWrapper>
  );
}