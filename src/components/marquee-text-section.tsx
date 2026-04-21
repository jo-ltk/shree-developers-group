import { cn } from "@/lib/utils";

const marqueeRows = [
  {
    items: ["AURA CENTRAL", "LOGAN GOLD COAST FAST", "YERONGA COMMUNITY", "CITY MAKING", "HARBOUR QUARTER"],
    reverse: false,
    duration: "38s",
  },
  {
    items: ["SOUTH HAND", "FUTURE MASTER PLAN", "PERFORMING ARTS CENTRE", "HALCYON COVES", "PUBLIC REALM"],
    reverse: true,
    duration: "42s",
  },
  {
    items: ["KNOWLEDGE PILOT", "YERONGA COMMONS", "COASTAL RESIDENTIAL", "AURORA CENTRAL", "MIXED USE PRECINCT"],
    reverse: false,
    duration: "36s",
  },
  {
    items: ["PERFORMING ARTS", "BRIDGE DISTRICTS", "WORKSHOP SERIES", "CITY SHAPING", "HEAD TO HEALTH KIDS"],
    reverse: true,
    duration: "40s",
  },
];

export function MarqueeTextSection() {
  return (
    <section
      className="overflow-hidden px-0 py-12 text-primary-foreground sm:py-14 lg:py-18"
      style={{ backgroundColor: "color-mix(in oklab, var(--primary) 78%, #5d5a41)" }}
    >
      <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
        {marqueeRows.map((row, index) => {
          const repeated = [...row.items, ...row.items, ...row.items];

          return (
            <div key={`row-${index}`} className="group overflow-hidden whitespace-nowrap">
              <div
                className={cn(
                  "marquee-text-track inline-flex min-w-max items-center gap-[0.28em] uppercase leading-[0.86] tracking-[-0.04em] text-primary-foreground/92 transition-[color,letter-spacing,transform] duration-300 group-hover:text-[color:color-mix(in_oklab,var(--accent)_26%,white)] group-hover:tracking-[-0.025em]",
                  row.reverse ? "marquee-text-track-reverse" : "marquee-text-track-forward"
                )}
                style={{
                  animationDuration: row.duration,
                  fontSize: "clamp(3.3rem, 10vw, 8.8rem)",
                }}
              >
                {repeated.map((item, itemIndex) => (
                  <span key={`${item}-${itemIndex}`} className="inline-flex items-center gap-[0.28em] font-sans font-medium">
                    <span>{item}</span>
                    <span className="text-primary-foreground/82">|</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
