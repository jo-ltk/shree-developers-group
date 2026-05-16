"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { StatItem } from "@/components/ui/stat-item";
import { ShieldCheck, MapPinned } from "lucide-react";
import { Annotation } from "./ui/annotation";

export function AboutShree() {
  return (
    <SectionWrapper id="about-shree" noPadding fullWidth>

      {/* ── B. BRAND PHILOSOPHY — dark, equal 6/6 ── */}
      <div className="bg-[#1C1208] px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-24 relative overflow-hidden w-full">
        <div className="flex justify-center lg:justify-start">
          <SectionLabel light className="!mb-0 !text-white">Brand Philosophy</SectionLabel>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-16 items-center lg:items-start w-full">
          {/* Left col */}
          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap">
            <SectionHeadline size="lg" light className="m-0 !text-white text-center lg:text-left mx-auto lg:mx-0 responsive-headline-xl">
              The Shree Way
            </SectionHeadline>
            <BodyText light className="responsive-body-sm m-0 max-w-xl !text-white/80 !font-light text-center lg:text-left mx-auto lg:mx-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
              The finest homes are built on four pillars: Restraint, Craft, Tension, and Texture. 
              We use timeless materials that speak for themselves.
            </BodyText>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 w-full">
              <div>
                <Annotation className="!text-rust !font-bold responsive-stat-label block mb-2">Vision</Annotation>
                <BodyText light size="sm" className="responsive-body-sm !text-white/60">
                  To be the most trusted name in premium residences.
                </BodyText>
              </div>
              <div>
                <Annotation className="!text-rust !font-bold responsive-stat-label block mb-2">Mission</Annotation>
                <BodyText light size="sm" className="responsive-body-sm !text-white/60">
                  To create intentional communities with safety.
                </BodyText>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="w-full lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col gap-4 mt-6 lg:mt-0">
            {[
              {
                Icon: ShieldCheck,
                title: "Licensed",
                body: "Full state certification."
              },
              {
                Icon: MapPinned,
                title: "Expertise",
                body: "15 years in Georgia."
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 sm:gap-5 p-4 sm:p-6 border border-white/10 bg-white/[0.03] transition-colors hover:border-rust/50"
              >
                <Icon className="w-5 h-5 text-rust shrink-0" />
                <div>
                  <Annotation className="!text-white/40 !font-bold responsive-stat-label block mb-1">
                    {title}
                  </Annotation>
                  <BodyText light size="sm" className="responsive-body-sm !text-white/70">
                    {body}
                  </BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── C. STATS — mosaic tile row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#1C1208]/10 gap-px w-full overflow-hidden border-y border-[#1C1208]/10">
        {[
          { value: "15+",  label: "Years of Experience", muted: false },
          { value: "24+",  label: "Projects Completed",  muted: false },
          { value: "100%", label: "Licensed & Insured",  muted: true  },
          { value: "GA",   label: "Local Expertise",     muted: true  },
        ].map(({ value, label, muted }, i) => (
          <div
            key={label}
            className={`px-4 sm:px-8 py-8 sm:py-10 flex flex-col items-center lg:items-start text-center lg:text-left
              ${muted ? "bg-[#EDE8DF]" : "bg-[#F5F0E8]"}`}
          >
            <StatItem value={value} label={label} />
          </div>
        ))}
      </div>

      {/* ── CLOSING STAMP ── */}
    

    </SectionWrapper>
  );
}