"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { RustLine } from "./ui/rust-line";
import { FigMarker } from "./ui/fig-marker";

const testimonials = [
  {
    quote:
      "The difference was clarity. Every step, from payment schedule to handover checklist, was explained in a way that made the purchase feel calm.",
    name: "Rohan Mehta",
    role: "Homeowner",
  },
  {
    quote:
      "We were comparing several investments, and Shree helped us understand the site, timeline, and long-term value without rushing the decision.",
    name: "Neha Shah",
    role: "Investor",
  },
  {
    quote:
      "The planning felt practical for our family. The rooms, parking, and community spaces were thought through for everyday life, not just the brochure.",
    name: "Karan Patel",
    role: "Resident",
  },
  {
    quote:
      "After possession, the team stayed responsive. That gave us confidence that the relationship did not end at the sale.",
    name: "Aarav Desai",
    role: "Homeowner",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        })
        .from("[data-testimonial-heading] > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.12,
        })
        .from("[data-testimonial-item]", {
          autoAlpha: 0,
          x: -20,
          duration: 1,
          stagger: 0.2,
          delay: -0.5,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="testimonials" ref={sectionRef} dark={false} className="!py-16 md:!py-20">
      {/* Asymmetric Header (7/5 Split) */}
      <div data-testimonial-heading className="grid grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel counter="05 / 08">Client Voices</SectionLabel>
          <SectionHeadline 
            size="xl" 
            className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98]"
          >
            Trust is built in quiet
            <br />
            moments of <em className="italic">follow-through</em>
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <BodyText size="md" className="mb-8">
            A premium builder experience should feel steady, human, and easy to understand. These 
            stories reflect the kind of reassurance Shree wants every buyer to feel.
          </BodyText>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24 border-t border-dark/10 pt-16 md:pt-24">
        {testimonials.map((item, index) => (
          <div 
            key={index} 
            data-testimonial-item 
            className="group cursor-default"
          >
            <div className="border-l-2 border-rust pl-8 md:pl-12 transition-all duration-700 group-hover:border-l-4 group-hover:pl-10 md:group-hover:pl-14">
              <p
                className="text-dark leading-[1.4] mb-8 font-serif font-light italic transition-all duration-700 group-hover:-translate-y-1"
                style={{
                  fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-6 transition-all duration-700 group-hover:translate-x-2">
                <RustLine className="mb-0 w-8 transition-all duration-700 group-hover:w-12" />
                <div>
                  <Annotation className="text-[0.65rem] font-bold">
                    {item.name}
                  </Annotation>
                  <Annotation className="text-[0.55rem] mt-1 opacity-60">
                    {item.role}
                  </Annotation>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FigMarker fig="fig. 21" label="Resident Narratives" />
    </SectionWrapper>
  );
}

