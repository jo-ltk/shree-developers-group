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
      className="bg-primary px-6 py-20 text-primary-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="grid gap-8 pb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.72fr)] lg:items-end lg:pb-16">
          <div className="space-y-4">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#C6A96B]">
              Metrics
            </p>
            <h2 className="font-cormorant text-[3.5rem] leading-[1.05] text-[#F5F3EF] sm:text-[4.4rem] lg:text-[5.4rem]">
              We&apos;re City Making Design Leaders
            </h2>
          </div>

          <div className="space-y-6 lg:justify-self-end lg:pt-1">
            <p className="font-outfit font-light max-w-[30rem] text-[1.1rem] leading-relaxed text-[#F5F3EF]/80">
              From health precincts to club houses, overlays, master plans, and public interfaces.
            </p>
            <div className="w-fit border-b border-[#C6A96B]/40 pb-1.5 font-outfit text-[1rem] tracking-wide text-[#F5F3EF] transition-all duration-300 hover:border-[#C6A96B] hover:text-[#C6A96B] cursor-pointer">
              Discover Our Process
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="border border-[#C6A96B]/15 bg-[#F5F3EF] p-8 transition-all duration-500 hover:border-[#C6A96B]/40 hover:shadow-[0_8px_40px_rgba(198,169,107,0.08)] hover:-translate-y-1 flex min-h-[16rem] flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-6 mb-8">
                {/* Gold icon or number */}
                <p className="font-cormorant text-[3.5rem] sm:text-[4rem] text-[#C6A96B] leading-none">
                  {metric.value}
                </p>
                <div className="shrink-0 text-[#C6A96B] opacity-80 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-100">
                  {metric.icon}
                </div>
              </div>

              {/* Body in Outfit light */}
              <p className="font-outfit font-light text-[1.2rem] sm:text-[1.3rem] leading-snug text-[#112025]">
                {metric.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
