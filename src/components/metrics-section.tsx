import { type ReactNode } from "react";
import {
  Building2,
  House,
  Map,
  MessageSquareMore,
  Users,
  Waves,
} from "lucide-react";

type MetricItem = {
  value: string;
  label: string;
  detail: string;
  eyebrow: string;
  icon: ReactNode;
};

const iconClassName = "h-9 w-9";

const metrics: MetricItem[] = [
  {
    value: "100+",
    label: "Workshops this year",
    detail: "Briefing, alignment, and design review sessions that keep momentum moving.",
    eyebrow: "Studio Dialogue",
    icon: <MessageSquareMore className={iconClassName} strokeWidth={1.75} />,
  },
  {
    value: "12",
    label: "Games precincts, venues + overlay plans",
    detail: "Large-scale planning packages spanning event, civic, and legacy thinking.",
    eyebrow: "City Scale",
    icon: <Building2 className={iconClassName} strokeWidth={1.75} />,
  },
  {
    value: "1,250+",
    label: "Dwellings currently on our boards",
    detail: "A live pipeline of residential work shaped with commercial clarity and long-horizon value.",
    eyebrow: "Live Pipeline",
    icon: <House className={iconClassName} strokeWidth={1.75} />,
  },
  {
    value: "100+",
    label: "City shaping master planning",
    detail: "Frameworks that connect land use, movement, public life, and future growth.",
    eyebrow: "Framework Thinking",
    icon: <Map className={iconClassName} strokeWidth={1.75} />,
  },
  {
    value: "40+",
    label: "People-oriented precincts",
    detail: "Places designed around usability, welcome, and a stronger civic experience.",
    eyebrow: "Human Focus",
    icon: <Users className={iconClassName} strokeWidth={1.75} />,
  },
  {
    value: "20+",
    label: "Beautiful bridges",
    detail: "Infrastructure moments treated as part of the place story, not just the crossing.",
    eyebrow: "Public Interface",
    icon: <Waves className={iconClassName} strokeWidth={1.75} />,
  },
];

