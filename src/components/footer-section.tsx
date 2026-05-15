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
    <SectionWrapper id="footer" ref={footerRef} dark={true} className="!py-8 md:!py-10 overflow-hidden">
      <div className="relative">

        {/* COMPACT ARCHITECTURAL GRID */}
        <div data-footer-animate className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#F5F0E8]/10 pt-8">

          {/* CTA & INDEX */}
          <div className="space-y-6">
            <SectionHeadline
              size="md"
              light
              className="!text-[#F5F0E8] !text-[2rem]"
            >
              Let&apos;s architect
              <br />
              your legacy
            </SectionHeadline>
            <div className="space-y-3">
              <Annotation light className="!text-rust">01 / TECHNICAL INDEX</Annotation>
              <nav className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-between !text-[#F5F0E8] hover:!text-rust transition-colors duration-300"
                  >
                    <span className="font-medium text-[0.75rem] tracking-wide">{link.label}</span>
                    <span className="font-mono text-[9px] opacity-20">[{link.coord}]</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* COMMUNICATION */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40">02 / COMMUNICATION</Annotation>
            <div className="space-y-4">
              <a
                href="mailto:hello@shreedevelopersgroup.com"
                className="group block"
              >
                <span className="block font-serif italic text-lg !text-[#F5F0E8] border-b border-[#F5F0E8]/10 pb-1 group-hover:border-rust transition-colors">
                  hello@shree<br />developersgroup.com
                </span>
              </a>
              <a href="tel:+14045550123" className="block font-mono text-[0.8rem] tracking-widest !text-[#F5F0E8]/80 hover:!text-rust transition-colors mt-2 mb-4">
                +1 (404) 555-0123
              </a>
              <BodyText size="sm" light className="!text-[#F5F0E8]/60 !leading-relaxed">
                Speak with us about the details that define your next chapter.
              </BodyText>
              <div className="flex items-center gap-5 pt-2">
                <a href="#" className="text-[#F5F0E8]/40 hover:text-rust transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-[#F5F0E8]/40 hover:text-rust transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-[#F5F0E8]/40 hover:text-rust transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>

          {/* PHYSICAL OFFICE */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40">03 / PHYSICAL OFFICE</Annotation>
            <div className="space-y-3">
              <BodyText size="sm" light className="!text-[#F5F0E8]/60 !leading-relaxed">
                Headquarters<br />
                Premium Residential Tower<br />
                Georgia, USA &mdash; 30301
              </BodyText>
              <div className="flex flex-col gap-1 text-rust/60 font-mono text-[9px]">
                <span>LAT: 33.7490&deg; N</span>
                <span>LNG: 84.3880&deg; W</span>
              </div>
            </div>
          </div>

          {/* UPDATES MODULE */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40">04 / PROJECT UPDATES</Annotation>
            <div className="space-y-4">
              <BodyText size="sm" light className="!text-[#F5F0E8]/60">
                Subscribe to receive technical bulletins and handover milestones.
              </BodyText>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to updates'); }} className="group/input block relative">
                <input
                  type="email"
                  required
                  placeholder="EMAIL SPECIFICATION"
                  className="w-full bg-transparent border-b border-[#F5F0E8]/10 pb-2 text-[#F5F0E8] font-mono text-[10px] tracking-widest placeholder:text-[#F5F0E8]/20 focus:outline-none focus:border-rust transition-colors duration-500"
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
                <span className="text-rust text-[9px] font-bold uppercase tracking-[0.2em] text-center">Active Operations</span>
              </div>
              <FigMarker fig="fig. 22" label="Blueprint Conclusion" light />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3">
            <div className="flex items-center gap-4">
              <a href="#privacy" className="text-[#F5F0E8]/60 hover:text-rust transition-colors text-[0.6rem] uppercase tracking-widest font-mono">Privacy Policy</a>
              <span className="text-[#F5F0E8]/20 text-[0.6rem]">|</span>
              <a href="#terms" className="text-[#F5F0E8]/60 hover:text-rust transition-colors text-[0.6rem] uppercase tracking-widest font-mono">Terms of Service</a>
            </div>
            <Annotation light className="!text-[#F5F0E8]/60 !text-[0.6rem] text-center lg:text-right flex items-center justify-center lg:justify-end gap-2 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M3 10L12 3l9 7" />
                <path d="M4 10v11h16V10" />
                <path d="M10 13h4" />
                <path d="M10 17h4" />
              </svg>
              EQUAL HOUSING OPPORTUNITY
            </Annotation>
            <Annotation light className="!text-[#F5F0E8]/30 !text-[0.55rem] text-center lg:text-right mt-2">
              &copy; SHREE DEVELOPERS GROUP &mdash; PREMIUM EDITORIAL ARCHITECTURE V1.02
            </Annotation>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}