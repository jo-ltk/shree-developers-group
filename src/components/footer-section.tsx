"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
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
              className="!text-[#F5F0E8] !text-[2rem] !leading-[1.1]"
            >
              Let&apos;s architect
              <br />
              your <em className="italic">legacy</em>
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
              <BodyText size="sm" light className="!text-[#F5F0E8]/60 !leading-relaxed">
                Speak with us about the details that define your next chapter.
              </BodyText>
            </div>
          </div>

          {/* PHYSICAL OFFICE */}
          <div className="space-y-6">
            <Annotation light className="!text-[#F5F0E8]/40">03 / PHYSICAL OFFICE</Annotation>
            <div className="space-y-3">
              <BodyText size="sm" light className="!text-[#F5F0E8]/60 !leading-relaxed">
                Headquarters<br />
                Premium Residential Tower<br />
                Gujarat, India &mdash; 380001
              </BodyText>
              <div className="flex flex-col gap-1 text-rust/60 font-mono text-[9px]">
                <span>LAT: 23.0225&deg; N</span>
                <span>LNG: 72.5714&deg; E</span>
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
              <label className="group/input block relative">
                <input
                  type="email"
                  placeholder="EMAIL SPECIFICATION"
                  className="w-full bg-transparent border-b border-[#F5F0E8]/10 pb-2 text-[#F5F0E8] font-mono text-[10px] tracking-widest placeholder:text-[#F5F0E8]/20 focus:outline-none focus:border-rust transition-colors duration-500"
                />
                <button className="absolute right-0 bottom-2 text-[#F5F0E8] hover:text-rust transition-colors duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </label>
            </div>
          </div>
        </div>

        {/* FINAL MARKER BAR */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#F5F0E8]/5 pt-6">
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

          <Annotation light className="!text-[#F5F0E8]/20 !text-[0.55rem] text-center md:text-right">
            &copy; SHREE DEVELOPERS GROUP &mdash; PREMIUM EDITORIAL ARCHITECTURE V1.02
          </Annotation>
        </div>

      </div>
    </SectionWrapper>
  );
}