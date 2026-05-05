"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";

const statementLines = [
  ["We", "shape", "residences", "that", "feel", "settled", "from", "day", "one."],
  ["Every", "site", "is", "planned", "with", "clarity,", "warmth,", "and", "care."],
  ["For", "families", "and", "investors,", "Shree", "means", "a", "promise", "kept."],
];

export function IntroStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Each line gets its OWN ScrollTrigger — so they fire one at a time
      statementLines.forEach((_, lineIndex) => {
        const fillWords = gsap.utils.toArray<HTMLElement>(
          `[data-fill-word][data-line="${lineIndex}"]`
        );

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
            start: "top 72%",      // line enters view at 72% from top
            end: "top 30%",        // finishes by 30%
            toggleActions: "play none none reverse",
            // scrub: false — snappy, not tied to scroll position
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F5F0E8] py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1450px] px-8 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-center text-center">

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-16 md:mb-20">
            <div className="h-px w-8 bg-[#D43F33]" />
            <span
              className="font-semibold uppercase text-[#1C1208]/50"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
              }}
            >
              Built The Shree Way
            </span>
            <div className="h-px w-8 bg-[#D43F33]" />
          </div>

          {/* Lines — each line has its own scroll trigger via data-line-block */}
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
                            className="block text-[#1C1208]/15"
                            style={isItalic ? { fontStyle: "italic" } : undefined}
                            aria-hidden="true"
                          >
                            {isLastWord ? word.replace(".", "") : word}
                            {isLastWord && <span className="text-[#D43F33]/15">.</span>}
                          </span>

                          {/* Reveal word */}
                          <span
                            data-fill-word
                            data-line={lineIndex}
                            className="pointer-events-none absolute inset-0 block text-[#1C1208]"
                            style={{
                              clipPath: "inset(100% 0 0 0)",
                              ...(isItalic ? { fontStyle: "italic" } : {}),
                            }}
                          >
                            {isLastWord ? word.replace(".", "") : word}
                            {isLastWord && <span className="text-[#D43F33]">.</span>}
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
          <div className="max-w-[40rem] mx-auto mt-16 lg:mt-20">
            <p
              className="text-[#1C1208]/55 italic leading-[1.75]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              }}
            >
              A home should feel considered before the first visit and
              dependable long after possession. Architecting legacies through
              restraint and craftsmanship.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}