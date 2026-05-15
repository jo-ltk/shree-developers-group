"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { StatItem } from "@/components/ui/stat-item";
import { ShieldCheck, MapPinned } from "lucide-react";

export function AboutShree() {
  return (
    <SectionWrapper id="about-shree" noPadding>

      {/* ── B. BRAND PHILOSOPHY — dark, equal 6/6 ── */}
      <div className="bg-[#1C1208] px-6 md:px-12 lg:px-20 py-16 md:py-20 relative overflow-hidden w-full">
        <div className="flex justify-center lg:justify-start">
          <SectionLabel light className="mb-6 !text-white">Brand Philosophy</SectionLabel>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:items-start w-full">
          {/* Left col */}
          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionHeadline size="lg" light className="mb-6 !text-white text-center lg:text-left mx-auto lg:mx-0">
              The Shree Way
            </SectionHeadline>
            <BodyText light size="lg" className="mb-8 max-w-xl !text-white/90 !font-light text-center lg:text-left mx-auto lg:mx-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
              We believe the finest homes are built on four pillars — Restraint,
              Craft, Tension, and Texture. Our materials speak for themselves:
              limestone, aged paper, terracotta, concrete. Timeless, never trendy.
            </BodyText>
            
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10 w-full">
              <div>
                <span className="uppercase text-rust font-bold tracking-widest text-[0.6rem] block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Vision</span>
                <BodyText light size="sm" className="!text-white/70">
                  To be the most trusted name in premium residential development.
                </BodyText>
              </div>
              <div>
                <span className="uppercase text-rust font-bold tracking-widest text-[0.6rem] block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mission</span>
                <BodyText light size="sm" className="!text-white/70">
                  To create intentional communities that foster connection and safety.
                </BodyText>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="w-full lg:col-span-5 flex flex-col gap-4">
            {[
              {
                Icon: ShieldCheck,
                title: "Licensed & Insured",
                body: "Full state certification for total peace of mind."
              },
              {
                Icon: MapPinned,
                title: "Local Expertise",
                body: "15 years of deep knowledge in Georgia's growth patterns."
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex items-center gap-5 p-6 border border-white/10 bg-white/[0.03] transition-colors hover:border-rust/50"
              >
                <Icon className="w-5 h-5 text-rust shrink-0" />
                <div>
                  <span className="uppercase text-white/40 font-bold tracking-widest text-[0.55rem] block mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {title}
                  </span>
                  <BodyText light size="sm" className="!text-white/80">
                    {body}
                  </BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── C. STATS — mosaic tile row ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 bg-[#1C1208]/8 w-full overflow-hidden">
        {[
          { value: "15+",  label: "Years of Experience", muted: false },
          { value: "24+",  label: "Projects Completed",  muted: false },
          { value: "100%", label: "Licensed & Insured",  muted: true  },
          { value: "GA",   label: "Local Expertise",     muted: true  },
        ].map(({ value, label, muted }, i) => (
          <div
            key={label}
            className={`px-8 py-10 flex flex-col items-center lg:items-start text-center lg:text-left
              ${muted ? "bg-[#EDE8DF]" : "bg-[#F5F0E8]"}
              ${i < 3 ? "border-r border-[#1C1208]/8" : ""}`}
          >
            <StatItem value={value} label={label} />
          </div>
        ))}
      </div>

      {/* ── CLOSING STAMP ── */}
    

    </SectionWrapper>
  );
}