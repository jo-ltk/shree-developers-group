"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileHorizontalCarouselProps = {
  variant?: "dark" | "light";
  children: ReactNode;
  className?: string;
};

export function MobileHorizontalCarousel({
  variant = "light",
  children,
  className,
}: MobileHorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = Children.toArray(children).filter(Boolean);
  const itemCount = items.length;
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < itemCount - 1;

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const slides = el.querySelectorAll<HTMLElement>("[data-carousel-slide]");
    if (!slides.length) return;

    let closest = 0;
    let minDist = Infinity;
    const scrollPos = el.scrollLeft;

    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.offsetLeft - scrollPos);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const slide = el.querySelector<HTMLElement>(`[data-carousel-slide="${index}"]`);
    if (!slide) return;

    slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    updateActiveIndex();
  }, [itemCount, updateActiveIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || itemCount <= 1) return;

    const slides = el.querySelectorAll("[data-carousel-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = Number((entry.target as HTMLElement).dataset.carouselSlide);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      { root: el, threshold: [0.55, 0.75] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [itemCount]);

  if (itemCount === 0) return null;

  if (itemCount === 1) {
    return <div className={className}>{items[0]}</div>;
  }

  const dotInactive = variant === "dark" ? "bg-cream/25" : "bg-dark/20";
  const navBtn = cn(
    "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-colors disabled:cursor-default disabled:opacity-30",
    variant === "dark"
      ? "border-cream/15 bg-dark-mid/60 text-cream hover:border-rust hover:text-rust"
      : "border-dark/15 bg-cream text-dark hover:border-rust hover:text-rust",
  );

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={scrollRef}
        onScroll={updateActiveIndex}
        className="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-roledescription="carousel"
      >
        {items.map((child, index) => (
          <div
            key={index}
            data-carousel-slide={index}
            className="w-full min-w-full shrink-0 snap-start"
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          className={navBtn}
          disabled={!canGoPrev}
          onClick={() => scrollToIndex(activeIndex - 1)}
          aria-label="Previous category"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
        </button>

        <div
          className="flex flex-1 items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Slide position"
        >
          {items.map((_, index) => (
            <span
              key={index}
              role="presentation"
              aria-hidden={index !== activeIndex}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-5 bg-rust" : cn("w-1.5", dotInactive),
              )}
            />
          ))}
        </div>

        <button
          type="button"
          className={navBtn}
          disabled={!canGoNext}
          onClick={() => scrollToIndex(activeIndex + 1)}
          aria-label="Next category"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
