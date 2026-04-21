"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";

import { ensureGsapPlugins } from "@/lib/gsap";

type MetricItem = {
  value: number;
  suffix: string;
  label: string;
  icon: ReactNode;
};

function WorkshopIcon() {
  return (
    <svg viewBox="0 0 180 96" className="h-12 w-20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="42" cy="46" r="24" />
        <path d="M18 52h48" />
        <path d="M42 22v48" />
        <path d="M64 58c10-2 18-4 26-11" />
        <path d="M98 48h25" />
        <path d="M114 38l10 10-10 10" />
        <path d="M128 29h26v18h-26z" />
      </g>
    </svg>
  );
}

function PrecinctIcon() {
  return (
    <svg viewBox="0 0 180 96" className="h-12 w-20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 74h144" />
        <path d="M34 74V28l14-8 14 8v46" />
        <path d="M84 74V22l12-8 12 8v52" />
        <path d="M128 74V36l10-6 10 6v38" />
        <path d="M20 64l20-6 18 4 18-8 20 6 20-10 20 8 16-5" />
      </g>
    </svg>
  );
}

function DwellingsIcon() {
  return (
    <svg viewBox="0 0 180 96" className="h-12 w-20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 74h144" />
        <path d="M28 74V28h28v46" />
        <path d="M66 74V20h30v54" />
        <path d="M106 74V26h26v48" />
        <path d="M140 74V42h18v32" />
      </g>
    </svg>
  );
}

function MasterplanIcon() {
  return (
    <svg viewBox="0 0 180 96" className="h-12 w-20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 25c12-10 32-12 46-6 8 4 15 4 23 0 14-6 32-2 42 8" />
        <path d="M20 70c18-12 38-16 56-12 14 4 24 4 36-2 16-8 34-6 48 4" />
        <path d="M56 36c8 3 14 10 14 18 0 12-13 20-28 20" />
        <path d="M126 34c-10 4-18 12-18 22 0 10 8 18 22 20" />
        <circle cx="87" cy="48" r="10" />
      </g>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 180 96" className="h-12 w-20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 74h144" />
        <path d="M34 74V54l12-6 12 6v20" />
        <path d="M46 36a6 6 0 110 12 6 6 0 010-12z" />
        <path d="M82 74V44l14-8 14 8v30" />
        <path d="M96 20a7 7 0 110 14 7 7 0 010-14z" />
      </g>
    </svg>
  );
}

function BridgeIcon() {
  return (
    <svg viewBox="0 0 180 96" className="h-12 w-20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 72h144" />
        <path d="M28 72V48" />
        <path d="M152 72V48" />
        <path d="M40 72V40" />
        <path d="M140 72V40" />
        <path d="M40 40h100" />
        <path d="M52 40c8 12 16 20 38 20s30-8 38-20" />
      </g>
    </svg>
  );
}

const metrics: MetricItem[] = [
  { value: 100, suffix: "+", label: "Workshops this year", icon: <WorkshopIcon /> },
  { value: 12, suffix: "", label: "Games precincts, venues + overlay plans", icon: <PrecinctIcon /> },
  { value: 1250, suffix: "+", label: "Dwellings currently on our boards", icon: <DwellingsIcon /> },
  { value: 100, suffix: "+", label: "City shaping master planning", icon: <MasterplanIcon /> },
  { value: 40, suffix: "+", label: "People-oriented precincts", icon: <PeopleIcon /> },
  { value: 20, suffix: "+", label: "Beautiful bridges", icon: <BridgeIcon /> },
];

