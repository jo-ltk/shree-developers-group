import { cn } from "@/lib/utils";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { CrosshairIcon } from "./ui/crosshair-icon";
import { Annotation } from "./ui/annotation";

const marqueeRows = [
  {
    items: ["Shree Developers", "Premium Homes", "Clear Delivery", "Family Living", "Lasting Value"],
    reverse: false,
    duration: "50s",
  },
  {
    items: ["Trusted Builder", "Refined Details", "Planned Communities", "Warm Materials", "Care After Handover"],
    reverse: true,
    duration: "65s",
  },
  {
    items: ["Villas", "Apartments", "Plotted Homesites", "Neighborhood Comfort", "Brochure Clarity"],
    reverse: false,
    duration: "55s",
  },
];

export function MarqueeTextSection() {
  return (
    <SectionWrapper className="overflow-hidden !py-12 md:!py-20" dark={false}>
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <SectionLabel counter="04 / 08">Core Values</SectionLabel>
        <Annotation className="hidden md:block">fig. 12 / moving principles</Annotation>
      </div>

      <div className="relative">
        {/* Vertical Blueprint Lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#D43F33]/10 z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-[#D43F33]/10 z-10" />

        <div className="space-y-4 md:space-y-8">
          {marqueeRows.map((row, index) => {
            // Repeat items to ensure smooth scrolling
            const repeated = [...row.items, ...row.items, ...row.items, ...row.items];

            return (
              <div key={`row-${index}`} className="group overflow-hidden whitespace-nowrap">
                <div
                  className={cn(
                    "marquee-text-track inline-flex min-w-max items-center gap-12 text-[3.5rem] leading-[0.9] tracking-tight transition-[color,opacity] duration-700 md:text-[5.5rem] lg:text-[7.5rem] 2xl:text-[9rem]",
                    "font-serif font-light italic",
                    "text-[#1C120815] group-hover:text-[#1C120880]",
                    row.reverse ? "marquee-text-track-reverse" : "marquee-text-track-forward"
                  )}
                  style={{
                    animationDuration: row.duration,
                  }}
                >
                  {repeated.map((item, itemIndex) => (
                    <span key={`${item}-${itemIndex}`} className="inline-flex items-center gap-12">
                      <span className="relative">
                        {item}
                        {/* Hover accent dot */}
                        <span className="absolute -right-4 top-1/2 w-1.5 h-1.5 bg-[#D43F33] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block" />
                      </span>
                      <CrosshairIcon className="w-6 h-6 opacity-20" />
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Annotation */}
        <div className="mt-12 flex items-center gap-4 justify-center opacity-30">
          <div className="h-px w-12 bg-[#1C1208]" />
          <Annotation>Building beyond structures</Annotation>
          <div className="h-px w-12 bg-[#1C1208]" />
        </div>
      </div>
    </SectionWrapper>
  );
}

