"use client";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { Annotation } from "./ui/annotation";
import { CrosshairIcon } from "./ui/crosshair-icon";
import { motion } from "framer-motion";

const stats = [
  { value: "15",      suffix: "+", label: "Years Experience",     word: false },
  { value: "200",     suffix: "+", label: "Homes Delivered",       word: false },
  { value: "Trusted", suffix: "",  label: "Across Kerala, IN",     word: true  },
  { value: "Top",     suffix: "",  label: "Quality Craftsmanship", word: true  },
];

export function CredibilityMetrics() {
  return (
    <SectionWrapper dark className="!py-8 md:!py-12">

      {/* Blueprint grid lines */}
      <div className="pointer-events-none absolute inset-0 flex justify-between px-6 md:px-12 lg:px-20 z-0">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-px h-full bg-[#D43F33]/[0.06]" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-4 md:gap-6">

        {/* Headline + logo centered */}
        <div className="flex flex-col items-center text-center gap-2 md:gap-3">
          {/* Logo — tighter horizontal layout */}
          <div className="relative flex items-center justify-center h-16 md:h-24 w-auto mb-2">
            <img
              src="/15-years-logo.png"
              alt="15+ Years of Excellence"
              className="h-full w-auto object-contain"
            />
          </div>

          <SectionHeadline light size="xl">
            Why homeowners trust us
          </SectionHeadline>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 credibility-grid"
          style={{ border: "1px solid rgba(245,240,232,0.08)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="credibility-stat group relative flex flex-col items-center text-center gap-2 p-5 sm:p-6 md:p-8 transition-colors duration-300 cursor-default"
              style={{
                borderRight: i === 1 || i === 3 ? "none" : "1px solid rgba(245,240,232,0.08)",
                borderBottom: i < 2 ? "1px solid rgba(245,240,232,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: s.word ? "clamp(1.5rem,3.5vw,2.6rem)" : "clamp(2.2rem,5vw,3.8rem)",
                  fontWeight: 300,
                  color: "#F5F0E8",
                  lineHeight: 1,
                }}
              >
                {s.value}
                <span style={{ color: "#D43F33" }}>{s.suffix}</span>
              </div>
              <Annotation light>{s.label}</Annotation>
              <CrosshairIcon
                light
                className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}