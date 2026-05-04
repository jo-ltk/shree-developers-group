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
    const { gsap } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const fillWords = gsap.utils.toArray<HTMLElement>("[data-fill-word]");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(fillWords, { clipPath: "inset(0% 0 0 0)" });
        return;
      }

      gsap.set(fillWords, { clipPath: "inset(100% 0 0 0)" });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
        defaults: {
          ease: "none",
        },
      }).to(fillWords, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        stagger: 0.08,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FAF8F3_0%,#F2EADF_100%)]"
    >
      <div className="mx-auto flex min-h-[78svh] max-w-[120rem] flex-col items-center justify-center gap-10 px-5 pt-12 pb-24 text-center sm:px-7 lg:px-20 lg:py-36">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Built The Shree Way
          </p>
          <span className="h-px w-10 bg-[var(--color-accent)]" />
        </div>

        <div className="max-w-[72rem]">
          <div
            className="flex flex-col items-center justify-center space-y-4 text-[2.55rem] font-light leading-[1.08] tracking-normal text-[var(--text-primary)] sm:text-[3.35rem] lg:text-[4.2rem] 2xl:text-[5rem]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {statementLines.map((line, lineIndex) => (
              <div
                key={`line-${lineIndex}`}
                className="flex flex-wrap justify-center gap-x-[0.22em] gap-y-[0.08em]"
              >
                {line.map((word, wordIndex) => {
                  const cleanWord = word.replace(/[.,]/g, "");
                  const isGoldWord =
                    cleanWord === "settled" ||
                    cleanWord === "warmth" ||
                    cleanWord === "Shree" ||
                    cleanWord === "promise";

                  return (
                    <span key={`${word}-${lineIndex}-${wordIndex}`} className="relative inline-block overflow-hidden pb-[0.06em]">
                      <span
                        className={isGoldWord ? "block text-[rgba(201,174,123,0.28)]" : "block text-[rgba(58,52,46,0.22)]"}
                        style={isGoldWord ? { fontStyle: "italic" } : undefined}
                      >
                        {word}
                      </span>
                      <span
                        data-fill-word
                        className={isGoldWord ? "pointer-events-none absolute inset-0 block text-[var(--color-accent)]" : "pointer-events-none absolute inset-0 block text-[var(--text-primary)]"}
                        style={{
                          clipPath: "inset(100% 0 0 0)",
                          ...(isGoldWord ? { fontStyle: "italic" } : {}),
                        }}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[38rem]">
          <p className="text-[1.05rem] font-light leading-[1.85] text-[var(--text-primary)]">
            A home should feel considered before the first visit and dependable long after possession.
          </p>
        </div>
      </div>
    </section>
  );
}
