"use client";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { Annotation } from "./ui/annotation";
import { CrosshairIcon } from "./ui/crosshair-icon";
import { motion } from "framer-motion";

const stats = [
  { value: "15",  suffix: "+", label: "Years Experience",     word: false },
  { value: "200", suffix: "+", label: "Homes Delivered",       word: false },
  { value: "Top", suffix: "",  label: "Quality Craftsmanship", word: true  },
];

export function CredibilityMetrics() {
  return (
    <SectionWrapper dark className="!pt-8 !pb-0 md:!py-16">

      {/* Blueprint grid lines */}
      <div className="pointer-events-none absolute inset-0 flex justify-between px-6 md:px-12 lg:px-20 z-0">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-px h-full bg-[#D43F33]/[0.06]" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-4 md:gap-6">

        {/* Headline + logo centered */}
        <div className="flex flex-col items-center text-center responsive-minimum-gap">
          {/* Logo — tighter horizontal layout */}
          <div className="relative flex items-center justify-center h-16 md:h-24 w-auto m-0">
            <img
              src="/15-years-logo.png"
              alt="15+ Years of Excellence"
              className="h-full w-auto object-contain"
            />
          </div>

          <SectionHeadline 
            light 
            size="xl" 
            className="whitespace-nowrap responsive-headline-xl m-0"
          >
            Why homeowners trust us
          </SectionHeadline>
        </div>

        {/* Stats grid */}
        <div className="w-full max-w-5xl mx-auto mt-4 md:mt-8">
          <div
            className="grid grid-cols-3 credibility-grid"
            style={{ border: "1px solid rgba(245,240,232,0.08)" }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`credibility-stat group relative flex flex-col items-center justify-center text-center px-1 py-4 sm:p-6 md:p-8 transition-colors duration-300 cursor-default
                  ${i === 2 ? '' : 'border-r'} 
                  border-[rgba(245,240,232,0.08)]
                `}
              >
                <div className="flex flex-col items-center justify-center w-full">
                  {/* Value Container - Fixed height to ensure alignment */}
                  <div 
                    className="h-8 sm:h-12 flex items-center justify-center responsive-stat-value"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      color: "#F5F0E8",
                      lineHeight: 1,
                    }}
                  >
                    <span>
                      {s.value}
                      <span style={{ color: "#D43F33" }}>{s.suffix}</span>
                    </span>
                  </div>

                  {/* Label Container - Fixed height to ensure alignment */}
                  <div className="h-8 sm:h-10 mt-1.5 sm:mt-3 flex items-start justify-center w-full">
                    <span 
                      className="opacity-70 leading-[1.2] uppercase text-cream/60 text-center"
                      style={{ 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontSize: "8px", 
                        letterSpacing: "0.05em" 
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
                <CrosshairIcon
                  light
                  className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}