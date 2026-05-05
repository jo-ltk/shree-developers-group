import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { Annotation } from "./ui/annotation";
import { CrosshairIcon } from "./ui/crosshair-icon";
import { BrandMark } from "./ui/brand-mark";

const showcaseItems = [
  {
    title: "Warm Residential Arrivals",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=82",
    fig: "fig. 17",
  },
  {
    title: "Spaces Planned For Family Life",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=82",
    fig: "fig. 18",
  },
  {
    title: "Details That Age With Grace",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=82",
    fig: "fig. 19",
  },
];

export function MovingShowcaseSection() {
  const repeatedItems = [...showcaseItems, ...showcaseItems, ...showcaseItems];

  return (
    <SectionWrapper className="!px-0 !pb-12 md:!pb-20 !pt-0 !max-w-none overflow-hidden" dark={true} noPadding>
      <div className="px-8 md:px-12 lg:px-20 mb-10 md:mb-12 pt-16">
        <SectionLabel counter="08 / 08" light>Visual Study</SectionLabel>
      </div>

      <div className="moving-showcase group overflow-hidden">
        <div className="moving-showcase-track flex min-w-max items-stretch gap-0 will-change-transform">
          {repeatedItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group/slide relative h-[28rem] w-[85vw] shrink-0 overflow-hidden bg-dark border-r border-[#F5F0E8]/10 sm:h-[35rem] sm:w-[80vw] lg:h-[50rem] lg:w-[75vw]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-[3000ms] ease-out group-hover/slide:scale-[1.06]"
                sizes="85vw"
              />
              
              {/* Overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
              
              {/* Blueprint Details */}
              <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20 flex items-center gap-4">
                <Annotation light className="!text-[#F5F0E8]">{item.fig}</Annotation>
                <CrosshairIcon light className="opacity-40" />
              </div>

              <div className="absolute inset-x-0 bottom-0 px-8 pb-8 sm:px-12 sm:pb-12 lg:px-16 lg:pb-16 z-20">
                <Annotation light className="mb-6 !text-[#F5F0E8]/60">ARCHITECTURAL INTENTION</Annotation>
                <SectionHeadline 
                  size="hero" 
                  light 
                  noPeriod 
                  className="max-w-[14ch] !text-[#F5F0E8] !text-[clamp(2.8rem,7vw,8.5rem)] leading-[0.92] tracking-tight group-hover/slide:!text-rust transition-colors duration-700"
                >
                  {item.title}
                </SectionHeadline>
              </div>

              {/* Decorative Corner Label */}
              <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-20 hidden md:flex flex-col items-end gap-2 transition-opacity duration-700 group-hover/slide:opacity-100 opacity-30">
                <BrandMark 
                  variant="steel" 
                  className="h-8 w-24" 
                  imageClassName="object-right" 
                />
                <Annotation light className="!text-[#F5F0E8] !text-[10px] tracking-[0.2em]">Premium Study / 2026</Annotation>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer Annotation */}
      <div className="px-8 md:px-12 lg:px-20 mt-12 md:mt-16 flex justify-between items-center">
        <Annotation light className="!text-[#F5F0E8]/40">Continuous Movement</Annotation>
        <div className="h-px flex-grow mx-8 bg-[#F5F0E8]/10" />
        <Annotation light className="!text-[#F5F0E8]/40">fig. 20</Annotation>
      </div>
    </SectionWrapper>
  );
}

