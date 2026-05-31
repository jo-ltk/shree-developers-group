"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Star,
  MapPin,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  DollarSign,
  Layers,
  Calendar,
  Award,
  Info,
  Home,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Lock,
  Building2,
  Users,
  Navigation,
  Shield,
  Trees,
  ShieldCheck,
  Map,
  Waves,
  Dumbbell,
  Baby,
  Footprints,
  Trophy,
  Camera,
  Gamepad2,
  BriefcaseBusiness,
  PartyPopper,
  Instagram,
  Zap,
  ChefHat,
  Lightbulb,
  GraduationCap,
  ShoppingCart,
  type LucideIcon
} from "lucide-react";
import type { ProjectData } from "@/lib/projects-data";
import { getVisualJourneyGalleryImages } from "@/lib/visual-journey-gallery";
import { ensureGsapPlugins } from "@/lib/gsap";
import { NavbarEditorial } from "@/components/navbar-editorial";
import { FooterSection } from "@/components/footer-section";
import { ProjectHeroCollage } from "@/components/project-hero-collage";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { FigMarker } from "@/components/ui/fig-marker";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { MobileHorizontalCarousel } from "@/components/ui/mobile-horizontal-carousel";
import { LocationNearbySection } from "@/components/location-nearby-section";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const amenityIconMap: Record<string, LucideIcon> = {
  "swimming pool": Waves,
  "club house": Building2,
  gym: Dumbbell,
  "kids play area": Baby,
  "walking track": Footprints,
  "basketball court": Trophy,
  "garden area": Trees,
  security: ShieldCheck,
  cctv: Camera,
  "indoor games": Gamepad2,
  "co-working space": BriefcaseBusiness,
  "party hall": PartyPopper,
  "pickleball courts": Trophy,
  gazebo: Trees,
  "walking trails": Footprints,
};

function getAmenityIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  if (amenityIconMap[lower]) return amenityIconMap[lower];

  const rules: [string, LucideIcon][] = [
    ["landscap", Trees],
    ["park", Trees],
    ["green", Trees],
    ["sidewalk", Footprints],
    ["walkable", Footprints],
    ["retail", Building2],
    ["dining", Building2],
    ["gathering", Users],
    ["recreation", Dumbbell],
    ["aquatic", Waves],
    ["trail", Footprints],
    ["lake", Waves],
    ["lanier", Waves],
    ["shopping", Building2],
    ["entertainment", PartyPopper],
    ["lighting", Lightbulb],
    ["ceiling fan", Lightbulb],
    ["crown molding", Home],
    ["flex room", Home],
    ["bonus room", Home],
    ["cat6", Navigation],
    ["quartz", ChefHat],
    ["kitchen", ChefHat],
    ["cabinet", ChefHat],
    ["appliance", ChefHat],
    ["energy star", Zap],
    ["thermostat", Zap],
    ["window", Shield],
    ["insulation", Shield],
    ["house wrap", Shield],
    ["hvac", Zap],
    ["led", Lightbulb],
  ];

  for (const [keyword, icon] of rules) {
    if (lower.includes(keyword)) return icon;
  }

  return CheckCircle2;
}

const amenitySectionIconMap: Record<string, LucideIcon> = {
  "community amenities": Trees,
  "lifestyle & recreation": Map,
  "interior features": Home,
  "kitchen features": ChefHat,
  "energy efficient features": Zap,
  "core amenities": Waves,
  "community design": Footprints,
  "home features": Home,
};

const amenityDesktopGridColsClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

function getAmenitySectionIcon(title: string) {
  return amenitySectionIconMap[title.toLowerCase()] || CheckCircle2;
}

function getFlatAmenityGridColsClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-3";
  return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
}

const locationGroupIconMap: Record<string, LucideIcon> = {
  "nearby recreation": Waves,
  "shopping & grocery": ShoppingCart,
  "entertainment & dining": PartyPopper,
  "healthcare access": ShieldCheck,
  "school district": GraduationCap,
};

function getLocationGroupIcon(title: string) {
  return locationGroupIconMap[title.toLowerCase()] || MapPin;
}

