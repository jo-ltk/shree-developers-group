import { cn } from "@/lib/utils";

const marqueeRows = [
  {
    items: ["SHREE DEVELOPERS", "PREMIUM HOMES", "CLEAR DELIVERY", "FAMILY LIVING", "LASTING VALUE"],
    reverse: false,
    duration: "38s",
  },
  {
    items: ["TRUSTED BUILDER", "REFINED DETAILS", "PLANNED COMMUNITIES", "WARM MATERIALS", "CARE AFTER HANDOVER"],
    reverse: true,
    duration: "42s",
  },
  {
    items: ["VILLAS", "APARTMENTS", "PLOTTED HOMESITES", "NEIGHBORHOOD COMFORT", "BROCHURE CLARITY"],
    reverse: false,
    duration: "36s",
  },
  {
    items: ["QUALITY FIRST", "TRANSPARENT PROCESS", "PREMIUM SITES", "STEADY SERVICE", "SHREE PROMISE"],
    reverse: true,
    duration: "40s",
  },
];

export function MarqueeTextSection() {
  return (
    <section
      className="overflow-hidden bg-[#F2EADF] px-0 py-12 text-[var(--text-primary)] sm:py-14 lg:py-16"
    >
      <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
        {marqueeRows.map((row, index) => {
          const repeated = [...row.items, ...row.items, ...row.items];

          return (
            <div key={`row-${index}`} className="group overflow-hidden whitespace-nowrap">
              <div
                className={cn(
                  "marquee-text-track inline-flex min-w-max items-center gap-[0.28em] text-[3rem] uppercase leading-[0.9] tracking-normal text-[rgba(58,52,46,0.34)] transition-[color,transform] duration-300 group-hover:text-[var(--color-accent)] sm:text-[4.5rem] lg:text-[6.5rem] 2xl:text-[8rem]",
                  row.reverse ? "marquee-text-track-reverse" : "marquee-text-track-forward"
                )}
                style={{
                  animationDuration: row.duration,
                }}
              >
                {repeated.map((item, itemIndex) => (
                  <span key={`${item}-${itemIndex}`} className="inline-flex items-center gap-[0.28em] font-sans font-medium">
                    <span>{item}</span>
                    <span className="text-[rgba(201,174,123,0.45)]">|</span>
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
