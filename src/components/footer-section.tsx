"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import { ensureGsapPlugins } from "@/lib/gsap";

const footerLinks = [
  { label: "Projects", href: "#gallery" },
  { label: "Our Promise", href: "#team" },
  { label: "Builder Notes", href: "#articles" },
  { label: "Contact", href: "#footer" },
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
      className="relative overflow-hidden border-t border-[rgba(183,170,152,0.35)] bg-[#FAF8F3]"
    >
      <div className="mx-auto max-w-[120rem] px-5 py-20 sm:px-7 lg:px-20 lg:py-24">
        <div data-footer-grid className="space-y-14 sm:space-y-16">
          <div className="grid gap-10 border-b border-[rgba(183,170,152,0.35)] pb-14 lg:grid-cols-[1fr_0.68fr] lg:items-end">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 shrink-0 bg-[var(--color-accent)]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Shree Developers Group
                </p>
              </div>
              <h2
                className="max-w-[46rem] text-[2.55rem] font-light leading-[1.06] tracking-normal text-[var(--text-primary)] sm:text-[3.25rem] lg:text-[4rem]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Let&apos;s plan your next address with clarity and{" "}
                <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                  care.
                </em>
              </h2>
              <p className="max-w-[42rem] text-[0.98rem] font-light leading-[1.85] text-[var(--text-primary)]">
                Speak with the team about active communities, available homesites, construction
                timelines, and the details that matter before you commit.
              </p>
            </div>

            <div className="space-y-5 lg:max-w-[25rem]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Start A Conversation
              </p>
              <a
                href="mailto:hello@shreedevelopersgroup.com"
                className="group inline-flex items-center gap-3 text-[1.05rem] font-medium text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--color-accent)]"
              >
                hello@shreedevelopersgroup.com
                <ArrowRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.25fr] xl:gap-14">
            <div className="space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Office
              </p>
              <p className="text-[0.9rem] font-light leading-[1.85] text-[var(--text-primary)]">
                Shree Developers Group<br />
                Premium Residential Developments<br />
                Gujarat, India
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Contact
              </p>
              <div className="flex flex-col gap-3 text-[0.9rem] font-light text-[var(--text-primary)]">
                <a href="mailto:hello@shreedevelopersgroup.com?subject=Request%20a%20callback" className="transition-colors duration-300 hover:text-[var(--color-accent)]">
                  Request a callback
                </a>
                <a href="mailto:hello@shreedevelopersgroup.com" className="transition-colors duration-300 hover:text-[var(--color-accent)]">
                  hello@shreedevelopersgroup.com
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Navigation
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {footerLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[0.9rem] font-light text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-[rgba(183,170,152,0.35)] pt-10 sm:border-none sm:pt-0 lg:pl-8 xl:pl-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Updates
              </p>
              <p className="mt-5 text-[0.9rem] font-light leading-[1.85] text-[var(--text-primary)]">
                Receive launch notes, availability updates, and handover milestones.
              </p>

              <label className="group/footer-input mt-6 block">
                <span className="sr-only">Enter your email</span>
                <div className="flex items-center gap-4 border-b border-[rgba(183,170,152,0.55)] pb-3 transition-colors duration-300 hover:border-[var(--color-accent)] group-focus-within/footer-input:border-[var(--color-accent)]">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-[0.95rem] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Submit email"
                    className="inline-flex h-8 w-8 items-center justify-center text-[var(--text-primary)] transition-all duration-300 hover:translate-x-1 hover:text-[var(--color-accent)]"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-[rgba(183,170,152,0.35)] pt-6 sm:flex-row">
            <p className="text-[0.78rem] text-[var(--text-secondary)]">Shree Developers Group</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Built for modern residential trust
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
