"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { ButtonGhost } from "@/components/ui/button-ghost";
import { FigMarker } from "@/components/ui/fig-marker";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";

const metrics = [
  {
    value: "15+",
    title: "Years of trusted delivery",
    body: "A builder presence shaped by practical site decisions, transparent timelines, and measured execution.",
  },
  {
    value: "50+",
    title: "Completed developments",
    body: "Residential communities delivered with careful approvals, durable finishes, and dependable handovers.",
  },
  {
    value: "1000+",
    title: "Families served",
    body: "A growing homeowner community built through comfort, clarity, and long-term confidence.",
  },
];

export function MetricsSection() {
  return (
    <SectionWrapper id="metrics" className="!bg-[#F5F0E8]">
      {/* ================= TOP EDITORIAL GRID ================= */}
      <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10">
        {/* LEFT MAIN BLOCK */}
        <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8] p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[520px]">
          <div>
            <SectionLabel counter="04 / 08">Measured Proof</SectionLabel>

            <SectionHeadline size="xl" className="max-w-[700px]">
              Numbers that
              <br />
              speak plainly
            </SectionHeadline>

            <BodyText className="mt-8 max-w-[500px]">
              Premium value is not only seen in finishes, but in fewer
              uncertainties, verified approvals, and a process buyers can trust
              without hesitation.
            </BodyText>

            <ButtonGhost href="#gallery" className="mt-8">
              View Projects
            </ButtonGhost>
          </div>

          <div className="mt-16 flex items-end justify-between">
            <Annotation>RESEARCH LAB & PREMIUM RESIDENCES</Annotation>
            <CrosshairIcon />
          </div>
        </div>

        {/* RIGHT TOP CARD */}
        <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8] p-8 md:p-10 lg:p-12 border-l border-[#1C1208]/10 min-h-[260px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <Annotation>01</Annotation>
            <CrosshairIcon />
          </div>

          <div>
            <div
              className="text-[#1C1208] leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.5rem,4vw,4.5rem)",
                fontWeight: 300,
              }}
            >
              24/7
            </div>

            <SectionHeadline size="md" className="mt-4 !text-[2rem]">
              After-sales support
            </SectionHeadline>

            <BodyText className="mt-4">
              A relationship that continues after possession with responsive
              assistance and clear communication.
            </BodyText>
          </div>
        </div>

        {/* RIGHT BOTTOM CARD */}
        <div className="col-span-12 lg:col-span-4 bg-[#EDE8DF] p-8 md:p-10 lg:p-12 border-l border-t border-[#1C1208]/10 min-h-[260px] flex flex-col justify-between lg:col-start-9">
          <Annotation>FIG. 11 / DOCUMENTED TRUST</Annotation>

          <div>
            <SectionHeadline size="md" className="mt-6 !text-[2rem]">
              Trust grows
              <br />
              through proof
            </SectionHeadline>

            <BodyText className="mt-4">
              Every completed handover, every family housed, and every verified
              approval contributes to a reputation built carefully over time.
            </BodyText>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM DARK STAT STRIP ================= */}
      <div className="grid grid-cols-12 gap-px bg-[#F5F0E8]/10 mt-px">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className="col-span-12 lg:col-span-4 bg-[#1C1208] p-8 md:p-10 lg:p-12 group transition-all duration-500 hover:bg-[#24170D]"
          >
            <div className="flex items-start justify-between mb-10">
              <Annotation light>0{index + 2}</Annotation>
              <div className="transition-transform duration-500 group-hover:rotate-45">
                <CrosshairIcon light />
              </div>
            </div>

            <div
              className="text-[#F5F0E8] leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(3rem,5vw,5rem)",
                fontWeight: 300,
              }}
            >
              {metric.value}
            </div>

            <SectionHeadline
              size="md"
              light
              className="mt-4 !text-[clamp(1.8rem,2vw,2.5rem)]"
            >
              {metric.title}
            </SectionHeadline>

            <BodyText light className="mt-4 !text-[#F5F0E8]/72 max-w-[90%]">
              {metric.body}
            </BodyText>
          </div>
        ))}
      </div>

      <FigMarker fig="fig. 11" label="Growth Metrics" />
    </SectionWrapper>
  );
}