function formatMetricValue(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function MetricsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapPlugins();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-metric-card]");
      const headingItems = gsap.utils.toArray<HTMLElement>("[data-metric-heading] > *");

      if (reducedMotion) {
        metrics.forEach((item, index) => {
          const node = numberRefs.current[index];
          if (node) node.textContent = formatMetricValue(item.value);
        });
        gsap.set([...headingItems, ...cards], { autoAlpha: 1, y: 0 });
        return;
      }

      metrics.forEach((item, index) => {
        const node = numberRefs.current[index];
        if (node) node.textContent = "0";
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 84%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from(headingItems, {
          autoAlpha: 0,
          y: 14,
          duration: 0.55,
          stagger: 0.06,
        })
        .from(
          cards,
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.55,
            stagger: 0.04,
          },
          "<0.08"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 84%",
        once: true,
        onEnter: () => {
          metrics.forEach((item, index) => {
            const node = numberRefs.current[index];
            if (!node) return;

            const counter = { value: 0 };
            gsap.to(counter, {
              value: item.value,
              duration: 1.05,
              ease: "power2.out",
              delay: 0.04 + index * 0.03,
              snap: { value: 1 },
              onUpdate: () => {
                node.textContent = formatMetricValue(counter.value);
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-6 text-primary-foreground sm:px-8 sm:py-8 lg:px-10 lg:py-9"
      style={{ backgroundColor: "color-mix(in oklab, var(--primary) 84%, #54533f)" }}
    >
      <div className="mx-auto max-w-[112rem]">
        <div
          data-metric-heading
          className="grid gap-3 pb-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start lg:pb-5"
        >
          <div className="space-y-2">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.32em] text-[color:color-mix(in_oklab,var(--accent)_62%,white)]">
              Metrics
            </p>
            <h2 className="max-w-[14ch] font-sans text-[1.7rem] font-medium leading-[0.92] tracking-[-0.05em] text-primary-foreground sm:text-[2.1rem] lg:max-w-none lg:text-[2.4rem]">
              We&apos;re City Making Design Leaders
            </h2>
          </div>

          <div className="space-y-2 lg:justify-self-end lg:pt-0.5">
            <p className="max-w-sm text-[0.82rem] leading-5 text-primary-foreground/90 sm:text-[0.86rem]">
              From health precincts to club houses, overlays, master plans, and public interfaces.
            </p>
            <div className="w-fit border-b border-primary-foreground/38 pb-1 text-[0.78rem] font-medium text-primary-foreground transition-colors duration-300 hover:border-[color:color-mix(in_oklab,var(--accent)_55%,white)] hover:text-[color:color-mix(in_oklab,var(--accent)_72%,white)]">
              Discover Our Process
            </div>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
          {metrics.map((metric, index) => (
            <article
              key={metric.label}
              data-metric-card
              className="group relative overflow-hidden rounded-[1.2rem] border border-white/18 bg-white/[0.08] p-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--accent)_42%,white)] hover:bg-white/[0.12] hover:shadow-[0_14px_28px_rgba(16,22,42,0.2)] sm:p-3.5"
            >
              <div className="absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-[color:color-mix(in_oklab,var(--accent)_70%,white)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

              <div className="relative flex min-h-[6.4rem] flex-col justify-between gap-2 sm:min-h-[6.8rem]">
                <div className="pr-12 sm:pr-14">
                  <div className="flex items-start gap-1 font-sans text-[2.2rem] font-light leading-none tracking-[-0.08em] text-primary-foreground sm:text-[2.45rem] lg:text-[2.7rem]">
                    <span
                      ref={(node) => {
                        numberRefs.current[index] = node;
                      }}
                    >
                      0
                    </span>
                    <span>{metric.suffix}</span>
                  </div>
                  <p className="mt-1 max-w-[18ch] text-[0.78rem] leading-5 text-[color:color-mix(in_oklab,var(--accent)_72%,white)] sm:text-[0.82rem]">
                    {metric.label}
                  </p>
                </div>

                <div className="absolute right-0 top-0 text-[color:color-mix(in_oklab,var(--accent)_68%,white)] opacity-95 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[color:color-mix(in_oklab,var(--accent)_82%,white)]">
                  {metric.icon}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
