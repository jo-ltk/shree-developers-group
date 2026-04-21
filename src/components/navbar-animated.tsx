"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { BrandMark } from "@/components/ui/brand-mark";

const navColumns = [
  { title: "Projects", href: "#gallery", links: [] as string[] },
  { title: "Practice", href: "#team", links: ["About Us", "Workshops"] },
  { title: "People", href: "#team", links: ["Team", "Careers"] },
  { title: "Resources", href: "#articles", links: ["Articles"] },
  { title: "Contact", href: "#footer", links: [] as string[] },
];

const desktopGridClass =
  "grid grid-cols-[minmax(12rem,1.45fr)_repeat(5,minmax(0,1fr))] items-start gap-x-8";

export function NavbarAnimated() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const columnsWithMeta = useMemo(
    () =>
      navColumns.map((column) => ({
        ...column,
        isTrailing: column.title === "Contact",
      })),
    []
  );

  return (
    <>
      <header
        className="absolute inset-x-0 top-0 z-50"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* ── Collapsed bar ── */}
        <div className="mx-auto max-w-[96rem] px-6 pt-5 sm:px-8 lg:px-10 lg:pt-6">
          {/* Desktop */}
          <div className={`${desktopGridClass} hidden xl:grid`}>
            <a href="#top" className="w-fit text-primary-foreground">
              <BrandMark
                variant="white"
                className="h-10 w-[7.5rem]"
                alt="Shree Developers Group white logo"
                priority
              />
            </a>

            {columnsWithMeta.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={`flex min-h-[2.5rem] items-center gap-2 text-[0.92rem] font-medium tracking-[0.01em] text-primary-foreground/92 transition-colors duration-300 hover:text-primary-foreground ${
                  item.isTrailing ? "justify-self-end" : "justify-self-start"
                }`}
              >
                <span>{item.title}</span>
                {item.links.length > 0 ? <ChevronDown className="h-4 w-4" /> : null}
              </a>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex items-center justify-between xl:hidden">
            <a href="#top" className="text-primary-foreground">
              <BrandMark
                variant="white"
                className="h-10 w-[7rem]"
                alt="Shree Developers Group white logo"
                priority
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/16 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Desktop expanded dropdown ── */}
        <div
          className={`fixed inset-x-0 top-0 hidden origin-top overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
            isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
          }`}
        >
          <div className="bg-background text-foreground shadow-[0_32px_110px_rgba(20,28,44,0.14)] border-b border-border">
            <div className="mx-auto max-w-[96rem] px-6 pb-8 pt-7 sm:px-8 lg:px-10">

              {/* Nav titles row */}
              <div className={desktopGridClass}>
                <div
                  className={`relative transition-all duration-500 ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "60ms" }}
                >
                  <div className="flex flex-col pr-8">
                    <span className="mb-3 block h-px w-10 bg-secondary" />
                    <div>
                      <p className="font-display text-[1.3rem] leading-[1.22] tracking-[-0.01em] text-foreground">
                        Built with&nbsp;purpose,<br />crafted with&nbsp;care.
                      </p>
                      <p className="mt-1.5 text-[0.84rem] leading-[1.55] text-foreground/55">
                        Residences and communities designed to stand the test of time — in Gujarat and beyond.
                      </p>
                    </div>
                    <a
                      href="#gallery"
                      className="mt-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-opacity duration-200 hover:opacity-70"
                    >
                      View all projects
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <span className="absolute inset-y-0 right-0 w-px bg-border" />
                </div>

                {columnsWithMeta.map((column, index) => (
                  <div
                    key={column.title}
                    className={`transition-all duration-500 ${
                      isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                    } ${column.isTrailing ? "justify-self-end" : "justify-self-start"}`}
                    style={{ transitionDelay: `${60 + index * 30}ms` }}
                  >
                    <a
                      href={column.href}
                      className="flex min-h-[2.5rem] items-center gap-2 text-[0.92rem] font-medium tracking-[0.01em] text-foreground hover:text-secondary transition-colors duration-200"
                    >
                      <span>{column.title}</span>
                      {column.links.length > 0 ? <ChevronDown className="h-4 w-4 rotate-180" /> : null}
                    </a>
                  </div>
                ))}
              </div>

              {/* Sub-links row */}
              <div className={`${desktopGridClass} mt-2`}>
                <div aria-hidden="true" />

                {columnsWithMeta.map((column, index) => (
                  <div
                    key={`${column.title}-links`}
                    className={`transition-all duration-500 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    } ${column.isTrailing ? "justify-self-end text-right" : "justify-self-start"}`}
                    style={{ transitionDelay: `${120 + index * 35}ms` }}
                  >
                    {column.links.length > 0 ? (
                      <div className="space-y-3 text-[0.95rem] leading-[1.5] text-foreground/80">
                        {column.links.map((item) => (
                          <a key={item} href={column.href} className="block transition-opacity duration-300 hover:opacity-75">
                            {item}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Search row */}
              <div
                className={`mt-7 grid grid-cols-[minmax(12rem,1.45fr)_repeat(5,minmax(0,1fr))] gap-x-8 transition-all duration-500 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: "240ms" }}
              >
                <div aria-hidden="true" />
                <div className="col-span-5 flex justify-end">
                  <div className="w-full max-w-[38rem] pt-1">
                    <div className="flex items-center border-b border-foreground/20 pb-2.5 text-[0.95rem] text-foreground/70">
                      <span className="flex-1">Search...</span>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
        <div
          className={`relative h-full overflow-y-auto transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="mx-auto max-w-[96rem] px-6 pb-12 pt-24 sm:px-8">
            {/* Brand tagline */}
            <div className="mb-8 border-b border-border pb-8">
              <span className="mb-3 block h-px w-8 bg-secondary" />
              <p className="font-display text-[1.4rem] leading-[1.25] tracking-[-0.01em] text-foreground">
                Built with purpose,<br />crafted with care.
              </p>
              <p className="mt-2 text-[0.84rem] leading-[1.6] text-foreground/55">
                Residences and communities designed to stand the test of time.
              </p>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {navColumns.map((column) => (
                <div key={column.title}>
                  <a
                    href={column.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3 text-[1.1rem] font-medium text-foreground border-b border-border/50 hover:text-secondary transition-colors"
                  >
                    <span>{column.title}</span>
                    {column.links.length > 0 ? <ChevronDown className="h-4 w-4 text-foreground/40" /> : <ArrowRight className="h-4 w-4 text-foreground/30" />}
                  </a>
                  {column.links.length > 0 && (
                    <div className="pl-4 py-2 space-y-2">
                      {column.links.map((link) => (
                        <a
                          key={link}
                          href={column.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-[0.9rem] text-foreground/65 hover:text-foreground transition-colors"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile search */}
            <div className="mt-8 flex items-center border-b border-foreground/20 pb-3 text-[0.95rem] text-foreground/60">
              <span className="flex-1">Search...</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}