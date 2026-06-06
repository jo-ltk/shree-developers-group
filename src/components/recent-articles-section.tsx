"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ScrollSnapCarousel } from "./ui/scroll-snap-carousel";
import { ensureGsapPlugins } from "@/lib/gsap";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionLabel } from "./ui/section-label";
import { SectionHeadline } from "./ui/section-headline";
import { BodyText } from "./ui/body-text";
import { Annotation } from "./ui/annotation";

/** Card images: ~400px column × 2× DPR; Cloudinary serves WebP/AVIF via f_auto. */
const BLOG_CARD_WIDTH = 800;

const articles = [
  {
    title: "Thank You to Our Team",
    description:
      "Sydney Oaks wouldn't be possible without the relentless hard work and dedication of this team. While appreciation day is every day for us, we wanted to take a moment to officially remind everyone how incredibly valued you are. Thank you for bringing this vision to life!",
    imagePublicId: "shree-blog/sydney-oaks-team-appreciation",
    date: "March 29, 2025",
  },
  {
    title: "The Beginning of Elysian Gates",
    description:
      "Groundwork is officially underway at 999 Settles Road in Atlanta, Georgia! Preliminary site measurements and ground clearance have begun on the future home of our exclusive 28 Gated community. There are only limited slots and visit our Interactive project map to analysis which all is available for buying. Stay tuned for updates as we bring the vision to life",
    imageSrc: "/images/blog/elysian-gates-groundwork-begins.jpg",
    date: "May 13, 2026",
  },
  {
    title: "The Doors are Open at Sydney Oaks",
    description:
      "On Thursday, April 23, 2026, we celebrated the grand opening of our brand-new designer model home at 1161 Dahlonega Hwy, Cumming, Georgia. Guests enjoyed an exclusive first-look event featuring guided tours of these stunning modern townhomes and excellent refreshments.",
    imagePublicId: "shree-blog/sydney-oaks-grand-opening",
    date: "April 23, 2026",
  },
  {
    title: "Exciting Progress at Sydney Oaks",
    description:
      "Exciting progress is unfolding at Sydney Oaks in Atlanta, Georgia. While the premier community's site was cleared of original trees for grading and initial construction, a meticulous landscaping plan will soon bring back lush greenery and vibrant canopy trees to restore its natural beauty.",
    imagePublicId: "shree-blog/sydney-oaks-landscaping-progress",
    date: "Dec 10, 2025",
  },
] as const;

type Article = (typeof articles)[number];

function getArticleImageSrc(article: Article): string {
  if ("imageSrc" in article) {
    return article.imageSrc;
  }
  return cloudinaryImageUrl(article.imagePublicId, {
    width: BLOG_CARD_WIDTH,
    quality: "auto:good",
  });
}

function ArticleCard({
  article,
  index,
  priority = false,
}: {
  article: Article;
  index: number;
  priority?: boolean;
}) {
  const imageSrc = getArticleImageSrc(article);
  return (
    <motion.article
      key={article.title}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      data-article-card
      className="group relative flex h-full flex-col bg-cream transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-creamDeep"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          unoptimized
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 768px) 85vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-dark/0 transition-colors duration-500 group-hover:bg-dark/[0.06] motion-reduce:transition-none"
          aria-hidden
        />
      </div>

      <div className="flex flex-col flex-grow items-center text-center p-5 md:p-8 pt-6 md:pt-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <Annotation className="mb-4 text-rust responsive-stat-label transition-opacity duration-300 group-hover:opacity-90">
          {article.date}
        </Annotation>
        <SectionHeadline size="md" noPeriod className="mb-4 transition-colors duration-300 group-hover:text-rust">
          {article.title}<span className="text-rust">.</span>
        </SectionHeadline>
        <BodyText size="sm" className="responsive-body-sm flex-grow transition-colors duration-300 group-hover:text-foreground/90">
          {article.description}
        </BodyText>
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-rust/10 transition-colors duration-500 group-hover:border-rust/30" />
    </motion.article>
  );
}

export function RecentArticlesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const visibleArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })
      .from("[data-articles-heading] > *", { autoAlpha: 0, y: 24, duration: 0.85, stagger: 0.12 })
      .from("[data-article-card]", { autoAlpha: 0, y: 30, duration: 1, stagger: 0.15, delay: -0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="articles" ref={sectionRef} dark={false} className="!pt-8 !pb-8 md:!py-24 overflow-hidden">
      {/* Asymmetric Header Grid */}
      <div data-articles-heading className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-12 items-center md:items-end mb-10 md:mb-12 text-center md:text-left">
        <div className="col-span-12 lg:col-span-7 flex flex-col items-center md:items-start responsive-minimum-gap">
          <SectionLabel className="justify-center md:justify-start !mb-0">Media & Blog</SectionLabel>
          <SectionHeadline size="xl" className="responsive-headline-xl m-0">
            Insights, updates,
            <br />
            and design stories
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-center md:items-start responsive-minimum-gap">
          <BodyText size="md" className="m-0 responsive-body-sm">
            Short reads for buyers who want to understand the thinking behind a Shree development, 
            from planning discipline to the details that make ownership simpler.
          </BodyText>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:grid gap-px bg-border/20 md:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visibleArticles.map((article, index) => (
            <ArticleCard
              key={article.title}
              article={article}
              index={index}
              priority={index === 0}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Mobile Slider Version */}
      <div className="md:hidden" ref={containerRef}>
        <div className="relative overflow-visible">
          <ScrollSnapCarousel
            isInView={isInView}
            ariaLabel="Media and blog articles"
            tablistAriaLabel="Choose article slide"
            viewportClassName="-mx-4 px-4"
            slideClassName="pr-6"
            dotsContainerClassName="mt-6"
            dotActiveClassName="h-1 w-10 bg-[#1C1208]"
            dotInactiveClassName="h-1 w-3 bg-[#1C1208]/10"
          >
            {visibleArticles.map((article, idx) => (
              <ArticleCard
                key={article.title}
                article={article}
                index={idx}
                priority={idx === 0}
              />
            ))}
          </ScrollSnapCarousel>
        </div>
      </div>
    </SectionWrapper>
  );
}

