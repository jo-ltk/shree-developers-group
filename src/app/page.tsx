import { FooterSection } from "@/components/footer-section";
import { Gallery } from "@/components/gallery";
import { ImageGallery } from "@/components/image-gallery";
import { Hero } from "@/components/hero";
import { QuickActions } from "@/components/quick-actions";
import { CredibilityMetrics } from "@/components/credibility-metrics";
import { IntroStatement } from "@/components/intro-statement";
import { LogoSection } from "@/components/logo-section";
import { MarqueeTextSection } from "@/components/marquee-text-section";
import {
  CommunityDetails,
  ElysianGatesDetails,
  HanoverParkDetails,
  NewnanCrossingDetails,
} from "@/components/community-details";
import { AboutShree } from "@/components/about-shree";
import { ProcessTimeline } from "@/components/process-timeline";
import CommunityDetailsPage from "@/components/metrics-section";
import { MovingShowcaseSection } from "@/components/moving-showcase-section";
import { NavbarAnimated } from "@/components/navbar-animated";
import { RecentArticlesSection } from "@/components/recent-articles-section";
import { TeamSection } from "@/components/team-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaBanner } from "@/components/cta-banner";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-background">
      <NavbarAnimated />

      <Hero />

      <QuickActions />

      <CredibilityMetrics />

      <IntroStatement />

      {/* <LogoSection /> */}

      <Gallery />

      <ImageGallery />

      <div className="flex flex-col gap-4 sm:gap-6 bg-[#F5F0E8] pt-0 pb-0">
        <CommunityDetails />
        <ElysianGatesDetails stacked />
        <HanoverParkDetails stacked />
        <NewnanCrossingDetails stacked />
        <CommunityDetailsPage />
      </div> 

      <MarqueeTextSection />


      <AboutShree />

      <ProcessTimeline />

      <RecentArticlesSection />

      {/* <TestimonialsSection /> */}

      <CtaBanner />

      {/* <TeamSection /> */}

      {/* <MovingShowcaseSection /> */}

      <FooterSection />
    </main>
  );
}