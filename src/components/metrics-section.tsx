"use client";

import Link from "next/link";
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
    <SectionWrapper id="metrics" className="!bg-[#F5F0E8]" noPadding>
      {/* ================= EDITORIAL GRID ================= */}
      <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10 border-y border-[#1C1208]/10">
        
        {/* ROW 1 LEFT: MAIN NARRATIVE */}
        <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8] p-6 md:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="text-[#D43F33] font-semibold text-[0.6rem] tracking-[0.2em]">04 / 08</span>
              <Annotation>MEASURED PROOF</Annotation>
            </div>

            <SectionHeadline size="xl" className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98]">
              Numbers that
              <br />
              speak plainly
            </SectionHeadline>

            <BodyText className="mt-8 text-[1.05rem] leading-[1.7] text-[#1C1208]/70">
              Premium value is not only seen in finishes, but in fewer
              uncertainties, verified approvals, and a process buyers can trust
              without hesitation. Architecture built on restraint and proof.
            </BodyText>

            <Link href="#gallery" className="group mt-10 inline-flex items-center gap-4 text-[0.65rem] font-bold tracking-[0.25em] text-[#1C1208] uppercase">
              View Projects
              <span className="w-8 h-px bg-[#1C1208] transition-all duration-300 group-hover:w-12" />
            </Link>
          </div>
        </div>

        {/* ROW 1 RIGHT: STAT 01 */}
        <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8] p-6 md:p-8 lg:p-10 flex flex-col justify-between border-l border-[#1C1208]/10">
          <div className="flex justify-between items-start mb-8 md:mb-10">
            <Annotation>01 / AVAILABILITY</Annotation>
            <CrosshairIcon />
          </div>

          <div>
            <div className="text-[#1C1208] font-light leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem" }}>
              24/7
            </div>
            <SectionHeadline size="md" className="!text-[1.6rem] leading-[1.2]">
              After-sales
              <br />
              support
            </SectionHeadline>
            <BodyText className="mt-4 text-[#1C1208]/60 text-sm">
              A relationship that continues after possession with responsive
              assistance and clear communication.
            </BodyText>
          </div>
        </div>

        {/* ROW 2 LEFT: FEATURED IMAGE */}
        <div className="col-span-12 lg:col-span-8 bg-[#EDE8DF] relative min-h-[360px] overflow-hidden group">
          <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
            <Annotation className="!text-[#F5F0E8]/80">RESEARCH LAB & PREMIUM RESIDENCES</Annotation>
            <CrosshairIcon light />
          </div>

          <img
            src="/images/metrics-featured.png"
            alt="Shree Developers Premium Residences"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/40 to-transparent" />
        </div>

        {/* ROW 2 RIGHT: STAT 02 */}
        <div className="col-span-12 lg:col-span-4 bg-[#1C1208] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
          <Annotation light>FIG. 11 / DOCUMENTED TRUST</Annotation>

          <div className="mt-8 md:mt-10">
            <SectionHeadline size="lg" light className="!text-[2.2rem] leading-[1.05]">
              Trust grows
              <br />
              through proof
            </SectionHeadline>
            <BodyText light className="mt-6 !text-[#F5F0E8]/70 leading-[1.7] text-sm">
              Every completed handover, every family housed, and every verified
              approval contributes to a reputation built carefully over time.
            </BodyText>
            
            <div className="mt-10 w-10 h-px bg-[#D43F33]" />
          </div>
        </div>
      </div>

      {/* ================= STATS STRIP ================= */}
      <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10 border-b border-[#1C1208]/10">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className="col-span-12 lg:col-span-4 bg-[#F5F0E8] p-8 md:p-10 lg:p-12 group transition-colors duration-700 hover:bg-[#EDE8DF]"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-[#D43F33] font-semibold text-[0.6rem] tracking-[0.2em]">0{index + 2}</span>
              <CrosshairIcon className="opacity-20 group-hover:rotate-90 transition-transform duration-700" />
            </div>

            <div className="text-[#1C1208] font-light leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem" }}>
              {metric.value}
            </div>

            <SectionHeadline size="md" className="!text-[1.6rem] mb-3">
              {metric.title}
            </SectionHeadline>

            <BodyText className="text-[#1C1208]/60 leading-[1.7] text-sm">
              {metric.body}
            </BodyText>
          </div>
        ))}
      </div>

      <FigMarker fig="fig. 11" label="Growth Metrics" />
    </SectionWrapper>
  );
}