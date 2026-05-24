"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3500;
const RESUME_IDLE_MS = 5000;
const SWIPE_LOCK_PX = 10;
const SWIPE_COMMIT_PX = 48;

type TouchAxis = "x" | "y";

type TouchGesture = {
  startX: number;
  startY: number;
  currentX: number;
  lock: TouchAxis | null;
};

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<TouchGesture>({
    startX: 0,
    startY: 0,
    currentX: 0,
    lock: null,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children).filter(Boolean);
  const slideCount = items.length;

  const activeIndexRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const setIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onIndexChange?.(index);
    },
    [onIndexChange],
  );

  const goToIndex = useCallback(
    (index: number) => {
      setIndex(index);
    },
    [setIndex],
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

  const clampDrag = useCallback((dx: number, index: number) => {
    if (index <= 0 && dx > 0) return dx * 0.3;
    if (index >= slideCount - 1 && dx < 0) return dx * 0.3;
    return dx;
  }, [slideCount]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || slideCount <= 1) return;

    const resetTouch = () => {
      touchRef.current.lock = null;
      setDragPx(0);
      setIsDragging(false);
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      touchRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        lock: null,
      };
      setDragPx(0);
      setIsDragging(false);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const state = touchRef.current;
      const dx = touch.clientX - state.startX;
      const dy = touch.clientY - state.startY;

      if (!state.lock) {
        if (Math.abs(dx) < SWIPE_LOCK_PX && Math.abs(dy) < SWIPE_LOCK_PX) return;
        state.lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }

      if (state.lock === "y") return;

      state.currentX = touch.clientX;
      e.preventDefault();
      setIsDragging(true);
      setDragPx(clampDrag(dx, activeIndexRef.current));
    };

    const onTouchEnd = () => {
      const state = touchRef.current;

      if (state.lock === "x") {
        const dx = state.currentX - state.startX;
        const index = activeIndexRef.current;

        if (Math.abs(dx) >= SWIPE_COMMIT_PX) {
          handleUserInteraction();
          if (dx < 0 && index < slideCount - 1) {
            goToIndex(index + 1);
          } else if (dx > 0 && index > 0) {
            goToIndex(index - 1);
          }
        }
      }

      resetTouch();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [clampDrag, goToIndex, handleUserInteraction, slideCount]);

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
      goToIndex(next);
    }, autoplayMs);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [autoplayMs, autoplayPaused, goToIndex, isInView, reduceMotion, slideCount]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      pauseAutoplay();
    };
  }, [pauseAutoplay]);

  if (slideCount === 0) return null;

  const dotTransition = reduceMotion
    ? "duration-0"
    : "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

  const slideTransition = reduceMotion
    ? "duration-0"
    : "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section
      className={cn("relative w-full", className)}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div
        ref={viewportRef}
        className={cn("overflow-hidden touch-pan-y", viewportClassName)}
      >
        <div
          role="group"
          aria-label={`Slides, ${activeIndex + 1} of ${slideCount}`}
          className={cn(
            "flex w-full will-change-transform",
            isDragging ? "transition-none" : slideTransition,
          )}
          style={{
            transform: `translate3d(calc(-${activeIndex * 100}% + ${dragPx}px), 0, 0)`,
          }}
        >
          {items.map((child, index) => (
            <div
              key={(child as ReactElement)?.key ?? index}
              data-carousel-slide={index}
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slideCount}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex ? true : undefined}
              className={cn("w-full min-w-full shrink-0", slideClassName)}
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
                goToIndex(index);
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
