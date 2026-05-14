"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { StatItem } from "@/components/ui/stat-item";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { FigMarker } from "@/components/ui/fig-marker";
import { Ornament } from "@/components/ui/ornament";
import { ShieldCheck, Award, MapPinned, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function AboutShree() {
  return (
    <SectionWrapper id="about-shree" className="!pt-24 !pb-0" dark={false}>
      <div className="px-8 md:px-12 lg:px-20 mb-20">
        <SectionLabel counter="08 / 08">About Shree</SectionLabel>
        <SectionHeadline size="xl" className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] max-w-[900px]">
          Rooted in <em className="italic">Georgia</em>, built for the future
        </SectionHeadline>
      </div>

      {/* A. FOUNDER'S STORY */}
      <section className="grid grid-cols-12 gap-0 border-t border-[#1C1208]/10 bg-[#EDE8DF]">
        <div className="col-span-12 lg:col-span-5 relative aspect-[4/5] lg:aspect-auto">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200" 
            alt="Founder of Shree Developers Group"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 transition-all duration-1000 hover:grayscale-0 hover:brightness-100"
          />
          <div className="absolute inset-0 bg-[#1C1208]/10" />
          <div className="absolute bottom-8 left-8">
            <Annotation light>FOUNDER & CEO</Annotation>
            <h3 className="text-white text-2xl font-light mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Mr. Shree</h3>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-7 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-[#F5F0E8]">
          <SectionLabel>Founder Story</SectionLabel>
          <SectionHeadline size="md" className="mb-8">A journey of integrity</SectionHeadline>
          <BodyText size="lg" className="mb-8 text-balance">
            Shree Developers Group began with a simple observation: the market was full of houses, but short on "homes." Our founder, with over 15 years of deep expertise in North Georgia's real estate, set out to build a development group where architectural restraint meets obsessive craftsmanship.
          </BodyText>
          <BodyText className="mb-10 text-[#1C1208]/60">
            "We don't just clear land; we curate environments. Every nail, every stone, and every blueprint is a promise of quality we've kept for over a decade."
          </BodyText>
          
          <div className="flex items-center gap-8">
            <div className="h-px w-12 bg-rust" />
            <Annotation>ESTABLISHED 2009</Annotation>
          </div>
        </div>
      </section>

      {/* B. BRAND PHILOSOPHY & VISION */}
      <section className="py-24 md:py-36 bg-[#1C1208] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <CrosshairIcon light className="w-64 h-64" />
        </div>
        
        <div className="px-8 md:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-12 gap-12 lg:gap-24">
            <div className="col-span-12 lg:col-span-6">
              <SectionLabel light>Brand Philosophy</SectionLabel>
              <SectionHeadline size="lg" light className="mb-8">The Shree <em className="italic">Way</em></SectionHeadline>
              <BodyText light className="mb-12 text-xl leading-relaxed">
                We believe in **Restraint**, **Craft**, **Tension**, and **Texture**. Our philosophy is to let the materials speak—limestone, aged paper, terracotta, and concrete—creating a tactile experience that feels timeless.
              </BodyText>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-rust uppercase font-bold tracking-[0.2em] text-[0.7rem] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Vision</h4>
                  <BodyText light size="sm">
                    To be the most trusted name in premium residential development, known for architectural integrity and lasting value.
                  </BodyText>
                </div>
                <div>
                  <h4 className="text-rust uppercase font-bold tracking-[0.2em] text-[0.7rem] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mission</h4>
                  <BodyText light size="sm">
                    To create intentional communities that foster connection, safety, and a refined lifestyle for modern American families.
                  </BodyText>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-end">
               <Ornament light className="mb-12" />
               <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4 p-6 border border-white/10 hover:border-rust/50 transition-colors duration-500 bg-white/5 backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-rust mt-1" />
                    <div>
                      <h5 className="font-bold uppercase tracking-[0.15em] text-[0.65rem] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Licensed & Insured</h5>
                      <BodyText light size="sm">Full state certification and comprehensive insurance coverage for your total peace of mind.</BodyText>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 border border-white/10 hover:border-rust/50 transition-colors duration-500 bg-white/5 backdrop-blur-sm">
                    <MapPinned className="w-5 h-5 text-rust mt-1" />
                    <div>
                      <h5 className="font-bold uppercase tracking-[0.15em] text-[0.65rem] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Local Expertise</h5>
                      <BodyText light size="sm">Deep knowledge of Georgia's zoning, landscape, and community growth patterns.</BodyText>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. NUMBERS */}
      <section className="py-20 md:py-28 bg-[#F5F0E8] border-b border-[#1C1208]/10">
        <div className="px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-px lg:bg-[#1C1208]/10">
            <div className="bg-[#F5F0E8] lg:p-12">
               <StatItem value="15+" label="Years of Experience" />
            </div>
            <div className="bg-[#F5F0E8] lg:p-12">
               <StatItem value="24+" label="Projects Completed" separator />
            </div>
            <div className="bg-[#F5F0E8] lg:p-12">
               <StatItem value="100%" label="Licensed & Insured" separator />
            </div>
            <div className="bg-[#F5F0E8] lg:p-12">
               <StatItem value="GA" label="Local Expertise" separator />
            </div>
          </div>
        </div>
      </section>

      {/* Final Brand Stamp */}
      <section className="py-24 md:py-36 text-center">
        <div className="inline-block relative">
           <SectionHeadline size="lg" className="relative z-10">Building trust, <em className="italic">one</em> brick at a time</SectionHeadline>
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-rust opacity-20" />
        </div>
        <div className="mt-16">
          <FigMarker fig="fig. 48" label="Shree Brand Standards" />
        </div>
      </section>
    </SectionWrapper>
  );
}
