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

      {/* Full-width showcase breakout */}
      <div className="w-screen max-w-none ml-[calc(-50vw+50%)] moving-showcase group overflow-hidden">
        <div className="moving-showcase-track flex min-w-max items-stretch gap-0 will-change-transform">
          {repeatedItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group/slide relative h-screen min-h-screen min-w-full shrink-0 overflow-hidden bg-dark"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0}
                className="object-cover object-center transition-transform duration-[3000ms] ease-out group-hover/slide:scale-[1.04]"
                sizes="100vw"
              />
              
              {/* Overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
              
              {/* Top Left */}
              <div className="absolute top-5 sm:top-8 left-5 sm:left-6 md:left-10 lg:left-16 z-20 flex items-center gap-3 sm:gap-4">
                <Annotation light className="!text-[#F5F0E8] responsive-stat-label">{item.fig}</Annotation>
                <CrosshairIcon light className="opacity-40" />
              </div>

              {/* Top Right — desktop only, unchanged */}
              <div className="absolute top-8 right-6 md:right-10 lg:right-16 z-20 hidden md:flex flex-col items-end gap-2 transition-opacity duration-700 group-hover/slide:opacity-100 opacity-40">
                <BrandMark 
                  variant="black" 
                  className="h-8 w-24" 
                  imageClassName="object-right" 
                />
                <Annotation light className="!text-[#F5F0E8] responsive-stat-label">Premium Study / 2026</Annotation>
              </div>

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-8 sm:px-6 sm:pb-10 md:px-10 md:pb-14 lg:px-16 lg:pb-20">
                <Annotation light className="mb-3 sm:mb-5 !text-[#F5F0E8]/60 responsive-stat-label">ARCHITECTURAL INTENTION</Annotation>
                <SectionHeadline 
                  size="hero" 
                  light 
                  noPeriod 
                  className="max-w-[12ch] !text-[#F5F0E8] responsive-headline-xl leading-[0.9] tracking-tight transition-colors duration-700 group-hover/slide:!text-rust"
                >
                  {item.title}
                </SectionHeadline>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer Annotation */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10 flex items-center">
        <Annotation light className="!text-[#F5F0E8]/40 responsive-stat-label">Continuous Movement</Annotation>
        <div className="h-px flex-grow mx-4 sm:mx-8 bg-[#F5F0E8]/10" />
        <Annotation light className="!text-[#F5F0E8]/40 responsive-stat-label">fig. 20</Annotation>
      </div>
    </SectionWrapper>
  );
}