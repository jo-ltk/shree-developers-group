import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";
import { ButtonPrimary } from "./ui/button-primary";
import { CrosshairIcon } from "./ui/crosshair-icon";

const pillars = [
  {
    num: "01",
    label: "Mission",
    desc: "To architect legacies that stand the test of time, creating homes where trust always finds its place.",
    tag: "Our Purpose",
  },
  {
    num: "02",
    label: "Craftsmanship",
    desc: "An obsessive commitment to detail. Built by hand, finished with architectural precision.",
    tag: "Quality First",
  },
  {
    num: "03",
    label: "Experience",
    desc: "Over 15 years of delivering premium residential projects across Georgia and beyond.",
    tag: "Since 2009",
  },
  {
    num: "04",
    label: "Philosophy",
    desc: "We believe in restraint, craft, and the enduring beauty of natural materials and honest construction.",
    tag: "Our Ethos",
  },
  {
    num: "05",
    label: "Licensed & Insured",
    desc: "Total compliance and peace of mind. Fully certified for premium residential developments.",
    tag: "Fully Certified",
  },
];

export function AboutSnippet() {
  return (
    <SectionWrapper className="!py-10 md:!py-14">
      {/* Blueprint grid lines */}
      <div className="pointer-events-none absolute inset-0 flex justify-between px-8 md:px-12 lg:px-20 z-0">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-px h-full bg-[#1C1208]/[0.06]" />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">

        {/* Left column */}
        <div className="flex flex-col justify-start gap-6 sm:gap-8 pr-0 lg:pr-14 border-b lg:border-b-0 lg:border-r border-[#1C1208]/10 pb-10 sm:pb-12 lg:pb-0">

          <div className="flex flex-col gap-0">
            <SectionLabel counter="02 / 04">About Shree</SectionLabel>
            <SectionHeadline size="lg" className="mb-4 sm:mb-6">
              Crafting<br />legacies
            </SectionHeadline>
            <BodyText size="lg">
              Our mission is to build more than just houses — we architect homes
              that stand the test of time. With a philosophy rooted in quality
              craftsmanship and an unwavering commitment to excellence, every
              project is a testament to our experience and trust.
            </BodyText>
          </div>

          {/* Pull quote */}
          <div className="border-l-2 border-[#D43F33] pl-4 sm:pl-5 flex flex-col gap-2 sm:gap-3">
            <p
              className="text-[#1C1208]/60 leading-[1.6]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                fontWeight: 400,
              }}
            >
              &quot;We don&apos;t build houses. We build the places families return to.&quot;
            </p>
            <Annotation>— Shree Developers Group · Est. 2009</Annotation>
          </div>

          <div className="pt-2 sm:pt-4">
            <ButtonPrimary href="/about">Learn More About Us</ButtonPrimary>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-start gap-0 pl-0 lg:pl-14 pt-10 sm:pt-12 lg:pt-0">

          {/* 5-item pillar grid */}
          <div className="grid grid-cols-2 gap-0 border border-[#1C1208]/10 flex-1">
            {pillars.map((p, i) => (
              <div
                key={i}
                className={[
                  "group relative flex flex-col gap-1.5 sm:gap-2 p-4 sm:p-5 md:p-6",
                  "border-r border-b border-[#1C1208]/10",
                  "hover:bg-[#1C1208]/[0.025] transition-colors duration-300 cursor-default",
                  // Remove right border on the right column (even indices)
                  i % 2 === 1 ? "border-r-0" : "",
                  // Make the last item (Philosophy or Licensed) span full width if it's the 5th item
                  i === 4 ? "col-span-2 border-r-0" : "",
                  // Remove bottom border on the last row
                  i === 4 ? "border-b-0" : "",
                  (i === 3 && i === pillars.length - 2) ? "" : "", // cleanup logic
                ].join(" ")}
              >
                <Annotation>{p.num}</Annotation>
                <span
                  className="uppercase font-semibold text-[#1C1208]/55"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.52rem",
                    letterSpacing: "0.16em",
                  }}
                >
                  {p.label}
                </span>
                <p
                  className="text-[#1C1208]/60 leading-[1.6]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
                    fontWeight: 300,
                  }}
                >
                  {p.desc}
                </p>

                {/* Bottom tag */}
                <div className="mt-auto pt-4 sm:pt-6 md:pt-8 flex items-center gap-2 sm:gap-3">
                  <div className="h-px w-5 sm:w-6 bg-[#D43F33]/20" />
                  <span
                    className="uppercase font-medium text-[#1C1208]/30 tracking-[0.2em]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.48rem",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* Large background number */}
                <span
                  className="absolute bottom-2 right-3 sm:right-4 text-[3.5rem] sm:text-[5rem] font-bold text-[#1C1208]/[0.03] select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {p.num}
                </span>

                <CrosshairIcon className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}