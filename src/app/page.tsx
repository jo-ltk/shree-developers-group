import { FooterSection } from "@/components/footer-section";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { IntroStatement } from "@/components/intro-statement";
import { LogoSection } from "@/components/logo-section";
import { MarqueeTextSection } from "@/components/marquee-text-section";
import { MetricsSection } from "@/components/metrics-section";
import { MovingShowcaseSection } from "@/components/moving-showcase-section";
import { NavbarAnimated } from "@/components/navbar-animated";
import { RecentArticlesSection } from "@/components/recent-articles-section";
import { TeamSection } from "@/components/team-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-background">
      <NavbarAnimated />
      <Hero />
      <IntroStatement />
      <LogoSection />
      <Gallery />
      <MetricsSection />
      <MarqueeTextSection />
      <RecentArticlesSection />
      <TeamSection />
      <MovingShowcaseSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
