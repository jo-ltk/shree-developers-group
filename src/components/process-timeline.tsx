"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
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
    label: "Floor Plan Selection",
    icon: MapIcon,
    desc: "Choosing from our curated architectural layouts optimized for flow and light.",
  },
  {
    num: "03",
    label: "Customization",
    icon: Settings2,
    desc: "Refining materials, finishes, and interior details to match your personal aesthetic.",
  },
  {
    num: "04",
    label: "Construction",
    icon: HardHat,
    desc: "Our master craftsmen begin the build, managed with obsessive attention to detail.",
  },
  {
    num: "05",
    label: "Handover",
    icon: Key,
    desc: "The final walkthrough and keys to your new legacy. Welcome home.",
  },
];

export function ProcessTimeline() {
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // what's "lit" — hover takes priority over click for preview, click locks it
  const highlighted = hovered !== null ? hovered : active;

  return (
    <SectionWrapper id="process" className="!py-20 md:!py-36 bg-[#F5F0E8]">

      {/* Header - Centered for all screens */}
      <div className="mb-16 md:mb-24 text-center">
        <SectionLabel counter="09 / 09" className="justify-center">Our Process</SectionLabel>
        <SectionHeadline
          size="xl"
          className="!text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] mt-4"
        >
          How we build <em className="italic text-[#D43F33]">legacies</em>
        </SectionHeadline>
      </div>

      {/* ── DESKTOP & TABLET (Horizontal) ── */}
      <div className="hidden md:block relative">

        {/* Connector line */}
        <div className="absolute top-[52px] left-0 right-0 h-px bg-[#1C1208]/10 z-0 overflow-hidden">
          <div
            className="h-full bg-[#D43F33]/30"
            style={{ animation: "growLine 1.8s ease 0.3s both" }}
          />
        </div>

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLit = highlighted === i;
            const isDim = highlighted !== null && !isLit;
            const isClicked = active === i;

            return (
              <div
                key={step.num}
                className="flex flex-col items-center cursor-pointer relative group"
                style={{ animation: `fadeUp 0.7s ease ${0.2 + i * 0.12}s both` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActive(active === i ? null : i)}
              >
                {/* dim wrapper */}
                <div
                  className="flex flex-col items-center w-full"
                  style={{
                    opacity: isDim ? 0.28 : 1,
                    transition: "opacity 0.35s ease",
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="relative w-[80px] lg:w-[104px] h-[80px] lg:h-[104px] flex items-center justify-center mb-6 lg:mb-8"
                    style={{
                      background: isLit ? "#1C1208" : "rgba(28,18,8,0.04)",
                      border: `1px solid ${isLit ? "#1C1208" : "rgba(28,18,8,0.15)"}`,
                      boxShadow: isLit ? "0 16px 48px rgba(28,18,8,0.2)" : "none",
                      transform: isLit ? "translateY(-8px)" : "translateY(0)",
                      transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >
                    {/* Blueprint corner marks */}
                    <div
                      className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#D43F33]/70"
                      style={{ opacity: isLit ? 1 : 0, transition: "opacity 0.3s ease" }}
                    />
                    <div
                      className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#D43F33]/70"
                      style={{ opacity: isLit ? 1 : 0, transition: "opacity 0.3s ease" }}
                    />

                    {/* Locked indicator ring */}
                    {isClicked && (
                      <div
                        className="absolute inset-0 border border-[#D43F33]/40"
                        style={{ transform: "scale(1.15)", animation: "pulseRing 2s ease infinite" }}
                      />
                    )}

                    <Icon
                      className="w-5 h-5 lg:w-6 lg:h-6"
                      style={{
                        color: isLit ? "#D43F33" : "rgba(28,18,8,0.45)",
                        transform: isLit ? "scale(1.1)" : "scale(1)",
                        transition: "all 0.35s ease",
                      }}
                    />

                    {/* Rust diamond dot */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        left: "50%",
                        width: "8px",
                        height: "8px",
                        background: isLit ? "#D43F33" : "rgba(28,18,8,0.15)",
                        transform: `translateX(-50%) rotate(45deg) scale(${isLit ? 1 : 0.5})`,
                        transition: "all 0.4s ease",
                      }}
                    />
                  </div>

                  {/* Step number */}
                  <span
                    className="block mb-2"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.25em",
                      fontWeight: 600,
                      color: isLit ? "#D43F33" : "rgba(28,18,8,0.4)",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Label */}
                  <h4
                    className="uppercase text-center px-2"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      fontWeight: 700,
                      color: isLit ? "#1C1208" : "rgba(28,18,8,0.7)",
                      transition: "color 0.35s ease",
                      lineHeight: "1.4"
                    }}
                  >
                    {step.label}
                  </h4>

                  {/* Expanding description */}
                  <div
                    style={{
                      maxHeight: isLit ? "150px" : "0px",
                      opacity: isLit ? 1 : 0,
                      overflow: "hidden",
                      marginTop: isLit ? "16px" : "0px",
                      transition: "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
                      textAlign: "center",
                      padding: "0 12px",
                    }}
                  >
                    <BodyText size="sm" className="!text-[#1C1208]/60 !leading-relaxed">
                      {step.desc}
                    </BodyText>
                  </div>
                </div>

                {/* Arrow to next */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute hidden lg:block"
                    style={{
                      right: "-12px",
                      top: "42px",
                      opacity: isLit ? 1 : 0,
                      transform: isLit ? "translateX(0)" : "translateX(-10px)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D43F33" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE (Vertical) ── */}
      <div className="md:hidden relative flex flex-col items-center gap-12">

        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-[#1C1208]/10 z-0">
          <div
            className="w-full bg-[#D43F33]/20"
            style={{ animation: "growLineV 2s ease 0.5s both" }}
          />
        </div>

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = active === i;

          return (
            <div
              key={step.num}
              className="relative z-10 flex flex-col items-center w-full"
              style={{ animation: `fadeUp 0.8s ease ${0.2 + i * 0.15}s both` }}
            >
              {/* Icon Circle */}
              <div
                className="relative w-[72px] h-[72px] flex items-center justify-center cursor-pointer rounded-none"
                style={{
                  background: isActive ? "#1C1208" : "rgba(28,18,8,0.06)",
                  border: `1px solid ${isActive ? "#1C1208" : "rgba(28,18,8,0.15)"}`,
                  boxShadow: isActive ? "0 12px 30px rgba(28,18,8,0.15)" : "none",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onClick={() => setActive(active === i ? null : i)}
              >
                <div
                  className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#D43F33]/70"
                  style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease" }}
                />
                <div
                  className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#D43F33]/70"
                  style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease" }}
                />
                <Icon
                  size={20}
                  style={{
                    color: isActive ? "#D43F33" : "rgba(28,18,8,0.5)",
                    transition: "color 0.35s ease",
                  }}
                />
              </div>

              {/* Content Box */}
              <div 
                className="text-center mt-6 px-4 w-full cursor-pointer"
                onClick={() => setActive(active === i ? null : i)}
              >
                <span
                  className="block mb-1"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                    fontWeight: 600,
                    color: isActive ? "#D43F33" : "rgba(28,18,8,0.4)",
                    transition: "color 0.35s ease",
                  }}
                >
                  {step.num}
                </span>
                <h4
                  className="uppercase mb-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    fontWeight: 700,
                    color: isActive ? "#1C1208" : "rgba(28,18,8,0.7)",
                    transition: "color 0.35s ease",
                  }}
                >
                  {step.label}
                </h4>
                
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isActive ? "120px" : "0px",
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? "12px" : "0px",
                  }}
                >
                  <BodyText size="sm" className="!text-[#1C1208]/60 !leading-relaxed max-w-[280px] mx-auto">
                    {step.desc}
                  </BodyText>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom annotation */}
      <div className="mt-20 md:mt-24 flex items-center justify-center gap-4">
        <div className="h-px w-8 md:w-12 bg-[#1C1208]/10" />
        <Annotation className="!opacity-30 !text-[10px] md:!text-xs">From blueprint to reality</Annotation>
        <div className="h-px w-8 md:w-12 bg-[#1C1208]/10" />
      </div>

      <style>{`
        @keyframes growLine {
          from { width: 0% }
          to   { width: 100% }
        }
        @keyframes growLineV {
          from { height: 0% }
          to   { height: 100% }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.5; transform: scale(1.15); }
          50%       { opacity: 0.1; transform: scale(1.22); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </SectionWrapper>
  );
}