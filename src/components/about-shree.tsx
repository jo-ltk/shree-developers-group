"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ensureGsapPlugins } from "@/lib/gsap";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { StatItem } from "@/components/ui/stat-item";
import { ShieldCheck, MapPinned } from "lucide-react";
import { Annotation } from "./ui/annotation";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  {
    id: "who-we-are",
    label: "Who We Are",
    number: "01",
    tag: "Identity",
    heading: "About Shree Developers Group",
    body: "Shree Developers Group is a Georgia-based real estate development and vertical construction company focused on creating high-quality residential, commercial, and mixed-use communities built with a long-term vision for growth, functionality, and modern living.",
  },
  {
    id: "our-approach",
    label: "Our Approach",
    number: "02",
    tag: "Process",
    heading: "Founded on Craft",
    body: "Founded with a commitment to thoughtful development and strong construction standards, the company oversees every stage of the process — from land acquisition and site planning to infrastructure development, vertical construction, and final project delivery. With a hands-on approach and attention to detail, Shree Developers Group continues to build projects that combine architectural quality, practical design, and lasting investment value.",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    number: "03",
    tag: "Beliefs",
    heading: "Beyond Structures",
    body: "The company's philosophy is centered around creating developments that go beyond structures — spaces that contribute to the growth of neighborhoods, support evolving lifestyles, and strengthen the communities around them. Every project is approached with a focus on quality execution, efficient planning, and long-term sustainability.",
  },
  {
    id: "expertise",
    label: "Expertise",
    number: "04",
    tag: "Reach",
    heading: "Across Georgia",
    body: "Shree Developers Group develops single-family communities, townhomes, retail centers, office spaces, and mixed-use developments across Georgia, with experience spanning both horizontal and vertical construction. Through local market understanding and project management expertise, the company continues to deliver developments designed to meet the needs of modern homeowners, businesses, and investors.",
  },
  {
    id: "commitment",
    label: "Commitment",
    number: "05",
    tag: "Promise",
    heading: "Built for the Future",
    body: "Backed by a commitment to professionalism, construction integrity, and community-focused growth, Shree Developers Group remains dedicated to building environments that reflect trust, functionality, and enduring value for the future.",
  },
];

const CYCLE_MS = 5000;

