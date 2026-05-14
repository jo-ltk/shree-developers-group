import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean; // dark section
  className?: string;
  id?: string;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, dark, className, id, noPadding, style }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden",
          dark ? "bg-[#1C1208]" : "bg-[#F5F0E8]",
          !noPadding && "py-12 md:py-16 lg:py-20",
          className,
        )}
        style={style}
      >
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
          {children}
        </div>
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
