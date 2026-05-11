import { FooterSection } from "@/components/footer-section";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { IntroStatement } from "@/components/intro-statement";
import { LogoSection } from "@/components/logo-section";
import { MarqueeTextSection } from "@/components/marquee-text-section";
import { SydneyOaksMetricsSection, ElysianGatesMetricsSection } from "@/components/metrics-section";
import { MovingShowcaseSection } from "@/components/moving-showcase-section";
import { NavbarAnimated } from "@/components/navbar-animated";
import { RecentArticlesSection } from "@/components/recent-articles-section";
import { TeamSection } from "@/components/team-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CredibilityMetrics } from "@/components/credibility-metrics";
import { AboutSnippet } from "@/components/about-snippet";
import { CtaBanner } from "@/components/cta-banner";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-background">
      <NavbarAnimated />
      <Hero />
      <CredibilityMetrics />
      <AboutSnippet />
      <IntroStatement />
      {/* <LogoSection /> */}
      <Gallery />
      <SydneyOaksMetricsSection />
      <ElysianGatesMetricsSection />
      <MarqueeTextSection />
      <RecentArticlesSection />
      <TeamSection />
      <MovingShowcaseSection />
      <TestimonialsSection />
      <CtaBanner />
      <FooterSection />
    </main>
  );
}