export function AboutShree() {
  const storyRef = useRef<HTMLDivElement>(null);
  const storyNavRef = useRef<HTMLElement>(null);
  const wasInViewRef = useRef(false);
  const userPausedRef = useRef(false);

  const isInView = useInView(storyRef, { once: false, amount: 0.35, margin: "0px 0px -8% 0px" });
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const [progressCycleKey, setProgressCycleKey] = useState(0);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start at Who We Are + autoplay when Our Story scrolls into view
  useEffect(() => {
    if (isInView && !wasInViewRef.current) {
      setActive(0);
      userPausedRef.current = false;
      setPaused(false);
      setProgressCycleKey((k) => k + 1);

      requestAnimationFrame(() => {
        const whoWeAre = storyNavRef.current?.querySelector<HTMLElement>(
          '[data-chapter-id="who-we-are"]',
        );
        whoWeAre?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          inline: "center",
          block: "nearest",
        });
      });
    }

    if (!isInView && wasInViewRef.current) {
      setPaused(true);
      if (cycleRef.current) clearInterval(cycleRef.current);
    }

    wasInViewRef.current = isInView;
  }, [isInView, reduceMotion]);

  useEffect(() => {
    if (cycleRef.current) clearInterval(cycleRef.current);

    if (paused || reduceMotion || !isInView || userPausedRef.current) return;

    cycleRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % CHAPTERS.length;
        setProgressCycleKey((k) => k + 1);
        return next;
      });
    }, CYCLE_MS);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [paused, isInView, reduceMotion]);

  useLayoutEffect(() => {
    if (reduceMotion || !storyRef.current) return;

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.from("[data-story-reveal]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, storyRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
    userPausedRef.current = true;
    setProgressCycleKey((k) => k + 1);
  };

  return (
    <SectionWrapper id="about-shree" noPadding fullWidth>

      {/* ── BRAND PHILOSOPHY ── */}
      <div className="bg-[#1C1208] px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-24 relative overflow-hidden w-full">
        <div className="flex justify-center mb-8 md:mb-16">
          <SectionLabel light className="!mb-0 !text-white">Brand Philosophy</SectionLabel>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-16 items-center lg:items-start w-full">
          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap">
            <SectionHeadline size="lg" light className="m-0 !text-white text-center lg:text-left mx-auto lg:mx-0 responsive-headline-xl">
              The Shree Way
            </SectionHeadline>
            <BodyText light className="responsive-body-sm m-0 max-w-xl !text-white/80 !font-light text-center lg:text-left mx-auto lg:mx-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
              The finest homes are built on four pillars: Restraint, Craft, Tension, and Texture.
              We use timeless materials that speak for themselves.
            </BodyText>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 w-full">
              <div>
                <Annotation className="!text-rust !font-bold responsive-stat-label block mb-2">Vision</Annotation>
                <BodyText light size="sm" className="responsive-body-sm !text-white/60">
                  To be the most trusted name in premium residences.
                </BodyText>
              </div>
              <div>
                <Annotation className="!text-rust !font-bold responsive-stat-label block mb-2">Mission</Annotation>
                <BodyText light size="sm" className="responsive-body-sm !text-white/60">
                  To create intentional communities with safety.
                </BodyText>
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col gap-4 mt-6 lg:mt-0">
            {[
              { Icon: ShieldCheck, title: "Licensed", body: "Full state certification." },
              { Icon: MapPinned,   title: "Expertise", body: "15 years in Georgia."    },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-2 sm:gap-5 p-3 sm:p-6 border border-white/10 bg-white/[0.03] transition-colors hover:border-rust/50"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-rust shrink-0" />
                <div>
                  <Annotation className="!text-white/40 !font-bold responsive-stat-label block mb-0.5 sm:mb-1">
                    {title}
                  </Annotation>
                  <BodyText light size="sm" className="responsive-body-sm !text-white/70">
                    {body}
                  </BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUR STORY — Tab Navigator (warm cream) ── */}
      <div
        ref={storyRef}
        className="bg-[#F5F0E8] w-full pt-8 pb-8 lg:pt-16 lg:pb-16"
      >

        {/* ── Top header bar (Mobile/Tablet only) ── */}
        <div
          data-story-reveal
          className="flex justify-center px-6 sm:px-8 md:px-12 pt-4 mb-8 lg:hidden"
        >
          <SectionLabel className="!mb-0">Our Story</SectionLabel>
        </div>

        {/* ── Grid Layout: Tab rail + Content ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">

          {/* ── LEFT: Tab rail & Desktop Header ── */}
          <div className="flex flex-col lg:col-span-4 lg:border-r border-[#1C1208]/10 lg:pr-8">
            {/* Desktop-only Header */}
            <div data-story-reveal className="hidden lg:flex flex-col items-start mb-8">
              <SectionLabel className="!mb-0 text-left">Our Story</SectionLabel>
            </div>

            <nav
              ref={storyNavRef}
              data-story-reveal
              aria-label="Chapter navigation"
              className="flex shrink-0 flex-row overflow-x-auto border-b border-[#1C1208]/10 lg:flex-col lg:overflow-visible lg:border-b-0 snap-x snap-mandatory [ms-overflow-style:none] [scrollbar-width:none] overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            >
              {CHAPTERS.map((c, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <button
                    key={c.id}
                    data-chapter-id={c.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelect(i)}
                    className={cn(
                      "group relative flex shrink-0 snap-start items-center overflow-hidden text-left",
                      "border-b-2 px-5 py-2.5 transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:w-full lg:border-b-0 lg:border-r-2 lg:-mr-px lg:px-6 lg:py-2.5",
                      isActive
                        ? "border-[#B45309] bg-[rgba(28,18,8,0.04)]"
                        : "border-transparent bg-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 origin-left bg-[rgba(28,18,8,0.03)]",
                        isPast && "scale-x-100",
                        isActive && !reduceMotion && !paused && "motion-safe:animate-[storyTabProgress_5s_linear_forwards]",
                        !isActive && !isPast && "scale-x-0",
                        (isActive && (reduceMotion || paused)) && "scale-x-100",
                      )}
                      style={
                        isActive && !reduceMotion && !paused
                          ? undefined
                          : { transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }
                      }
                      key={
                        isActive && !reduceMotion && !paused
                          ? `progress-${active}-${progressCycleKey}`
                          : `fill-${i}`
                      }
                    />
                    <span
                      className={cn(
                        "relative text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                        isActive ? "text-[#1C1208]" : "text-[#1C1208]/40",
                      )}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── RIGHT: Content panel ── */}
          <div
            data-story-reveal
            className="relative mt-8 flex flex-1 flex-col justify-between overflow-hidden lg:col-span-8 lg:col-start-5 lg:mt-0 lg:pl-12 xl:pl-16"
            role="tabpanel"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="relative w-full min-h-[clamp(16rem,52vw,22rem)] lg:min-h-[17rem]">
              {CHAPTERS.map((c, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={c.id}
                    aria-hidden={!isActive}
                    className={cn(
                      "flex w-full flex-col justify-start gap-4 px-8 pb-6 pt-6 sm:px-10 lg:px-0 lg:pb-8 lg:pt-0",
                      "transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "relative opacity-100"
                        : "pointer-events-none absolute inset-x-0 top-0 opacity-0",
                    )}
                  >
                    <SectionHeadline
                      size="lg"
                      className="m-0 text-left"
                      style={{ maxWidth: "40ch" }}
                    >
                      {c.heading}
                    </SectionHeadline>

                    <p
                      className="font-light leading-relaxed text-[#1C1208]/60"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "clamp(0.82rem, 1.35vw, 0.95rem)",
                      }}
                    >
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              className="flex items-center gap-1.5 px-8 pb-4 pt-4 sm:px-10 lg:px-0"
              role="tablist"
              aria-label="Story chapter position"
            >
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={c.label}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    i === active ? "w-[1.375rem] bg-[#B45309]" : "w-1.5 bg-[#1C1208]/15",
                  )}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#1C1208]/10 gap-px w-full overflow-hidden border-y border-[#1C1208]/10">
        {[
          { value: "15+",  label: "Years of Experience", muted: false },
          { value: "24+",  label: "Projects Completed",  muted: false },
          { value: "100%", label: "Licensed & Insured",  muted: true  },
          { value: "GA",   label: "Local Expertise",     muted: true  },
        ].map(({ value, label, muted }) => (
          <div
            key={label}
            className={`px-4 sm:px-8 py-6 sm:py-10 flex flex-col items-center lg:items-start text-center lg:text-left
              ${muted ? "bg-[#EDE8DF]" : "bg-[#F5F0E8]"}`}
          >
            <StatItem value={value} label={label} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes storyTabProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </SectionWrapper>
  );
}