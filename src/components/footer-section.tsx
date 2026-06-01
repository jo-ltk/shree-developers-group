"use client";

import { useLayoutEffect, useRef } from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { BrandMark } from "./ui/brand-mark";
import {
  COMPANY_CONTACT,
  COMPANY_MAILTO,
  COMPANY_TEL,
  COMPANY_WHATSAPP,
} from "@/lib/contact";

function ContactBlock({
  className,
  align = "left",
}: {
  className?: string;
  align?: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <div className={className}>
      <Annotation light className="!text-[#F5F0E8]/40 responsive-stat-label">
        01 / COMMUNICATION
      </Annotation>
      <div className="space-y-2 mt-3">
        <a href={COMPANY_MAILTO} className="group inline-block">
          <span className="block font-serif italic text-lg !text-[#F5F0E8] border-b border-[#F5F0E8]/10 pb-1 group-hover:border-rust transition-colors responsive-body-sm whitespace-nowrap">
            {COMPANY_CONTACT.email}
          </span>
        </a>
        <div className={`flex flex-col gap-1 ${isRight ? "items-end" : "items-start"}`}>
          <a
            href={COMPANY_TEL}
            className="block font-mono tracking-widest !text-[#F5F0E8]/80 hover:!text-rust transition-colors responsive-btn-text"
          >
            {COMPANY_CONTACT.phoneDisplay}
          </a>
          <a
            href={COMPANY_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-sm tracking-widest !text-[#F5F0E8]/60 hover:!text-rust transition-colors responsive-btn-text"
          >
            WhatsApp Available
          </a>
          <a
            href={COMPANY_CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block font-mono text-sm tracking-wide !text-[#F5F0E8]/60 hover:!text-rust transition-colors responsive-body-sm max-w-xs ${isRight ? "text-right" : "text-left"}`}
          >
            {COMPANY_CONTACT.address}
          </a>
        </div>
        <BodyText
          size="sm"
          light
          className={`!text-[#F5F0E8]/60 !leading-snug responsive-body-sm max-w-xs ${isRight ? "ml-auto" : ""}`}
        >
          Speak with us about the details that define your next chapter.
        </BodyText>
        <SocialLinks
          className={`flex items-center gap-5 pt-1 ${isRight ? "justify-end" : "justify-start"}`}
        />
      </div>
    </div>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a
        href={COMPANY_CONTACT.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#F5F0E8]/40 hover:text-rust transition-colors"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a href="#" className="text-[#F5F0E8]/40 hover:text-rust transition-colors">
        <Facebook className="w-5 h-5" />
      </a>
      <a href="#" className="text-[#F5F0E8]/40 hover:text-rust transition-colors">
        <Linkedin className="w-5 h-5" />
      </a>
    </div>
  );
}

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
    <SectionWrapper
      id="footer"
      ref={footerRef}
      dark={true}
      noPadding
      className="py-5 md:py-6 overflow-hidden"
    >
      {/* Mobile — unchanged stacked left layout */}
      <div
        data-footer-animate
        className="md:hidden grid grid-cols-1 gap-6 border-t border-[#F5F0E8]/10 pt-4"
      >
        <SectionHeadline
          size="xl"
          light
          className="!text-[#F5F0E8] responsive-headline-xl"
        >
          Let&apos;s architect
          <br />
          your legacy
        </SectionHeadline>

        <div className="flex w-full flex-col items-start justify-start py-2">
          <BrandMark
            variant="black"
            className="h-20 w-52 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            imageClassName="invert object-left"
          />
          <Annotation light className="mt-2 !text-[#F5F0E8]/20 responsive-stat-label text-left">
            SHREE DEVELOPERS GROUP
          </Annotation>
        </div>

        <ContactBlock className="space-y-3 text-left" />
      </div>

      {/* Desktop — 3-column: headline | logo | contact */}
      <div
        data-footer-animate
        className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center border-t border-[#F5F0E8]/10 pt-4"
      >
        <SectionHeadline
          size="xl"
          light
          className="!text-[#F5F0E8] responsive-headline-xl"
        >
          Let&apos;s architect
          <br />
          your legacy
        </SectionHeadline>

        <div className="flex flex-col items-center justify-center px-6">
          <BrandMark
            variant="black"
            className="h-28 w-72 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            imageClassName="invert object-center"
          />
          <Annotation light className="mt-2 !text-[#F5F0E8]/20 responsive-stat-label text-center">
            SHREE DEVELOPERS GROUP
          </Annotation>
        </div>

        <ContactBlock align="right" className="min-w-[240px] text-right" />
      </div>
    </SectionWrapper>
  );
}
