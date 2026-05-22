"use client";

import { ScrollSnapCarousel, type ScrollSnapCarouselProps } from "./scroll-snap-carousel";

export type FeaturedCommunitiesCarouselProps = Omit<
  ScrollSnapCarouselProps,
  "ariaLabel" | "tablistAriaLabel"
>;

export function FeaturedCommunitiesCarousel(
  props: FeaturedCommunitiesCarouselProps,
) {
  return (
    <ScrollSnapCarousel
      ariaLabel="Featured communities"
      tablistAriaLabel="Choose community slide"
      {...props}
    />
  );
}
