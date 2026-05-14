"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { ButtonGhost } from "./ui/button-ghost";
import { Annotation } from "./ui/annotation";
import { ShieldCheck, Award, Ruler, Compass, Lightbulb } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    label: "Mission",
    body: "To create intentional communities that foster connection, safety, and a refined lifestyle for modern families.",
  },
  {
    icon: Award,
    label: "Experience",
    body: "Over 15 years of deep expertise delivering 200+ homes with obsessive attention to detail across Kerala.",
  },
  {
    icon: Ruler,
    label: "Craftsman",
    body: "We believe in the details — from structural integrity to the tactile quality of natural limestone and terracotta.",
  },
  {
    icon: Lightbulb,
    label: "Philosophy",
    body: "A home should feel considered before the first visit and dependable long after possession.",
  },
  {
    icon: ShieldCheck,
    label: "Licensed & Insured",
    body: "Full state certification and comprehensive insurance coverage, providing a secure foundation for your investment.",
  },
];

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
        stagger: 0.15,
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
    <SectionWrapper id="about-brief" ref={sectionRef} dark={false} className="!py-20 md:!py-32">
      <div className="flex flex-col items-center text-center gap-10 md:gap-14">

        {/* Heading block */}
        <div className="flex flex-col items-center gap-5 max-w-2xl" data-intro-reveal>
          <SectionLabel>About Shree</SectionLabel>
          <SectionHeadline
            size="xl"
            className="!text-[clamp(2rem,5vw,4.5rem)] !leading-[0.95]"
          >
            Where trust always{" "}
            <em className="italic text-rust">finds</em> its home
          </SectionHeadline>
          <p
            className="text-[clamp(1rem,1.8vw,1.25rem)] text-[#1C1208]/55 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            &quot;A home should feel considered before the first visit and dependable
            long after possession. Architecting legacies through restraint and
            craftsmanship.&quot;
          </p>
        </div>

        {/* Ornament */}
        <div
          className="flex items-center gap-3 w-full max-w-xs"
          aria-hidden="true"
          data-intro-reveal
        >
          <div className="flex-1 h-px bg-[#1C1208]/10" />
          <div
            className="w-[5px] h-[5px] bg-rust flex-shrink-0"
            style={{ transform: "rotate(45deg)" }}
          />
          <div className="flex-1 h-px bg-[#1C1208]/10" />
        </div>

        {/* Pillars grid */}
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#1C1208]/10 border border-[#1C1208]/10 overflow-hidden"
          data-intro-reveal
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`group flex flex-col items-center text-center gap-4 p-7 md:p-8 bg-[#F5F0E8] transition-colors duration-300 hover:bg-[#1C1208]/[0.02] cursor-default ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 border border-rust/20 text-rust transition-colors duration-300 group-hover:bg-rust/5">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Label */}
                <Annotation className="!text-rust font-bold">{p.label}</Annotation>

                {/* Body */}
                <BodyText size="sm" className="leading-relaxed">
                  {p.body}
                </BodyText>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div data-intro-reveal>
          <ButtonGhost href="/about" className="text-[9px] tracking-[0.22em]">
            Learn More About Us
          </ButtonGhost>
        </div>

      </div>
    </SectionWrapper>
  );
}