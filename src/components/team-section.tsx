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
      className="bg-[var(--color-secondary)] py-20 lg:py-28 text-[var(--text-primary)]"
    >
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div data-team-heading>
          <div className="flex items-center gap-4 mb-7">
            <span className="h-[1.5px] w-9 bg-[var(--color-accent)] flex-shrink-0" />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">Our People</p>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
              className="text-[var(--text-primary)] leading-[1.1] tracking-[-0.01em] max-w-[36rem]">
            Leadership & <em style={{ fontStyle: "italic" }} className="text-[var(--color-accent)]">Team.</em>
          </h2>
          <div className="my-8 h-[1px] w-12 bg-[var(--color-accent)]/30" />
        </div>

        <div className="pb-10 lg:pb-14">
          <div
            data-team-copy
            className="grid gap-8 text-left lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12"
          >
            <p className="text-[0.82rem] font-light leading-[1.75] text-[var(--text-primary)]/60 max-w-[40rem]">
              The depth of our multi-disciplinary experience coupled with our tight-knit, team-based
              approach ensures that Archipelago offers the intelligence and breadth of larger
              corporate practices with the immediacy and flexibility of a small design studio.
            </p>

            <a
              href="#"
              className="group/btn flex h-[50px] items-center justify-center gap-3 border border-[var(--color-primary)]/20 bg-transparent px-7 text-[11px] font-semibold tracking-[0.18em] text-[var(--text-primary)] uppercase transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-px"
            >
              Meet The Team
              <ArrowRight className="h-4 w-4 opacity-40 transition-all duration-200 group-hover/btn:translate-x-1 group-hover/btn:opacity-100" />
            </a>
          </div>
        </div>

        <div data-team-image-shell className="relative overflow-visible mt-4">
          <div className="relative aspect-[16/9] min-h-[20rem] sm:min-h-[26rem] lg:min-h-[40rem] mx-3 my-3">
            {/* Gold corner accents */}
            <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-[var(--color-accent)]/50 z-10" />
            <div className="absolute -top-3 -left-3 h-16 w-16 border-t-2 border-l-2 border-[var(--color-accent)]/50 z-10" />
            
            <div data-team-image className="absolute inset-0 will-change-transform overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
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