const featuredMetric = metrics[2];
const supportingMetrics = [metrics[0], metrics[1], metrics[3], metrics[4], metrics[5]];
const staggeredCardOffsets = [
  "xl:translate-y-0",
  "xl:translate-y-8",
  "xl:-translate-y-3",
  "xl:translate-y-10",
  "xl:translate-y-2",
];

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="relative overflow-hidden bg-[var(--color-secondary)] py-20 text-[var(--text-primary)] lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,169,107,0.45),transparent)]" />
        <div className="absolute left-0 top-16 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(198,169,107,0.12),transparent_68%)]" />
        <div className="absolute right-[-6rem] top-[-2rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(15,17,19,0.08),transparent_72%)]" />
        <div className="absolute inset-y-0 left-[6%] hidden w-px bg-[linear-gradient(180deg,transparent,rgba(15,17,19,0.06),transparent)] xl:block" />
        <div className="absolute inset-y-0 right-[10%] hidden w-px bg-[linear-gradient(180deg,transparent,rgba(15,17,19,0.05),transparent)] xl:block" />
      </div>

      <div className="relative mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div className="grid gap-8 pb-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(23rem,0.95fr)] xl:items-end xl:pb-16">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-[1.5px] w-9 shrink-0 bg-[var(--color-accent)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Metrics
              </p>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)",
              }}
              className="max-w-[48rem] leading-[1.02] tracking-[-0.02em] text-[var(--text-primary)]"
            >
              The shape of our work is measured in{" "}
              <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                places, not just projects.
              </em>
            </h2>

            <div className="my-8 h-px w-12 bg-[var(--color-accent)]/30" />

            <p className="max-w-[38rem] text-[0.95rem] font-light leading-[1.85] text-[var(--text-primary)]/62">
              Residential communities, city frameworks, event overlays, and public-realm
              infrastructure all sit inside the same design conversation here. This section now
              reads like proof of range rather than a row of disconnected counters.
            </p>
          </div>

          <div className="relative overflow-hidden border border-[var(--color-accent)]/25 bg-[var(--color-primary)] px-6 py-7 text-[var(--text-light)] shadow-[0_24px_60px_rgba(15,17,19,0.12)] ring-1 ring-white/6 sm:px-8 sm:py-8">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(198,169,107,0),rgba(198,169,107,0.8),rgba(198,169,107,0))]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              What These Numbers Signal
            </p>
            <p
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              className="mt-5 text-[2rem] leading-[1.05] text-[var(--text-light)]"
            >
              Scale without losing precision.
            </p>
            <p className="mt-4 max-w-[32rem] text-[0.88rem] font-light leading-[1.8] text-[var(--text-light)]/64">
              The studio moves comfortably from early strategy through spatial detail, with the same
              emphasis on clarity, usability, and a strong public-facing outcome.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Residential", "Urban Planning", "Public Realm"].map((item) => (
                <div
                  key={item}
                  className="border border-[var(--color-secondary)]/12 bg-[var(--color-secondary)]/[0.03] px-4 py-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]/90">
                    Discipline
                  </p>
                  <p className="mt-2 text-[0.88rem] font-light leading-[1.5] text-[var(--text-light)]/82">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#gallery"
              className="group mt-8 inline-flex h-[50px] items-center justify-center gap-3 border border-[var(--color-accent)]/32 px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-light)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-px"
            >
              View Selected Work
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

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] xl:items-stretch">
          <article className="group relative overflow-hidden border border-[var(--color-accent)]/25 bg-[var(--color-primary)] px-6 py-7 text-[var(--text-light)] shadow-[0_28px_70px_rgba(15,17,19,0.12)] ring-1 ring-white/6 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_42%)]" />


            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {featuredMetric.eyebrow}
                  </p>
                  <p
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                    className="mt-5 text-[clamp(4rem,9vw,7rem)] leading-none tracking-[-0.04em] text-[var(--color-accent)]"
                  >
                    {featuredMetric.value}
                  </p>
                </div>

                <div className="rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-secondary)]/[0.04] px-4 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-light)]/68">
                    Active now
                  </span>
                </div>
              </div>

              <div className="mt-10 max-w-[34rem]">
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                  className="text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.04] text-[var(--text-light)]"
                >
                  {featuredMetric.label}
                </h3>
                <p className="mt-4 text-[0.95rem] font-light leading-[1.8] text-[var(--text-light)]/66">
                  {featuredMetric.detail}
                </p>
              </div>

              <div className="mt-10 grid gap-4 border-t border-[var(--color-secondary)]/10 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]/88">
                    Program Mix
                  </p>
                  <p className="mt-2 text-[0.86rem] font-light leading-[1.75] text-[var(--text-light)]/64">
                    Apartments, communities, and broader place-led residential environments.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]/88">
                    Why It Matters
                  </p>
                  <p className="mt-2 text-[0.86rem] font-light leading-[1.75] text-[var(--text-light)]/64">
                    It shows sustained delivery capacity without flattening design ambition.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            <div className="border border-[var(--color-primary)]/14 bg-[var(--color-secondary)]/70 px-6 py-6 shadow-[0_12px_30px_rgba(15,17,19,0.05)] backdrop-blur-sm sm:px-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Studio Reach
              </p>
              <div className="mt-6 grid gap-5">
                {metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label} className="flex items-start gap-4 border-b border-[var(--color-primary)]/10 pb-5 last:border-b-0 last:pb-0">
                    <div className="shrink-0 rounded-full border border-[var(--color-accent)]/22 bg-[var(--color-accent)]/8 p-3 text-[var(--color-accent)]/80">
                      {metric.icon}
                    </div>
                    <div>
                      <p
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                        className="text-[2rem] leading-none text-[var(--text-primary)]"
                      >
                        {metric.value}
                      </p>
                      <p className="mt-2 text-[0.92rem] font-light leading-[1.6] text-[var(--text-primary)]/66">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden border border-[var(--color-primary)]/14 bg-[var(--color-secondary)] px-6 py-6 shadow-[0_12px_30px_rgba(15,17,19,0.05)] sm:px-7">
              <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-6 translate-y-6 rounded-full border border-[var(--color-accent)]/20" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Design Lens
              </p>
              <p
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                className="mt-5 text-[1.9rem] leading-[1.08] text-[var(--text-primary)]"
              >
                Every metric still points back to experience.
              </p>
              <p className="mt-4 max-w-[25rem] text-[0.88rem] font-light leading-[1.8] text-[var(--text-primary)]/62">
                The through-line is not just scale. It is the ability to make large systems feel
                legible, welcoming, and well-composed at human level.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:mt-6 xl:grid-cols-5">
          {supportingMetrics.map((metric, index) => (
            <article
              key={metric.label}
              className={`group relative overflow-hidden border border-[var(--color-primary)]/14 bg-[var(--color-secondary)]/80 px-5 py-6 shadow-[0_10px_30px_rgba(15,17,19,0.05)] ring-1 ring-black/4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/55 hover:shadow-[0_18px_40px_rgba(15,17,19,0.08)] sm:px-6 ${staggeredCardOffsets[index]}`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(198,169,107,0),rgba(198,169,107,0.55),rgba(198,169,107,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {metric.eyebrow}
                  </p>
                  <p
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                    className="mt-5 text-[3rem] leading-none tracking-[-0.03em] text-[var(--text-primary)]"
                  >
                    {metric.value}
                  </p>
                </div>
                <div className="shrink-0 rounded-full border border-[var(--color-primary)]/10 bg-white/60 p-3 text-[var(--text-primary)]/40 transition-all duration-500 group-hover:scale-105 group-hover:border-[var(--color-accent)]/30 group-hover:text-[var(--color-accent)]/80">
                  {metric.icon}
                </div>
              </div>

              <div className="mt-8 border-t border-[var(--color-primary)]/8 pt-4">
                <p className="text-[1rem] font-light leading-[1.55] text-[var(--text-primary)]/72">
                  {metric.label}
                </p>
                <p className="mt-3 text-[0.8rem] font-light leading-[1.75] text-[var(--text-primary)]/52">
                  {metric.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
