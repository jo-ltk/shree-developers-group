"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { FigMarker } from "@/components/ui/fig-marker";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { motion } from "framer-motion";

/* ───────────────── TYPES ───────────────── */

export interface MetricItem {
  value: string;
  title: string;
  body: string;
}

export interface MetricsSectionData {
  imageSrc: string;
  imageLabel: string;
  sectionCounter: string;
  headline: string;
  bodyText: string;

  stat01: {
    number: string;
    label: string;
    value: string;
    title: string;
    body: string;
  };

  stat02: {
    headline: string;
    body: string;
  };

  metrics: MetricItem[];

  figLabel: string;
  mapHref?: string;
}

interface MetricsSectionProps {
  data: MetricsSectionData;
  id?: string;
  reverse?: boolean;
}

/* ───────────────── DATA : SYDNEY OAKS ───────────────── */

const sydneyOaksData: MetricsSectionData = {
  imageSrc: "/svg/siteplan- sydneyoaks-01.svg",

  imageLabel: "SYDNEY OAKS",

  sectionCounter: "04 / 08",

  headline: "Sydney Oaks",

  bodyText:
    "A strategically planned mixed-use community designed to combine residential living, connectivity, and long-term growth within North Georgia's emerging development corridor.",

  stat01: {
    number: "01",
    label: "MASTERPLAN",
    value: "89",

    title: "Mixed-use\ncommunity",

    body: "Designed to integrate residential living, accessibility, and future-focused commercial opportunities into one connected environment.",
  },

  stat02: {
    headline: "Live.\nWork.\nGrow.",

    body: "Sydney Oaks is positioned to support long-term value through connected planning, visibility, and community-focused development.",
  },

  metrics: [
    {
      value: "89+",
      title: "Planned residences",
      body: "A master-planned residential layout focused on accessibility, comfort, and community living.",
    },

    {
      value: "Mixed",
      title: "Integrated development",
      body: "A carefully planned balance between residential spaces and future commercial opportunities.",
    },

    {
      value: "North GA",
      title: "Growth corridor location",
      body: "Positioned within one of North Georgia's expanding development regions.",
    },
  ],

  figLabel: "Sydney Oaks",
};

/* ───────────────── DATA : ELYSIAN GATES ───────────────── */

const elysianGatesData: MetricsSectionData = {
  imageSrc: "/svg/elysian-gates.svg",

  imageLabel: "ELYSIAN GATES",

  sectionCounter: "05 / 08",

  headline: "Elysian Gates",

  bodyText:
    "A boutique gated residential enclave surrounded by greenery, designed to deliver privacy, refined living, and a calm estate atmosphere through intentional low-density planning.",

  stat01: {
    number: "02",
    label: "PRIVATE ESTATE",
    value: "27",

    title: "Exclusive\ngated homes",

    body: "A private residential environment designed around greenery, security, and a slower refined pace of living.",
  },

  stat02: {
    headline: "Private.\nCalm.\nRefined.",

    body: "Curved internal roads, landscape integration, and low-density placement create a boutique luxury estate experience.",
  },

  metrics: [
    {
      value: "27",
      title: "Private residences",
      body: "An intentionally limited collection of homes designed for exclusivity and comfort.",
    },

    {
      value: "Gated",
      title: "Secure estate planning",
      body: "A controlled residential environment focused on privacy and peaceful community living.",
    },

    {
      value: "Nature",
      title: "Landscape integration",
      body: "A masterplan designed to preserve greenery and create a nature-connected lifestyle.",
    },
  ],

  figLabel: "Elysian Gates",
};

/* ───────────────── COMPONENT ───────────────── */

