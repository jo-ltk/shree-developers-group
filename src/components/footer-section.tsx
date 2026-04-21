"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

const navColumns = [
  ["Projects"],
  ["About Us", "Workshops"],
  ["Team", "Careers"],
  ["Articles"],
];

export function FooterSection() {
  const footerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 84%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      }).from("[data-footer-grid] > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.82,
        stagger: 0.08,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative overflow-hidden px-6 py-14 text-primary-foreground sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(237, 193, 168, 0.08), transparent 24%), linear-gradient(180deg, color-mix(in oklab, var(--primary) 74%, #5d5a41), color-mix(in oklab, var(--primary) 82%, #4f513f))",
      }}
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="pb-8 sm:pb-10 lg:pb-12">
          <a
            href="#top"
            className="inline-block max-w-full font-sans text-[4.4rem] font-medium leading-[0.84] tracking-[-0.09em] text-primary-foreground transition-all duration-300 hover:translate-x-1 hover:text-[color:color-mix(in_oklab,var(--accent)_26%,white)] sm:text-[6.6rem] lg:text-[9.5rem] xl:text-[10.8rem]"
          >
            Archipelago
          </a>
        </div>

        <div
          data-footer-grid
          className="grid gap-10 border-t border-primary-foreground/12 pt-10 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr_1.1fr_1.2fr] xl:gap-14 xl:pt-12"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-[1.65rem] font-medium tracking-[-0.03em] text-primary-foreground sm:text-[1.8rem]">
                Office
              </h3>
              <p className="max-w-[22rem] text-[1rem] leading-8 text-primary-foreground/78 sm:text-[1.04rem]">
                Turrbal and Yuggera/Jagera Country
                <br />
                Level 3, 199 George Street
                <br />
                Brisbane QLD 4000
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-[1.65rem] font-medium tracking-[-0.03em] text-primary-foreground sm:text-[1.8rem]">
                Phone
              </h3>
              <a
                href="tel:+61732364606"
                className="block text-[1rem] leading-8 text-primary-foreground/78 transition-colors duration-300 hover:text-[color:color-mix(in_oklab,var(--accent)_34%,white)] sm:text-[1.04rem]"
              >
                +61 7 3236 4606
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-[1.65rem] font-medium tracking-[-0.03em] text-primary-foreground sm:text-[1.8rem]">
                Email
              </h3>
              <a
                href="mailto:hello@archipelago.com.au"
                className="block text-[1rem] leading-8 text-primary-foreground/78 transition-colors duration-300 hover:text-[color:color-mix(in_oklab,var(--accent)_34%,white)] sm:text-[1.04rem]"
              >
                hello@archipelago.com.au
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:col-span-1 xl:grid-cols-2">
            {navColumns.map((column, index) => (
              <div key={`footer-nav-${index}`} className="space-y-4">
                {column.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-[1.42rem] font-medium tracking-[-0.02em] text-primary-foreground transition-colors duration-300 hover:text-[color:color-mix(in_oklab,var(--accent)_28%,white)]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-6 xl:pl-4">
            <h3 className="text-[1.9rem] font-medium tracking-[-0.03em] text-primary-foreground sm:text-[2.1rem]">
              Subscribe
            </h3>
            <p className="max-w-[28rem] text-[1rem] leading-8 text-primary-foreground/78 sm:text-[1.04rem]">
              Our strategy, thinking and insights. Shared with you.
            </p>

            <label className="group/footer-input block">
              <span className="sr-only">Enter your email</span>
              <div className="flex items-center gap-4 border-b border-primary-foreground/24 pb-3 transition-colors duration-300 group-focus-within/footer-input:border-[color:color-mix(in_oklab,var(--accent)_42%,white)] hover:border-primary-foreground/42">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full bg-transparent text-[1.2rem] tracking-[-0.02em] text-primary-foreground placeholder:text-primary-foreground/46 focus:outline-none sm:text-[1.32rem]"
                />
                <button
                  type="button"
                  aria-label="Submit email"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground transition-transform duration-300 hover:translate-x-1 hover:-rotate-6 hover:text-[color:color-mix(in_oklab,var(--accent)_34%,white)]"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}
