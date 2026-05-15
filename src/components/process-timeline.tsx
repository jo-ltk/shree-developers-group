"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";

import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Map as MapIcon,
  Settings2,
  HardHat,
  Key,
} from "lucide-react";

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

export function ProcessTimeline() {
  const [active, setActive] = React.useState<number | null>(0);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  const highlighted = hovered !== null ? hovered : active;

  // Auto-play logic
  React.useEffect(() => {
    if (!isAutoPlaying || hovered !== null) return;
    
    const interval = setInterval(() => {
      setActive((prev) => (prev === null || prev === 3 ? 0 : prev + 1));
    }, 2000); // 2 seconds (Fastest)    
    return () => clearInterval(interval);
  }, [isAutoPlaying, hovered]);

  const handleInteraction = (index: number) => {
    setActive(index);
    // Only stop auto-play permanently if they click a specific step
    setIsAutoPlaying(false); 
  };

  return (
    <SectionWrapper
      id="process"
      className="!pt-16 !pb-0 md:!pt-24 md:!pb-0 bg-[#F5F0E8] overflow-hidden"
    >

      {/* HEADER */}

      <div className="mb-10 sm:mb-12 md:mb-16 text-center px-2">

        <SectionLabel className="justify-center">
          Our Process
        </SectionLabel>

        <SectionHeadline
          size="xl"
          className="mt-4 px-2 responsive-headline-xl"
        >
          How we build legacies
        </SectionHeadline>
      </div>

      {/* DESKTOP + TABLET */}

      <div className="hidden md:block relative">

        {/* CONNECTOR */}

        <div className="absolute top-[40px] lg:top-[52px] left-[12.5%] right-[12.5%] h-[2px] bg-[#1C1208]/5 z-0">
          <motion.div
            className="h-full bg-rust"
            initial={{ width: "0%" }}
            animate={{ width: `${(active !== null ? active / (steps.length - 1) : 0) * 100}%` }}
            transition={{ duration: 0.4, ease: "circOut" }}
          />
        </div>

        {/* GRID */}

        <div className="grid grid-cols-4 gap-3 lg:gap-4 relative z-10">

          {steps.map((step, i) => {

            const Icon = step.icon;

            const isLit = highlighted === i;

            const isDim =
              highlighted !== null && !isLit;

            const isClicked = active === i;

            return (
              <div
                key={step.num}
                className="flex flex-col items-center cursor-pointer relative group"
                style={{
                  animation: `fadeUp 0.5s ease ${0.1 + i * 0.08}s both`,
                }}
                onMouseEnter={() => {
                  setHovered(i);
                }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleInteraction(i)}
              >

                {/* WRAPPER */}

                <div
                  className="flex flex-col items-center w-full"
                  style={{
                    opacity: isDim ? 0.28 : 1,
                    transition: "opacity 0.35s ease",
                  }}
                >

                  {/* ICON BOX */}

                  <div
                    className="relative w-[80px] lg:w-[104px] h-[80px] lg:h-[104px] flex items-center justify-center mb-6 lg:mb-8"
                    style={{
                      background: isLit
                        ? "#1C1208"
                        : "rgba(28,18,8,0.04)",

                      border: `1px solid ${
                        isLit
                          ? "#1C1208"
                          : "rgba(28,18,8,0.15)"
                      }`,

                      boxShadow: isLit
                        ? "0 16px 48px rgba(28,18,8,0.2)"
                        : "none",

                      transform: isLit
                        ? "translateY(-8px)"
                        : "translateY(0)",

                      transition:
                        "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >

                    {/* CORNERS */}

                    <div
                      className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#D43F33]/70"
                      style={{
                        opacity: isLit ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />

                    <div
                      className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#D43F33]/70"
                      style={{
                        opacity: isLit ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />

                    {/* ACTIVE RING */}
                    {isClicked && (
                      <div
                        className="absolute inset-0 border border-[#D43F33]/40"
                        style={{
                          transform: "scale(1.15)",
                          animation:
                            "pulseRing 2s ease infinite",
                        }}
                      />
                    )}

                    {/* ICON */}

                    <Icon
                      className="w-5 h-5 lg:w-6 lg:h-6"
                      style={{
                        color: isLit
                          ? "#D43F33"
                          : "rgba(28,18,8,0.45)",

                        transform: isLit
                          ? "scale(1.1)"
                          : "scale(1)",

                        transition: "all 0.35s ease",
                      }}
                    />

                    {/* DIAMOND */}

                    <div
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        left: "50%",
                        width: "8px",
                        height: "8px",
                        background: isLit
                          ? "#D43F33"
                          : "rgba(28,18,8,0.15)",

                        transform: `translateX(-50%) rotate(45deg) scale(${
                          isLit ? 1 : 0.5
                        })`,

                        transition: "all 0.4s ease",
                      }}
                    />
                  </div>

                  {/* NUMBER */}

                  <Annotation
                    className="block mb-2 responsive-stat-label"
                    style={{
                      color: isLit
                        ? "#D43F33"
                        : "rgba(28,18,8,0.4)",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {step.num}
                  </Annotation>

                  {/* LABEL */}

                  <Annotation
                    className="text-center px-2 responsive-stat-label !font-bold"
                    style={{
                      color: isLit
                        ? "#1C1208"
                        : "rgba(28,18,8,0.7)",
                      transition: "color 0.35s ease",
                      lineHeight: "1.4",
                    }}
                  >
                    {step.label}
                  </Annotation>

                  {/* DESC */}
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "circOut" }}
                        className="overflow-hidden text-center px-3 mt-4"
                      >
                        <BodyText
                          size="sm"
                          className="!text-[#1C1208]/60 !leading-relaxed responsive-body-sm"
                        >
                          {step.desc}
                        </BodyText>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden max-w-[340px] mx-auto px-2">
        <div className="relative flex flex-col gap-5">
        {/* CENTER LINE */}
        <div className="absolute left-[20px] top-[20px] bottom-[20px] w-[2px] bg-[#1C1208]/5 overflow-hidden">
          <motion.div
            className="w-full bg-rust origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: active !== null ? active / (steps.length - 1) : 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          />
        </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === i;

            return (
              <div
                key={step.num}
                className="flex items-start gap-4 relative"
                style={{
                  animation: `fadeUp 0.5s ease ${0.1 + i * 0.08}s both`,
                }}
              >
                {/* ICON BOX */}
                <button
                  onClick={() => handleInteraction(i)}
                  className="relative z-10 w-10 h-10 shrink-0 flex items-center justify-center bg-[#F5F0E8] border transition-all duration-300"
                  style={{
                    borderColor: isActive ? "#1C1208" : "rgba(28,18,8,0.12)",
                    boxShadow: isActive ? "0 8px 16px rgba(28,18,8,0.1)" : "none"
                  }}
                >
                  <Icon size={16} className={isActive ? "text-rust" : "text-[#1C1208]/40"} />
                  
                  {isActive && (
                    <>
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-rust" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-rust" />
                    </>
                  )}
                </button>

                {/* CONTENT */}
                <div className="flex-1 pt-1 cursor-pointer" onClick={() => handleInteraction(i)}>
                  <div className="flex flex-col mb-1">
                    <Annotation className={`!font-bold responsive-stat-label ${isActive ? "text-rust" : "text-[#1C1208]/30"}`}>
                      {step.num}
                    </Annotation>
                    <Annotation className="responsive-stat-label !text-[#1C1208] !font-bold leading-tight">
                      {step.label}
                    </Annotation>
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "circOut" }}
                        className="overflow-hidden mt-2"
                      >
                        <BodyText size="sm" className="responsive-body-sm !text-[#1C1208]/60 leading-relaxed pr-2">
                          {step.desc}
                        </BodyText>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}


      <style>{`
        @keyframes growLine {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }

        @keyframes growLineV {
          from {
            transform: scaleY(0);
          }

          to {
            transform: scaleY(1);
          }
        }

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