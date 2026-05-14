"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!sectionRef.current) return;
    const { gsap } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fillWords = gsap.utils.toArray<HTMLElement>("[data-fill-word]", sectionRef.current);

      if (fillWords.length === 0) return;

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
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef}
      dark
      className="relative !py-36 md:!py-48 flex flex-col justify-center min-h-[80vh]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
          alt="Cinematic Exterior Visual"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-[#1C1208]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-transparent to-transparent" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between mb-16">
        <Annotation light>FINAL STEP</Annotation>
        <Annotation light>Georgia's Premier Developer</Annotation>
      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-12">
        <SectionHeadline
          light
          size="xl"
          className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] max-w-5xl"
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
                      className="block text-white/10"
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
                        word === "Georgia's" ? "text-rust" : "text-white"
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

        <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
          <ButtonPrimary href="#contact">Schedule a Tour</ButtonPrimary>
          <ButtonGhost href="mailto:sales@shreedevelopersgroup.com" light>
            Contact Sales
          </ButtonGhost>
        </div>
      </div>
    </SectionWrapper>
  );
}