export function MetricsSection({
  data,
  id = "metrics",
  reverse = false,
}: MetricsSectionProps) {
  return (
    <SectionWrapper id={id} className="!bg-[#F5F0E8]" noPadding>
      {/* ───────────────── TOP GRID ───────────────── */}

      <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10 border-y border-[#1C1208]/10">
        {/* ───────────────── FIRST ROW ───────────────── */}

        {!reverse ? (
          <>
            {/* LEFT CONTENT */}

            <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8] p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="max-w-[640px]">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="text-[#D43F33] font-semibold text-[0.6rem] tracking-[0.2em]">
                    {data.sectionCounter}
                  </span>

                  <Annotation>{data.imageLabel}</Annotation>
                </div>

                <SectionHeadline
                  size="xl"
                  className="!text-[clamp(2.8rem,4vw,4.8rem)] leading-[0.98]"
                  noPeriod
                >
                  <span className="relative z-0 inline-block group/highlight cursor-default">
                    <span className="relative z-10">{data.headline}</span>
                    <span className="absolute bottom-[8%] left-[-2%] w-[104%] h-[35%] bg-[#D43F33]/20 -z-10 -rotate-1 skew-x-12 transition-all duration-500 ease-out group-hover/highlight:h-[50%] group-hover/highlight:bg-[#D43F33]/30 group-hover/highlight:-rotate-2" />
                  </span>
                  <span className="text-[#D43F33]">.</span>
                </SectionHeadline>

                <BodyText className="mt-8 text-[1.05rem] leading-[1.7] text-[#1C1208]/70">
                  {data.bodyText}
                </BodyText>

                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <Link
                    href="#gallery"
                    className="group inline-flex items-center gap-4 text-[0.65rem] font-bold tracking-[0.25em] text-[#1C1208] uppercase"
                  >
                    View Project

                    <span className="w-8 h-px bg-[#1C1208] transition-all duration-300 group-hover:w-12" />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT STAT */}

            <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8] p-6 md:p-8 lg:p-10 flex flex-col justify-between border-l border-[#1C1208]/10">
              <div className="flex justify-between items-start mb-8 md:mb-10">
                <Annotation>
                  {data.stat01.number} / {data.stat01.label}
                </Annotation>

                <CrosshairIcon />
              </div>

              <div>
                <div
                  className="text-[#1C1208] font-light leading-none mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "3rem",
                  }}
                >
                  {data.stat01.value}
                </div>

                <SectionHeadline
                  size="md"
                  className="!text-[1.6rem] leading-[1.2]"
                >
                  {data.stat01.title}
                </SectionHeadline>

                <BodyText className="mt-4 text-[#1C1208]/60 text-sm">
                  {data.stat01.body}
                </BodyText>
              </div>
            </div>

            {/* LEFT IMAGE */}

            <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8] py-6 px-0 md:p-10 lg:p-0 lg:pl-12 flex flex-col">
              <div className="relative flex-1 w-full h-full min-h-[350px] md:min-h-[420px] overflow-hidden group bg-[#EDE8DF]">
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-4">
                  <Annotation className="!text-[#F5F0E8]/90">
                    {data.imageLabel}
                  </Annotation>

                  <CrosshairIcon light />
                </div>

                <img
                  src={data.imageSrc}
                  alt={data.imageLabel}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/60 via-[#1C1208]/20 to-transparent" />

                {data.mapHref && (
                  <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none p-4">
                    <Link
                      href={data.mapHref}
                      className="pointer-events-auto group relative flex flex-row items-center justify-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-5 bg-[#1C1208]/40 backdrop-blur-xl rounded-full border border-white/20 overflow-hidden transition-all duration-500 hover:bg-[#D43F33]/80 hover:border-[#D43F33] hover:scale-105 hover:shadow-2xl hover:shadow-[#D43F33]/20"
                    >
                      <span className="relative z-10 text-white text-[0.6rem] md:text-[0.75rem] font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase text-center drop-shadow-md whitespace-nowrap">
                        Explore Interactive Map
                      </span>
                      <span className="relative z-10 hidden sm:block w-6 md:w-12 h-px bg-white/60 transition-all duration-500 group-hover:w-10 md:group-hover:w-16 group-hover:bg-white" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT DARK PANEL */}

            <div className="col-span-12 lg:col-span-4 bg-[#1C1208] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <Annotation light>
                FIG. {data.sectionCounter.slice(0, 2).trim()} /
                DEVELOPMENT
              </Annotation>

              <div className="mt-8 md:mt-10">
                <SectionHeadline
                  size="lg"
                  light
                  className="!text-[2.2rem] leading-[1.05]"
                >
                  {data.stat02.headline}
                </SectionHeadline>

                <BodyText
                  light
                  className="mt-6 !text-[#F5F0E8]/70 leading-[1.7] text-sm"
                >
                  {data.stat02.body}
                </BodyText>

                <div className="mt-10 w-10 h-px bg-[#D43F33]" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* LEFT STAT */}

            <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8] p-6 md:p-8 lg:p-10 flex flex-col justify-between border-r border-[#1C1208]/10">
              <div className="flex justify-between items-start mb-8 md:mb-10">
                <Annotation>
                  {data.stat01.number} / {data.stat01.label}
                </Annotation>

                <CrosshairIcon />
              </div>

              <div>
                <div
                  className="text-[#1C1208] font-light leading-none mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "3rem",
                  }}
                >
                  {data.stat01.value}
                </div>

                <SectionHeadline
                  size="md"
                  className="!text-[1.6rem] leading-[1.2]"
                >
                  {data.stat01.title}
                </SectionHeadline>

                <BodyText className="mt-4 text-[#1C1208]/60 text-sm">
                  {data.stat01.body}
                </BodyText>
              </div>
            </div>

            {/* RIGHT CONTENT */}

            <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8] p-6 md:p-10 lg:p-12 flex flex-col justify-center items-end text-right">
              <div className="max-w-[640px]">
                <div className="flex items-center justify-end gap-4 mb-4 md:mb-6">
                  <Annotation>{data.imageLabel}</Annotation>

                  <span className="text-[#D43F33] font-semibold text-[0.6rem] tracking-[0.2em]">
                    {data.sectionCounter}
                  </span>
                </div>

                <SectionHeadline
                  size="xl"
                  className="!text-[clamp(2.8rem,4vw,4.8rem)] leading-[0.98]"
                  noPeriod
                >
                  <span className="relative z-0 inline-block group/highlight cursor-default">
                    <span className="relative z-10">{data.headline}</span>
                    <span className="absolute bottom-[8%] left-[-2%] w-[104%] h-[35%] bg-[#D43F33]/20 -z-10 rotate-1 -skew-x-12 transition-all duration-500 ease-out group-hover/highlight:h-[50%] group-hover/highlight:bg-[#D43F33]/30 group-hover/highlight:rotate-2" />
                  </span>
                  <span className="text-[#D43F33]">.</span>
                </SectionHeadline>

                <BodyText className="mt-8 text-[1.05rem] leading-[1.7] text-[#1C1208]/70">
                  {data.bodyText}
                </BodyText>

                <div className="mt-10 flex flex-wrap items-center justify-end gap-6">
                  <Link
                    href="#gallery"
                    className="group inline-flex items-center gap-4 text-[0.65rem] font-bold tracking-[0.25em] text-[#1C1208] uppercase"
                  >
                    View Project

                    <span className="w-8 h-px bg-[#1C1208] transition-all duration-300 group-hover:w-12" />
                  </Link>
                </div>
              </div>
            </div>

            {/* LEFT DARK PANEL */}

            <div className="col-span-12 lg:col-span-4 bg-[#1C1208] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <Annotation light>
                FIG. {data.sectionCounter.slice(0, 2).trim()} /
                DEVELOPMENT
              </Annotation>

              <div className="mt-8 md:mt-10">
                <SectionHeadline
                  size="lg"
                  light
                  className="!text-[2.2rem] leading-[1.05]"
                >
                  {data.stat02.headline}
                </SectionHeadline>

                <BodyText
                  light
                  className="mt-6 !text-[#F5F0E8]/70 leading-[1.7] text-sm"
                >
                  {data.stat02.body}
                </BodyText>

                <div className="mt-10 w-10 h-px bg-[#D43F33]" />
              </div>
            </div>

            {/* RIGHT IMAGE */}

            <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8] py-6 px-0 md:p-10 lg:p-0 lg:pr-12 flex flex-col">
              <div className="relative flex-1 w-full h-full min-h-[350px] md:min-h-[420px] overflow-hidden group bg-[#EDE8DF]">
                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex items-center gap-4">
                  <CrosshairIcon light />

                  <Annotation className="!text-[#F5F0E8]/90">
                    {data.imageLabel}
                  </Annotation>
                </div>

                <img
                  src={data.imageSrc}
                  alt={data.imageLabel}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/60 via-[#1C1208]/20 to-transparent" />

                {data.mapHref && (
                  <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none p-4">
                    <Link
                      href={data.mapHref}
                      className="pointer-events-auto group relative flex flex-row items-center justify-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-5 bg-[#1C1208]/40 backdrop-blur-xl rounded-full border border-white/20 overflow-hidden transition-all duration-500 hover:bg-[#D43F33]/80 hover:border-[#D43F33] hover:scale-105 hover:shadow-2xl hover:shadow-[#D43F33]/20"
                    >
                      <span className="relative z-10 text-white text-[0.6rem] md:text-[0.75rem] font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase text-center drop-shadow-md whitespace-nowrap">
                        Explore Interactive Map
                      </span>
                      <span className="relative z-10 hidden sm:block w-6 md:w-12 h-px bg-white/60 transition-all duration-500 group-hover:w-10 md:group-hover:w-16 group-hover:bg-white" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ───────────────── METRICS ───────────────── */}

      <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10 border-b border-[#1C1208]/10">
        {data.metrics.map((metric, index) => (
          <div
            key={metric.title}
            className="col-span-12 lg:col-span-4 bg-[#F5F0E8] p-8 md:p-10 lg:p-12 group transition-colors duration-700 hover:bg-[#EDE8DF]"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-[#D43F33] font-semibold text-[0.6rem] tracking-[0.2em]">
                0{index + 2}
              </span>

              <CrosshairIcon className="opacity-20 group-hover:rotate-90 transition-transform duration-700" />
            </div>

            <div
              className="text-[#1C1208] font-light leading-none mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.5rem",
              }}
            >
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

      <div className="py-8 md:py-12">
        <FigMarker
          fig={`fig. ${data.sectionCounter.slice(0, 2).trim()}`}
          label={data.figLabel}
        />
      </div>
    </SectionWrapper>
  );
}

/* ───────────────── ANIMATED PARTITION DIVIDER ───────────────── */

function AnimatedPartitionDivider({ title, subtitle, bgText }: { title: string; subtitle: string; bgText: string }) {
  return (
    <div className="w-full bg-[#F5F0E8] flex flex-col items-center justify-center py-10 md:py-16 border-t border-[#1C1208]/10 relative overflow-hidden group z-10">
      
      {/* Animated Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="whitespace-nowrap font-serif text-[12vw] leading-none tracking-tighter"
        >
          {bgText}
        </motion.div>
      </div>

      {/* Animated Line drawing down */}
      <div className="relative h-16 md:h-20 w-[1px] bg-[#1C1208]/10 mb-6 overflow-hidden">
        <motion.div 
          initial={{ y: "-100%" }}
          whileInView={{ y: "100%" }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
          className="absolute inset-0 bg-[#D43F33] w-[2px] left-[-0.5px]"
        />
      </div>

      {/* Animated Text appearing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center relative z-10"
      >
        <span className="text-[#D43F33] font-semibold text-[0.6rem] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {subtitle}
        </span>
        <span className="text-[#1C1208] text-2xl md:text-4xl font-light tracking-widest uppercase text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {title}
        </span>
        <span className="mt-6 w-8 h-[1px] bg-[#1C1208]/20 transition-all duration-700 group-hover:w-20 group-hover:bg-[#1C1208]/60" />
      </motion.div>
    </div>
  );
}

/* ───────────────── EXPORTS ───────────────── */

export function SydneyOaksMetricsSection() {
  return (
    <>
      <AnimatedPartitionDivider 
        title="Sydney Oaks"
        subtitle="Featured Project"
        bgText="SYDNEY OAKS"
      />
      <MetricsSection
        data={{ ...sydneyOaksData, mapHref: "/InteractiveSiteMap?project=sydney-oaks" }}
        id="metrics-sydney-oaks"
      />
    </>
  );
}

export function ElysianGatesMetricsSection() {
  return (
    <>
      <AnimatedPartitionDivider 
        title="Elysian Gates"
        subtitle="Next Chapter"
        bgText="ELYSIAN GATES"
      />
      <MetricsSection
        data={{ ...elysianGatesData, mapHref: "/InteractiveSiteMap?project=elysian-gates" }}
        id="metrics-elysian-gates"
      />
    </>
  );
}