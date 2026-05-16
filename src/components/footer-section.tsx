"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { CrosshairIcon } from "./ui/crosshair-icon";
import { BrandMark } from "./ui/brand-mark";



export function FooterSection() {
  const footerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      }).from("[data-footer-animate]", {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="footer" ref={footerRef} dark={true} className="!pt-4 !pb-8 md:!pt-8 md:!pb-12 overflow-hidden">
      <div className="relative">

        {/* COMPACT ARCHITECTURAL GRID */}
        <div data-footer-animate className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#F5F0E8]/10 pt-4">

          {/* CTA */}
          <div className="space-y-6">
            <SectionHeadline
              size="md"
              light
              className="!text-[#F5F0E8] responsive-headline-xl"
            >
              Let&apos;s architect
              <br />
              your legacy
            </SectionHeadline>
          </div>

          {/* COMMUNICATION */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40 responsive-stat-label">01 / COMMUNICATION</Annotation>
            <div className="space-y-4">
              <a
                href="mailto:hello@shreedevelopersgroup.com"
                className="group block"
              >
                <span className="block font-serif italic text-lg !text-[#F5F0E8] border-b border-[#F5F0E8]/10 pb-1 group-hover:border-rust transition-colors responsive-body-sm">
                  hello@shree<br />developersgroup.com
                </span>
              </a>
              <div className="mt-2 mb-4 flex flex-col gap-1">
                <a href="tel:+17707897044" className="block font-mono tracking-widest !text-[#F5F0E8]/80 hover:!text-rust transition-colors responsive-btn-text">
                  +1 (770) 789-7044
                </a>
                <a href="https://wa.me/17707897044" target="_blank" rel="noopener noreferrer" className="block font-mono text-sm tracking-widest !text-[#F5F0E8]/60 hover:!text-rust transition-colors responsive-btn-text">
                  WhatsApp Available
                </a>
              </div>
              <BodyText size="sm" light className="!text-[#F5F0E8]/60 !leading-relaxed responsive-body-sm">
                Speak with us about the details that define your next chapter.
              </BodyText>
              <div className="flex items-center gap-5 pt-2">
                <a href="https://www.instagram.com/shreedevelopersgroup?igsh=ZW8xY2R0N285enh4" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/40 hover:text-rust transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-[#F5F0E8]/40 hover:text-rust transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-[#F5F0E8]/40 hover:text-rust transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
        {/* LOGO BAR */}
        <div data-footer-animate className="mt-0 flex flex-col items-center justify-center border-t border-[#F5F0E8]/5 pt-0">
          <BrandMark
            variant="steel"
            className="h-16 w-48 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          />
          <Annotation light className="mt-2 !text-[#F5F0E8]/20 responsive-stat-label">
            SHREE DEVELOPERS GROUP
          </Annotation>
        </div>
      </div>
    </SectionWrapper>
  );
}