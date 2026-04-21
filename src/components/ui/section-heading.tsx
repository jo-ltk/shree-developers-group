import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-5xl space-y-4 sm:space-y-6",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-[0.75rem] font-semibold uppercase tracking-[0.2em]",
          tone === "inverse" ? "text-primary-foreground/70" : "text-foreground/70"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-sans text-[3rem] font-normal leading-[0.92] tracking-[-0.06em] sm:text-[4.4rem] lg:text-[5.4rem]",
          tone === "inverse" ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-[30rem] text-[1rem] leading-8",
          tone === "inverse" ? "text-primary-foreground/78" : "text-foreground/78",
          align === "center" && "mx-auto"
        )}
      >
        {description}
      </p>
    </div>
  );
}
