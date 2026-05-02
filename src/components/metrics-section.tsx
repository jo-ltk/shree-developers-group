import { type ReactNode } from "react";
import {
  Building2,
  ClipboardCheck,
  House,
  Landmark,
  Map,
  Users,
} from "lucide-react";

type MetricItem = {
  value: string;
  label: string;
  detail: string;
  eyebrow: string;
  icon: ReactNode;
  image: string;
};

const iconClassName = "h-7 w-7";

const metrics: MetricItem[] = [
  {
    value: "15+",
    label: "Years of trusted delivery",
    detail: "A steady builder presence shaped by transparent timelines and practical site decisions.",
    eyebrow: "Legacy",
    icon: <Landmark className={iconClassName} strokeWidth={1.75} />,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
  },
  {
    value: "50+",
    label: "Completed developments",
    detail: "Residential and mixed-use work delivered with attention to approvals, finishes, and everyday usability.",
    eyebrow: "Portfolio",
    icon: <Building2 className={iconClassName} strokeWidth={1.75} />,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
  },
  {
    value: "1000+",
    label: "Families served",
    detail: "A growing community of homeowners who chose Shree for clarity, comfort, and long-term confidence.",
    eyebrow: "Community",
    icon: <Users className={iconClassName} strokeWidth={1.75} />,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=82",
  },
  {
    value: "89",
    label: "Homesites in the current map",
    detail: "A detailed site experience that helps buyers compare availability, scale, and the shape of each lot.",
    eyebrow: "Homesites",
    icon: <Map className={iconClassName} strokeWidth={1.75} />,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=82",
  },
  {
    value: "24/7",
    label: "After-sales support mindset",
    detail: "The relationship continues after possession with responsive service and a clear point of contact.",
    eyebrow: "Support",
    icon: <ClipboardCheck className={iconClassName} strokeWidth={1.75} />,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=82",
  },
  {
    value: "3",
    label: "Core residential formats",
    detail: "Apartments, villas, and plotted communities planned for different life stages and investment goals.",
    eyebrow: "Choice",
    icon: <House className={iconClassName} strokeWidth={1.75} />,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=82",
  },
];

const featuredMetric = metrics[2];
const supportingMetrics = [metrics[0], metrics[1], metrics[3], metrics[4], metrics[5]];

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="relative overflow-hidden bg-[#FAF8F3] py-28 text-[var(--text-primary)] lg:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,174,123,0.55),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[50%] hidden w-px bg-[rgba(183,170,152,0.18)] lg:block" />

      <div className="relative mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div className="mb-16 flex flex-col gap-8 md:mb-20 lg:mb-24 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-6 lg:w-[55%]">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1208]">
              Proof Of Trust
            </p>
            <h2
              className="font-medium leading-[1.05] tracking-tight text-[#1C1208]"
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" 
              }}
            >
              The numbers matter because every one represents a{" "}
              <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                lived address.
              </em>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:w-[35%] lg:items-end">
            <p 
              className="font-light leading-[1.6] text-[#1C1208]/70 lg:mt-4 lg:text-right"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
            >
              Shree&apos;s premium feeling is not only in finishes. It is in fewer unknowns, clearer
              documentation, and a composed journey from first inquiry to handover.
            </p>
            <a
              href="#gallery"
              className="group mt-8 inline-flex h-[50px] items-center justify-center gap-3 border border-[#1C1208]/20 px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1208] transition-all duration-200 hover:-translate-y-px hover:border-[#1C1208]/40 hover:bg-[#1C1208]/5"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              View Projects
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
              >
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="group relative flex h-[28rem] flex-col justify-between overflow-hidden rounded-[8px] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-[#1C1208]" />
              <img
                src={metric.image}
                alt={metric.label}
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05] group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-[#1C1208]/50 to-[#1C1208]/10" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9AE7B]">
                      {metric.eyebrow}
                    </p>
                    <div className="text-[#C9AE7B] transition-transform duration-300 group-hover:scale-110">
                      {metric.icon}
                    </div>
                  </div>
                  <p
                    className="mt-8 leading-none text-[#FAF8F3]"
                    style={{ 
                      fontFamily: "'Cormorant Garamond', Georgia, serif", 
                      fontWeight: 400,
                      fontSize: "clamp(3.5rem, 5vw, 4.5rem)"
                    }}
                  >
                    {metric.value}
                  </p>
                </div>

                <div className="mt-12">
                  <h3 className="text-[1.2rem] font-medium leading-[1.3] tracking-tight text-[#FAF8F3]">
                    {metric.label}
                  </h3>
                  <p className="mt-3 text-[0.95rem] font-light leading-[1.65] text-[#FAF8F3]/80">
                    {metric.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
