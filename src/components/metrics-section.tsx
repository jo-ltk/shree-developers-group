import { type ReactNode } from "react";

type MetricItem = {
  value: string;
  label: string;
  icon: ReactNode;
};

function WorkshopIcon() {
  return (
    <svg viewBox="0 0 180 96" className="h-12 w-20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
  { value: "100+", label: "Workshops this year", icon: <WorkshopIcon /> },
  { value: "12", label: "Games precincts, venues + overlay plans", icon: <PrecinctIcon /> },
  { value: "1,250+", label: "Dwellings currently on our boards", icon: <DwellingsIcon /> },
  { value: "100+", label: "City shaping master planning", icon: <MasterplanIcon /> },
  { value: "40+", label: "People-oriented precincts", icon: <PeopleIcon /> },
  { value: "20+", label: "Beautiful bridges", icon: <BridgeIcon /> },
];

export function MetricsSection() {
  return (
    <section
      className="px-6 py-16 text-primary-foreground sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--primary) 88%, #4f5646), color-mix(in oklab, var(--primary) 82%, #465060))",
      }}
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="grid gap-8 pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.72fr)] lg:items-end lg:pb-12">
          <div className="space-y-3">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[color:color-mix(in_oklab,var(--accent)_74%,white)]">
              Metrics
            </p>
            <h2 className="font-sans text-[3rem] font-normal leading-[0.92] tracking-[-0.06em] text-primary-foreground sm:text-[4.4rem] lg:text-[5.4rem]">
              We&apos;re City Making Design Leaders
            </h2>
          </div>

          <div className="space-y-3 lg:justify-self-end lg:pt-1">
            <p className="max-w-[30rem] text-[1rem] leading-8 text-primary-foreground/82">
              From health precincts to club houses, overlays, master plans, and public interfaces.
            </p>
            <div className="w-fit border-b border-primary-foreground/34 pb-1.5 text-[0.94rem] font-medium text-primary-foreground transition-colors duration-300 hover:border-[color:color-mix(in_oklab,var(--accent)_55%,white)] hover:text-[color:color-mix(in_oklab,var(--accent)_72%,white)]">
              Discover Our Process
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="flex min-h-[15rem] flex-col justify-between rounded-none border border-white/14 bg-white/[0.07] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--accent)_42%,white)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] sm:p-7"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-sans text-[3rem] font-light leading-none tracking-[-0.08em] text-primary-foreground sm:text-[3.4rem] lg:text-[3.75rem]">
                    {metric.value}
                  </p>
                  <p className="mt-4 max-w-[18ch] text-[1rem] leading-7 text-[color:color-mix(in_oklab,var(--accent)_78%,white)] sm:text-[1.04rem]">
                    {metric.label}
                  </p>
                </div>

                <div className="shrink-0 text-[color:color-mix(in_oklab,var(--accent)_82%,white)]">
                  {metric.icon}
                </div>
              </div>

              <div className="mt-8 h-px w-full bg-white/10" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
