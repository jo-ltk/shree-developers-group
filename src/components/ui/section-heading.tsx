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
        "max-w-3xl space-y-4 sm:space-y-6",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-[0.7rem] font-semibold uppercase tracking-[0.38em]",
          tone === "inverse" ? "text-primary-foreground/56" : "text-muted-foreground"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-[2.9rem] leading-[0.92] tracking-[-0.03em] sm:text-[3.75rem] lg:text-[4.45rem]",
          tone === "inverse" ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-2xl text-[1rem] leading-8 sm:text-[1.05rem]",
          tone === "inverse" ? "text-primary-foreground/74" : "text-muted-foreground"
        )}
      >
        {description}
      </p>
    </div>
  );
}
