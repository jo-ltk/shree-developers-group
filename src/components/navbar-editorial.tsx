"use client";

import { useMemo, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";

const projectNavLinks = [
  { label: "Sydney Oaks", href: "/projects/sydney-oaks" },
  { label: "Elysian Gates", href: "/projects/elysian-gates" },
  { label: "Hanover Park", href: "/projects/hanover-park-at-stockbridge" },
];

const navColumns = [
  // { title: "About", href: "/about", links: [] as string[] },
  { title: "Projects", href: "/#gallery", links: projectNavLinks.map((p) => p.label) },
  { title: "Interactive Map", href: "/InteractiveSiteMap", links: [] as string[] },
  { title: "Contact", href: "/#request-info", links: [] as string[] },
];

const desktopGridClass =
  "grid grid-cols-[minmax(12rem,1.35fr)_repeat(3,minmax(0,1fr))] items-start gap-x-8";

export function NavbarEditorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    const threshold = 15;

    if (mobileOpen) {
      setIsHidden(false);
      return;
    }

    if (latest < 80) {
      setIsHidden(false);
    } else if (diff > threshold) {
      setIsHidden(true);
      setIsOpen(false);
    } else if (diff < -threshold) {
      setIsHidden(false);
    }

    setIsAtTop(latest < 20);
  });

  const columnsWithMeta = useMemo(
    () =>
      navColumns.map((column) => ({
        ...column,
        isTrailing: column.title === "Contact",
      })),
    []
  );

  const logoImageClassName = "object-left";

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isAtTop
            ? "bg-transparent py-0"
            : "bg-[rgba(250,248,243,0.82)] pb-4 pt-2 shadow-sm backdrop-blur-lg border-b border-[rgba(183,170,152,0.15)]"
        }`}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-110%", opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div
          className={`w-full transition-all duration-500 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 ${
            isAtTop ? "pt-5 lg:pt-7" : "pt-3 lg:pt-3"
          }`}
        >
          {/* Desktop nav */}
          <div className={`${desktopGridClass} hidden xl:grid items-center`}>
            <Link href="/" className="w-fit text-dark">
              <BrandMark
                variant="black"
                className={`transition-all duration-500 ${
                  isAtTop ? "h-20 w-[14rem]" : "h-14 w-[10rem]"
                }`}
                imageClassName={logoImageClassName}
                alt="Shree Developers Group logo"
                priority
              />
            </Link>

          {columnsWithMeta.map((item) => (
  <Link
    key={item.title}
    href={item.href}
    className={`flex min-h-[2.5rem] items-center gap-1.5 transition-colors duration-300 hover:text-rust ${
      item.isTrailing ? "justify-self-end" : "justify-self-start"
    } text-dark`}
  >
    <Annotation className="!font-semibold responsive-stat-label">
      {item.title}
    </Annotation>
  </Link>
))}          </div>

          {/* Mobile nav bar */}
          <div className="flex items-center justify-between xl:hidden">
            <Link href="/" className="relative z-50 text-[var(--text-primary)]">
              <BrandMark
                variant="black"
                className={`transition-all duration-500 ${
                  isAtTop ? "h-14 w-[10rem]" : "h-11 w-[8rem]"
                }`}
                imageClassName={logoImageClassName}
                alt="Shree Developers Group logo"
                priority
              />
            </Link>

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

        {/* Desktop mega-menu dropdown */}
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
                    <SectionHeadline
                      size="md"
                      className="!text-[1.35rem] !font-light leading-[1.25] tracking-normal !text-[var(--text-primary)] responsive-headline-xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      noPeriod
                    >
                      Warm communities,<br />delivered with clarity.
                    </SectionHeadline>
                    <BodyText className="mt-3 !text-[0.82rem] !font-light leading-[1.7] !text-[var(--text-primary)] responsive-body-sm">
                      Explore Shree projects, available homesites, and the promise behind each handover.
                    </BodyText>
                    <Link
                      href="/InteractiveSiteMap"
                      className="mt-5 inline-flex items-center gap-2 text-[var(--color-accent)] transition-opacity duration-200 hover:opacity-75"
                    >
                      <Annotation className="!text-[var(--color-accent)] responsive-stat-label">Explore homesites</Annotation>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
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
                    <Link
                      href={column.href}
                      className="flex min-h-[2.5rem] items-center gap-1.5 text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                    >
                      <Annotation className="!font-semibold responsive-stat-label">{column.title}</Annotation>
                      {column.links.length > 0 ? <ChevronDown className="h-3.5 w-3.5 rotate-180 opacity-50" /> : null}
                    </Link>
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
                      <div className="space-y-2.5 !text-[var(--text-primary)]">
                        {column.title === "Projects"
                          ? projectNavLinks.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="block transition-all duration-200 hover:translate-x-0.5 hover:text-[var(--color-accent)]"
                              >
                                <BodyText className="responsive-body-sm">{item.label}</BodyText>
                              </Link>
                            ))
                          : column.links.map((item) => (
                              <Link
                                key={item}
                                href={column.href}
                                className="block transition-all duration-200 hover:translate-x-0.5 hover:text-[var(--color-accent)]"
                              >
                                <BodyText className="responsive-body-sm">{item}</BodyText>
                              </Link>
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
                <div className="grid grid-cols-[minmax(12rem,1.35fr)_repeat(3,minmax(0,1fr))] gap-x-8">
                  <div aria-hidden="true" />
                  <div className="col-span-3 flex justify-end">
                    <a
                      href="/#request-info"
                      className="group flex w-full max-w-[36rem] items-center border-b border-[rgba(183,170,152,0.55)] pb-2 !text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--color-accent)]"
                    >
                      <BodyText className="flex-1 responsive-body-sm">Private appointments and project inquiries</BodyText>
                      <ArrowRight className="h-4 w-4 text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--color-accent)]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
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
              <p
                className="mt-3 !text-[0.82rem] !font-light leading-[1.65] !text-[var(--text-primary)] responsive-body-sm"
              >
                Projects, homesites, and support shaped around confident residential decisions.
              </p>
            </div>

            <nav className="space-y-0">
              {navColumns.map((column) => (
                <div key={column.title}>
                  <Link
                    href={column.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-[rgba(183,170,152,0.35)] py-4 text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    <Annotation className="!font-semibold responsive-stat-label">{column.title}</Annotation>
                    {column.links.length > 0 ? (
                      <ChevronDown className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    )}
                  </Link>
                  {column.links.length > 0 && (
                    <div className="space-y-3 border-b border-[rgba(183,170,152,0.35)] py-3 pl-5">
                      {column.title === "Projects"
                        ? projectNavLinks.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              onClick={() => setMobileOpen(false)}
                              className="block !text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                            >
                              <BodyText className="responsive-body-sm">{link.label}</BodyText>
                            </Link>
                          ))
                        : column.links.map((link) => (
                            <Link
                              key={link}
                              href={column.href}
                              onClick={() => setMobileOpen(false)}
                              className="block !text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                            >
                              <BodyText className="responsive-body-sm">{link}</BodyText>
                            </Link>
                          ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-10 flex items-center border-b border-[rgba(183,170,152,0.45)] pb-3 !text-[var(--text-primary)]">
              <BodyText className="flex-1 responsive-body-sm">Private appointments and project inquiries</BodyText>
              <ArrowRight className="h-4 w-4 text-[var(--text-secondary)]" />
            </div>

            <div className="mt-10">
              <Link
                href="/#request-info"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-[48px] items-center gap-3 bg-[var(--color-accent)] px-7 text-[#3A342E] transition-all duration-200 hover:brightness-105"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                <Annotation className="!text-[#3A342E] !font-bold responsive-btn-text">Get in Touch</Annotation>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
