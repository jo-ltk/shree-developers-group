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
            <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-foreground/70">
              Our People
            </p>
            <h2 className="font-sans text-[3rem] font-normal leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[4.4rem] lg:text-[5.4rem]">
              Team
            </h2>
          </div>
          <div className="h-px w-full bg-foreground/18" />
        </div>

        <div className="pb-10 pt-10 lg:pb-14 lg:pt-14">
          <div
            data-team-copy
            className="grid gap-8 text-left lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12"
          >
            <p className="max-w-[40rem] text-[1rem] leading-8 text-foreground/78">
              The depth of our multi-disciplinary experience coupled with our tight-knit, team-based
              approach ensures that Archipelago offers the intelligence and breadth of larger
              corporate practices with the immediacy and flexibility of a small design studio.
            </p>

            <a
              href="#"
              className="group/team inline-flex w-fit flex-col items-start gap-3 text-foreground transition-transform duration-300 hover:-translate-y-0.5 lg:justify-self-end"
            >
              <span className="inline-flex items-center gap-3 text-[1rem] font-medium leading-none tracking-[-0.02em] sm:text-[1.1rem]">
                <span>Meet The Team</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/team:translate-x-1.5" />
              </span>
              <span className="h-px w-full origin-left bg-foreground/42 transition-transform duration-300 group-hover/team:scale-x-[1.08]" />
            </a>
          </div>
        </div>

        <div data-team-image-shell className="relative overflow-hidden">
          <div className="relative aspect-[16/9] min-h-[20rem] overflow-hidden bg-muted sm:min-h-[26rem] lg:min-h-[40rem]">
            <div data-team-image className="absolute inset-0 will-change-transform">
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
