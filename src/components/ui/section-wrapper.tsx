import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean; // dark section
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, dark, className, id, noPadding }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden",
          dark ? "bg-dark" : "bg-cream",
          !noPadding && "py-12 md:py-16 lg:py-20",
          className,
        )}
      >
        <div className="mx-auto w-full max-w-[1450px] px-8 md:px-12 lg:px-20">
          {children}
        </div>
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
