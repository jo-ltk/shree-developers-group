"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { BrandMark } from "@/components/ui/brand-mark";

const navColumns = [
  { title: "Projects", href: "#gallery", links: ["Villas", "Apartments", "Plotted Communities"] },
  { title: "Homesites", href: "/InteractiveSiteMap", links: ["Availability", "Lot Details"] },
  { title: "Interactive Map", href: "/InteractiveSiteMap", links: [] as string[] },
  { title: "Promise", href: "#team", links: ["Process", "Handover", "Support"] },
  { title: "Notes", href: "#articles", links: ["Builder Notes"] },
  { title: "Contact", href: "#footer", links: [] as string[] },
];

const desktopGridClass =
  "grid grid-cols-[minmax(12rem,1.35fr)_repeat(6,minmax(0,1fr))] items-start gap-x-8";

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
        <div className="mx-auto max-w-[96rem] px-6 pt-5 sm:px-8 lg:px-10 lg:pt-7">
          <div className={`${desktopGridClass} hidden xl:grid`}>
            <a href="#top" className="w-fit text-[var(--text-primary)]">
              <BrandMark
                variant="black"
                className="h-24 w-[16rem]"
                imageClassName="object-left"
                alt="Shree Developers Group logo"
                priority
              />
            </a>

            {columnsWithMeta.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={`flex min-h-[2.5rem] items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--color-accent)] ${
                  item.isTrailing ? "justify-self-end" : "justify-self-start"
                }`}
              >
                <span>{item.title}</span>
                {item.links.length > 0 ? <ChevronDown className="h-3.5 w-3.5 opacity-60" /> : null}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between xl:hidden">
            <a href="#top" className="relative z-50 text-[var(--text-primary)]">
              <BrandMark
                variant="black"
                className="h-14 w-[10rem]"
                imageClassName="object-left"
                alt="Shree Developers Group logo"
                priority
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(183,170,152,0.45)] bg-[rgba(250,248,243,0.72)] text-[var(--text-primary)] backdrop-blur-md transition-colors duration-200 hover:border-[var(--color-accent)]"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-x-0 top-0 hidden origin-top overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-5 opacity-0"
          }`}
        >
          <div className="border-b border-[rgba(183,170,152,0.35)] bg-[rgba(250,248,243,0.96)] text-[var(--text-primary)] shadow-[0_24px_80px_rgba(183,170,152,0.15)] backdrop-blur-md">
            <div className="mx-auto max-w-[96rem] px-6 pb-9 pt-8 sm:px-8 lg:px-10">
              <div className={desktopGridClass}>
                <div
                  className={`relative transition-all duration-500 ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: "60ms" }}
                >
                  <div className="flex flex-col pr-10">
                    <span className="mb-4 block h-px w-9 bg-[var(--color-accent)]" />
                    <p
                      className="text-[1.35rem] font-light leading-[1.25] tracking-normal text-[var(--text-primary)]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Warm communities,<br />delivered with clarity.
                    </p>
                    <p className="mt-3 text-[0.82rem] font-light leading-[1.7] text-[var(--text-primary)]">
                      Explore Shree projects, available homesites, and the promise behind each handover.
                    </p>
                    <a
                      href="/InteractiveSiteMap"
                      className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)] transition-opacity duration-200 hover:opacity-75"
                    >
                      Explore homesites
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                  <span className="absolute inset-y-0 right-0 w-px bg-[rgba(183,170,152,0.35)]" />
                </div>

                {columnsWithMeta.map((column, index) => (
                  <div
                    key={column.title}
                    className={`transition-all duration-500 ${
                      isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
                    } ${column.isTrailing ? "justify-self-end" : "justify-self-start"}`}
                    style={{ transitionDelay: `${60 + index * 30}ms` }}
                  >
                    <a
                      href={column.href}
                      className="flex min-h-[2.5rem] items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                    >
                      <span>{column.title}</span>
                      {column.links.length > 0 ? <ChevronDown className="h-3.5 w-3.5 rotate-180 opacity-50" /> : null}
                    </a>
                  </div>
                ))}
              </div>

              <div className={`${desktopGridClass} mt-3`}>
                <div aria-hidden="true" />

                {columnsWithMeta.map((column, index) => (
                  <div
                    key={`${column.title}-links`}
                    className={`transition-all duration-500 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    } ${column.isTrailing ? "justify-self-end text-right" : "justify-self-start"}`}
                    style={{ transitionDelay: `${120 + index * 35}ms` }}
                  >
                    {column.links.length > 0 ? (
                      <div className="space-y-2.5 text-[0.82rem] font-light leading-[1.5] text-[var(--text-primary)]">
                        {column.links.map((item) => (
                          <a
                            key={item}
                            href={column.href}
                            className="block transition-all duration-200 hover:translate-x-0.5 hover:text-[var(--color-accent)]"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div
                className={`mt-8 transition-all duration-500 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: "240ms" }}
              >
                <div className="mb-6 h-px w-full bg-[rgba(183,170,152,0.35)]" />
                <div className="grid grid-cols-[minmax(12rem,1.35fr)_repeat(6,minmax(0,1fr))] gap-x-8">
                  <div aria-hidden="true" />
                  <div className="col-span-6 flex justify-end">
                    <a
                      href="#footer"
                      className="group flex w-full max-w-[36rem] items-center border-b border-[rgba(183,170,152,0.55)] pb-2 text-[0.82rem] tracking-[0.05em] text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--color-accent)]"
                    >
                      <span className="flex-1">Private appointments and project inquiries</span>
                      <ArrowRight className="h-4 w-4 text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--color-accent)]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[rgba(250,248,243,0.98)] backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`relative h-full overflow-y-auto transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="mx-auto max-w-[96rem] px-6 pb-16 pt-24 sm:px-8">
            <div className="mb-8 border-b border-[rgba(183,170,152,0.4)] pb-8">
              <span className="mb-4 block h-px w-8 bg-[var(--color-accent)]" />
              <p
                className="text-[1.5rem] font-light leading-[1.25] tracking-normal text-[var(--text-primary)]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Warm communities,<br />delivered with clarity.
              </p>
              <p className="mt-3 text-[0.82rem] font-light leading-[1.65] text-[var(--text-primary)]">
                Projects, homesites, and support shaped around confident residential decisions.
              </p>
            </div>

            <nav className="space-y-0">
              {navColumns.map((column) => (
                <div key={column.title}>
                  <a
                    href={column.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-[rgba(183,170,152,0.35)] py-4 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    <span>{column.title}</span>
                    {column.links.length > 0 ? (
                      <ChevronDown className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    )}
                  </a>
                  {column.links.length > 0 && (
                    <div className="space-y-3 border-b border-[rgba(183,170,152,0.35)] py-3 pl-5">
                      {column.links.map((link) => (
                        <a
                          key={link}
                          href={column.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[0.82rem] font-light tracking-[0.04em] text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-10 flex items-center border-b border-[rgba(183,170,152,0.45)] pb-3 text-[0.82rem] tracking-[0.05em] text-[var(--text-primary)]">
              <span className="flex-1">Private appointments and project inquiries</span>
              <ArrowRight className="h-4 w-4 text-[var(--text-secondary)]" />
            </div>

            <div className="mt-10">
              <a
                href="#footer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-[48px] items-center gap-3 bg-[var(--color-accent)] px-7 text-[11px] font-bold uppercase tracking-[0.18em] text-[#3A342E] transition-all duration-200 hover:brightness-105"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                Get in Touch
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
