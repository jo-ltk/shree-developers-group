"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";

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

  const columnsWithMeta = useMemo(
    () =>
      navColumns.map((column) => ({
        ...column,
        isTrailing: column.title === "Contact",
      })),
    []
  );

  return (
    <header
      className="absolute inset-x-0 top-0 z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="mx-auto max-w-[96rem] px-6 pt-6 sm:px-8 lg:px-10 lg:pt-8">
        <div className={`${desktopGridClass} hidden xl:grid`}>
          <a href="#top" className="w-fit text-primary-foreground">
            <BrandMark
              variant="white"
              className="h-12 w-[8.5rem]"
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

        <div className="flex items-center justify-between xl:hidden">
          <a href="#top" className="text-primary-foreground">
            <BrandMark
              variant="white"
              className="h-11 w-[7.5rem]"
              alt="Shree Developers Group white logo"
              priority
            />
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/16 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-0 hidden origin-top overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
        }`}
      >
        <div className="bg-background text-foreground shadow-[0_32px_110px_rgba(20,28,44,0.14)] border-b border-border">
          <div className="mx-auto max-w-[96rem] px-6 pb-16 pt-10 sm:px-8 lg:px-10">
            <div className={desktopGridClass}>
              <div aria-hidden="true" />

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

            <div className={`${desktopGridClass} mt-10`}>
              <div aria-hidden="true" />

              {columnsWithMeta.map((column, index) => (
                <div
                  key={`${column.title}-links`}
                  className={`min-h-[9rem] transition-all duration-500 ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } ${column.isTrailing ? "justify-self-end text-right" : "justify-self-start"}`}
                  style={{ transitionDelay: `${120 + index * 35}ms` }}
                >
                  {column.links.length > 0 ? (
                    <div className="space-y-5 text-[1rem] leading-[1.5] text-foreground/80">
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

            <div
              className={`mt-14 grid grid-cols-[minmax(12rem,1.45fr)_repeat(5,minmax(0,1fr))] gap-x-8 transition-all duration-500 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
              <div aria-hidden="true" />
              <div className="col-span-5 flex justify-end">
                <div className="w-full max-w-[38rem] pt-1">
                  <div className="flex items-center border-b border-foreground/20 pb-3 text-[1rem] text-foreground/70">
                    <span className="flex-1">Search...</span>
                    <ArrowRight className="h-7 w-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
