"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

const footerLinks = [
  { label: "Projects", href: "#gallery" },
  { label: "About Us", href: "#team" },
  { label: "Team", href: "#team" },
  { label: "Articles", href: "#articles" },
  { label: "Workshops", href: "#team" },
  { label: "Careers", href: "#team" },
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
        <div
          data-footer-grid
          className="space-y-10 sm:space-y-12"
        >
          <div className="grid gap-10 border-t border-primary-foreground/12 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-16 lg:py-12">
            <div className="space-y-5">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Shree Developers Group
              </p>
              <h2 className="font-sans text-[3rem] font-normal leading-[0.92] tracking-[-0.06em] text-primary-foreground sm:text-[4.4rem] lg:text-[5.4rem]">
                Premium property with a cleaner, more personal approach.
              </h2>
              <p className="max-w-[52rem] text-[1rem] leading-8 text-primary-foreground/70 sm:text-[1.06rem]">
                Crafted for modern buyers, investors, and communities with a sharper eye on detail,
                quality, and long-term value.
              </p>
            </div>

            <div className="space-y-5 lg:max-w-[28rem] lg:justify-self-end">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Start A Conversation
              </p>
              <p className="text-[1rem] leading-8 text-primary-foreground/72 sm:text-[1.04rem]">
                Let&apos;s talk about homes, investments, and future-ready developments shaped around
                better design and clearer decision-making.
              </p>
              <a
                href="mailto:hello@shreedevelopersgroup.com"
                className="inline-flex items-center gap-3 text-[1.15rem] font-medium tracking-[-0.02em] text-primary-foreground transition-colors duration-300 hover:text-[color:color-mix(in_oklab,var(--accent)_28%,white)] sm:text-[1.3rem]"
              >
                hello@shreedevelopersgroup.com
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1fr_0.9fr_0.9fr_1.2fr] xl:gap-14">
            <div className="space-y-5">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Office
              </p>
              <p className="max-w-[22rem] text-[1rem] leading-8 text-primary-foreground/76 sm:text-[1.04rem]">
                Turrbal and Yuggera/Jagera Country
                <br />
                Level 3, 199 George Street
                <br />
                Brisbane QLD 4000
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                  Contact
                </p>
                <div className="space-y-3 text-[1rem] leading-8 text-primary-foreground/76 sm:text-[1.04rem]">
                  <a
                    href="tel:+61732364606"
                    className="block transition-colors duration-300 hover:text-[color:color-mix(in_oklab,var(--accent)_32%,white)]"
                  >
                    +61 7 3236 4606
                  </a>
                  <a
                    href="mailto:hello@shreedevelopersgroup.com"
                    className="block transition-colors duration-300 hover:text-[color:color-mix(in_oklab,var(--accent)_32%,white)]"
                  >
                    hello@shreedevelopersgroup.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Navigation
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {footerLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[1.05rem] font-medium tracking-[-0.02em] text-primary-foreground transition-colors duration-300 hover:text-[color:color-mix(in_oklab,var(--accent)_28%,white)]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-5 xl:pl-4">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Subscribe
              </p>
              <p className="max-w-[26rem] text-[1rem] leading-8 text-primary-foreground/76 sm:text-[1.04rem]">
                Market updates, launches, and development insights delivered with restraint.
              </p>

              <label className="group/footer-input block">
                <span className="sr-only">Enter your email</span>
                <div className="flex items-center gap-4 border-b border-primary-foreground/24 pb-3 transition-colors duration-300 group-focus-within/footer-input:border-[color:color-mix(in_oklab,var(--accent)_42%,white)] hover:border-primary-foreground/42">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full bg-transparent text-[1.12rem] tracking-[-0.02em] text-primary-foreground placeholder:text-primary-foreground/46 focus:outline-none sm:text-[1.2rem]"
                  />
                  <button
                    type="button"
                    aria-label="Submit email"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground transition-transform duration-300 hover:translate-x-1 hover:text-[color:color-mix(in_oklab,var(--accent)_34%,white)]"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-primary-foreground/10 pt-6 text-[0.82rem] uppercase tracking-[0.22em] text-primary-foreground/42 sm:flex-row sm:items-center sm:justify-between">
            <p>Shree Developers Group</p>
            <p>Designed for modern city living</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
