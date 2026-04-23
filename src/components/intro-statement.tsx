"use client";

import { useLayoutEffect, useRef } from "react";

import { ensureGsapPlugins } from "@/lib/gsap";

const statementLines = [
  ["Archipelago", "is", "a", "distinguished", "Australian"],
  ["city-making", "practice."],
  ["We", "challenge", "the", "boundaries", "of", "conventional"],
  ["design", "to", "create", "great", "cities", "and", "buildings", "for"],
  ["people,", "now", "and", "in", "the", "future."],
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
      ref={sectionRef}
      className="bg-[var(--color-secondary)] relative overflow-hidden"
    >
      <div className="mx-auto flex min-h-[92svh] max-w-[120rem] items-center justify-center px-6 py-24 sm:px-8 md:py-28 lg:px-10 lg:py-36">
        <div className="max-w-[86rem] text-center">
          <div 
            className="space-y-2 text-balance text-[clamp(2.25rem,4.8vw,5rem)] leading-[1.1] tracking-[-0.01em] text-[var(--text-primary)] sm:space-y-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            {statementLines.map((line, lineIndex) => (
              <div
                key={`line-${lineIndex}`}
                className="flex flex-wrap justify-center gap-x-[0.22em] gap-y-[0.08em] px-[0.04em] py-[0.04em]"
              >
                {line.map((word, wordIndex) => {
                  const isGoldWord = word === "distinguished" || word === "great" || word === "future.";
                  return (
                    <span key={`${word}-${lineIndex}-${wordIndex}`} className="relative inline-block overflow-hidden pb-[0.06em]">
                      <span 
                        className={`block ${isGoldWord ? "text-[var(--color-accent)]/30" : "text-[var(--text-primary)]/20"}`}
                        style={isGoldWord ? { fontStyle: "italic" } : {}}
                      >
                        {word}
                      </span>
                      <span
                        data-fill-word
                        className={`pointer-events-none absolute inset-0 block ${isGoldWord ? "text-[var(--color-accent)]" : "text-[var(--text-primary)]"}`}
                        style={{
                          clipPath: "inset(100% 0 0 0)",
                          ...(isGoldWord ? { fontStyle: "italic" } : {})
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
      </div>
    </section>
  );
}
