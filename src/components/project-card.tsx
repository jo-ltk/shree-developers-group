import Image from "next/image";

import { BrandMark } from "@/components/ui/brand-mark";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  location: string;
  type: string;
  year: string;
  summary: string;
  index: string;
  image: string;
  className?: string;
  size?: "featured" | "medium" | "regular";
};

const sizeClasses = {
  featured: {
    shell: "min-h-[26rem] px-7 pb-12 pt-14 sm:px-9 sm:pb-14 sm:pt-16 lg:px-12 lg:pb-16 lg:pt-18",
    index: "text-[0.76rem] sm:text-[0.82rem]",
    location: "mt-5 text-[0.9rem] sm:text-[0.98rem]",
    mark: "mt-1 h-12 w-[6.75rem] sm:h-14 sm:w-[8rem] lg:h-16 lg:w-[9rem]",
    title: "mt-8 text-[2.9rem] leading-[0.92] sm:mt-10 sm:text-[4rem] lg:text-[5.3rem]",
    summary: "max-w-[38rem] text-[1.06rem] leading-8 sm:text-[1.14rem] sm:leading-9 lg:text-[1.22rem] lg:leading-10",
    meta: "text-[0.78rem] sm:text-[0.84rem]",
    marquee: "py-3 text-[0.76rem] sm:py-4 sm:text-[0.82rem]",
  },
  medium: {
    shell: "min-h-[24rem] px-7 pb-11 pt-13 sm:px-8 sm:pb-12 sm:pt-15 lg:px-9 lg:pb-13 lg:pt-16",
    index: "text-[0.72rem] sm:text-[0.76rem]",
    location: "mt-4 text-[0.84rem] sm:text-[0.9rem]",
    mark: "mt-1 h-11 w-[6rem] sm:h-12 sm:w-[7rem] lg:h-14 lg:w-[8rem]",
    title: "mt-7 text-[2.35rem] leading-[0.94] sm:text-[3rem] lg:text-[3.7rem]",
    summary: "max-w-[34rem] text-[0.98rem] leading-8 sm:text-[1.04rem] sm:leading-8 lg:text-[1.08rem] lg:leading-9",
    meta: "text-[0.76rem] sm:text-[0.8rem]",
    marquee: "py-3 text-[0.74rem] sm:text-[0.78rem]",
  },
  regular: {
    shell: "min-h-[22rem] px-6 pb-10 pt-12 sm:px-7 sm:pb-12 sm:pt-14 lg:px-8 lg:pb-12 lg:pt-14",
    index: "text-[0.68rem]",
    location: "mt-4 text-[0.8rem]",
    mark: "mt-1 h-10 w-[5.5rem] sm:h-11 sm:w-[6.25rem]",
    title: "mt-6 text-[1.95rem] leading-[0.96] sm:mt-7 sm:text-[2.35rem] lg:text-[2.7rem]",
    summary: "max-w-[30rem] text-[0.95rem] leading-7 sm:text-[1rem] sm:leading-8",
    meta: "text-[0.74rem]",
    marquee: "py-2.5 text-[0.72rem] sm:py-3",
  },
};

export function ProjectCard({
  title,
  location,
  type,
  year,
  summary,
  index,
  image,
  className,
  size = "regular",
}: ProjectCardProps) {
  const marqueeText = `${title} | ${location} | ${type} | ${year} | `;
  const styles = sizeClasses[size];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-none border border-border/45 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,17,28,0.18),rgba(11,17,28,0.28)_40%,rgba(11,17,28,0.72))] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0" />
      </div>

      <div className="absolute inset-0 bg-background opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />

      <div
        className={cn(
          "relative flex h-full flex-col justify-between text-primary-foreground transition-colors duration-500 group-hover:text-foreground",
          styles.shell
        )}
      >
        <div className="flex items-start justify-between gap-5">
          <div className="pr-4">
            <p
              className={cn(
                "font-semibold uppercase tracking-[0.34em] text-primary-foreground/70 transition-colors duration-500 group-hover:text-muted-foreground",
                styles.index
              )}
            >
              {index}
            </p>
            <p
              className={cn(
                "max-w-[12rem] uppercase tracking-[0.24em] text-primary-foreground/78 transition-colors duration-500 group-hover:text-muted-foreground",
                styles.location
              )}
            >
              {location}
            </p>
          </div>

          <div className={cn("relative", styles.mark)}>
            <BrandMark
              variant="white"
              className="h-full w-full transition-opacity duration-500 group-hover:opacity-0"
              alt="Shree Developers Group white logo"
            />
            <BrandMark
              variant="black"
              className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              alt="Shree Developers Group black logo"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
            <h3 className={cn("max-w-[14ch] font-sans font-medium tracking-[-0.06em]", styles.title)}>{title}</h3>
            <p
              className={cn(
                "text-primary-foreground/78 transition-colors duration-500 group-hover:text-muted-foreground",
                styles.summary
              )}
            >
              {summary}
            </p>
          </div>

          <div
            className={cn(
              "flex items-center justify-between gap-4 uppercase tracking-[0.24em] text-primary-foreground/68 transition-all duration-500 group-hover:translate-y-1 group-hover:text-foreground/56",
              styles.meta
            )}
          >
            <span>{type}</span>
            <span>{year}</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden border-b border-transparent opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-foreground/10 group-hover:opacity-100">
        <div
          className={cn(
            "project-card-marquee-track whitespace-nowrap font-medium uppercase tracking-[0.22em] text-foreground/68 will-change-transform",
            styles.marquee
          )}
        >
          <span className="project-card-marquee-content">
            {marqueeText}
            {marqueeText}
            {marqueeText}
            {marqueeText}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden border-t border-transparent opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-foreground/10 group-hover:opacity-100">
        <div
          className={cn(
            "project-card-marquee-track-reverse whitespace-nowrap font-medium uppercase tracking-[0.22em] text-foreground/68 will-change-transform",
            styles.marquee
          )}
        >
          <span className="project-card-marquee-content">
            {marqueeText}
            {marqueeText}
            {marqueeText}
            {marqueeText}
          </span>
        </div>
      </div>
    </article>
  );
}

