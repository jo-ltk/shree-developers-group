"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  MessageSquare,
  Settings2,
  HardHat,
  Key,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4000;

const steps = [
  {
    num: "01",
    label: "Consultation",
    icon: MessageSquare,
    desc: "A deep dive into your vision, lifestyle requirements, and preferred location.",
  },
  {
    num: "02",
    label: "Design & Craft",
    icon: Settings2,
    desc: "Refining architectural details, finishes, and materials to match your aesthetic.",
  },
  {
    num: "03",
    label: "Construction",
    icon: HardHat,
    desc: "Our master craftsmen begin the build, managed with obsessive attention to detail.",
  },
  {
    num: "04",
    label: "Handover",
    icon: Key,
    desc: "The final walkthrough and keys to your new legacy. Welcome home.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function StepDescription({
  text,
  visible,
  className,
}: {
  text: string;
  visible: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative min-h-[5.5rem] md:min-h-[5rem]",
        className,
      )}
      aria-hidden={!visible}
    >
      <BodyText
        size="sm"
        className={cn(
          "responsive-body-sm !leading-relaxed !text-[#1C1208]/60 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible ? "opacity-100" : "pointer-events-none opacity-0",
          !visible && "absolute inset-x-0 top-0",
        )}
      >
        {text}
      </BodyText>
    </div>
  );
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const highlighted = hovered ?? active;
  const progress =
    highlighted !== null ? highlighted / (steps.length - 1) : 0;

  const handleInteraction = useCallback((index: number) => {
    setActive(index);
    setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    if (reduceMotion || !isAutoPlaying || !isInView || hovered !== null) {
      return;
    }

    const interval = window.setInterval(() => {
      setActive((prev) => (prev >= steps.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [hovered, isAutoPlaying, isInView, reduceMotion]);

  return (
    <SectionWrapper
      ref={sectionRef}
      id="process"
      className="!pt-8 !pb-0 md:!pt-24 md:!pb-0 bg-[#F5F0E8] overflow-hidden"
    >
      <div className="mb-8 md:mb-16 text-center px-2 flex flex-col items-center responsive-minimum-gap">
        <SectionLabel className="justify-center !mb-0">Our Process</SectionLabel>
        <SectionHeadline size="xl" className="m-0 px-2 responsive-headline-xl">
          How we build legacies
        </SectionHeadline>
      </div>

      {/* DESKTOP + TABLET */}
      <div className="hidden md:block relative">
        <div className="absolute top-[40px] lg:top-[52px] left-[12.5%] right-[12.5%] h-[2px] bg-[#1C1208]/5 z-0 overflow-hidden">
          <motion.div
            className="h-full bg-rust will-change-[width]"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease: EASE_OUT,
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-3 lg:gap-4 relative z-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLit = highlighted === i;
            const isDim = highlighted !== null && !isLit;
            const isClicked = active === i;

            return (
              <div
                key={step.num}
                className="flex flex-col items-center cursor-pointer relative group motion-safe:animate-[fadeUp_0.5s_ease_both]"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleInteraction(i)}
              >
                <div
                  className="flex w-full flex-col items-center transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: isDim ? 0.28 : 1 }}
                >
                  <div
                    className={cn(
                      "relative mb-6 flex h-[80px] w-[80px] items-center justify-center transition-[transform,background-color,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] lg:mb-8 lg:h-[104px] lg:w-[104px]",
                      isLit
                        ? "-translate-y-2 border-[#1C1208] bg-[#1C1208] shadow-[0_16px_48px_rgba(28,18,8,0.2)]"
                        : "translate-y-0 border-[rgba(28,18,8,0.15)] bg-[rgba(28,18,8,0.04)]",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-2 left-2 h-2 w-2 border-t border-l border-[#D43F33]/70 transition-opacity duration-300",
                        isLit ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div
                      className={cn(
                        "absolute bottom-2 right-2 h-2 w-2 border-b border-r border-[#D43F33]/70 transition-opacity duration-300",
                        isLit ? "opacity-100" : "opacity-0",
                      )}
                    />

                    {isClicked && !reduceMotion && (
                      <div
                        className="absolute inset-0 border border-[#D43F33]/40 motion-safe:animate-[pulseRing_2s_ease_infinite]"
                        style={{ transform: "scale(1.15)" }}
                      />
                    )}

                    <Icon
                      className={cn(
                        "h-5 w-5 transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-6 lg:w-6",
                        isLit
                          ? "scale-110 text-rust"
                          : "scale-100 text-[#1C1208]/45",
                      )}
                    />

                    <div
                      className={cn(
                        "absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transition-[transform,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isLit
                          ? "scale-100 bg-rust"
                          : "scale-50 bg-[#1C1208]/15",
                      )}
                    />
                  </div>

                  <Annotation
                    className={cn(
                      "mb-2 block responsive-stat-label transition-colors duration-300",
                      isLit ? "text-rust" : "text-[#1C1208]/40",
                    )}
                  >
                    {step.num}
                  </Annotation>

                  <Annotation
                    className={cn(
                      "px-2 text-center responsive-stat-label !font-bold transition-colors duration-300",
                      isLit ? "text-[#1C1208]" : "text-[#1C1208]/70",
                    )}
                    style={{ lineHeight: 1.4 }}
                  >
                    {step.label}
                  </Annotation>

                  <StepDescription
                    text={step.desc}
                    visible={isLit}
                    className="mt-4 px-3 text-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden mx-auto max-w-[340px] px-2">
        <div
          className="relative flex flex-col gap-5"
          role="tablist"
          aria-label="Our process steps"
        >
          <div
            className="pointer-events-none absolute top-5 bottom-5 left-5 w-0.5 overflow-hidden bg-[#1C1208]/5"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top bg-rust will-change-transform"
              initial={false}
              animate={{ scaleY: progress }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: EASE_OUT,
              }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === i;

            return (
              <div
                key={step.num}
                className="relative flex items-start gap-4 motion-safe:animate-[fadeUp_0.5s_ease_both]"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${step.num} ${step.label}`}
                  onClick={() => handleInteraction(i)}
                  className={cn(
                    "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border bg-[#F5F0E8] transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "border-[#1C1208] shadow-[0_8px_16px_rgba(28,18,8,0.1)]"
                      : "border-[#1C1208]/12",
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-rust" : "text-[#1C1208]/40",
                    )}
                  />
                  {isActive && (
                    <>
                      <span className="absolute top-1 left-1 h-1.5 w-1.5 border-t border-l border-rust" />
                      <span className="absolute bottom-1 right-1 h-1.5 w-1.5 border-b border-r border-rust" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="flex-1 pt-1 text-left"
                  onClick={() => handleInteraction(i)}
                >
                  <div className="mb-1 flex flex-col">
                    <Annotation
                      className={cn(
                        "responsive-stat-label !font-bold transition-colors duration-300",
                        isActive ? "text-rust" : "text-[#1C1208]/30",
                      )}
                    >
                      {step.num}
                    </Annotation>
                    <Annotation className="responsive-stat-label !font-bold leading-tight !text-[#1C1208]">
                      {step.label}
                    </Annotation>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div
          className="relative mt-6 min-h-[5.5rem] pl-14"
          aria-live="polite"
          aria-atomic="true"
        >
          {steps.map((step, i) => (
            <StepDescription
              key={step.num}
              text={step.desc}
              visible={active === i}
              className={active === i ? undefined : "absolute inset-0 pl-0"}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1.15);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.22);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