export function ProjectDetailClient({ project }: { project: ProjectData }) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(0);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  // Setup GSAP
  useLayoutEffect(() => {
    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el as Element, {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el as Element, start: "top 90%", once: true },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const name = project.name || project.title;
  const configurationLabel = project.configurationLabel || "3–4 Bedrooms";
  const overviewParagraphs = project.overviewParagraphs || [
    `${name} is conceived as a sanctuary for families seeking a balanced, nature-integrated lifestyle. Designed with modern farmhouse architecture as the foundation, each residence leverages natural wood siding, limestone masonry, and expansive double-glazed panels that showcase the protected landscape.`,
    "Each home is positioned to capture optimal ventilation and sun exposure throughout the seasons, ensuring natural temperature regulation and bright common spaces. Connectivity runs deep here — residents enjoy secure access to local trails, premier schools, and civic centers, all within a fully gated community framework.",
  ];
  const overviewSectionLabel = project.overviewSectionLabel ?? "Overview";
  const overviewHeadline = project.overviewHeadline;
  const overviewKeynote = project.overviewKeynote;
  const highlightCriteria =
    project.highlightCriteria ?? [
      { title: "Top County Schools", desc: "Within acclaimed school districts renowned for excellence." },
      { title: "Healthcare Integration", desc: "Minutes from major regional hospitals providing premium care." },
      { title: "Business Connectivity", desc: "Quick commutes to regional offices and commercial business parks." },
      { title: "Park & Trail Access", desc: "Gated layout with direct paths into scenic trail networks." },
    ];
  const showOverviewHighlights = highlightCriteria.length > 0;
  const isSingleWideOverview =
    !showOverviewHighlights && overviewParagraphs.length === 1;
  const locationConnectivityBlurb =
    project.locationConnectivityBlurb ||
    `Positioned along ${project.location}'s central access ways, ${name} bridges the boundary between natural seclusion and rapid civic reach.`;
  const sitePlanSvg = project.sitePlanSvg || "/svg/siteMap-final.svg";
  const tagline = project.tagline || "Luxury homes in Cumming, Georgia";
  const priceText = project.priceText || "From low $400s";
  const statusBadge = project.statusBadge || "Ongoing";
  const heroDescription = project.heroDescription;
  const heroKeySpecs = project.heroKeySpecs;
  const heroLocationLabel = project.heroLocationLabel || project.location;
  const showHeroStatusBadge = !project.heroHideStatusBadge;
  const heroCtaSecondary = project.heroCtaSecondary || "Schedule Visit";
  const reraNumber = project.reraNumber || "RERA-GA-8923";
  const possessionDate = project.possessionDate || "Q4 2026";
  const projectArea = project.projectArea || "22 Acres";
  const totalUnits = project.totalUnits || "89 Town Homes";
  const priceRange = project.priceRange || "$410k - $580k";
  const propertyType = project.propertyType || "Townhomes";
  const highlightsList = project.highlightsList || [
    "Wooded backyard retreats bordering natural trails",
    "Curated lifestyle amenities at our private community core",
    "High-efficiency HVAC and eco-conscious construction standards",
    "Open-concept family floor plans designed by award-winning architects"
  ];

  const floorPlans = project.floorPlansDetails || [
    {
      name: "The Maple Townhome",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80",
      bedrooms: 3,
      bathrooms: 2.5,
      parking: 2,
      area: 2400,
      price: "$410,000",
      emi: "$2,150/mo",
      availability: "Available" as const,
      virtualTourUrl: "#tour-maple"
    }
  ];

  const units = project.unitsList || [];
  const nearbyPlaces = project.nearbyPlaces || [];
  const faqs = project.faqsList || [];
  const testimonials = project.testimonialsList || [];
  const coordinates = project.coordinates || { lat: 34.0531, lng: -84.0624 };

  // Collect gallery photos (Visual Journey set for Sydney Oaks; hero/renders for others)
  const galleryImages = useMemo(() => {
    if (project.slug === "sydney-oaks") {
      return getVisualJourneyGalleryImages().map((image) => ({
        src: image.thumbUrl,
        lightboxSrc: image.fullUrl,
        alt: image.title,
      }));
    }

    const list: { src: string; alt: string; lightboxSrc?: string }[] = [
      { src: project.image, alt: `${name} Exterior` },
    ];
    if (project.heroAccentImages) {
      project.heroAccentImages.forEach((accent) => {
        list.push({ src: accent.src, alt: accent.alt });
      });
    }
    if (project.renders) {
      project.renders.forEach((r) => {
        list.push({ src: r.image, alt: r.label });
      });
    }
    if (floorPlans && floorPlans[0]) {
      list.push({ src: floorPlans[0].image, alt: `${floorPlans[0].name} Layout` });
    }
    return list.slice(0, 8);
  }, [
    project.slug,
    project.image,
    project.heroAccentImages,
    project.renders,
    floorPlans,
    name,
  ]);

  const repeatedImages = useMemo(() => {
    return [...galleryImages, ...galleryImages, ...galleryImages];
  }, [galleryImages]);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <div ref={pageRef} className="overflow-x-hidden bg-cream font-sans">
      <NavbarEditorial />

      {/* A. HERO BANNER */}
      <section className="relative w-full pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 md:pb-16 bg-[#F5F0E8] border-b border-dark/10">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-12 lg:px-16">
          <div
            className={`grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-stretch ${
              heroKeySpecs?.length ? "lg:grid-rows-1" : ""
            }`}
          >

            {/* Left Hero Content */}
            <div
              data-reveal
              className={`col-span-12 flex h-full min-h-0 flex-col items-center text-center lg:items-start lg:text-left lg:justify-between ${
                heroKeySpecs?.length ? "lg:col-span-6 lg:min-h-full" : "lg:col-span-5"
              } gap-4 sm:gap-5 lg:gap-6`}
            >
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:items-start">
                {showHeroStatusBadge && (
                  <span className="w-fit border border-rust/25 px-3 py-1 text-rust font-bold text-[9px] uppercase tracking-widest">
                    {statusBadge}
                  </span>
                )}
                <span className="inline-flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-dark/60">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-rust" />
                  <span className="leading-snug">{heroLocationLabel}</span>
                </span>
              </div>

              <div className="w-full max-w-xl space-y-3 sm:space-y-4 lg:max-w-none">
                <SectionHeadline
                  size="hero"
                  noPeriod
                  className="!text-[clamp(2.25rem,11vw,7rem)]"
                >
                  {name}<span className="text-rust">.</span>
                </SectionHeadline>
                <p
                  className="mx-auto max-w-lg text-lg sm:text-xl md:text-2xl font-light text-rust italic leading-snug lg:mx-0 lg:max-w-xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {tagline}
                </p>
              </div>

              <BodyText
                size="lg"
                className="mx-auto max-w-lg text-base sm:text-lg text-dark/70 font-light leading-relaxed lg:mx-0 lg:max-w-xl"
              >
                {heroDescription ?? project.summary ?? project.brief}
              </BodyText>

              <div className="w-full border-y border-dark/10 py-4 lg:py-5">
                {heroKeySpecs && heroKeySpecs.length > 0 ? (
                  <div className="w-full text-left">
                    <span className="block text-[9px] sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.2em] text-rust uppercase text-center lg:text-left">
                      Key Specs
                    </span>
                    <ul className="mt-3.5 grid w-full grid-cols-2 gap-x-4 gap-y-3.5 sm:gap-x-6 sm:gap-y-4 lg:gap-x-8">
                      {heroKeySpecs.map((spec) => (
                        <li
                          key={spec}
                          className="flex items-start gap-2.5 min-w-0 sm:gap-3"
                        >
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rust/25 bg-rust/5"
                            aria-hidden
                          >
                            <CheckCircle2 className="h-3 w-3 text-rust sm:h-3.5 sm:w-3.5" strokeWidth={2.25} />
                          </span>
                          <span className="font-display text-xs sm:text-sm lg:text-[15px] text-dark/90 leading-snug">
                            {spec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center lg:text-left">
                    <div className="min-w-0 space-y-0.5 sm:space-y-1">
                      <span className="block text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-rust uppercase">Price</span>
                      <span className="block font-display text-xs sm:text-base lg:text-lg text-dark leading-tight">{priceText}</span>
                    </div>
                    <div className="min-w-0 space-y-0.5 sm:space-y-1">
                      <span className="block text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-rust uppercase">Homes</span>
                      <span className="block font-display text-xs sm:text-base lg:text-lg text-dark leading-tight">{totalUnits}</span>
                    </div>
                    <div className="min-w-0 space-y-0.5 sm:space-y-1">
                      <span className="block text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-rust uppercase">Possession</span>
                      <span className="block font-display text-xs sm:text-base lg:text-lg text-dark leading-tight">{possessionDate}</span>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`flex w-full flex-row flex-nowrap items-stretch justify-center gap-2.5 pt-1 sm:gap-4 sm:justify-start sm:pt-3 lg:max-w-none ${
                  heroKeySpecs?.length ? "lg:mt-auto" : ""
                }`}
              >
                <Link
                  href="#enquiry"
                  className="inline-flex h-12 sm:h-14 min-w-0 flex-1 sm:flex-none sm:w-auto items-center justify-center gap-2 sm:gap-4 bg-rust px-3 sm:px-8 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.24em] text-white no-underline transition-colors hover:bg-dark"
                >
                  Request Information
                  <ArrowRight className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  href="#enquiry"
                  className="inline-flex h-12 sm:h-14 min-w-0 flex-1 sm:flex-none sm:w-auto items-center justify-center gap-2 sm:gap-4 border border-dark/20 px-3 sm:px-8 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.24em] text-dark no-underline transition-colors hover:border-rust hover:text-rust"
                >
                  {heroCtaSecondary}
                  <ArrowRight className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div
              data-reveal
              className={`col-span-12 relative mt-2 sm:mt-0 w-full self-stretch overflow-hidden bg-[#EDE8DF] border border-dark/10 min-h-[240px] sm:min-h-[300px] ${
                heroKeySpecs?.length
                  ? "lg:col-span-6 lg:mt-0 lg:h-full lg:min-h-full"
                  : "lg:col-span-7 lg:min-h-[540px] xl:min-h-[620px]"
              }`}
            >
              {project.heroAccentImages && project.heroAccentImages.length > 0 ? (
                <ProjectHeroCollage
                  mainSrc={project.image}
                  mainAlt={`${name} Exterior`}
                  accents={project.heroAccentImages}
                />
              ) : (
                <Image
                  src={project.image}
                  alt={`${name} Exterior`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>

          </div>
        </div>
      </section>

      {/* QUICK INFO BAR (Premium Specs Dashboard) */}
      <section className="bg-dark text-cream border-y border-rust/10 py-8">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6 items-stretch">
            <div className="flex flex-col items-center justify-center text-center p-4 border border-cream/10 rounded-sm bg-cream/5 hover:bg-cream/10 transition-colors duration-300 h-full min-h-[120px]">
              <Layers className="text-rust w-5 h-5 mb-2 shrink-0" />
              <Annotation light className="mb-1">Project Area</Annotation>
              <span className="font-display font-light text-sm text-cream">{projectArea}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 border border-cream/10 rounded-sm bg-cream/5 hover:bg-cream/10 transition-colors duration-300 h-full min-h-[120px]">
              <Building2 className="text-rust w-5 h-5 mb-2 shrink-0" />
              <Annotation light className="mb-1">Total Units</Annotation>
              <span className="font-display font-light text-sm text-cream">{totalUnits}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 border border-cream/10 rounded-sm bg-cream/5 hover:bg-cream/10 transition-colors duration-300 h-full min-h-[120px]">
              <Compass className="text-rust w-5 h-5 mb-2 shrink-0" />
              <Annotation light className="mb-1">Bedrooms</Annotation>
              <span className="font-display font-light text-sm text-cream">{configurationLabel}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 border border-cream/10 rounded-sm bg-cream/5 hover:bg-cream/10 transition-colors duration-300 h-full min-h-[120px]">
              <Calendar className="text-rust w-5 h-5 mb-2 shrink-0" />
              <Annotation light className="mb-1">Possession Date</Annotation>
              <span className="font-display font-light text-sm text-cream">{possessionDate}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 border border-cream/10 rounded-sm bg-cream/5 hover:bg-cream/10 transition-colors duration-300 h-full min-h-[120px]">
              <DollarSign className="text-rust w-5 h-5 mb-2 shrink-0" />
              <Annotation light className="mb-1">Price Range</Annotation>
              <span className="font-display font-light text-sm text-cream">{priceRange}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 border border-cream/10 rounded-sm bg-cream/5 hover:bg-cream/10 transition-colors duration-300 h-full min-h-[120px]">
              <Home className="text-rust w-5 h-5 mb-2 shrink-0" />
              <Annotation light className="mb-1">Property Type</Annotation>
              <span className="font-display font-light text-sm text-cream">{propertyType}</span>
            </div>
          </div>
        </div>
      </section>

      {/* B. COMMUNITY OVERVIEW */}
      <SectionWrapper dark={false} className="!pt-16 !pb-3 md:!pt-24 md:!pb-5">
        <div data-reveal className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">

          <div
            className={`flex flex-col justify-between h-full items-center text-center lg:items-start lg:text-left ${
              showOverviewHighlights ? "col-span-12 lg:col-span-7" : "col-span-12"
            }`}
          >
            <div className="w-full max-w-none">
              <SectionLabel className="w-full justify-center text-center lg:justify-start lg:text-left !mb-4 lg:!mb-6">
                {overviewSectionLabel}
              </SectionLabel>
              {overviewHeadline && (
                <SectionHeadline
                  size="md"
                  className="mb-5 sm:mb-6 font-display font-light text-balance !text-[clamp(1.35rem,5vw,1.9rem)]"
                >
                  {overviewHeadline}
                </SectionHeadline>
              )}

              {isSingleWideOverview ? (
                <>
                  <p
                    className={`w-full max-w-none font-light leading-relaxed text-pretty text-base text-dark/80 sm:text-lg lg:text-lg lg:leading-[1.75] ${
                      !overviewExpanded ? "line-clamp-[9] lg:line-clamp-none" : ""
                    }`}
                  >
                    {overviewParagraphs[0]}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOverviewExpanded((prev) => !prev)}
                    className="mx-auto mt-5 w-full max-w-sm cursor-pointer rounded-sm border border-dark/15 bg-[#EDE8DF] py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-rust hover:text-rust lg:hidden"
                  >
                    {overviewExpanded ? "Read Less" : "Read More"}
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-5 sm:space-y-6 text-dark/80">
                    {overviewParagraphs.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={`leading-relaxed font-light text-pretty ${
                          idx === 0
                            ? "text-base sm:text-lg"
                            : "text-sm sm:text-base opacity-90"
                        } ${!overviewExpanded && idx > 0 ? "hidden lg:block" : ""}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {overviewParagraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setOverviewExpanded((prev) => !prev)}
                      className="mx-auto mt-5 w-full max-w-sm cursor-pointer rounded-sm border border-dark/15 bg-[#EDE8DF] py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-rust hover:text-rust lg:hidden"
                    >
                      {overviewExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </>
              )}
            </div>

            {overviewKeynote && (
              <div className="mt-8 w-full max-w-xl border-t border-dark/15 pt-6 lg:max-w-none">
                <Annotation className="!text-rust mb-4">COMMUNITY KEYNOTE</Annotation>
                <blockquote className="mx-auto max-w-md border-l-0 pl-0 italic text-dark/70 font-display text-base sm:text-lg lg:mx-0 lg:max-w-none lg:border-l-2 lg:border-rust lg:pl-4">
                  &ldquo;{overviewKeynote}&rdquo;
                </blockquote>
              </div>
            )}
          </div>

          {showOverviewHighlights && (
          <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
            <Annotation className="mb-4">HIGHLIGHT CRITERIA</Annotation>

            <div className="flex flex-col flex-1 justify-between gap-4 h-full">
              {highlightCriteria.map((item, index) => {
                const isOpen = activeHighlight === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveHighlight(isOpen ? null : index)}
                    className={`bg-[#EDE8DF] border border-dark/5 px-6 gap-4 transition-all duration-500 cursor-pointer select-none rounded-sm flex-1 ${
                      isOpen
                        ? "py-6 items-start ring-1 ring-rust/30 bg-[#E8E2D7] shadow-md"
                        : "py-4 items-center hover:bg-[#EAE4D9]"
                    } ${
                      index >= 2
                        ? (highlightsExpanded ? "flex" : "hidden md:flex")
                        : "flex"
                    }`}
                  >
                    <div className="w-8 h-8 border border-rust/20 flex items-center justify-center shrink-0 transition-all duration-500 rounded-sm bg-cream/10">
                      <div className={`transition-transform duration-500 ${isOpen ? "rotate-[135deg]" : ""}`}>
                        <CrosshairIcon />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs uppercase tracking-wider block text-dark">
                        {item.title}
                      </span>
                      <div
                        className="transition-all duration-500 ease-in-out overflow-hidden"
                        style={{
                          maxHeight: isOpen ? "150px" : "0px",
                          opacity: isOpen ? 1 : 0,
                          marginTop: isOpen ? "8px" : "0px",
                        }}
                      >
                        <span className="text-sm text-dark/70 font-light block leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Read More / Read Less mobile toggle button */}
              <button
                onClick={() => setHighlightsExpanded(!highlightsExpanded)}
                className="md:hidden mt-2 w-full py-3 border border-dark/15 text-dark hover:border-rust hover:text-rust transition-all duration-300 font-bold uppercase tracking-wider text-[10px] rounded-sm cursor-pointer text-center bg-[#EDE8DF] hover:bg-[#EAE4D9]"
              >
                {highlightsExpanded ? "Read Less" : "Read More"}
              </button>
            </div>

          </div>
          )}

        </div>
      </SectionWrapper>

      {/* C. GALLERY */}
      <section className="overflow-hidden bg-cream pt-2 pb-5 sm:pt-3 sm:pb-6 md:pt-4 md:pb-8">
        <div className="mx-auto mb-6 max-w-[1450px] px-4 sm:mb-8 sm:px-8 md:px-12 lg:px-20">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div className="w-full max-w-xl md:max-w-none">
              <SectionLabel className="justify-center md:justify-start !mb-4 md:!mb-6">
                Visual Album
              </SectionLabel>
              <SectionHeadline size="lg" className="font-display font-light leading-none">
                Interior & exterior <em className="font-normal italic">views</em>
              </SectionHeadline>
            </div>
            <Annotation className="!text-rust max-w-xs text-center md:max-w-none md:text-left">
              <span className="sm:hidden">Verified images · No placeholders</span>
              <span className="hidden sm:inline">VERIFIED IMAGES // NO PLACEHOLDERS</span>
            </Annotation>
          </div>
        </div>

        {/* Marquee Slider */}
        <div className="group relative ml-[calc(-50vw+50%)] w-screen max-w-none overflow-hidden">
          <div
            className="animate-marquee flex min-w-max items-center gap-0 group-hover:[animation-play-state:paused]"
            style={{
              animation: "marquee 50s linear infinite",
            }}
          >
            {repeatedImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx % galleryImages.length)}
                className="relative h-[min(42vh,280px)] w-[min(72vw,240px)] shrink-0 cursor-pointer overflow-hidden bg-cream-deep sm:h-[45vh] sm:w-[280px] md:h-[60vh] md:w-[450px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized={image.src.includes("res.cloudinary.com")}
                  sizes="(max-width: 640px) 75vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-dark/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 hover:opacity-100 sm:p-6">
                  <span className="mb-1 text-[9px] uppercase tracking-[0.2em] text-white/60 sm:text-[10px]">Visual Frame</span>
                  <span className="font-serif text-base italic text-white sm:text-lg">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>

          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
            .animate-marquee {
              will-change: transform;
            }
          `}</style>
        </div>
      </section>

      {/* D. MASTER PLAN / SITE PLAN */}
      <MasterPlanSection
        projectSlug={project.slug}
        projectName={name}
        sitePlanSvg={sitePlanSvg}
      />

      {/* E. FLOOR PLANS */}
      <FloorPlansSection floorPlans={floorPlans} />

      {/* F. AMENITIES SECTION */}
      <AmenitiesSection
        sections={project.amenitySections}
        amenities={project.amenities}
        projectSlug={project.slug}
      />

      {/* G. LOCATION & NEARBY MAP */}
      {project.locationNearbySection && (
        <LocationNearbySection
          {...project.locationNearbySection}
          projectName={name}
          coordinates={coordinates}
        />
      )}

      {/* H. LOCATION ADVANTAGES */}
      <LocationAdvantagesSection
        nearbyPlaces={nearbyPlaces}
        locationPlaceGroups={project.locationPlaceGroups}
        locationSectionLabel={project.locationSectionLabel}
        locationHeadline={project.locationHeadline}
        coordinates={coordinates}
        rera={reraNumber}
        locationBlurb={locationConnectivityBlurb}
      />

      {/* H. WHY CHOOSE THIS PROJECT */}
      <KeyAdvantagesSection
        projectName={name}
        advantages={project.keyAdvantages}
        sectionLabel={project.keyAdvantagesSectionLabel}
        headline={project.keyAdvantagesHeadline}
      />

      {/* M. DEVELOPMENT TIMELINE */}
      {project.developmentTimeline && (
        <DevelopmentTimelineSection timeline={project.developmentTimeline} />
      )}

      {/* J. ENQUIRY SECTION */}
      <section id="enquiry" className="scroll-mt-20 pt-4 pb-8 sm:pt-5 sm:pb-10 md:pt-6 md:pb-14 bg-cream">
        <div className="mx-auto max-w-[1450px] px-4 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            <div className="col-span-12 flex flex-col items-center justify-between gap-5 py-4 text-center sm:py-6 lg:col-span-5 lg:items-stretch lg:gap-4 lg:py-6 lg:text-left">
              <div className="w-full max-w-lg space-y-3 sm:space-y-4 lg:max-w-none">
                <div>
                  <SectionLabel className="justify-center lg:justify-start !mb-4 md:!mb-6">
                    Project Consultation
                  </SectionLabel>
                  <SectionHeadline size="lg" className="font-display font-light">
                    Plan your visit to <em className="font-normal italic">{name}</em>
                  </SectionHeadline>
                </div>
                <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-dark/70 lg:mx-0 lg:max-w-lg">
                  Request the {name} dossier, floor plan set, pricing guidance, and a convenient callback from our project advisor.
                </p>
              </div>

              <div className="grid w-full max-w-md grid-cols-1 gap-2.5 sm:max-w-none sm:grid-cols-3 sm:gap-3 lg:grid-cols-1 lg:max-w-none">
                <div className="border border-dark/10 bg-cream p-3.5 text-center sm:p-4 lg:text-left">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-rust">Site Visit</span>
                  <span className="mt-1.5 block font-display text-lg text-dark sm:mt-2 sm:text-xl">Schedule walkthrough</span>
                </div>
                <div className="border border-dark/10 bg-cream p-3.5 text-center sm:p-4 lg:text-left">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-rust">Documents</span>
                  <span className="mt-1.5 block font-display text-lg text-dark sm:mt-2 sm:text-xl">Plans & dossier</span>
                </div>
                <div className="border border-dark/10 bg-cream p-3.5 text-center sm:p-4 lg:text-left">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-rust">Response</span>
                  <span className="mt-1.5 block font-display text-lg text-dark sm:mt-2 sm:text-xl">Advisor callback</span>
                </div>
              </div>
            </div>

            <div className="col-span-12 w-full lg:col-span-7 lg:h-full">
              <StickyEnquiryForm projectTitle={name} />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />

      {/* LIGHTBOX COMPONENT */}
      {lightboxOpen && (
        <LightboxModal
          images={galleryImages}
          currentIdx={lightboxIdx}
          albumTitle={`${name} Visual Album`}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

function WhatsAppBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const CONSULTATION_CALLBACK_OPTIONS = [
  { value: "Phone", label: "Phone call" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Email", label: "Email" },
] as const;

const CONSULTATION_TIME_OPTIONS = [
  { value: "Morning", label: "Morning (9 AM – 12 PM)" },
  { value: "Afternoon", label: "Afternoon (12 PM – 4 PM)" },
  { value: "Evening", label: "Evening (4 PM – 7 PM)" },
] as const;

function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative min-w-0 w-full max-w-full space-y-1.5">
      <label htmlFor={id} className="block text-[9px] font-semibold uppercase tracking-wider text-dark/60">
        {label}
      </label>
      <button
        type="button"
        id={id}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full max-w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-sm border border-dark/10 bg-cream/60 px-3 text-left text-sm outline-none transition-colors focus:border-rust sm:h-[38px] sm:bg-creamDeep/40 sm:text-xs"
      >
        <span className="min-w-0 truncate">{selected?.label ?? "Select"}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-dark/45 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 max-h-44 overflow-y-auto rounded-sm border border-dark/15 bg-cream py-1 shadow-lg"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-sm transition-colors sm:text-xs ${
                    isSelected ? "bg-rust text-white" : "text-dark hover:bg-dark/5"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

/* ===========================================================================
   1. HERO STICKY ENQUIRY FORM
   =========================================================================== */
function StickyEnquiryForm({ projectTitle }: { projectTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    callbackTime: "Morning",
    callbackMethod: "Phone"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        callbackTime: "Morning",
        callbackMethod: "Phone"
      });
    }, 4000);
  };

  const fieldClass =
    "w-full rounded-sm border border-dark/10 bg-cream/60 px-3 py-2.5 text-base outline-none transition-colors focus:border-rust sm:bg-creamDeep/40 sm:py-2 sm:text-sm";

  return (
    <div className="relative mx-auto h-full w-full max-w-lg overflow-visible rounded-sm border border-dark/15 bg-cream-deep p-4 shadow-xl sm:max-w-none sm:p-6 md:p-8 lg:mx-0">
      <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-10 sm:p-6">
        <CrosshairIcon />
      </div>

      {!submitted ? (
        <form className="flex h-full flex-col justify-between gap-5 sm:gap-6" onSubmit={handleSubmit}>
          <div className="space-y-5 sm:space-y-6">
            <div className="flex w-full flex-col items-center border-b border-dark/10 pb-4 text-center sm:items-start sm:border-0 sm:pb-0 sm:text-left">
              <Annotation className="!text-rust mb-2 w-full text-center font-bold sm:mb-1.5 sm:text-left">
                Request consultation
              </Annotation>
              <span className="font-display block max-w-[16rem] text-lg font-light leading-snug text-dark sm:max-w-none sm:text-xl sm:leading-none">
                Dossier & Callback Booking
              </span>
            </div>

            <div className="min-w-0 space-y-3.5 sm:space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-dark/60">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={fieldClass}
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-dark/60">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={fieldClass}
                    placeholder="+1 (000) 000-0000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-dark/60">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={fieldClass}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                <FormSelect
                  id="callback-method"
                  label="Callback Method *"
                  value={formData.callbackMethod}
                  onChange={(callbackMethod) => setFormData({ ...formData, callbackMethod })}
                  options={CONSULTATION_CALLBACK_OPTIONS}
                />
                <FormSelect
                  id="callback-time"
                  label="Preferred Callback Time *"
                  value={formData.callbackTime}
                  onChange={(callbackTime) => setFormData({ ...formData, callbackTime })}
                  options={CONSULTATION_TIME_OPTIONS}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3.5 pt-1 sm:space-y-4 sm:pt-2">
            <button
              type="submit"
              className="h-12 w-full cursor-pointer bg-dark text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:bg-rust sm:h-[48px] sm:tracking-[0.2em]"
            >
              Book Callback Request
            </button>

            {/* Quick-Contact Direct Buttons */}
            <div className="border-t border-dark/10 pt-3 sm:pt-4">
              <span className="mb-2.5 block text-center text-[8px] font-semibold uppercase tracking-[0.2em] text-dark/50 sm:mb-3">
                Or Connect Instantly
              </span>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                <a
                  href="https://wa.me/14045550123"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="group flex min-h-[48px] flex-col items-center justify-center gap-1.5 rounded-sm border border-dark/15 bg-cream py-2.5 text-dark transition-colors duration-300 hover:border-rust hover:bg-rust/5 hover:text-rust cursor-pointer select-none"
                >
                  <WhatsAppBrandIcon className="h-4 w-4 text-dark/70 transition-colors group-hover:text-rust sm:h-[18px] sm:w-[18px]" />
                  <span className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/shreedevelopers"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="group flex min-h-[48px] flex-col items-center justify-center gap-1.5 rounded-sm border border-dark/15 bg-cream py-2.5 text-dark transition-colors duration-300 hover:border-rust hover:bg-rust/5 hover:text-rust cursor-pointer select-none"
                >
                  <Instagram className="h-4 w-4 text-dark/70 transition-colors group-hover:text-rust sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
                  <span className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">Instagram</span>
                </a>
                <a
                  href="tel:+14045550123"
                  aria-label="Call now"
                  className="group flex min-h-[48px] flex-col items-center justify-center gap-1.5 rounded-sm border border-dark/15 bg-cream py-2.5 text-dark transition-colors duration-300 hover:border-rust hover:bg-rust/5 hover:text-rust cursor-pointer select-none"
                >
                  <Phone className="h-4 w-4 text-dark/70 transition-colors group-hover:text-rust sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
                  <span className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-4 px-2 py-10 text-center sm:py-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-rust/20 bg-rust/10 text-rust sm:h-16 sm:w-16">
            <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9" />
          </div>
          <h3 className="font-display text-xl font-light text-dark sm:text-2xl">Thank You</h3>
          <p className="mx-auto max-w-xs text-sm font-light leading-relaxed text-dark/70">
            Your preferred callback request for {projectTitle} has been submitted. A real estate advisor will contact you during your selected time window.
          </p>
        </div>
      )}
    </div>
  );
}

function getPlanShortName(name: string) {
  const base = name.replace(/\s*\([^)]*\)\s*$/, "").trim();
  return base
    .replace(/^The\s+/i, "")
    .replace(/\s+Townhome$/i, "")
    .replace(/\s+Villa$/i, "")
    .replace(/\s+Estate$/i, "");
}

function formatPlanPriceShort(price: string) {
  const value = parseInt(price.replace(/\D/g, ""), 10);
  if (!value) return price;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`;
  return price;
}

function formatPlanAvailabilityShort(status: string) {
  switch (status) {
    case "Available":
      return "Avail.";
    case "Coming Soon":
      return "Soon";
    case "Sold Out":
      return "Sold";
    case "Booking Open":
      return "Open";
    default:
      return status;
  }
}

/* ===========================================================================
   F. AMENITIES
   =========================================================================== */
function AmenitiesSection({
  sections,
  amenities,
  projectSlug,
}: {
  sections?: NonNullable<ProjectData["amenitySections"]>;
  amenities: ProjectData["amenities"];
  projectSlug?: string;
}) {
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);
  const [mobileAmenitiesExpanded, setMobileAmenitiesExpanded] = useState(false);
  const groupedSections = sections?.filter((s) => s.items.length > 0) ?? [];
  const hasGrouped = groupedSections.length > 0;
  const flatAmenities = amenities.filter(Boolean);

  if (!hasGrouped && flatAmenities.length === 0) return null;

  if (hasGrouped) {
    return (
      <SectionWrapper dark={true} className="!py-12 md:!py-16">
        <div
          data-reveal
          className="mb-8 flex flex-col items-center text-center md:mb-10 md:items-start md:text-left"
        >
          <SectionLabel light className="justify-center md:justify-start">
            Amenities
          </SectionLabel>
          <SectionHeadline size="lg" light className="!text-cream">
            Community <em className="italic">amenities</em>
          </SectionHeadline>
        </div>

        {(() => {
          const columnCount = groupedSections.length;
          const gridColsClass =
            amenityDesktopGridColsClass[columnCount] ?? "grid-cols-5";
          const minTableWidth = `${columnCount * 11.2}rem`;
          const rowCount = Math.max(
            0,
            ...groupedSections.map((section) => section.items.length),
          );
          const fillEmptyDesktopCells =
            projectSlug === "hanover-park-at-stockbridge";

          const renderAmenityRow = (amenity: string, compact?: boolean) => {
            const AmenityIcon = getAmenityIcon(amenity);

            return (
              <div
                className={`flex items-center gap-2.5 bg-dark px-3 ${
                  compact ? "min-h-[3.5rem] py-2.5" : "min-h-[4.25rem] py-3 sm:min-h-[4.75rem]"
                }`}
              >
                <div
                  className={`flex shrink-0 items-center justify-center border border-cream/25 text-rust ${
                    compact ? "h-7 w-7" : "h-8 w-8"
                  }`}
                >
                  <AmenityIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
                <p className="amenities-table__text m-0 min-w-0 flex-1 text-xs font-semibold leading-snug sm:text-sm">
                  {amenity}
                </p>
              </div>
            );
          };

          const renderMobileCategory = (
            section: (typeof groupedSections)[number],
            compact?: boolean,
          ) => {
            const SectionIcon = getAmenitySectionIcon(section.title);

            return (
              <div
                key={`mobile-${section.title}`}
                className="shrink-0 overflow-hidden border border-cream/10"
              >
                <div
                  className={`flex items-center justify-center gap-2 bg-dark-mid px-3 text-center lg:justify-start lg:text-left ${
                    compact ? "h-11 py-2" : "h-12 py-2.5"
                  }`}
                >
                  <SectionIcon
                    className="h-4 w-4 shrink-0 text-rust"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="amenities-table__label min-w-0 font-bold uppercase leading-tight tracking-[0.14em]">
                    {section.title}
                  </span>
                </div>
                <div className="divide-y divide-cream/10 bg-cream/10">
                  {section.items.map((amenity) => (
                    <div key={amenity}>{renderAmenityRow(amenity, compact)}</div>
                  ))}
                </div>
              </div>
            );
          };

          return (
            <>
              {/* Mobile: compact preview + swipe / read more */}
              <div
                className="amenities-table amenities-table--mobile w-full lg:hidden"
                role="region"
                aria-label="Community amenities"
              >
                {!mobileAmenitiesExpanded ? (
                  <>
                    <MobileHorizontalCarousel variant="dark">
                      {groupedSections.map((section) =>
                        renderMobileCategory(section, true),
                      )}
                    </MobileHorizontalCarousel>
                    <button
                      type="button"
                      onClick={() => setMobileAmenitiesExpanded(true)}
                      className="mt-4 w-full cursor-pointer rounded-sm border border-cream/15 bg-dark-mid/40 py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:border-rust hover:text-rust"
                    >
                      View all amenities
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mx-auto max-h-[min(65vh,28rem)] w-full space-y-3 overflow-y-auto overscroll-y-contain pr-0.5 [-webkit-overflow-scrolling:touch]">
                      {groupedSections.map((section) => renderMobileCategory(section, true))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileAmenitiesExpanded(false)}
                      className="mt-4 w-full cursor-pointer rounded-sm border border-cream/15 bg-dark-mid/40 py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:border-rust hover:text-rust"
                    >
                      Show less
                    </button>
                  </>
                )}
              </div>

              {/* Desktop: column count matches section count */}
              <div
                className="amenities-table amenities-table--desktop hidden overflow-x-auto border border-cream/10 lg:block"
                role="region"
                aria-label="Community amenities table"
              >
                <div
                  className={`grid ${gridColsClass} gap-px bg-cream/10 text-cream`}
                  style={{ minWidth: minTableWidth }}
                  role="table"
                >
                  {groupedSections.map((section) => {
                    const SectionIcon = getAmenitySectionIcon(section.title);

                    return (
                      <div
                        key={`head-${section.title}`}
                        role="columnheader"
                        className="flex h-14 items-center gap-2 bg-dark-mid px-3 py-2.5"
                      >
                        <SectionIcon
                          className="h-4 w-4 shrink-0 text-rust"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="amenities-table__label min-w-0 font-bold uppercase leading-tight tracking-[0.14em]">
                          {section.title}
                        </span>
                      </div>
                    );
                  })}

                  {Array.from({ length: rowCount }, (_, rowIdx) =>
                    groupedSections.map((section) => {
                      const amenity = section.items[rowIdx];
                      const AmenityIcon = amenity ? getAmenityIcon(amenity) : null;

                      return (
                        <div
                          key={`${section.title}-row-${rowIdx}`}
                          role="cell"
                          className={
                            amenity
                              ? "flex min-h-[4.75rem] items-center gap-2.5 bg-dark px-3 py-3 transition-colors duration-300 hover:bg-dark-mid"
                              : fillEmptyDesktopCells
                                ? "min-h-[4.75rem] bg-dark"
                                : "min-h-0 bg-transparent"
                          }
                          aria-hidden={!amenity}
                        >
                          {amenity && AmenityIcon ? (
                            <>
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-cream/25 text-rust">
                                <AmenityIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                              </div>
                              <p className="amenities-table__text m-0 min-w-0 flex-1 text-xs font-semibold leading-snug sm:text-sm">
                                {amenity}
                              </p>
                            </>
                          ) : null}
                        </div>
                      );
                    }),
                  )}
                </div>
              </div>
            </>
          );
        })()}
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper dark={true} className="!py-16 md:!py-24">
      <div data-reveal className="mb-10 text-center md:text-left">
        <SectionLabel light>Infrastructure</SectionLabel>
        <SectionHeadline size="lg" light className="!text-[#F5F0E8] font-display">
          Curated <em className="italic">amenities</em>
        </SectionHeadline>
      </div>

      <div
        data-reveal
        className={`grid gap-px border border-[#F5F0E8]/10 bg-[#F5F0E8]/10 ${getFlatAmenityGridColsClass(flatAmenities.length)}`}
      >
        {flatAmenities.map((amenity, i) => {
          const AmenityIcon = getAmenityIcon(amenity);

          return (
            <div
              key={amenity}
              className={`gap-4 bg-dark p-6 transition-colors duration-500 hover:bg-[#2A2118] sm:p-8 ${
                i >= 4
                  ? amenitiesExpanded
                    ? "flex items-center"
                    : "hidden md:flex md:items-center"
                  : "flex items-center"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#F5F0E8]/20 text-[#F5F0E8]/55 transition-colors group-hover:border-rust group-hover:text-rust">
                <AmenityIcon className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <Annotation light className="!text-[#F5F0E8]/80 font-bold tracking-widest">
                {amenity.toUpperCase()}
              </Annotation>
            </div>
          );
        })}
      </div>

      {flatAmenities.length > 4 && (
        <button
          type="button"
          onClick={() => setAmenitiesExpanded(!amenitiesExpanded)}
          className="mt-6 w-full cursor-pointer rounded-sm border border-[#F5F0E8]/15 bg-[#2A2118]/20 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#F5F0E8] transition-all duration-300 hover:border-rust hover:bg-[#2A2118] hover:text-rust md:hidden"
        >
          {amenitiesExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </SectionWrapper>
  );
}

/* ===========================================================================
   E. FLOOR PLANS (preview + unit cards)
   =========================================================================== */
function getPlanViews(plan: NonNullable<ProjectData["floorPlansDetails"]>[number]) {
  if (plan.views?.length) return plan.views;
  return [{ label: "Floor Plan", image: plan.image }];
}

function FloorPlanLightbox({
  planName,
  seriesLetter,
  views,
  initialIdx,
  onClose,
}: {
  planName: string;
  seriesLetter?: string;
  views: { label: string; image: string }[];
  initialIdx: number;
  onClose: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(initialIdx);
  const view = views[activeIdx] ?? views[0];

  const goPrev = () => setActiveIdx((i) => (i - 1 + views.length) % views.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % views.length);

  useEffect(() => {
    setActiveIdx(initialIdx);
  }, [initialIdx]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setActiveIdx((i) => (i - 1 + views.length) % views.length);
      if (e.key === "ArrowRight") setActiveIdx((i) => (i + 1) % views.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, views.length]);

  if (!view) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-dark/97 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${planName} floor plan fullscreen`}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-cream/10 pb-3 sm:pb-4">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-rust sm:text-[10px]">
            {view.label}
          </p>
          <p className="truncate font-display text-sm text-cream sm:text-base">
            {planName}
            {seriesLetter ? <span className="text-cream/55"> · Series {seriesLetter}</span> : null}
          </p>
          {views.length > 1 ? (
            <p className="mt-0.5 text-[10px] text-cream/45">
              Sheet {activeIdx + 1} of {views.length}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition-colors hover:bg-rust/30 cursor-pointer"
          aria-label="Close fullscreen"
        >
          ✕
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-3 sm:py-4">
        {views.length > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-dark/80 text-cream transition-colors hover:border-rust hover:bg-rust/20 cursor-pointer sm:h-12 sm:w-12"
            aria-label="Previous sheet"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        ) : null}

        <div className="relative h-full w-full max-h-[calc(100dvh-8rem)] px-10 sm:max-h-[calc(100dvh-9rem)] sm:px-14">
          <Image
            key={view.image}
            src={view.image}
            alt={`${planName} — ${view.label}`}
            fill
            className="object-contain object-center"
            sizes="100vw"
            priority
          />
        </div>

        {views.length > 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-dark/80 text-cream transition-colors hover:border-rust hover:bg-rust/20 cursor-pointer sm:h-12 sm:w-12"
            aria-label="Next sheet"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        ) : null}
      </div>

      {views.length > 1 ? (
        <div className="flex shrink-0 gap-1 overflow-x-auto pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {views.map((v, index) => (
            <button
              key={`${v.label}-${v.image}`}
              type="button"
              onClick={() => setActiveIdx(index)}
              className={`shrink-0 whitespace-nowrap px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors sm:text-[10px] ${
                index === activeIdx ? "bg-cream text-dark" : "bg-cream/10 text-cream/70 hover:bg-cream/20"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FloorPlansSection({
  floorPlans,
}: {
  floorPlans: NonNullable<ProjectData["floorPlansDetails"]>;
}) {
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!floorPlans.length) return null;

  const plan = floorPlans[activePlanIdx] ?? floorPlans[0];
  const views = getPlanViews(plan);
  const activeView = views[activeViewIdx] ?? views[0];

  const selectPlan = (index: number) => {
    setActivePlanIdx(index);
    setActiveViewIdx(0);
  };

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#EDE8DF] border-y border-dark/10">
      <div className="mb-6 sm:mb-8 flex flex-col items-center gap-4 sm:gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="w-full max-w-xl md:max-w-none">
          <SectionLabel className="justify-center md:justify-start !mb-4 md:!mb-8">
            Floor Plans
          </SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Unit types & <em className="font-normal italic">dimensions</em>
          </SectionHeadline>
        </div>

        <Link
          href="/#request-info"
          className="inline-flex h-12 w-full max-w-sm items-center justify-center gap-3 bg-rust px-6 text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] !text-white no-underline transition-colors hover:bg-dark md:w-auto md:max-w-none shrink-0"
        >
          Request Plan Set
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {floorPlans.map((item, index) => {
            const isActive = index === activePlanIdx;
            const letter = item.seriesLetter ?? getPlanShortName(item.name).charAt(0);
            return (
              <button
                key={item.name}
                type="button"
                title={item.name}
                onClick={() => selectPlan(index)}
                className={`group relative flex min-w-0 flex-col items-start border bg-cream px-2.5 py-3 text-left transition-all cursor-pointer sm:px-4 sm:py-4 ${
                  isActive
                    ? "border-rust bg-cream border-l-[3px] border-l-rust"
                    : "border-dark/10 hover:border-dark/25 hover:bg-[#F8F4EC]"
                }`}
              >
                <span
                  className={`mb-2 flex h-8 w-8 items-center justify-center font-display text-sm transition-colors sm:h-9 sm:w-9 sm:text-base ${
                    isActive ? "bg-rust text-cream" : "bg-dark/8 text-dark/70 group-hover:bg-dark/12"
                  }`}
                >
                  {letter}
                </span>
                <h3 className="font-display text-sm font-light text-dark sm:text-base md:text-lg">{item.name}</h3>
                <p className="mt-1 hidden text-[11px] font-light leading-snug text-dark/55 sm:block md:text-xs">
                  {item.bedrooms} bed · {item.bathrooms} bath · {item.area.toLocaleString()} sq.ft.
                </p>
                <span className="mt-2 text-[8px] font-bold uppercase tracking-widest text-dark/40 sm:mt-3">
                  {getPlanViews(item).length > 1
                    ? `${getPlanViews(item).length} sheets`
                    : "Plan set"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="border border-dark/10 bg-cream">
          <div className="flex flex-nowrap gap-1 overflow-x-auto border-b border-dark/10 p-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:gap-1.5 sm:overflow-visible sm:p-3 [&::-webkit-scrollbar]:hidden">
            {views.map((view, index) => {
              const isViewActive = index === activeViewIdx;
              return (
                <button
                  key={`${view.label}-${view.image}`}
                  type="button"
                  onClick={() => setActiveViewIdx(index)}
                  className={`shrink-0 whitespace-nowrap px-2 py-2 text-[8px] font-bold uppercase tracking-[0.12em] transition-colors sm:px-3 sm:text-[10px] sm:tracking-[0.18em] ${
                    isViewActive
                      ? "bg-dark text-cream"
                      : "bg-transparent text-dark/55 hover:bg-dark/5 hover:text-dark"
                  }`}
                >
                  {view.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative block aspect-[4/3] w-full cursor-zoom-in bg-[#F5F0E8] text-left sm:aspect-[3/2] md:min-h-[520px] md:aspect-auto lg:min-h-[640px]"
            aria-label={`Open ${activeView.label} fullscreen`}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.25]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(26,22,18,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,22,18,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <Image
              key={activeView.image}
              src={activeView.image}
              alt={`${plan.name} — ${activeView.label}`}
              fill
              className="object-contain object-center p-1 transition-opacity group-hover:opacity-95 sm:p-1.5"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={activePlanIdx === 0 && activeViewIdx === 0}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-dark/45 to-transparent px-3 py-2.5 sm:px-4 sm:py-3">
              <div>
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-cream/70 sm:text-[8px]">
                  {activeView.label}
                </span>
                <h3 className="font-display text-base font-light text-cream sm:text-lg md:text-xl">
                  {plan.name}
                  {plan.seriesLetter ? (
                    <span className="ml-2 text-cream/60">Series {plan.seriesLetter}</span>
                  ) : null}
                </h3>
              </div>
              <span className="shrink-0 border border-cream/25 bg-cream/10 px-2 py-1 text-[7px] font-bold uppercase tracking-widest text-cream sm:text-[8px]">
                {plan.availability}
              </span>
            </div>
            <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-sm border border-dark/15 bg-cream/90 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-dark/70 sm:bottom-4 sm:right-4 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" />
              Full screen
            </span>
          </button>
        </div>
      </div>

      {lightboxOpen ? (
        <FloorPlanLightbox
          planName={plan.name}
          seriesLetter={plan.seriesLetter}
          views={views}
          initialIdx={activeViewIdx}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </SectionWrapper>
  );
}

/* ===========================================================================
   4. FEATURED MODEL / FLOOR PLAN CAROUSEL
   =========================================================================== */
function FloorPlansCarousel({ floorPlans }: { floorPlans: NonNullable<ProjectData["floorPlansDetails"]> }) {
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const plan = floorPlans[activePlanIdx || 0];

  // Pricing calculator values
  const [loanTerm, setLoanTerm] = useState(30); // years
  const [downPaymentPct, setDownPaymentPct] = useState(20); // percent

  const estimatedEMI = useMemo(() => {
    if (!plan) return "$0";
    const numericPrice = parseInt(plan.price.replace(/[^0-9]/g, ""), 10);
    const principal = numericPrice * (1 - downPaymentPct / 100);
    const annualRate = 6.5; // fixed interest rate
    const monthlyRate = (annualRate / 100) / 12;
    const totalPayments = loanTerm * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return `$${Math.round(emi).toLocaleString()}/mo`;
  }, [plan, loanTerm, downPaymentPct]);

  if (!plan) return null;

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#EDE8DF] border-y border-dark/10">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <SectionLabel
          >Architectural Render</SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Featured model & <em className="font-normal italic">blueprints</em>
          </SectionHeadline>
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-2 bg-dark/5 p-1 rounded-sm border border-dark/5 self-stretch md:self-auto overflow-x-auto">
          {floorPlans.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePlanIdx(idx)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${activePlanIdx === idx ? "bg-dark text-cream" : "text-dark/65 hover:text-dark hover:bg-dark/5"
                }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start mt-8">

        {/* Left Side: Large interactive blueprint */}
        <div className="col-span-12 lg:col-span-7 bg-cream/70 border border-dark/10 flex flex-col items-center justify-between relative min-h-[400px] overflow-hidden rounded-sm">

          <div className="relative w-full h-[320px] md:h-[420px]">
            <Image
              src={plan.image}
              alt={plan.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center text-center border-t border-dark/10 py-5 px-6 w-full bg-cream/50">
            <div>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-dark/55 block">Bedrooms</span>
              <span className="font-display text-lg text-dark">{plan.bedrooms} Beds</span>
            </div>
            <div className="w-px h-8 bg-dark/10" />
            <div>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-dark/55 block">Bathrooms</span>
              <span className="font-display text-lg text-dark">{plan.bathrooms} Baths</span>
            </div>
            <div className="w-px h-8 bg-dark/10" />
            <div>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-dark/55 block">Car Parking</span>
              <span className="font-display text-lg text-dark">{plan.parking} Spaces</span>
            </div>
            <div className="w-px h-8 bg-dark/10" />
            <div>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-dark/55 block">Floor Area</span>
              <span className="font-display text-lg text-dark">{plan.area.toLocaleString()} sq.ft.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details panel and custom pricing calculator */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-cream border border-dark/10 p-6 md:p-8 space-y-6 shadow-md relative">
            <span className="absolute top-3 right-3 text-[10px] font-bold text-rust bg-rust/5 px-2.5 py-0.5 rounded-full border border-rust/10 uppercase">
              {plan.availability}
            </span>

            <div>
              <Annotation className="!text-rust mb-1">{plan.name}</Annotation>
              <h3 className="font-display font-light text-2xl md:text-3xl text-dark leading-tight">{plan.price}</h3>
              <span className="text-xs text-dark/60 font-light block mt-1">Estimated EMI Starts from {plan.emi}</span>
            </div>

            <div className="border-t border-dark/15 pt-6 space-y-4">
              <Annotation className="!text-dark/60 mb-2">MORTGAGE ESTIMATOR</Annotation>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-dark font-medium">
                  <span>Down Payment: {downPaymentPct}%</span>
                  <span className="text-dark/60">${(parseInt(plan.price.replace(/[^0-9]/g, ""), 10) * downPaymentPct / 100).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-rust h-1 bg-dark/15 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-dark font-medium">
                  <span>Loan Term: {loanTerm} Years</span>
                  <span className="text-dark/60">Fixed 6.5% Interest</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="30"
                  step="5"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full accent-rust h-1 bg-dark/15 rounded-lg cursor-pointer"
                />
              </div>

              <div className="bg-dark p-4 flex justify-between items-center text-cream mt-2 rounded-sm">
                <div className="space-y-0.5">
                  <span className="text-[8px] uppercase tracking-widest text-cream/50 font-bold block">Estimated Monthly EMI</span>
                  <span className="text-xs text-rust font-bold">Principal + Interest</span>
                </div>
                <span className="font-display font-light text-2xl text-cream">{estimatedEMI}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => alert(`Launching Virtual Walkthrough tour for ${plan.name}...`)}
                className="w-full sm:flex-1 h-[48px] bg-dark text-white uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-rust transition-colors duration-500 cursor-pointer"
              >
                Virtual 3D Tour
              </button>
              <a
                href="#enquiry"
                className="w-full sm:flex-1 h-[48px] border border-dark/20 !text-dark uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-dark/5 transition-colors duration-300 flex items-center justify-center"
              >
                View Floor Plans
              </a>
            </div>

          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   D. MASTER PLAN / SITE PLAN (static preview → interactive map)
   =========================================================================== */
function MasterPlanSection({
  projectSlug,
  projectName,
  sitePlanSvg,
}: {
  projectSlug: string;
  projectName: string;
  sitePlanSvg: string;
}) {
  const interactiveMapHref = `/InteractiveSiteMap?project=${projectSlug}`;

  return (
    <SectionWrapper dark={false} className="!pt-6 !pb-10 md:!pt-8 md:!pb-14 bg-[#F5F0E8]">
      <div className="mb-8 flex flex-col items-center gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="w-full max-w-xl md:max-w-none">
          <SectionLabel className="justify-center md:justify-start !mb-4 md:!mb-8">
            Master Plan / Site Plan
          </SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Home layouts & <em className="font-normal italic">site planning</em>
          </SectionHeadline>
        </div>

        <Link
          href={interactiveMapHref}
          className="inline-flex h-12 w-full max-w-sm items-center justify-center gap-3 bg-rust px-6 text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] !text-white no-underline transition-colors hover:bg-dark md:w-auto md:max-w-none shrink-0"
        >
          Explore Interactive Map
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        <div className="border border-dark/10 bg-cream p-2 md:p-3">
          <Link
            href={interactiveMapHref}
            className="group relative block aspect-[16/10] max-h-[520px] w-full overflow-hidden bg-[#EDE8DF] no-underline md:max-h-[600px]"
            aria-label={`Open ${projectName} interactive site map`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sitePlanSvg}
              alt={`${projectName} master site plan`}
              className="h-full w-full object-contain object-center select-none pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 flex items-end justify-center bg-dark/0 p-4 transition-colors group-hover:bg-dark/10 md:p-6">
              <span className="inline-flex items-center gap-2 bg-dark px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-cream opacity-0 transition-opacity group-hover:opacity-100 md:text-[10px]">
                View homes & highlights
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   7. AVAILABLE UNITS SECTION (Filter & Sort Options)
   =========================================================================== */
function formatBedrooms(count: number) {
  return `${count} ${count === 1 ? "Bedroom" : "Bedrooms"}`;
}

function AvailableUnitsSection({ units }: { units: ProjectData["unitsList"] }) {
  const [bedroomFilter, setBedroomFilter] = useState<number | "all">("all");
  const [priceFilter, setPriceFilter] = useState<number | "all">("all"); // Limit filter
  const [sortByArea, setSortByArea] = useState<"asc" | "desc" | "none">("none");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtering + sorting logic
  const filteredUnits = useMemo(() => {
    let result = [...(units || [])];

    // Filter by bedroom count
    if (bedroomFilter !== "all") {
      result = result.filter((u) => u.bhk === bedroomFilter);
    }

    // Filter by Price Limit
    if (priceFilter !== "all") {
      result = result.filter((u) => {
        const numPrice = parseInt(u.price.replace(/[^0-9]/g, ""), 10);
        return numPrice <= priceFilter;
      });
    }

    // Sort by Area
    if (sortByArea === "asc") {
      result.sort((a, b) => a.area - b.area);
    } else if (sortByArea === "desc") {
      result.sort((a, b) => b.area - a.area);
    }

    return result;
  }, [units, bedroomFilter, priceFilter, sortByArea]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredUnits.length]);

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#EDE8DF]">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <SectionLabel>Acquisition</SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Available <em className="font-normal italic">homes</em>
          </SectionHeadline>
        </div>

        {/* Filter Controls Panel */}
        <div className="grid grid-cols-3 gap-1.5 w-full md:flex md:flex-row md:flex-nowrap md:gap-3 md:items-end md:w-auto">
          {/* Bedroom Filter */}
          <div className="flex flex-col w-full md:w-[130px]">
            <span className="text-[8px] uppercase tracking-wider font-semibold text-dark/50 mb-1.5">Bedrooms</span>
            <select
              value={bedroomFilter}
              onChange={(e) => setBedroomFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="bg-cream border border-dark/10 px-1.5 sm:px-3 py-1.5 text-[10px] sm:text-xs text-dark outline-none cursor-pointer rounded-sm w-full truncate"
            >
              <option value="all">All Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5 Bedrooms</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="flex flex-col w-full md:w-[140px]">
            <span className="text-[8px] uppercase tracking-wider font-semibold text-dark/50 mb-1.5">Max Price</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="bg-cream border border-dark/10 px-1.5 sm:px-3 py-1.5 text-[10px] sm:text-xs text-dark outline-none cursor-pointer rounded-sm w-full truncate"
            >
              <option value="all">Any Price</option>
              <option value="420000">Under $420k</option>
              <option value="500000">Under $500k</option>
              <option value="600000">Under $600k</option>
            </select>
          </div>

          {/* Sort Area */}
          <div className="flex flex-col w-full md:w-[150px]">
            <span className="text-[8px] uppercase tracking-wider font-semibold text-dark/50 mb-1.5">Sort Area</span>
            <select
              value={sortByArea}
              onChange={(e) => setSortByArea(e.target.value as any)}
              className="bg-cream border border-dark/10 px-1.5 sm:px-3 py-1.5 text-[10px] sm:text-xs text-dark outline-none cursor-pointer rounded-sm w-full truncate"
            >
              <option value="none">Default</option>
              <option value="asc">Small ➔ Large</option>
              <option value="desc">Large ➔ Small</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Grid Version */}
      <div className="hidden md:block">
        {filteredUnits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredUnits.map((u) => (
              <div
                key={u.id}
                className="bg-cream border border-dark/15 overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] bg-dark/5 border-b border-dark/10 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <span className={`absolute top-3 left-3 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest text-cream bg-dark/80 border border-cream/10`}>
                    {u.availability}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[9px] font-bold text-cream bg-rust px-2.5 py-1 uppercase tracking-widest">
                    {u.id}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest font-semibold text-rust">{u.facing}</span>
                    <h4 className="font-display text-lg font-medium text-dark leading-tight">{u.name}</h4>
                    <div className="flex gap-4 pt-2 text-xs text-dark/70">
                      <span className="font-semibold">{formatBedrooms(u.bhk)}</span>
                      <span className="w-px h-3 bg-dark/15 align-middle" />
                      <span>{u.area.toLocaleString()} sq.ft.</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dark/10 flex items-center justify-between gap-2">
                    <span className="font-display font-light text-md text-dark">{u.price}</span>
                    <a
                      href="#enquiry"
                      className="bg-dark hover:bg-rust !text-cream uppercase font-bold text-[8px] tracking-wider px-3.5 py-2 transition-colors rounded-sm"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-dark/15 bg-cream/30 space-y-2">
            <Annotation className="!text-dark/40">NO AVAILABLE HOMES MATCH FILTERS</Annotation>
            <button
              onClick={() => { setBedroomFilter("all"); setPriceFilter("all"); setSortByArea("none"); }}
              className="text-xs text-rust font-bold uppercase tracking-widest hover:underline cursor-pointer"
            >
              Clear Active Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Slider Version */}
      <div className="md:hidden">
        {filteredUnits.length > 0 ? (
          <div className="relative overflow-visible">
            <div className="overflow-hidden -mx-4 px-4">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                  if (swipe) {
                    if (offset.x > 0) {
                      setCurrentIndex((prev) => (prev - 1 + filteredUnits.length) % filteredUnits.length);
                    } else {
                      setCurrentIndex((prev) => (prev + 1) % filteredUnits.length);
                    }
                  }
                }}
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="flex"
              >
                {filteredUnits.map((u) => (
                  <div key={u.id} className="min-w-full pr-6 flex flex-col">
                    <div className="bg-cream border border-dark/15 overflow-hidden flex flex-col shadow-sm group rounded-sm">
                      <div className="relative aspect-[4/3] bg-dark/5 border-b border-dark/10 overflow-hidden">
                        <Image
                          src={u.image}
                          alt={u.name}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                        <span className="absolute top-3 left-3 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest text-cream bg-dark/80 border border-cream/10">
                          {u.availability}
                        </span>
                        <span className="absolute bottom-3 right-3 text-[9px] font-bold text-cream bg-rust px-2.5 py-1 uppercase tracking-widest">
                          {u.id}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-widest font-semibold text-rust">{u.facing}</span>
                          <h4 className="font-display text-lg font-medium text-dark leading-tight">{u.name}</h4>
                          <div className="flex gap-4 pt-2 text-xs text-dark/70">
                            <span className="font-semibold">{formatBedrooms(u.bhk)}</span>
                            <span className="w-px h-3 bg-dark/15 align-middle" />
                            <span>{u.area.toLocaleString()} sq.ft.</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-dark/10 flex items-center justify-between gap-2">
                          <span className="font-display font-light text-md text-dark">{u.price}</span>
                          <a
                            href="#enquiry"
                            className="bg-dark hover:bg-rust !text-cream uppercase font-bold text-[8px] tracking-wider px-3.5 py-2 transition-colors rounded-sm"
                          >
                            Enquire
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dot Indicators */}
            {filteredUnits.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6">
                {filteredUnits.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1 transition-all duration-500 rounded-full ${
                      currentIndex === idx ? "w-10 bg-dark" : "w-3 bg-dark/10"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-dark/15 bg-cream/30 space-y-2">
            <Annotation className="!text-dark/40">NO AVAILABLE HOMES MATCH FILTERS</Annotation>
            <button
              onClick={() => { setBedroomFilter("all"); setPriceFilter("all"); setSortByArea("none"); }}
              className="text-xs text-rust font-bold uppercase tracking-widest hover:underline cursor-pointer"
            >
              Clear Active Filters
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   KEY ADVANTAGES (Why choose this project)
   =========================================================================== */
const KEY_ADVANTAGE_ICONS: LucideIcon[] = [
  Layers,
  MapPin,
  Users,
  ShoppingCart,
  Building2,
  DollarSign,
  Compass,
  ShieldCheck,
];

const KEY_ADVANTAGES_MOBILE_INITIAL = 2;

function KeyAdvantagesSection({
  projectName,
  advantages,
  sectionLabel,
  headline,
}: {
  projectName: string;
  advantages?: NonNullable<ProjectData["keyAdvantages"]>;
  sectionLabel?: string;
  headline?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!advantages?.length) return null;

  const items = advantages.map((item, idx) => ({
    ...item,
    icon: KEY_ADVANTAGE_ICONS[idx % KEY_ADVANTAGE_ICONS.length],
  }));
  const hasMore = items.length > KEY_ADVANTAGES_MOBILE_INITIAL;
  const lgCols = items.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <SectionWrapper dark={false} className="!pt-6 !pb-6 md:!pt-8 md:!pb-8 lg:!pt-10 lg:!pb-10 bg-[#F5F0E8]">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-6 flex flex-col items-center text-center md:mb-8 md:items-start md:text-left">
          <SectionLabel className="justify-center md:justify-start !mb-3 md:!mb-5">
            {sectionLabel ?? "Key Advantages"}
          </SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light max-w-xl md:max-w-none">
            {headline ?? (
              <>
                Why choose <em className="font-normal italic">{projectName}</em>
              </>
            )}
          </SectionHeadline>
        </div>

        <div
          className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-px ${lgCols} sm:border sm:border-dark/10 sm:bg-dark/10`}
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            const hiddenOnMobile = idx >= KEY_ADVANTAGES_MOBILE_INITIAL && !expanded;

            return (
              <div
                key={item.title}
                className={`flex min-h-0 flex-col justify-between border border-dark/10 bg-cream/55 p-5 transition-colors hover:bg-cream sm:min-h-[230px] sm:border-0 sm:p-6 md:p-7 ${
                  hiddenOnMobile ? "hidden sm:flex" : "flex"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-rust">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-rust/20 text-rust">
                    <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="mt-4 space-y-2 sm:mt-0 sm:space-y-3">
                  <h3 className="font-display text-lg font-light text-dark sm:text-xl">{item.title}</h3>
                  <p className="text-sm text-dark/65 font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="md:hidden mt-2 w-full max-w-sm mx-auto py-3 border border-dark/15 text-dark hover:border-rust hover:text-rust transition-all duration-300 font-bold uppercase tracking-wider text-[10px] rounded-sm cursor-pointer text-center bg-cream hover:bg-cream-deep"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   8. LOCATION ADVANTAGES & MAP (Styled SVG Map Component)
   =========================================================================== */
function LocationAdvantagesSection({
  nearbyPlaces,
  locationPlaceGroups,
  locationSectionLabel,
  locationHeadline,
  coordinates: _coordinates,
  rera: _rera,
  locationBlurb,
}: {
  nearbyPlaces: ProjectData["nearbyPlaces"];
  locationPlaceGroups?: NonNullable<ProjectData["locationPlaceGroups"]>;
  locationSectionLabel?: string;
  locationHeadline?: string;
  coordinates: ProjectData["coordinates"];
  rera: string;
  locationBlurb: string;
}) {
  const [nearbyExpanded, setNearbyExpanded] = useState(false);
  const [mobileLocationExpanded, setMobileLocationExpanded] = useState(false);
  const allNearbyPlaces = nearbyPlaces || [];
  const groupedPlaces = locationPlaceGroups?.filter((g) => g.places.length > 0) ?? [];
  const hasGrouped = groupedPlaces.length > 0;
  const hasFlat = allNearbyPlaces.length > 0;
  const hasBlurb = Boolean(locationBlurb?.trim());

  if (!hasGrouped && !hasFlat && !hasBlurb) return null;

  const sectionLabel = locationSectionLabel ?? "Connectivity";
  const headlineContent = locationHeadline ?? (
    <>
      Location advantages & <em className="font-normal italic">transit</em>
    </>
  );

  if (hasGrouped) {
    const rowCount = Math.max(0, ...groupedPlaces.map((group) => group.places.length));
    const columnCount = groupedPlaces.length;

    const renderLocationRow = (
      place: { name: string; distance?: string },
      compact?: boolean,
    ) => (
      <div
        className={`flex items-center gap-2.5 border-t border-dark/10 bg-cream/55 px-3 text-dark transition-colors first:border-t-0 hover:bg-rust/5 ${
          compact ? "min-h-[3.5rem] py-2.5" : "min-h-[4.25rem] py-3 sm:min-h-[4.75rem]"
        }`}
      >
        <div
          className={`flex shrink-0 items-center justify-center border border-dark/15 text-rust ${
            compact ? "h-7 w-7" : "h-8 w-8"
          }`}
        >
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-xs font-semibold leading-snug sm:text-sm">{place.name}</p>
          {place.distance && (
            <span className="mt-0.5 block font-sans text-[10px] font-bold uppercase tracking-wide text-rust">
              {place.distance}
            </span>
          )}
        </div>
      </div>
    );

    const renderMobileGroup = (
      group: (typeof groupedPlaces)[number],
      compact?: boolean,
    ) => {
      const GroupIcon = getLocationGroupIcon(group.title);

      return (
        <div
          key={`mobile-loc-${group.title}`}
          className="shrink-0 overflow-hidden border border-dark/10 bg-cream"
        >
          <div
            className={`flex items-center justify-center gap-2 border-b border-dark/10 bg-cream-deep px-3 text-center text-dark lg:justify-start lg:text-left ${
              compact ? "h-11 py-2" : "h-12 py-2.5"
            }`}
          >
            <GroupIcon className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.75} aria-hidden />
            <span className="min-w-0 font-sans text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-dark/70">
              {group.title}
            </span>
          </div>
          <div>
            {group.places.map((place) => (
              <div key={place.name}>{renderLocationRow(place, compact)}</div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <SectionWrapper dark={false} className="!pt-12 !pb-5 md:!pt-16 md:!pb-6 bg-[#F5F0E8]">
        <div
          data-reveal
          className="mb-6 flex flex-col items-center space-y-4 text-center sm:space-y-6 md:mb-8 md:items-start md:text-left"
        >
          <div>
            <SectionLabel className="justify-center md:justify-start !mb-4 md:!mb-8">
              {sectionLabel}
            </SectionLabel>
            <SectionHeadline size="lg" className="font-display font-light leading-none text-balance">
              {headlineContent}
            </SectionHeadline>
          </div>
          {hasBlurb && (
            <p className="mx-auto max-w-3xl text-sm font-light text-dark/70 sm:text-base md:mx-0 md:max-w-none">
              {locationBlurb}
            </p>
          )}
        </div>

        <div
          className="location-groups location-groups--mobile w-full lg:hidden"
          role="region"
          aria-label="Location advantages"
        >
          {!mobileLocationExpanded ? (
            <>
              <MobileHorizontalCarousel variant="light">
                {groupedPlaces.map((group) => renderMobileGroup(group, true))}
              </MobileHorizontalCarousel>
              <button
                type="button"
                onClick={() => setMobileLocationExpanded(true)}
                className="mt-4 w-full cursor-pointer rounded-sm border border-dark/15 bg-cream py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-rust hover:text-rust hover:bg-cream-deep"
              >
                View all locations
              </button>
            </>
          ) : (
            <>
              <div className="mx-auto max-h-[min(65vh,28rem)] w-full space-y-3 overflow-y-auto overscroll-y-contain pr-0.5 [-webkit-overflow-scrolling:touch]">
                {groupedPlaces.map((group) => renderMobileGroup(group, true))}
              </div>
              <button
                type="button"
                onClick={() => setMobileLocationExpanded(false)}
                className="mt-4 w-full cursor-pointer rounded-sm border border-dark/15 bg-cream py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-rust hover:text-rust hover:bg-cream-deep"
              >
                Show less
              </button>
            </>
          )}
        </div>

        <div
          className="location-groups location-groups--desktop hidden overflow-x-auto border border-dark/10 lg:block"
          role="region"
          aria-label="Location advantages table"
        >
          <div
            className="grid gap-px bg-dark/10 text-dark"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(11rem, 1fr))`,
              minWidth: `${columnCount * 11}rem`,
            }}
            role="table"
          >
            {groupedPlaces.map((group) => {
              const GroupIcon = getLocationGroupIcon(group.title);

              return (
                <div
                  key={`head-loc-${group.title}`}
                  role="columnheader"
                  className="flex h-14 items-center gap-2 bg-cream-deep px-3 py-2.5"
                >
                  <GroupIcon className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0 font-sans text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-dark/70">
                    {group.title}
                  </span>
                </div>
              );
            })}

            {Array.from({ length: rowCount }, (_, rowIdx) =>
              groupedPlaces.map((group) => {
                const place = group.places[rowIdx];

                return (
                  <div
                    key={`${group.title}-row-${rowIdx}`}
                    role="cell"
                    className="bg-cream transition-colors duration-300 hover:bg-rust/5"
                  >
                    {place ? (
                      renderLocationRow(place)
                    ) : (
                      <div className="min-h-[4.75rem] bg-cream/55" aria-hidden />
                    )}
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper dark={false} className="!pt-12 !pb-5 md:!pt-16 md:!pb-6 bg-[#F5F0E8]">
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="col-span-12 flex flex-col items-center space-y-6 text-center md:items-start md:space-y-8 md:text-left">
          <div className="w-full max-w-none space-y-4 sm:space-y-6">
            <div>
              <SectionLabel className="justify-center md:justify-start !mb-4 md:!mb-8">
                {sectionLabel}
              </SectionLabel>
              <SectionHeadline size="lg" className="font-display font-light leading-none text-balance">
                {headlineContent}
              </SectionHeadline>
            </div>

            {hasBlurb && (
              <p className="mx-auto max-w-3xl text-sm text-dark/70 font-light sm:text-base md:mx-0 md:max-w-none">
                {locationBlurb}
              </p>
            )}
          </div>

          {hasFlat ? (
            <>
              <div className="w-full grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                {allNearbyPlaces.map((place, idx) => (
                  <div
                    key={`${place.name}-${idx}`}
                    className={`border border-dark/10 bg-cream/55 p-3.5 sm:p-4 flex justify-between items-center gap-3 sm:gap-4 text-dark transition-colors hover:border-rust/30 hover:bg-rust/5 ${
                      idx >= 4 && !nearbyExpanded ? "hidden md:flex" : "flex"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 text-left">
                      <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center border border-current/15">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-[11px] sm:text-xs font-bold block leading-tight">
                          {place.name}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-dark/50 uppercase block font-semibold tracking-wider mt-0.5">
                          {place.category}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-xs sm:text-sm font-bold block">{place.time}</span>
                      <span className="text-[8px] sm:text-[9px] text-dark/50 block font-light">
                        {place.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {allNearbyPlaces.length > 4 && !nearbyExpanded && (
                <button
                  type="button"
                  onClick={() => setNearbyExpanded(true)}
                  className="md:hidden w-full max-w-sm py-3 border border-dark/15 text-dark hover:border-rust hover:text-rust transition-all duration-300 font-bold uppercase tracking-wider text-[10px] rounded-sm cursor-pointer text-center bg-cream hover:bg-cream-deep"
                >
                  Read More
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   10. DEVELOPMENT TIMELINE SECTION
   =========================================================================== */
const DEVELOPMENT_PHASE_ICONS: LucideIcon[] = [Layers, Building2];

function DevelopmentTimelineSection({
  timeline,
}: {
  timeline: NonNullable<ProjectData["developmentTimeline"]>;
}) {
  const { sectionLabel, headline, description, phases } = timeline;

  if (!phases.length) return null;

  return (
    <SectionWrapper dark={false} className="!pt-6 !pb-8 md:!pt-10 md:!pb-12 bg-[#EDE8DF] border-y border-dark/10">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-8 flex flex-col items-center text-center md:mb-10 md:items-start md:text-left">
          <SectionLabel className="justify-center md:justify-start !mb-3 md:!mb-5">
            {sectionLabel ?? "Development Timeline"}
          </SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light max-w-xl md:max-w-none">
            {headline ? (
              headline
            ) : (
              <>
                Project development <em className="font-normal italic">timeline</em>
              </>
            )}
          </SectionHeadline>
        </div>

        <div className="relative mb-8 md:mb-10">
          <div className="absolute top-[28px] left-[8%] right-[8%] hidden h-[2px] bg-dark/10 md:block">
            <motion.div
              className="h-full bg-rust"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-px md:bg-dark/10 md:border md:border-dark/10">
            {phases.map((phase, idx) => {
              const PhaseIcon = DEVELOPMENT_PHASE_ICONS[idx % DEVELOPMENT_PHASE_ICONS.length];

              return (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col border border-dark/10 bg-cream/70 p-6 md:border-0 md:bg-cream md:p-8 lg:p-10"
                >
                  <div className="mb-6 flex items-center justify-between md:mb-8">
                    <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-rust">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center border border-rust/20 bg-cream text-rust md:h-16 md:w-16">
                      <PhaseIcon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.75} />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-light text-dark md:text-3xl">{phase.title}</h3>

                  <ul className="mt-5 space-y-3 md:mt-6">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-light leading-relaxed text-dark/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rust" strokeWidth={1.75} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center text-sm font-light leading-relaxed text-dark/70 md:text-base md:text-left"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   11. FAQ SECTION (Accordion Style)
   =========================================================================== */
function FAQSection({ faqs }: { faqs: ProjectData["faqsList"] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#EDE8DF]">
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">

        <div className="col-span-12 lg:col-span-4">
          <SectionLabel>Clarifications</SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Frequently <br />asked <em className="font-normal italic">questions</em>
          </SectionHeadline>
          <p className="text-sm text-dark/60 font-light mt-4 leading-relaxed">
            Detailed answers regarding project timelines, commercial loan approvals, site allocations, and registration criteria.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-cream border border-dark/10 overflow-hidden rounded-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left text-dark hover:bg-dark/5 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider">{faq.question}</span>
                  <span className="text-rust text-lg font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-dark/75 border-t border-dark/5 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   12. RELATED PROJECTS SECTION
   =========================================================================== */
function RelatedProjectsSection({ currentSlug }: { currentSlug: string }) {
  // Show standard alternative projects
  const related = [
    {
      name: "Elysian Gates",
      slug: "elysian-gates",
      price: "From $1.3M",
      location: "Suwanee, GA",
      details: "44-Acre Gated Enclave",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Lakeside Heights",
      slug: "lakeside-heights",
      price: "From low $300s",
      location: "Gwinnett County, GA",
      details: "Scenic Lakefront Community",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#F5F0E8] border-b border-dark/10">
      <div className="mb-10 text-center md:text-left">
        <SectionLabel >Alternative Addresses</SectionLabel>
        <SectionHeadline size="lg" className="font-display font-light">
          Related nearby <em className="font-normal italic">projects</em>
        </SectionHeadline>
      </div>

      {/* Desktop/Tablet Grid Version */}
      <div className="hidden md:grid grid-cols-2 gap-8 max-w-4xl mx-auto md:mx-0">
        {related.map((project) => (
          <div
            key={project.slug}
            className="group relative overflow-hidden bg-cream border border-dark/12 shadow-sm rounded-sm flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-dark/10">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-rust font-bold">{project.location}</span>
                <h4 className="font-display text-xl text-dark leading-tight">{project.name}</h4>
                <p className="text-xs text-dark/60 font-light mt-1">{project.details}</p>
              </div>

              <div className="border-t border-dark/10 pt-4 flex items-center justify-between gap-4">
                <span className="font-display text-sm font-semibold text-dark">{project.price}</span>
                {/* Since the user requested only one details page for Sydney Oaks, other links route to Contact */}
                <Link
                  href="/#request-info"
                  className="text-[9px] uppercase tracking-widest font-bold text-rust hover:text-dark transition-colors inline-flex items-center gap-1"
                >
                  Register Interest
                  <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider Version */}
      <div className="md:hidden">
        <div className="relative overflow-visible">
          <div className="overflow-hidden -mx-4 px-4">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                if (swipe) {
                  if (offset.x > 0) {
                    setCurrentIndex((prev) => (prev - 1 + related.length) % related.length);
                  } else {
                    setCurrentIndex((prev) => (prev + 1) % related.length);
                  }
                }
              }}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="flex"
            >
              {related.map((project) => (
                <div key={project.slug} className="min-w-full pr-6 flex flex-col">
                  <div className="group relative overflow-hidden bg-cream border border-dark/12 shadow-sm rounded-sm flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-dark/10">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-rust font-bold">{project.location}</span>
                        <h4 className="font-display text-xl text-dark leading-tight">{project.name}</h4>
                        <p className="text-xs text-dark/60 font-light mt-1">{project.details}</p>
                      </div>

                      <div className="border-t border-dark/10 pt-4 flex items-center justify-between gap-4">
                        <span className="font-display text-sm font-semibold text-dark">{project.price}</span>
                        <Link
                          href="/#request-info"
                          className="text-[9px] uppercase tracking-widest font-bold text-rust hover:text-dark transition-colors inline-flex items-center gap-1"
                        >
                          Register Interest
                          <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          {related.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              {related.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    currentIndex === idx ? "w-10 bg-dark" : "w-3 bg-dark/10"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   LIGHTBOX MODAL COMPONENT (Swipe / Button Slideshow)
   =========================================================================== */
function LightboxModal({
  images,
  currentIdx,
  albumTitle,
  onClose,
}: {
  images: { src: string; alt: string; lightboxSrc?: string }[];
  currentIdx: number;
  albumTitle: string;
  onClose: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(currentIdx);

  const prev = () => {
    setActiveIdx((prevIdx) => (prevIdx - 1 + images.length) % images.length);
  };

  const next = () => {
    setActiveIdx((prevIdx) => (prevIdx + 1) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images]);

  return (
    <div className="fixed inset-0 z-[200] bg-dark/95 flex flex-col justify-between p-4 md:p-8 animate-fade-in select-none">

      {/* Top row */}
      <div className="flex justify-between items-center text-cream border-b border-cream/10 pb-4">
        <div>
          <Annotation light className="!text-rust">{albumTitle}</Annotation>
          <span className="font-display text-xs md:text-sm text-cream/60">
            Image {activeIdx + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 bg-cream/10 border border-cream/15 text-cream flex items-center justify-center rounded-full hover:bg-rust/20 transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Middle photo viewer */}
      <div className="flex-1 flex justify-between items-center gap-4 py-4 relative">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full border border-cream/20 text-cream bg-dark/60 flex items-center justify-center hover:bg-rust hover:border-rust transition-colors cursor-pointer relative z-10 shrink-0"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative flex-1 w-full h-[70vh] max-h-[600px]">
          <Image
            src={images[activeIdx].lightboxSrc ?? images[activeIdx].src}
            alt={images[activeIdx].alt}
            fill
            unoptimized={(images[activeIdx].lightboxSrc ?? images[activeIdx].src).includes(
              "res.cloudinary.com",
            )}
            className="object-contain"
            sizes="90vw"
          />
        </div>

        <button
          onClick={next}
          className="w-12 h-12 rounded-full border border-cream/20 text-cream bg-dark/60 flex items-center justify-center hover:bg-rust hover:border-rust transition-colors cursor-pointer relative z-10 shrink-0"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom captions */}
      <div className="bg-dark border-t border-cream/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-cream/70 text-xs">
        <span className="font-light tracking-wide italic">{images[activeIdx].alt}</span>
        <span className="font-bold text-[9px] uppercase tracking-widest text-rust">
          Click arrows or use left/right keys to navigate
        </span>
      </div>

    </div>
  );
}
