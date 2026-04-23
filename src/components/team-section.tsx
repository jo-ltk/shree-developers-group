"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

export function TeamSection() {
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
        .from("[data-team-heading] > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.12,
        })
        .from(
          "[data-team-copy] > *",
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.12,
          },
          "<0.08"
        )
        .from(
          "[data-team-image-shell]",
          {
            autoAlpha: 0,
            y: 28,
            duration: 1,
          },
          "<0.12"
        );

      gsap.to("[data-team-image]", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="bg-background px-6 pb-16 pt-0 sm:px-8 sm:pb-20 sm:pt-0 lg:px-10 lg:pb-24 lg:pt-0"
    >
      <div className="mx-auto max-w-[112rem]">
        <div data-team-heading>
          <div className="pb-6 pt-2 sm:pb-8 sm:pt-4 lg:pb-10 lg:pt-6">
            <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#C6A96B]">
              Our People
            </p>
            <h2 className="font-cormorant text-[3.5rem] leading-[1.05] text-[#112025] sm:text-[4.4rem] lg:text-[5.4rem]">
              Team
            </h2>
          </div>
          <div className="h-px w-full bg-[#C6A96B]/20" />
        </div>

        <div className="pb-10 pt-10 lg:pb-14 lg:pt-14">
          <div
            data-team-copy
            className="grid gap-8 text-left lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12"
          >
            <p className="font-outfit font-light max-w-[40rem] text-[1.1rem] leading-relaxed text-[#787b78]">
              The depth of our multi-disciplinary experience coupled with our tight-knit, team-based
              approach ensures that Archipelago offers the intelligence and breadth of larger
              corporate practices with the immediacy and flexibility of a small design studio.
            </p>

            <a
              href="#"
              className="group/team inline-flex w-fit flex-col items-start gap-3 text-[#112025] transition-transform duration-300 hover:-translate-y-0.5 lg:justify-self-end hover:text-[#C6A96B]"
            >
              <span className="inline-flex items-center gap-3 font-semibold uppercase tracking-[0.1em] text-[0.85rem]">
                <span>Meet The Team</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/team:translate-x-1.5" />
              </span>
              <span className="h-px w-full origin-left bg-[#C6A96B]/40 transition-transform duration-300 group-hover/team:scale-x-[1.08] group-hover/team:bg-[#C6A96B]" />
            </a>
          </div>
        </div>

        <div data-team-image-shell className="relative overflow-hidden mt-4">
          <div className="relative aspect-[16/9] min-h-[20rem] bg-[#F5F3EF] border border-[#C6A96B]/15 p-4 sm:p-6 lg:p-8 sm:min-h-[26rem] lg:min-h-[40rem] shadow-[0_8px_40px_rgba(198,169,107,0.08)]">
            <div data-team-image className="absolute inset-4 sm:inset-6 lg:inset-8 will-change-transform overflow-hidden rounded-[2px]">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
                alt="Team gathered together in a bright architectural setting"
                fill
                className="scale-[1.04] object-cover object-center"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
