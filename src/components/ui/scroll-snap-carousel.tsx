"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3500;
const RESUME_IDLE_MS = 5000;

export type ScrollSnapCarouselProps = {
  children: ReactNode;
  autoplayMs?: number;
  isInView?: boolean;
  onIndexChange?: (index: number) => void;
  className?: string;
  ariaLabel?: string;
  tablistAriaLabel?: string;
  viewportClassName?: string;
  slideClassName?: string;
  dotsContainerClassName?: string;
  dotActiveClassName?: string;
  dotInactiveClassName?: string;
};

export function ScrollSnapCarousel({
  children,
  autoplayMs = AUTOPLAY_MS,
  isInView = true,
  onIndexChange,
  className,
  ariaLabel = "Carousel",
  tablistAriaLabel = "Choose slide",
  viewportClassName,
  slideClassName,
  dotsContainerClassName = "mt-8",
  dotActiveClassName = "h-1.5 w-12 bg-[#1C1208]",
  dotInactiveClassName = "h-1.5 w-4 bg-[#1C1208]/15",
}: ScrollSnapCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children).filter(Boolean);
  const slideCount = items.length;

  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const programmaticScrollRef = useRef(false);
  const programmaticScrollTargetRef = useRef<number | null>(null);
  const programmaticScrollEndRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollBehavior = reduceMotion ? "auto" : "smooth";

  const setIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onIndexChange?.(index);
    },
    [onIndexChange],
  );

  const endProgrammaticScroll = useCallback(() => {
    if (programmaticScrollEndRef.current) {
      clearTimeout(programmaticScrollEndRef.current);
      programmaticScrollEndRef.current = null;
    }

    const target = programmaticScrollTargetRef.current;
    programmaticScrollRef.current = false;
    programmaticScrollTargetRef.current = null;

    if (target !== null) setIndex(target);
  }, [setIndex]);

  const scrollToIndex = useCallback(
    (index: number, behavior?: ScrollBehavior) => {
      const el = scrollRef.current;
      if (!el) return;

      const slide = el.querySelector<HTMLElement>(
        `[data-carousel-slide="${index}"]`,
      );
      if (!slide) return;

      const resolvedBehavior = behavior ?? scrollBehavior;

      programmaticScrollRef.current = true;
      programmaticScrollTargetRef.current = index;
      setIndex(index);

      slide.scrollIntoView({
        behavior: resolvedBehavior,
        inline: "start",
        block: "nearest",
      });

      if (programmaticScrollEndRef.current) {
        clearTimeout(programmaticScrollEndRef.current);
      }

      const finish = () => endProgrammaticScroll();

      if ("onscrollend" in el) {
        const onScrollEnd = () => {
          el.removeEventListener("scrollend", onScrollEnd);
          finish();
        };
        el.addEventListener("scrollend", onScrollEnd, { once: true });
        programmaticScrollEndRef.current = setTimeout(() => {
          el.removeEventListener("scrollend", onScrollEnd);
          finish();
        }, resolvedBehavior === "smooth" ? 700 : 80);
      } else {
        programmaticScrollEndRef.current = setTimeout(
          finish,
          resolvedBehavior === "smooth" ? 500 : 50,
        );
      }
    },
    [endProgrammaticScroll, scrollBehavior, setIndex],
  );

  const pauseAutoplay = useCallback(() => {
    setAutoplayPaused(true);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const scheduleAutoplayResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setAutoplayPaused(false);
    }, RESUME_IDLE_MS);
  }, []);

  const handleUserInteraction = useCallback(() => {
    pauseAutoplay();
    scheduleAutoplayResume();
  }, [pauseAutoplay, scheduleAutoplayResume]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || slideCount <= 1) return;

    const slides = el.querySelectorAll("[data-carousel-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (programmaticScrollRef.current) return;

        let bestIdx: number | null = null;
        let bestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.55) continue;
          const idx = Number(
            (entry.target as HTMLElement).dataset.carouselSlide,
          );
          if (!Number.isNaN(idx) && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        }

        if (bestIdx !== null) setIndex(bestIdx);
      },
      { root: el, threshold: [0.55, 0.75] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [slideCount, setIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (programmaticScrollRef.current) return;
      handleUserInteraction();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [handleUserInteraction]);

  useEffect(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    if (reduceMotion || !isInView || slideCount <= 1 || autoplayPaused) {
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % slideCount;
      scrollToIndex(next);
    }, autoplayMs);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [autoplayMs, autoplayPaused, isInView, reduceMotion, scrollToIndex, slideCount]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (programmaticScrollEndRef.current) {
        clearTimeout(programmaticScrollEndRef.current);
      }
      pauseAutoplay();
    };
  }, [pauseAutoplay]);

  if (slideCount === 0) return null;

  const dotTransition = reduceMotion
    ? "duration-0"
    : "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section
      className={cn("relative w-full", className)}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div className={cn("overflow-hidden", viewportClassName)}>
        <div
          ref={scrollRef}
          role="group"
          aria-label={`Slides, ${activeIndex + 1} of ${slideCount}`}
          onPointerDown={handleUserInteraction}
          onTouchStart={handleUserInteraction}
          className={cn(
            "flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-x",
            "[-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {items.map((child, index) => (
            <div
              key={index}
              data-carousel-slide={index}
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slideCount}`}
              className={cn(
                "w-full min-w-full shrink-0 snap-start snap-always",
                slideClassName,
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {slideCount > 1 && (
        <div
          className={cn(
            "flex items-center justify-center gap-3",
            dotsContainerClassName,
          )}
          role="tablist"
          aria-label={tablistAriaLabel}
        >
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Slide ${index + 1} of ${slideCount}`}
              onClick={() => {
                handleUserInteraction();
                scrollToIndex(index);
              }}
              className={cn(
                "rounded-full transition-[width,background-color]",
                dotTransition,
                index === activeIndex ? dotActiveClassName : dotInactiveClassName,
              )}
            />
          ))}
        </div>
      )}

      <p
        className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [-webkit-clip-path:inset(50%)] [clip-path:inset(50%)]"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeIndex + 1} of {slideCount}
      </p>
    </section>
  );
}
