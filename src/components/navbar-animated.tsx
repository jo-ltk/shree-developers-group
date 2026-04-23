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
        <div className="mx-auto max-w-[96rem] px-6 pt-5 sm:px-8 lg:px-10 lg:pt-7">

          {/* Desktop */}
          <div className={`${desktopGridClass} hidden xl:grid`}>
            <a href="#top" className="w-fit text-[#F5F3EF]">
              <BrandMark
                variant="white"
                className="h-24 w-[16rem]"
                imageClassName="object-left"
                alt="Shree Developers Group white logo"
                priority
              />
            </a>

            {columnsWithMeta.map((item) => (
              <a
                key={item.title}
                href={item.href}
                style={{ color: "rgba(245,243,239,0.85)" }}
                className={`flex min-h-[2.5rem] items-center gap-1.5 text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:text-[#C6A96B] ${
                  item.isTrailing ? "justify-self-end" : "justify-self-start"
                }`}
              >
                <span>{item.title}</span>
                {item.links.length > 0 ? (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                ) : null}
              </a>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex items-center justify-between xl:hidden">
            <a href="#top" className="text-[#F5F3EF] relative z-50">
              <BrandMark
                variant={mobileOpen ? "black" : "white"}
                className="h-14 w-[10rem]"
                imageClassName="object-left"
                alt={`Shree Developers Group ${mobileOpen ? "black" : "white"} logo`}
                priority
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={`relative z-50 inline-flex h-10 w-10 items-center justify-center border transition-colors duration-200 ${
                mobileOpen
                  ? "border-[#0F1113]/20 bg-[#0F1113]/5 text-[#0F1113]"
                  : "border-[#F5F3EF]/20 bg-[#F5F3EF]/08 text-[#F5F3EF]"
              }`}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ── Desktop expanded dropdown ── */}
        <div
          className={`fixed inset-x-0 top-0 hidden origin-top overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-5 opacity-0"
          }`}
        >
          <div className="bg-[#F5F3EF] text-[#0F1113] border-b border-[#0F1113]/08 shadow-[0_24px_80px_rgba(15,17,19,0.12)]">
            <div className="mx-auto max-w-[96rem] px-6 pb-9 pt-8 sm:px-8 lg:px-10">

              {/* Nav titles row */}
              <div className={desktopGridClass}>

                {/* Brand blurb */}
                <div
                  className={`relative transition-all duration-500 ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: "60ms" }}
                >
                  <div className="flex flex-col pr-10">
                    {/* Gold accent line */}
                    <span className="mb-4 block h-[1.5px] w-9 bg-[#C6A96B]" />
                    <p
                      className="text-[1.2rem] leading-[1.25] tracking-[-0.01em] text-[#0F1113]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                    >
                      Built with&nbsp;purpose,<br />crafted with&nbsp;care.
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-[1.65] text-[#0F1113]/50 font-light tracking-[0.01em]">
                      Residences and communities designed to stand the test of time — in Gujarat and beyond.
                    </p>
                    <a
                      href="#gallery"
                      className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C6A96B] transition-opacity duration-200 hover:opacity-70"
                    >
                      View all projects
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                  {/* Vertical separator */}
                  <span className="absolute inset-y-0 right-0 w-px bg-[#0F1113]/10" />
                </div>

                {/* Nav column titles */}
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
                      className="flex min-h-[2.5rem] items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.12em] text-[#0F1113] uppercase hover:text-[#C6A96B] transition-colors duration-200"
                    >
                      <span>{column.title}</span>
                      {column.links.length > 0 ? (
                        <ChevronDown className="h-3.5 w-3.5 rotate-180 opacity-50" />
                      ) : null}
                    </a>
                  </div>
                ))}
              </div>

              {/* Sub-links row */}
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
                      <div className="space-y-2.5 text-[0.82rem] leading-[1.5] text-[#0F1113]/55 font-light tracking-[0.01em]">
                        {column.links.map((item) => (
                          <a
                            key={item}
                            href={column.href}
                            className="block transition-all duration-200 hover:text-[#C6A96B] hover:translate-x-0.5"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Divider + Search row */}
              <div
                className={`mt-8 transition-all duration-500 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: "240ms" }}
              >
                <div className="h-px w-full bg-[#0F1113]/08 mb-6" />
                <div className="grid grid-cols-[minmax(12rem,1.45fr)_repeat(5,minmax(0,1fr))] gap-x-8">
                  <div aria-hidden="true" />
                  <div className="col-span-5 flex justify-end">
                    <div className="w-full max-w-[36rem]">
                      <div className="group flex items-center border-b border-[#0F1113]/20 pb-2 text-[0.82rem] text-[#0F1113]/45 tracking-[0.05em] transition-colors duration-200 hover:border-[#C6A96B]/50 cursor-text">
                        <span className="flex-1">Search projects, articles...</span>
                        <ArrowRight className="h-4 w-4 text-[#0F1113]/30 group-hover:text-[#C6A96B] transition-colors duration-200" />
                      </div>
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
        <div
          className="absolute inset-0 bg-[#F5F3EF]/98 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`relative h-full overflow-y-auto transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="mx-auto max-w-[96rem] px-6 pb-16 pt-24 sm:px-8">

            {/* Brand blurb */}
            <div className="mb-8 border-b border-[#0F1113]/10 pb-8">
              <span className="mb-4 block h-[1.5px] w-8 bg-[#C6A96B]" />
              <p
                className="text-[1.5rem] leading-[1.25] tracking-[-0.01em] text-[#0F1113]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                Built with purpose,<br />crafted with care.
              </p>
              <p className="mt-2 text-[0.82rem] leading-[1.65] text-[#0F1113]/50 font-light">
                Residences and communities designed to stand the test of time.
              </p>
            </div>

            {/* Nav links */}
            <nav className="space-y-0">
              {navColumns.map((column) => (
                <div key={column.title}>
                  <a
                    href={column.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 text-[0.82rem] font-semibold tracking-[0.14em] text-[#0F1113] uppercase border-b border-[#0F1113]/08 hover:text-[#C6A96B] transition-colors duration-200"
                  >
                    <span>{column.title}</span>
                    {column.links.length > 0 ? (
                      <ChevronDown className="h-3.5 w-3.5 text-[#0F1113]/30" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 text-[#0F1113]/25" />
                    )}
                  </a>
                  {column.links.length > 0 && (
                    <div className="pl-5 py-3 space-y-3 border-b border-[#0F1113]/08">
                      {column.links.map((link) => (
                        <a
                          key={link}
                          href={column.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[0.82rem] font-light tracking-[0.04em] text-[#0F1113]/50 hover:text-[#C6A96B] transition-colors duration-200"
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
            <div className="mt-10 flex items-center border-b border-[#0F1113]/15 pb-3 text-[0.82rem] tracking-[0.05em] text-[#0F1113]/40">
              <span className="flex-1">Search projects, articles...</span>
              <ArrowRight className="h-4 w-4 text-[#0F1113]/25" />
            </div>

            {/* Mobile CTA */}
            <div className="mt-10">
              <a
                href="#footer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-3 bg-[#C6A96B] px-7 h-[48px] text-[11px] font-bold tracking-[0.18em] text-[#0F1113] uppercase transition-all duration-200 hover:brightness-105"
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