"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { ButtonGhost } from "./ui/button-ghost";
import { Annotation } from "./ui/annotation";
import { ShieldCheck, Award, Ruler, Compass } from "lucide-react";
import { motion } from "framer-motion";

export function IntroStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.from("[data-intro-reveal]", {
        autoAlpha: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about-brief" ref={sectionRef} dark={false} className="!py-24 md:!py-36">
      <div className="grid grid-cols-12 gap-12 lg:gap-24 px-8 md:px-12 lg:px-20 items-start">
        
        {/* Left Column: Heading & Emotional Statement */}
        <div className="col-span-12 lg:col-span-6" data-intro-reveal>
          <SectionLabel counter="03 / 11">About Shree</SectionLabel>
          <SectionHeadline size="xl" className="mt-8 !text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] mb-12">
            Where trust always <em className="italic text-rust">finds</em> its home
          </SectionHeadline>
          
          <BodyText size="lg" className="mb-12 text-[#1C1208]/70 leading-relaxed italic">
            "A home should feel considered before the first visit and dependable long after possession. Architecting legacies through restraint and craftsmanship."
          </BodyText>
          
          <ButtonGhost href="#about-shree" className="!h-[54px] !px-10">
            Learn More About Us
          </ButtonGhost>
        </div>

        {/* Right Column: Brief Metrics & Philosophy */}
        <div className="col-span-12 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:pt-12" data-intro-reveal>
          
          {/* Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-rust">
              <Compass className="w-5 h-5" />
              <Annotation className="!text-rust font-bold">MISSION</Annotation>
            </div>
            <BodyText size="sm">
              To create intentional communities that foster connection, safety, and a refined lifestyle for modern American families.
            </BodyText>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-rust">
              <Award className="w-5 h-5" />
              <Annotation className="!text-rust font-bold">EXPERIENCE</Annotation>
            </div>
            <BodyText size="sm">
              Over 15 years of deep expertise in North Georgia&apos;s real estate, delivering 200+ homes with obsessive attention to detail.
            </BodyText>
          </div>

          {/* Craftsman */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-rust">
              <Ruler className="w-5 h-5" />
              <Annotation className="!text-rust font-bold">CRAFTSMAN</Annotation>
            </div>
            <BodyText size="sm">
              We believe in the details—from structural integrity to the tactile quality of natural limestone and terracotta.
            </BodyText>
          </div>

          {/* Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-rust">
              <ShieldCheck className="w-5 h-5" />
              <Annotation className="!text-rust font-bold">LICENSED & INSURED</Annotation>
            </div>
            <BodyText size="sm">
              Full state certification and comprehensive insurance coverage, providing a secure foundation for your investment.
            </BodyText>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}