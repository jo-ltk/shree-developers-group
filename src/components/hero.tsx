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
        {/* Mobile specific image */}
        <Image
          src="/images/hero-redesign3.png"
          alt="Premium residential community by Shree Developers Group"
          fill
          className="object-cover object-center lg:hidden"
          priority
        />

        {/* Desktop specific image */}
        <Image
          src="/images/hero-redesign2.png"
          alt="Premium residential community by Shree Developers Group"
          fill
          className="hidden lg:block object-cover object-center lg:object-[center_right]"
          priority
        />

        {/* Mobile Heading Overlay */}
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
      <div className="relative z-10 w-full px-8 pt-12 pb-12 md:px-12 lg:px-20 xl:px-24 2xl:px-32 lg:py-0">
        <div
          data-hero-content
          className="w-full max-w-[620px] xl:max-w-[680px] 2xl:max-w-[720px] ml-0 lg:pt-20"
        >
          {/* Heading - Desktop only */}
          <SectionHeadline
            size="xl"
            className="hidden lg:block !text-[clamp(2.8rem,4.5vw,5.5rem)] !leading-[0.98]"
          >
            Where trust
            <br />
            <em className="italic">finds</em> always home
          </SectionHeadline>

          {/* Sub */}
          <BodyText
            size="lg"
            className="mt-6 lg:mt-8 max-w-[500px] italic !leading-[1.4]"
          >
            Communities composed for daily comfort. Architecting legacies of
            trust across the horizon.
          </BodyText>

          {/* Ornament divider */}
          <Ornament className="max-w-[400px] lg:mx-0 my-8 lg:my-10" />

          {/* Stats */}
          <div className="hero-stats flex flex-nowrap items-center gap-8 sm:gap-12 lg:gap-16 mb-12">
            <StatItem value="24+" label="Projects Delivered" />
            <StatItem value="2.4k" label="Families Housed" separator />
            <StatItem value="98%" label="Satisfaction Rate" separator />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-5 sm:gap-8 lg:gap-12">
            <ButtonPrimary href="#gallery">Start Exploring</ButtonPrimary>

            <ButtonGhost href="mailto:hello@shreedevelopersgroup.com">
              Get in touch
            </ButtonGhost>
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