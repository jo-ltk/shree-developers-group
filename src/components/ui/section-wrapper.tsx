import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean; // dark section
  className?: string;
  id?: string;
  noPadding?: boolean;
  mobileNoPadding?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, dark, className, id, noPadding, mobileNoPadding, fullWidth, style }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden",
          dark ? "bg-[#1C1208]" : "bg-[#F5F0E8]",
          !noPadding && "py-16 md:py-24 lg:py-32",
          className,
        )}
        style={style}
      >
        <div className={cn(
          "w-full",
          !fullWidth && (mobileNoPadding ? "px-0 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32" : "px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32")
        )}>
          {children}
        </div>
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
