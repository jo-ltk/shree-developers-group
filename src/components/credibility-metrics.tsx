import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { Annotation } from "./ui/annotation";
import { CrosshairIcon } from "./ui/crosshair-icon";

const stats = [
  { value: "15", suffix: "+", label: "Years Experience" },
  { value: "200", suffix: "+", label: "Homes Delivered" },
  { value: "GA", suffix: "", label: "Trusted Across Georgia" },
  { value: "Top", suffix: "", label: "Quality Craftsmanship" },
];

export function CredibilityMetrics() {
  return (
    <SectionWrapper dark className="!py-10 md:!py-14">

      {/* Blueprint grid lines */}
      <div className="pointer-events-none absolute inset-0 flex justify-between px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 z-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-px h-full bg-[#D43F33]/[0.06]" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-6">

        {/* Top row — headline left */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <SectionLabel light counter="01 / 04">Credibility</SectionLabel>
            <SectionHeadline light size="lg" className="!text-[clamp(2rem,6vw,4.2rem)] !leading-[0.95]">
              Why homeowners <em className="italic">trust</em> us
            </SectionHeadline>
          </div>
          <Annotation light className="!leading-[2] opacity-60">
            Shree Developers Group · Est. 2009 · Kerala, IN
          </Annotation>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#F5F0E8]/[0.08]">
          {stats.map((s, i) => (
            <div
              key={i}
              className={[
                "group relative flex flex-col items-center text-center gap-2 p-4 sm:p-5",
                "hover:bg-[#F5F0E8]/[0.03] transition-colors duration-300 cursor-default",
                // Right border: cols 0 and 1 on mobile (2-col grid), all except last on sm+
                "border-r border-[#F5F0E8]/[0.08]",
                // Remove right border on col 2 (index 1) on mobile and col 4 (index 3) on sm+
                i % 2 === 1 ? "border-r-0 sm:border-r border-[#F5F0E8]/[0.08]" : "",
                i === 3 ? "sm:border-r-0" : "",
                // Bottom border for top row on mobile (indices 0 and 1)
                i < 2 ? "border-b border-[#F5F0E8]/[0.08] sm:border-b-0" : "",
              ].join(" ")}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem,5vw,4rem)",
                  fontWeight: 300,
                  color: "#F5F0E8",
                  lineHeight: 1,
                }}
              >
                {s.value}
                <span className="text-[#D43F33]">{s.suffix}</span>
              </div>

              <Annotation light>{s.label}</Annotation>

              <CrosshairIcon
                light
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}