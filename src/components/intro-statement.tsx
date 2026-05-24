"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { ButtonPrimary } from "./ui/button-primary";
import { Annotation } from "./ui/annotation";
import { ShieldCheck, Award, Ruler, Compass, Lightbulb } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    label: "Mission",
    body: "To create intentional communities that foster connection, safety, and a refined lifestyle for families.",
  },
  {
    icon: Award,
    label: "Experience",
    body: "Over 15 years of deep expertise delivering 200+ homes with obsessive attention to detail.",
  },
  {
    icon: Ruler,
    label: "Craftsman",
    body: "We believe in the details — from structural integrity to the tactile quality of natural materials.",
  },
  {
    icon: Lightbulb,
    label: "Philosophy",
    body: "A home should feel considered before the first visit and dependable long after possession.",
  },
  {
    icon: ShieldCheck,
    label: "Licensed",
    body: "Full state certification and insurance coverage, providing a secure foundation for your investment.",
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
    <SectionWrapper id="about-brief" ref={sectionRef} dark={false} className="!pt-8 !pb-0 md:!pt-24 md:!pb-0">
      <div className="flex flex-col items-center text-center gap-6 md:gap-10">

        {/* Heading block */}
        <div className="flex flex-col items-center max-w-2xl responsive-minimum-gap" data-intro-reveal>
          <SectionLabel className="justify-center !mb-0">About Shree</SectionLabel>
          <SectionHeadline size="xl" className="responsive-headline-xl m-0">
            Where trust always finds its home
          </SectionHeadline>
          <BodyText
            className="responsive-body-sm text-[#1C1208]/55 leading-relaxed m-0"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
          >
            Shree Developers Group is a Georgia-based real estate development and construction company focused on creating residential, commercial, and mixed-use communities built around quality, functionality, and long-term value. From land acquisition and infrastructure to vertical construction and final delivery, every project is approached with a vision to create spaces that contribute meaningfully to the growth of modern communities.
          </BodyText>
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
        {/*
        <div
          className="w-full grid grid-cols-2 lg:grid-cols-5 gap-px bg-[#1C1208]/10 border border-[#1C1208]/10 overflow-hidden"
          data-intro-reveal
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`group flex flex-col items-center text-center gap-4 p-5 sm:p-8 bg-[#F5F0E8] transition-colors duration-300 hover:bg-[#1C1208]/[0.02] cursor-default ${i === 3 ? "hidden lg:flex" : "flex"}`}
              >
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border border-rust/20 text-rust transition-colors duration-300 group-hover:bg-rust/5">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>

                <Annotation className="!text-rust font-bold responsive-stat-label">
                  {p.label}
                </Annotation>

                <BodyText size="sm" className="responsive-body-sm leading-relaxed opacity-70">
                  {p.body}
                </BodyText>
              </div>
            );
          })}
        </div>
        */}

        <div data-intro-reveal>
          <ButtonPrimary href="/#about-shree" className="responsive-btn-text">
            Learn More About Us
          </ButtonPrimary>
        </div>

      </div>
    </SectionWrapper>
  );
}