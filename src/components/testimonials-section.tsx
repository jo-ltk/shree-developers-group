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
import { Play } from "lucide-react";

const testimonials = [
  {
    type: "video",
    quote: "Moving to Sydney Oaks was the best decision for our family. The sense of community is unmatched.",
    name: "The Carter Family",
    location: "Sydney Oaks, Cumming",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    type: "text",
    quote: "The difference was clarity. Every step, from payment schedule to handover checklist, was explained in a way that made the purchase feel calm.",
    name: "Rohan Mehta",
    location: "Elysian Gates",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
  },
  {
    type: "text",
    quote: "We were comparing several investments, and Shree helped us understand the site, timeline, and long-term value without rushing the decision.",
    name: "Sarah Jenkins",
    location: "North Georgia",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    type: "text",
    quote: "The planning felt practical for our family. The rooms, parking, and community spaces were thought through for everyday life.",
    name: "Michael Chen",
    location: "Sydney Oaks",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

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
        .from("[data-testimonial-card]", {
          autoAlpha: 0,
          x: 40,
          duration: 1,
          stagger: 0.15,
          delay: -0.4,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="testimonials" ref={sectionRef} dark={false} className="!py-24 md:!py-36 overflow-hidden bg-[#EDE8DF]">
      {/* Asymmetric Header */}
      <div data-testimonial-heading className="flex flex-col items-center md:grid md:grid-cols-12 gap-8 md:gap-12 items-center md:items-end mb-16 md:mb-24 px-8 md:px-12 lg:px-20 text-center md:text-left">
        <div className="col-span-12 lg:col-span-8 flex flex-col items-center md:items-start">
          <SectionLabel className="justify-center md:justify-start">Homeowner Experiences</SectionLabel>
          <SectionHeadline 
            size="xl"
            className="responsive-headline-xl"
          >
            Trust is built in quiet
            <br />
            moments of follow-through
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-center md:items-start">
          <BodyText size="md" className="mb-4 text-[#1C1208]/70 responsive-body-sm">
            A premium builder experience should feel steady, human, and easy to understand. Hear from the families who call our communities home.
          </BodyText>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full pl-8 md:pl-12 lg:pl-20">
        <div 
          ref={sliderRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-12 pr-8 md:pr-12 lg:pr-20 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              data-testimonial-card
              className="snap-start shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] bg-[#F5F0E8] border border-[#1C1208]/10 group flex flex-col justify-between"
            >
              {item.type === "video" ? (
                <div className="relative w-full aspect-video overflow-hidden bg-[#1C1208]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#1C1208]/20 group-hover:bg-[#1C1208]/40 transition-colors duration-500" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-[#F5F0E8]/90 backdrop-blur-sm flex items-center justify-center text-rust transition-transform duration-300 group-hover:scale-110 shadow-xl">
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </button>
                  </div>
                  
                  <div className="absolute top-6 left-6">
                    <Annotation light className="bg-[#1C1208]/60 backdrop-blur-md px-3 py-1.5 rounded-sm responsive-stat-label">Featured Story</Annotation>
                  </div>
                </div>
              ) : (
                <div className="p-8 md:p-12 border-b border-[#1C1208]/10 flex-grow flex flex-col justify-center">
                  <p
                    className="text-[#1C1208] leading-[1.4] font-serif font-light italic responsive-headline-xl"
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              )}
              
              <div className="p-6 md:p-8 flex items-center gap-6 bg-white/50">
                {item.type === "text" && (
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#1C1208]/10">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                <div>
                  <Annotation className="!text-[#1C1208] !font-bold responsive-stat-label mb-1">
                    {item.name}
                  </Annotation>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-rust rounded-full" />
                    <Annotation className="!text-[#1C1208]/50 responsive-stat-label">
                      {item.location}
                    </Annotation>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 md:px-12 lg:px-20 mt-8">
        <FigMarker fig="fig. 52" label="Homeowner Feedback" />
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SectionWrapper>
  );
}
