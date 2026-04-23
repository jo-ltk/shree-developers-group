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
      className="bg-[var(--color-primary)] border-t border-[var(--color-secondary)]/08 relative overflow-hidden"
    >
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20 py-16 lg:py-20">
        <div data-footer-grid className="space-y-12 sm:space-y-16">
          
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end border-b border-[var(--color-secondary)]/08 pb-12 sm:pb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-[1.5px] w-9 bg-[var(--color-accent)] flex-shrink-0" />
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
                  Shree Developers Group
                </p>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
                  className="text-[var(--text-light)] leading-[1.1] tracking-[-0.01em] max-w-[42rem]">
                Premium property with a cleaner, more personal <em style={{ fontStyle: "italic" }} className="text-[var(--color-accent)]">approach.</em>
              </h2>
              <p className="max-w-[42rem] text-[0.82rem] font-light leading-[1.75] text-[var(--text-light)]/55">
                Crafted for modern buyers, investors, and communities with a sharper eye on detail,
                quality, and long-term value.
              </p>
            </div>

            <div className="space-y-5 lg:max-w-[24rem]">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
                Start A Conversation
              </p>
              <p className="text-[0.82rem] font-light leading-[1.75] text-[var(--text-light)]/55">
                Let&apos;s talk about homes, investments, and future-ready developments shaped around
                better design and clearer decision-making.
              </p>
              <a
                href="mailto:hello@shreedevelopersgroup.com"
                className="group inline-flex items-center gap-3 text-[1rem] sm:text-[1.1rem] font-medium tracking-wide text-[var(--text-light)] transition-colors duration-300 hover:text-[var(--color-accent)]"
              >
                hello@shreedevelopersgroup.com
                <ArrowRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.5fr] xl:gap-14 pb-4">
            <div className="space-y-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">Office</p>
              <p className="text-[0.85rem] font-light leading-[1.8] text-[var(--text-light)]/50">
                Turrbal and Yuggera/Jagera Country<br />
                Level 3, 199 George Street<br />
                Brisbane QLD 4000
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">Contact</p>
              <div className="flex flex-col gap-3 text-[0.85rem] font-light text-[var(--text-light)]/50">
                <a href="tel:+61732364606" className="transition-colors duration-300 hover:text-[var(--color-accent)] block">+61 7 3236 4606</a>
                <a href="mailto:hello@shreedevelopersgroup.com" className="transition-colors duration-300 hover:text-[var(--color-accent)] block">hello@shreedevelopersgroup.com</a>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">Navigation</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {footerLinks.map((item) => (
                  <a key={item.label} href={item.href} className="text-[0.85rem] font-light text-[var(--text-light)]/50 transition-colors duration-300 hover:text-[var(--color-accent)]">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-5 lg:pl-8 xl:pl-12 border-t sm:border-none border-[var(--color-secondary)]/08 pt-10 sm:pt-0">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">Subscribe</p>
              <p className="text-[0.85rem] font-light leading-[1.8] text-[var(--text-light)]/50">
                Market updates, launches, and development insights delivered with restraint.
              </p>
              
              <label className="group/footer-input block mt-5">
                <span className="sr-only">Enter your email</span>
                <div className="flex items-center gap-4 border-b border-[var(--color-secondary)]/30 pb-3 transition-colors duration-300 group-focus-within/footer-input:border-[var(--color-accent)] hover:border-[var(--color-accent)]">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full bg-transparent text-[0.95rem] tracking-wide text-[var(--text-light)] placeholder:text-[var(--text-light)]/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Submit email"
                    className="inline-flex h-8 w-8 items-center justify-center text-[var(--text-light)]/40 transition-all duration-300 hover:text-[var(--color-accent)] hover:translate-x-1"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[var(--color-secondary)]/08">
            <p className="text-[0.78rem] text-[var(--text-light)]/25">Shree Developers Group</p>
            <p className="text-[9px] font-semibold tracking-[0.15em] text-[var(--color-accent)] uppercase">Designed for modern city living</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
