"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

const commitments = [
  "Clear documentation before booking",
  "Material choices explained without pressure",
  "Construction updates shared with discipline",
  "Handover support after possession",
];

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
      className="bg-[#FAF8F3] py-28 text-[var(--text-primary)] lg:py-36"
    >
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div className="mx-auto flex max-w-[54rem] flex-col items-center text-center">
          <div data-team-heading className="flex flex-col items-center">
            <div className="mb-7 flex flex-col items-center gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Our Promise
              </p>
              <span className="h-px w-10 shrink-0 bg-[var(--color-accent)]" />
            </div>
            <h2
              className="text-[2.55rem] font-light leading-[1.06] tracking-normal text-[var(--text-primary)] sm:text-[3.25rem] lg:text-[4rem]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Premium is not loud. It is{" "}
              <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                consistently cared for.
              </em>
            </h2>
          </div>

          <div data-team-copy className="mt-8 flex flex-col items-center">
            <p className="max-w-[42rem] text-[0.98rem] font-light leading-[1.85] text-[var(--text-primary)]">
              Shree Developers Group works with a simple belief: real estate feels luxurious when
              buyers understand what is being built, why it matters, and who stands behind it.
            </p>

            <div className="mt-10 grid w-full gap-3 text-left sm:grid-cols-2">
              {commitments.map((item) => (
                <div
                  key={item}
                  className="border-l border-[rgba(201,174,123,0.55)] bg-[#F2EADF] px-5 py-4 text-[0.86rem] font-light leading-[1.65] text-[var(--text-primary)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href="#footer"
              className="group/btn mt-10 inline-flex h-[50px] items-center justify-center gap-3 border border-[var(--color-support)] bg-transparent px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)]"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              Start A Conversation
              <ArrowRight className="h-4 w-4 opacity-40 transition-all duration-200 group-hover/btn:translate-x-1 group-hover/btn:opacity-100" />
            </a>
          </div>
        </div>

        <div data-team-image-shell className="mt-16">
          <div className="relative min-h-[24rem] overflow-hidden rounded-[8px] border border-[rgba(183,170,152,0.35)] sm:min-h-[32rem] lg:min-h-[44rem]">
            <div data-team-image className="absolute inset-0 will-change-transform">
              <Image
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=82"
                alt="Premium living room with warm finishes"
                fill
                className="scale-[1.04] object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,243,0)_0%,rgba(58,52,46,0.38)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <p className="max-w-[40rem] text-[1.15rem] font-light leading-[1.75] text-[#FAF8F3] sm:text-[1.35rem]">
                Warm materiality, practical planning, and a service standard designed to make ownership feel assured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
