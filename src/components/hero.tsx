"use client";

import Image from "next/image";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Ornament } from "@/components/ui/ornament";
import { StatItem } from "@/components/ui/stat-item";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { ButtonGhost } from "@/components/ui/button-ghost";
import { FigMarker } from "@/components/ui/fig-marker";

export function Hero() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-cream lg:h-screen lg:min-h-[750px] lg:justify-center">
      {/* Full Screen Background Image - Mobile: Top, Desktop: Background */}
      <div
        data-hero-visual
        className="relative z-0 h-[40vh] w-full sm:h-[60vh] lg:absolute lg:inset-0 lg:h-full"
      >
        {/* Mobile specific image — UNTOUCHED */}
        <Image
          src="/images/hero-redesign3.png"
          alt="Premium residential community by Shree Developers Group"
          fill
          className="object-cover object-center lg:hidden"
          priority
        />

        {/* Desktop specific image */}
        <Image
          src="/images/hero-new.png"
          alt="Premium residential community by Shree Developers Group"
          fill
          className="hidden lg:block object-cover object-center lg:object-[center_right]"
          priority
        />

        {/* Mobile Heading Overlay — UNTOUCHED */}
        <div className="absolute top-[42%] left-8 z-20 max-w-[280px] lg:hidden">
          <SectionHeadline size="md" className="!text-[2.2rem]">
            Where trust
            <br />
            <em className="italic">finds</em> always
            <br />
            a home
          </SectionHeadline>
        </div>
      </div>

      {/* Hero Content Overlay */}
      {/* Mobile padding UNTOUCHED (px-6, pt-12, pb-12) — desktop uses fluid values */}
      <div className="relative z-10 w-full px-6 sm:px-8 pt-12 pb-12 md:px-12 lg:px-[clamp(3rem,5vw,8rem)] lg:pt-[clamp(100px,12vh,160px)] lg:pb-[clamp(2rem,4vh,5rem)]">
        <div
          data-hero-content
          className="w-full max-w-[620px] lg:max-w-[480px] xl:max-w-[560px] 2xl:max-w-[680px] ml-0"
        >
          {/* Heading - Desktop only */}
          <SectionHeadline
            size="xl"
            className="hidden lg:block !text-[clamp(2.2rem,3.6vw,5.5rem)] !leading-[0.97]"
          >
            Where trust
            <br />
            <em className="italic">finds</em> always home
          </SectionHeadline>

          {/* Sub — mobile mt-6 UNTOUCHED, desktop scales */}
          <BodyText
            size="lg"
            className="mt-6 lg:mt-[clamp(0.6rem,1.4vw,2rem)] max-w-[500px] italic !leading-[1.4]"
          >
            Communities composed for daily comfort. Architecting legacies of
            trust across the horizon.
          </BodyText>

          {/* Ornament — mobile my-8 UNTOUCHED, desktop scales */}
          <Ornament className="max-w-[400px] lg:mx-0 my-8 lg:my-[clamp(0.5rem,1.2vw,1.8rem)]" />

          {/* Stats — mobile gap/mt/mb UNTOUCHED, desktop scales */}
          <div className="hero-stats flex flex-nowrap items-center gap-8 sm:gap-12 lg:gap-[clamp(1rem,2.8vw,4rem)] mt-10 lg:mt-[clamp(0.4rem,1.2vw,2rem)] mb-12 lg:mb-[clamp(0.5rem,1.2vw,2rem)]">
            <StatItem value="26" label="Years of Trust" />
            <StatItem value="24+" label="Communities" separator />
            <StatItem value="2.4k" label="Happy Families" separator />
          </div>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-8 lg:gap-0 lg:max-w-[clamp(320px,42vw,580px)] w-full">

            {/* Left — Primary actions */}
            <div className="flex flex-col gap-0 w-full lg:w-auto lg:min-w-[clamp(180px,18vw,260px)]">
              <ButtonPrimary href="#gallery" className="w-full justify-between">Explore Communities</ButtonPrimary>
              <ButtonGhost href="#footer" light className="h-[44px] px-6 border border-[#2C2420]/15 border-t-0 w-full justify-between">
                Book a Visit
              </ButtonGhost>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-[#2C2420]/[0.12] mx-[clamp(0.5rem,1.5vw,2rem)] self-stretch flex-shrink-0" />

            {/* Right — Secondary links */}
            <div className="flex flex-col justify-center w-full lg:flex-1">
              {[
                { icon: "ti-tag", label: "Get Pricing", href: "#footer" },
                { icon: "ti-brand-whatsapp", label: "WhatsApp Inquiry", href: "https://wa.me/" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`flex items-center gap-3 py-2.5 group no-underline transition-colors duration-200 hover:bg-[#2C2420]/[0.04] px-3 -mx-3 rounded-sm w-full ${i > 0 ? 'border-t border-[#2C2420]/[0.10]' : ''}`}
                >
                  <i className={`ti ${item.icon} text-[#D43F33] text-[15px] transition-transform duration-200 group-hover:scale-110`} aria-hidden="true" />
                  <span
                    className="text-[#2C2420]/80 uppercase font-semibold transition-colors duration-200 group-hover:text-[#2C2420]"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em" }}
                  >
                    {item.label}
                  </span>
                  <span className="ml-auto text-[#2C2420]/30 text-[0.6rem] transition-all duration-200 group-hover:text-[#D43F33] group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Blueprint Detail */}
      <FigMarker
        fig="fig. 01"
        label="MASTERPLAN OVERVIEW"
        className="absolute bottom-12 right-12 hidden lg:flex"
      />
    </section>
  );
}