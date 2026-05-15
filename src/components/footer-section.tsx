"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { FigMarker } from "./ui/fig-marker";
import { CrosshairIcon } from "./ui/crosshair-icon";
import { BrandMark } from "./ui/brand-mark";

const footerLinks = [
  { label: "Signature Projects", href: "#gallery", coord: "42.3 / 71.1" },
  { label: "The Shree Promise", href: "#team", coord: "12.8 / 33.4" },
  { label: "Architectural Notes", href: "#articles", coord: "88.1 / 15.2" },
  { label: "Direct Inquiries", href: "#footer", coord: "05.4 / 92.8" },
];

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
    <SectionWrapper id="footer" ref={footerRef} dark={true} className="!py-16 md:!py-24 overflow-hidden">
      <div className="relative">

        {/* COMPACT ARCHITECTURAL GRID */}
        <div data-footer-animate className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#F5F0E8]/10 pt-8">

          {/* CTA & INDEX */}
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
            <div className="space-y-3">
              <Annotation light className="!text-rust responsive-stat-label">01 / TECHNICAL INDEX</Annotation>
              <nav className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-between !text-[#F5F0E8] hover:!text-rust transition-colors duration-300"
                  >
                    <Annotation className="!font-medium responsive-stat-label !text-[#F5F0E8]">{link.label}</Annotation>
                    <Annotation className="!font-mono !text-[9px] !opacity-20 !text-[#F5F0E8]">[{link.coord}]</Annotation>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* COMMUNICATION */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40 responsive-stat-label">02 / COMMUNICATION</Annotation>
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

          {/* PHYSICAL OFFICE */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40 responsive-stat-label">03 / PHYSICAL OFFICE</Annotation>
            <div className="space-y-3">
              <BodyText size="sm" light className="!text-[#F5F0E8]/60 !leading-relaxed responsive-body-sm">
                Headquarters<br />
                Premium Residential Tower<br />
                Georgia, USA &mdash; 30301
              </BodyText>
              <div className="flex flex-col gap-1 text-rust/60 font-mono">
                <Annotation className="!text-[9px] !text-rust/60">LAT: 33.7490&deg; N</Annotation>
                <Annotation className="!text-[9px] !text-rust/60">LNG: 84.3880&deg; W</Annotation>
              </div>
            </div>
          </div>

          {/* UPDATES MODULE */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40 responsive-stat-label">04 / PROJECT UPDATES</Annotation>
            <div className="space-y-4">
              <BodyText size="sm" light className="!text-[#F5F0E8]/60 responsive-body-sm">
                Subscribe to receive technical bulletins and handover milestones.
              </BodyText>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to updates'); }} className="group/input block relative">
                <input
                  type="email"
                  required
                  placeholder="EMAIL SPECIFICATION"
                  className="w-full bg-transparent border-b border-[#F5F0E8]/10 pb-2 text-[#F5F0E8] font-mono tracking-widest placeholder:text-[#F5F0E8]/20 focus:outline-none focus:border-rust transition-colors duration-500 responsive-btn-text"
                />
                <button type="submit" className="absolute right-0 bottom-2 text-[#F5F0E8] hover:text-rust transition-colors duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FINAL MARKER BAR */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-[#F5F0E8]/5 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <BrandMark
              variant="steel"
              className="h-16 w-40"
              imageClassName="object-center md:object-left"
            />
            <div className="hidden md:block h-6 w-px bg-[#F5F0E8]/10" />
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-rust rounded-full animate-pulse shrink-0" />
                <Annotation className="!text-rust !font-bold responsive-stat-label text-center">Active Operations</Annotation>
              </div>
              <FigMarker fig="fig. 22" label="Blueprint Conclusion" light />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3">
            <div className="flex items-center gap-4">
              <a href="#privacy" className="text-[#F5F0E8]/60 hover:text-rust transition-colors responsive-btn-text">Privacy Policy</a>
              <span className="text-[#F5F0E8]/20 text-[0.6rem]">|</span>
              <a href="#terms" className="text-[#F5F0E8]/60 hover:text-rust transition-colors responsive-btn-text">Terms of Service</a>
            </div>
            <Annotation light className="!text-[#F5F0E8]/60 responsive-stat-label text-center lg:text-right flex items-center justify-center lg:justify-end gap-2 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M3 10L12 3l9 7" />
                <path d="M4 10v11h16V10" />
                <path d="M10 13h4" />
                <path d="M10 17h4" />
              </svg>
              EQUAL HOUSING OPPORTUNITY
            </Annotation>
            <Annotation light className="!text-[#F5F0E8]/30 responsive-stat-label text-center lg:text-right mt-2">
              &copy; SHREE DEVELOPERS GROUP &mdash; PREMIUM EDITORIAL ARCHITECTURE V1.02
            </Annotation>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}