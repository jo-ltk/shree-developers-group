"use client";

import { useLayoutEffect, useRef } from "react";
import { Star } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

const testimonials = [
  {
    quote:
      "Buying with Shree Developers Group felt far more guided than transactional. The team kept every detail clear, and the whole process felt calm from start to finish.",
    name: "Nathan Harper",
    role: "Software Developer",
    initials: "NH",
    gradient: "from-[#d9cab3] to-[#8f6f59]",
  },
  {
    quote:
      "I was looking for a long-term investment, and they helped me evaluate every option with patience and honesty. It made the decision feel solid and informed.",
    name: "Logan Price",
    role: "Environmental Consultant",
    initials: "LP",
    gradient: "from-[#8ab0c9] to-[#315f7e]",
  },
  {
    quote:
      "They understood exactly what I wanted in a home and narrowed the search beautifully. It never felt overwhelming, and the outcome was better than I expected.",
    name: "Aria Sullivan",
    role: "Digital Nomad",
    initials: "AS",
    gradient: "from-[#d8c1b1] to-[#8f7d78]",
  },
  {
    quote:
      "As a first-time buyer, I had a lot of questions. Their advice was practical, transparent, and reassuring the whole way through.",
    name: "Grace Powell",
    role: "Financial Consultant",
    initials: "GP",
    gradient: "from-[#97bfd0] to-[#38657a]",
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
        .from("[data-testimonials-heading] > *", {
          autoAlpha: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.12,
        })
        .from(
          "[data-testimonial-card]",
          {
            autoAlpha: 0,
            y: 30,
            duration: 0.85,
            stagger: 0.12,
          },
          "<0.12"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[color:color-mix(in_oklab,var(--secondary)_26%,white)] px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[112rem]">
        <div data-testimonials-heading className="max-w-[56rem]">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.34em] text-muted-foreground">
            What Our Clients Say
          </p>
          <h2 className="mt-4 font-sans text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[4rem] lg:text-[4.9rem]">
            Trusted by Many, Loved by All
          </h2>
          <p className="mt-5 max-w-[48rem] text-[1.02rem] leading-8 text-foreground/72 sm:text-[1.1rem]">
            Our clients&apos; success stories reflect our commitment to excellence. See how we&apos;ve
            helped them find their dream homes, sustainable investments, and perfect getaways.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              data-testimonial-card
              className="group relative overflow-hidden rounded-[1.35rem] border border-foreground/12 bg-white/70 p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--ring)_34%,var(--border))] hover:bg-[color:color-mix(in_oklab,var(--secondary)_54%,white)] sm:p-8"
            >
              <div className="relative flex items-center gap-2 text-foreground transition-colors duration-300 group-hover:text-[color:color-mix(in_oklab,var(--ring)_72%,black)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`${item.name}-${index}`}
                    className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-105"
                    strokeWidth={1.8}
                  />
                ))}
              </div>

              <p className="relative mt-5 max-w-[28rem] text-[1.22rem] leading-10 tracking-[-0.03em] text-foreground/82 transition-colors duration-300 group-hover:text-foreground sm:text-[1.32rem]">
                {item.quote}
              </p>

              <div className="relative mt-8 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-[1rem] font-semibold text-white transition-transform duration-500 group-hover:scale-105`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-[1.32rem] font-semibold tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-[color:color-mix(in_oklab,var(--ring)_84%,black)]">
                    {item.name}
                  </p>
                  <p className="text-[1rem] leading-7 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/62">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
