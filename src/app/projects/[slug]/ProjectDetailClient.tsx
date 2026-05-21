"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Star,
  MapPin,
  Maximize2,
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
  type LucideIcon
} from "lucide-react";
import type { ProjectData } from "@/lib/projects-data";
import { ensureGsapPlugins } from "@/lib/gsap";
import { NavbarEditorial } from "@/components/navbar-editorial";
import { FooterSection } from "@/components/footer-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { FigMarker } from "@/components/ui/fig-marker";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { SydneyOaksStage } from "@/app/InteractiveSiteMap/components/SydneyOaksStage";
import { MAP_CONFIGS } from "@/app/InteractiveSiteMap/data/lots";
import type { LotStatus } from "@/app/InteractiveSiteMap/types/site-map";

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
};

function getAmenityIcon(amenity: string) {
  return amenityIconMap[amenity.toLowerCase()] || CheckCircle2;
}

export function ProjectDetailClient({ project }: { project: ProjectData }) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(0);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);

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

  // Standardize Data with Fallbacks for Sydney Oaks context
  const name = project.name || project.title;
  const tagline = project.tagline || "Luxury homes in Suwanee, Georgia";
  const priceText = project.priceText || "From low $400s";
  const statusBadge = project.statusBadge || "Ongoing";
  const reraNumber = project.reraNumber || "RERA-GA-8923";
  const possessionDate = project.possessionDate || "Q4 2026";
  const projectArea = project.projectArea || "12 Acres";
  const totalUnits = project.totalUnits || "89 Town Homes";
  const priceRange = project.priceRange || "$410k - $580k";
  const propertyType = project.propertyType || "Luxury Villas";
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

  // Collect gallery photos (Hero main + Renders)
  const galleryImages = useMemo(() => {
    const list = [{ src: project.image, alt: `${name} Exterior` }];
    if (project.renders) {
      project.renders.forEach((r) => {
        list.push({ src: r.image, alt: r.label });
      });
    }
    // Add floor plan image as additional view if short
    if (floorPlans && floorPlans[0]) {
      list.push({ src: floorPlans[0].image, alt: `${floorPlans[0].name} Layout` });
    }
    return list.slice(0, 5); // 1 main + 4 previews
  }, [project.image, project.renders, floorPlans, name]);

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
      <section className="relative w-full pt-24 md:pt-32 pb-12 md:pb-16 bg-[#F5F0E8] border-b border-dark/10">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

            {/* Left Hero Content */}
            <div data-reveal className="col-span-12 lg:col-span-5 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-rust/25 px-3 py-1 text-rust font-bold text-[9px] uppercase tracking-widest">
                  {statusBadge}
                </span>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-dark/60">
                  <MapPin className="h-3.5 w-3.5 text-rust" />
                  {project.location}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-[clamp(3.8rem,8vw,8rem)] leading-[0.82] text-dark">
                  {name}<span className="text-rust">.</span>
                </h1>
                <p
                  className="text-xl md:text-2xl font-light text-rust italic max-w-xl leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {tagline}
                </p>
              </div>

              <BodyText size="lg" className="max-w-xl text-dark/70 font-light leading-relaxed">
                {project.summary || project.brief}
              </BodyText>

              <div className="grid grid-cols-3 gap-3 border-y border-dark/10 py-4">
                <div>
                  <span className="block text-[9px] font-bold tracking-[0.2em] text-rust uppercase">Price</span>
                  <span className="mt-1 block font-display text-lg text-dark">{priceText}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold tracking-[0.2em] text-rust uppercase">Homes</span>
                  <span className="mt-1 block font-display text-lg text-dark">{totalUnits}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold tracking-[0.2em] text-rust uppercase">Possession</span>
                  <span className="mt-1 block font-display text-lg text-dark">{possessionDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-3">
                <Link
                  href="#enquiry"
                  className="inline-flex h-14 items-center justify-center gap-4 bg-rust px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-white no-underline transition-colors hover:bg-dark"
                >
                  Request Information
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#enquiry"
                  className="inline-flex h-14 items-center justify-center gap-4 border border-dark/20 px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-dark no-underline transition-colors hover:border-rust hover:text-rust"
                >
                  Schedule Visit
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div data-reveal className="col-span-12 lg:col-span-7 relative min-h-[360px] md:min-h-[540px] lg:min-h-[650px] w-full overflow-hidden bg-[#EDE8DF] border border-dark/10">
              <Image
                src={project.image}
                alt={`${name} Exterior`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 58vw"
                className="object-cover"
              />
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
              <Annotation light className="mb-1">Configuration</Annotation>
              <span className="font-display font-light text-sm text-cream">3 & 4 BHK</span>
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
      <SectionWrapper dark={false} className="!py-16 md:!py-24">
        <div data-reveal className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">

          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <SectionLabel>Overview</SectionLabel>
              <SectionHeadline size="md" className="mb-6 font-display font-light">
                Crafting spaces where light meets <em className="font-normal italic">sanctuary</em>
              </SectionHeadline>

              <div className="space-y-6 text-dark/80">
                <p className="text-lg leading-relaxed font-light">
                  Sydney Oaks is conceived as a sanctuary for families seeking a balanced, nature-integrated lifestyle in Gwinnett County. Designed with modern farmhouse architecture as the foundation, each residence leverages natural wood siding, limestone masonry, and expansive double-glazed panels that showcase the protected oak forests.
                </p>
                <p className="text-md leading-relaxed font-light opacity-90">
                  Each townhome is positioned to capture optimal ventilation and sun exposure throughout the seasons, ensuring natural temperature regulation and bright common spaces. Connectivity runs deep here — residents enjoy secure access to local hiking trails, premier Gwinnett schools, and local civic centers, all within a fully gated community framework.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-dark/15 pt-6">
              <Annotation className="!text-rust mb-4">COMMUNITY KEYNOTE</Annotation>
              <blockquote className="border-l-2 border-rust pl-4 italic text-dark/70 font-display text-lg">
                &ldquo;Modern design should not separate us from nature; it should act as the frame that celebrates it.&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
            <Annotation className="mb-4">HIGHLIGHT CRITERIA</Annotation>

            <div className="flex flex-col flex-1 justify-between gap-4 h-full">
              {[
                {
                  title: "Top Gwinnett County Schools",
                  desc: "Directly within district zones of North Gwinnett schools, renowned for excellence.",
                },
                {
                  title: "Healthcare Integration",
                  desc: "Under 10 minutes drive from Emory Johns Creek Hospital, providing premium care.",
                },
                {
                  title: "Duluth Tech Connectivity",
                  desc: "Quick commutes to Duluth and Suwanee technical offices and commercial business parks.",
                },
                {
                  title: "Lush Park & Trail access",
                  desc: "The gated layout wraps around direct private paths into the scenic Oak Ridge Trailway.",
                },
              ].map((item, index) => {
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

        </div>
      </SectionWrapper>

      {/* C. GALLERY */}
      <section className="bg-cream py-16 md:py-24 border-y border-dark/10 overflow-hidden">
        <div className="mx-auto max-w-[1450px] px-6 sm:px-8 md:px-12 lg:px-20 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <SectionLabel>Visual Album</SectionLabel>
              <SectionHeadline size="lg" className="font-display font-light leading-none">
                Interior & exterior <em className="font-normal italic">views</em>
              </SectionHeadline>
            </div>
            <Annotation className="!text-rust">VERIFIED IMAGES // NO PLACEHOLDERS</Annotation>
          </div>
        </div>

        {/* Marquee Slider */}
        <div className="relative w-screen max-w-none ml-[calc(-50vw+50%)] overflow-hidden group">
          <div
            className="flex min-w-max items-center gap-4 md:gap-6 animate-marquee group-hover:[animation-play-state:paused]"
            style={{
              animation: "marquee 50s linear infinite",
            }}
          >
            {repeatedImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx % galleryImages.length)}
                className="relative flex-shrink-0 overflow-hidden bg-[#E8E3DB] cursor-pointer w-[280px] h-[45vh] md:w-[450px] md:h-[60vh] border border-dark/5"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">Visual Frame</span>
                  <span className="text-white text-lg font-serif italic">{image.alt}</span>
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
      <MasterPlanPdfSection
        sitePlanPdfUrl={project.sitePlanPdfUrl || "/pdfs/site-plan.pdf"}
        components={project.masterPlanComponents || []}
      />

      {/* E. FLOOR PLANS */}
      <FloorPlansPdfSection
        floorPlans={floorPlans}
        floorPlansPdfUrl={project.floorPlansPdfUrl || "/pdfs/aspen-plan-set.pdf"}
      />

      {/* F. AMENITIES SECTION */}
      <SectionWrapper dark={true} className="!py-16 md:!py-24">
        <div data-reveal className="mb-10 text-center md:text-left">
          <SectionLabel light>Infrastructure</SectionLabel>
          <SectionHeadline size="lg" light className="!text-[#F5F0E8] font-display">
            Curated <em className="italic">amenities</em>
          </SectionHeadline>
        </div>

        <div data-reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#F5F0E8]/10 border border-[#F5F0E8]/10">
          {project.amenities.map((amenity, i) => {
            const AmenityIcon = getAmenityIcon(amenity);

            return (
              <div
                key={i}
                className={`bg-dark p-6 sm:p-8 gap-4 group hover:bg-[#2A2118] transition-colors duration-500 ${
                  i >= 4
                    ? (amenitiesExpanded ? "flex items-center" : "hidden md:flex md:items-center")
                    : "flex items-center"
                }`}
              >
                <div className="w-10 h-10 border border-[#F5F0E8]/20 text-[#F5F0E8]/55 flex items-center justify-center transition-colors group-hover:border-rust group-hover:text-rust shrink-0">
                  <AmenityIcon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <Annotation light className="!text-[#F5F0E8]/80 font-bold tracking-widest">{amenity.toUpperCase()}</Annotation>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setAmenitiesExpanded(!amenitiesExpanded)}
          className="md:hidden mt-6 w-full py-3 border border-[#F5F0E8]/15 text-[#F5F0E8] hover:border-rust hover:text-rust transition-all duration-300 font-bold uppercase tracking-wider text-[10px] rounded-sm cursor-pointer text-center bg-[#2A2118]/20 hover:bg-[#2A2118]"
        >
          {amenitiesExpanded ? "Read Less" : "Read More"}
        </button>
      </SectionWrapper>

      {/* G. LOCATION ADVANTAGES */}
      <LocationAdvantagesSection nearbyPlaces={nearbyPlaces} coordinates={coordinates} rera={reraNumber} />

      {/* H. WHY CHOOSE THIS PROJECT */}
      <SectionWrapper dark={false} className="!py-16 md:!py-24 bg-[#F5F0E8] border-b border-dark/10">
        <div className="mx-auto max-w-[1450px] px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="mb-12 text-center md:text-left">
            <SectionLabel>Key Advantages</SectionLabel>
            <SectionHeadline size="lg" className="font-display font-light">
              Why choose <em className="font-normal italic">{name}</em>
            </SectionHeadline>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-dark/10 bg-dark/10">
            <div className="bg-cream/55 p-6 md:p-7 min-h-[230px] flex flex-col justify-between transition-colors hover:bg-cream">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-rust">01</span>
                <div className="h-10 w-10 border border-rust/20 text-rust flex items-center justify-center">
                  <MapPin size={20} strokeWidth={1.8} />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-light text-dark">Premium Location</h3>
                <p className="text-sm text-dark/65 font-light leading-relaxed">
                  Gwinnett County address with quick access to wooded trails, schools, healthcare, and daily essentials.
                </p>
              </div>
            </div>

            <div className="bg-cream/55 p-6 md:p-7 min-h-[230px] flex flex-col justify-between transition-colors hover:bg-cream">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-rust">02</span>
                <div className="h-10 w-10 border border-rust/20 text-rust flex items-center justify-center">
                  <Compass size={20} strokeWidth={1.8} />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-light text-dark">Smart Planning</h3>
                <p className="text-sm text-dark/65 font-light leading-relaxed">
                  Low-density planning, open layouts, efficient systems, and a design language built for long-term comfort.
                </p>
              </div>
            </div>

            <div className="bg-cream/55 p-6 md:p-7 min-h-[230px] flex flex-col justify-between transition-colors hover:bg-cream">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-rust">03</span>
                <div className="h-10 w-10 border border-rust/20 text-rust flex items-center justify-center">
                  <DollarSign size={20} strokeWidth={1.8} />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-light text-dark">High Appreciation</h3>
                <p className="text-sm text-dark/65 font-light leading-relaxed">
                  Positioned in a growing residential corridor with strong demand for family-focused communities.
                </p>
              </div>
            </div>

            <div className="bg-cream/55 p-6 md:p-7 min-h-[230px] flex flex-col justify-between transition-colors hover:bg-cream">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-rust">04</span>
                <div className="h-10 w-10 border border-rust/20 text-rust flex items-center justify-center">
                  <ShieldCheck size={20} strokeWidth={1.8} />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-light text-dark">Trusted Developer</h3>
                <p className="text-sm text-dark/65 font-light leading-relaxed">
                  Transparent delivery, careful material choices, and construction quality managed with clear standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* J. ENQUIRY SECTION */}
      <section id="enquiry" className="py-16 md:py-24 bg-cream border-t border-dark/10">
        <div className="mx-auto max-w-[1450px] px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between border-y border-dark/10 py-8 lg:py-10">
              <div className="space-y-6">
                <div>
                  <SectionLabel>Project Consultation</SectionLabel>
                  <SectionHeadline size="lg" className="font-display font-light">
                    Plan your visit to <em className="font-normal italic">{name}</em>
                  </SectionHeadline>
                </div>
                <p className="max-w-lg text-sm font-light leading-relaxed text-dark/70">
                  Request the Sydney Oaks dossier, floor plan set, pricing guidance, and a convenient callback from our project advisor.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <div className="border border-dark/10 bg-[#F5F0E8] p-4">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-rust">Site Visit</span>
                  <span className="mt-2 block font-display text-xl text-dark">Schedule walkthrough</span>
                </div>
                <div className="border border-dark/10 bg-[#F5F0E8] p-4">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-rust">Documents</span>
                  <span className="mt-2 block font-display text-xl text-dark">Plans & dossier</span>
                </div>
                <div className="border border-dark/10 bg-[#F5F0E8] p-4">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-rust">Response</span>
                  <span className="mt-2 block font-display text-xl text-dark">Advisor callback</span>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 h-full">
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
          onClose={() => setLightboxOpen(false)}
        />
      )}
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

  return (
    <div className="bg-[#EDE8DF] border border-dark/15 p-6 md:p-8 shadow-xl relative w-full h-full rounded-sm">
      <div className="absolute top-0 right-0 p-6 opacity-10"><CrosshairIcon /></div>

      {!submitted ? (
        <form className="flex h-full flex-col justify-between gap-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <Annotation className="!text-rust mb-1.5 font-bold">Request consultation</Annotation>
              <span className="font-display font-light text-xl text-dark block leading-none">
                Dossier & Callback Booking
              </span>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider font-semibold text-dark/60 block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-creamDeep/40 border border-dark/10 focus:border-rust px-3 py-2 text-sm outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-semibold text-dark/60 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-creamDeep/40 border border-dark/10 focus:border-rust px-3 py-2 text-sm outline-none transition-colors"
                    placeholder="+1 (000) 000-0000"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-semibold text-dark/60 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-creamDeep/40 border border-dark/10 focus:border-rust px-3 py-2 text-sm outline-none transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Preferred Callback details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-semibold text-dark/60 block">Callback Method *</label>
                  <select
                    required
                    value={formData.callbackMethod}
                    onChange={(e) => setFormData({ ...formData, callbackMethod: e.target.value })}
                    className="w-full bg-creamDeep/40 border border-dark/10 focus:border-rust px-3 py-2 text-xs outline-none transition-colors appearance-none h-[38px] cursor-pointer"
                  >
                    <option value="Phone">Phone Call</option>
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Email">Email Details</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider font-semibold text-dark/60 block">Preferred Callback Time *</label>
                  <select
                    required
                    value={formData.callbackTime}
                    onChange={(e) => setFormData({ ...formData, callbackTime: e.target.value })}
                    className="w-full bg-creamDeep/40 border border-dark/10 focus:border-rust px-3 py-2 text-xs outline-none transition-colors appearance-none h-[38px] cursor-pointer"
                  >
                    <option value="Morning">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <button
              type="submit"
              className="w-full h-[48px] bg-dark text-white uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-rust transition-colors duration-500 cursor-pointer"
            >
              Book Callback Request
            </button>

            {/* Quick-Contact Direct Buttons */}
            <div className="pt-4 border-t border-dark/10">
              <span className="text-[8px] uppercase tracking-[0.2em] font-semibold text-dark/50 block text-center mb-3">
                Or Connect Instantly
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <a
                  href="https://wa.me/14045550123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-green-500/20 text-green-800 transition-colors duration-300 rounded-sm text-center cursor-pointer select-none"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider">WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/shreedevelopers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 bg-[#FDF2F8] hover:bg-[#FCE7F3] border border-pink-500/20 text-pink-800 transition-colors duration-300 rounded-sm text-center cursor-pointer select-none"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider">Instagram</span>
                </a>
                <a
                  href="tel:+14045550123"
                  className="flex flex-col items-center justify-center py-2.5 bg-[#E0F2FE] hover:bg-[#BAE6FD] border border-blue-500/20 text-blue-800 transition-colors duration-300 rounded-sm text-center cursor-pointer select-none"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider">Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-rust/10 text-rust rounded-full flex items-center justify-center mx-auto border border-rust/20">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="font-display font-light text-2xl text-dark">Thank You</h3>
          <p className="text-sm text-dark/70 font-light max-w-xs mx-auto">
            Your preferred callback request for {projectTitle} has been submitted. A real estate advisor will contact you during your selected time window.
          </p>
        </div>
      )}
    </div>
  );
}

/* ===========================================================================
   D. MASTER PLAN / SITE PLAN
   =========================================================================== */
function MasterPlanPdfSection({
  sitePlanPdfUrl,
  components,
}: {
  sitePlanPdfUrl: string;
  components: NonNullable<ProjectData["masterPlanComponents"]>;
}) {
  const masterPlanItems = components.length
    ? components
    : [
      { name: "Plot Layout", desc: "Low-density homesite arrangement with clearly proportioned residential plots." },
      { name: "Amenities Zoning", desc: "Community amenities grouped for easy access from the residential blocks." },
      { name: "Entry & Exit", desc: "Defined access points for smooth arrival, controlled entry, and internal circulation." },
    ];

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#F5F0E8] border-b border-dark/10">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <div>
          <SectionLabel>D. Master Plan / Site Plan</SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Plot layout & <em className="font-normal italic">site planning</em>
          </SectionHeadline>
        </div>

        <a
          href={sitePlanPdfUrl}
          download
          className="inline-flex h-12 items-center justify-center gap-3 bg-rust px-6 text-[10px] font-bold uppercase tracking-[0.22em] !text-white no-underline transition-colors hover:bg-dark"
        >
          Download Site Plan
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="col-span-12 lg:col-span-4 space-y-3">
          {masterPlanItems.map((item, index) => (
            <div key={item.name} className="border border-dark/10 bg-cream p-5">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-rust">
                0{index + 1}
              </span>
              <h3 className="mt-2 font-display text-2xl font-light text-dark">{item.name}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-dark/65">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-8 border border-dark/10 bg-cream p-3">
          <div className="h-[520px] md:h-[700px] bg-[#EDE8DF]">
            <iframe
              src={`${sitePlanPdfUrl}#view=FitH`}
              title="Sydney Oaks site plan PDF"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   E. FLOOR PLANS
   =========================================================================== */
function FloorPlansPdfSection({
  floorPlans,
  floorPlansPdfUrl,
}: {
  floorPlans: NonNullable<ProjectData["floorPlansDetails"]>;
  floorPlansPdfUrl: string;
}) {
  if (!floorPlans.length) return null;

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#EDE8DF] border-y border-dark/10">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <div>
          <SectionLabel>E. Floor Plans</SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Unit types & <em className="font-normal italic">dimensions</em>
          </SectionHeadline>
        </div>

        <a
          href={floorPlansPdfUrl}
          download
          className="inline-flex h-12 items-center justify-center gap-3 bg-rust px-6 text-[10px] font-bold uppercase tracking-[0.22em] !text-white no-underline transition-colors hover:bg-dark"
        >
          Download Floor Plans
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="col-span-12 lg:col-span-5 flex h-full flex-col gap-3">
          {floorPlans.map((plan) => (
            <div key={plan.name} className="flex-1 border border-dark/10 bg-cream p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-rust">Unit Type</span>
                  <h3 className="mt-1 font-display text-2xl font-light text-dark">{plan.name}</h3>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-px bg-dark/10">
                <PlanFact label="Beds" value={`${plan.bedrooms}`} />
                <PlanFact label="Baths" value={`${plan.bathrooms}`} />
                <PlanFact label="Parking" value={`${plan.parking}`} />
                <PlanFact label="Dimensions" value={`${plan.area.toLocaleString()} sq.ft.`} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-dark/10 pt-4">
                <span className="font-display text-xl text-dark">{plan.price}</span>
                <a
                  href={floorPlansPdfUrl}
                  download
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-rust hover:text-dark"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-7 h-full border border-dark/10 bg-cream p-3">
          <div className="h-full min-h-[520px] md:min-h-[680px] bg-[#F5F0E8]">
            <iframe
              src={`${floorPlansPdfUrl}#view=FitH`}
              title="Sydney Oaks floor plans PDF"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function PlanFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream px-4 py-3">
      <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-dark/45">{label}</span>
      <span className="mt-1 block font-display text-lg text-dark">{value}</span>
    </div>
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
                Check Plot Layouts
              </a>
            </div>

          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}

/* ===========================================================================
   6. MASTER PLAN SECTION (Interactive Sitemap & Zoom Stage)
   =========================================================================== */
function MasterPlanSection() {
  const sydneyOaksMapConfig = useMemo(() => {
    return MAP_CONFIGS.find(m => m.id === "sydney-oaks");
  }, []);

  const lots = useMemo(() => {
    return sydneyOaksMapConfig?.lots || [];
  }, [sydneyOaksMapConfig]);

  const [activeFilter, setActiveFilter] = useState<"All" | LotStatus>("All");
  const [selectedLotId, setSelectedLotId] = useState<number>(lots[0]?.id || 1);

  const selectedLot = useMemo(() => {
    return lots.find(l => l.id === selectedLotId) || lots[0];
  }, [lots, selectedLotId]);

  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  if (!sydneyOaksMapConfig) return null;

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#F5F0E8] border-b border-dark/10">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <SectionLabel   >Layout Schema</SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Sydney Oaks <em className="font-normal italic">master plan</em>
          </SectionHeadline>
        </div>

        {/* Filters and Fullscreen */}
        <div className="flex flex-wrap gap-2 items-center">
          {["All", "Available", "Coming Soon", "Sold"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f as any);
                // Auto-select first matching lot if current is filtered out
                const target = f.toLowerCase().replace(/\s+/g, '-');
                const filtered = f === "All"
                  ? lots
                  : lots.filter((l) => l.status.toLowerCase().replace(/\s+/g, '-') === target);
                if (filtered.length > 0 && !filtered.some(l => l.id === selectedLotId)) {
                  setSelectedLotId(filtered[0].id);
                }
              }}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm ${activeFilter === f
                ? "bg-dark text-cream"
                : "bg-transparent text-dark/65 hover:text-dark hover:bg-dark/5"
                }`}
            >
              {f === "All" ? "All Plots" : f}
            </button>
          ))}

          <button
            onClick={() => setFullscreenOpen(true)}
            className="group inline-flex items-center gap-1.5 ml-4 text-[9px] font-bold uppercase tracking-widest text-rust hover:text-dark transition-colors cursor-pointer"
          >
            <Maximize2 size={12} className="group-hover:scale-110 transition-transform" />
            Expand Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 bg-cream border border-dark/15 p-4 rounded-sm shadow-md overflow-hidden">

        {/* Left Side: Interactive Map stage */}
        <div className="col-span-12 lg:col-span-8 bg-[#EDE8DF] border border-dark/5 relative h-[400px] md:h-[500px] rounded-sm overflow-hidden">
          <SydneyOaksStage
            activeFilter={activeFilter}
            selectedLotId={selectedLotId}
            onSelectLot={setSelectedLotId}
            lots={lots}
          />
        </div>

        {/* Right Side: Selected Lot details */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between p-4 md:p-6 bg-[#EDE8DF]/30 border border-dark/5 rounded-sm min-h-[380px] lg:min-h-0">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-rust bg-rust/5 px-2.5 py-0.5 border border-rust/10">
                  {selectedLot ? selectedLot.status : "Available"}
                </span>
                <span className="font-mono text-xs text-dark/40">LOT {selectedLot ? selectedLot.lotNumber.toString().padStart(2, '0') : "01"}</span>
              </div>
              <h3 className="font-display font-light text-2xl text-dark leading-tight mt-2">
                {selectedLot ? selectedLot.title : "The Homesite"}
              </h3>
            </div>

            {selectedLot && (
              <div className="grid grid-cols-2 gap-4 border-y border-dark/10 py-4">
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-semibold text-dark/50 block">Dimensions</span>
                  <span className="font-display text-md text-dark">{(selectedLot.sqft || 0).toLocaleString()} sq.ft.</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-semibold text-dark/50 block">Pricing</span>
                  <span className="font-display text-md text-dark font-medium">{selectedLot.price}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-semibold text-dark/50 block">Configuration</span>
                  <span className="text-xs text-dark/80 font-medium">{selectedLot.beds} Beds / {selectedLot.baths} Baths</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-semibold text-dark/50 block">Floor Plan</span>
                  <span className="text-xs text-dark/80 font-medium">{selectedLot.story}</span>
                </div>
              </div>
            )}

            <p className="text-xs text-dark/65 leading-relaxed font-light">
              {selectedLot ? selectedLot.description : "This homesite borders the natural landscape pathways, featuring generous spacing and solar-optimized building footprints."}
            </p>
          </div>

          <div className="pt-6">
            <a
              href={`/contact?source=InteractiveSiteMap&lot=${selectedLot?.lotNumber}`}
              className="w-full h-[48px] bg-dark !text-white uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-rust transition-colors duration-500 flex items-center justify-center rounded-sm"
            >
              Inquire about Lot {selectedLot?.lotNumber}
            </a>
          </div>
        </div>

      </div>

      {/* FULLSCREEN MAP OVERLAY */}
      {fullscreenOpen && (
        <div className="fixed inset-0 z-[100] bg-dark flex flex-col p-4 md:p-8 select-none">
          <div className="flex justify-between items-center text-cream mb-4 border-b border-cream/10 pb-4">
            <div>
              <Annotation light className="!text-rust">FULLSCREEN INTERACTIVE SITE MAP</Annotation>
              <h3 className="font-display text-xl">Sydney Oaks Layout Schema</h3>
            </div>
            <button
              onClick={() => setFullscreenOpen(false)}
              className="w-10 h-10 bg-cream/10 hover:bg-rust/20 border border-cream/15 text-cream flex items-center justify-center rounded-full transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 grid grid-cols-12 gap-6 bg-[#1C1208] relative rounded-sm overflow-hidden p-4">
            <div className="col-span-12 lg:col-span-9 bg-[#2A2118] border border-cream/10 rounded-sm overflow-hidden relative">
              <SydneyOaksStage
                activeFilter={activeFilter}
                selectedLotId={selectedLotId}
                onSelectLot={setSelectedLotId}
                lots={lots}
              />
            </div>
            <div className="col-span-12 lg:col-span-3 flex flex-col justify-between p-6 bg-[#2A2118] border border-cream/10 rounded-sm text-cream">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rust bg-rust/5 px-2.5 py-0.5 border border-rust/10">
                      {selectedLot ? selectedLot.status : "Available"}
                    </span>
                    <span className="font-mono text-xs text-cream/40">LOT {selectedLot ? selectedLot.lotNumber.toString().padStart(2, '0') : "01"}</span>
                  </div>
                  <h3 className="font-display font-light text-2xl text-cream leading-tight mt-2">
                    {selectedLot ? selectedLot.title : "The Homesite"}
                  </h3>
                </div>

                {selectedLot && (
                  <div className="grid grid-cols-2 gap-4 border-y border-cream/10 py-4">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest font-semibold text-cream/50 block">Dimensions</span>
                      <span className="font-display text-md text-cream">{selectedLot.sqft.toLocaleString()} sq.ft.</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-widest font-semibold text-cream/50 block">Pricing</span>
                      <span className="font-display text-md text-cream font-medium">{selectedLot.price}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-widest font-semibold text-cream/50 block">Configuration</span>
                      <span className="text-xs text-cream/80">{selectedLot.beds} Beds / {selectedLot.baths} Baths</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-widest font-semibold text-cream/50 block">Floor Plan</span>
                      <span className="text-xs text-cream/80">{selectedLot.story}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <a
                  href={`/contact?source=InteractiveSiteMap&lot=${selectedLot?.lotNumber}`}
                  className="w-full h-[48px] bg-rust !text-white uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-rust/80 transition-colors duration-500 flex items-center justify-center rounded-sm"
                >
                  Inquire Lot {selectedLot?.lotNumber}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

/* ===========================================================================
   7. AVAILABLE UNITS SECTION (Filter & Sort Options)
   =========================================================================== */
function AvailableUnitsSection({ units }: { units: ProjectData["unitsList"] }) {
  const [bhkFilter, setBhkFilter] = useState<number | "all">("all");
  const [priceFilter, setPriceFilter] = useState<number | "all">("all"); // Limit filter
  const [sortByArea, setSortByArea] = useState<"asc" | "desc" | "none">("none");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtering + sorting logic
  const filteredUnits = useMemo(() => {
    let result = [...(units || [])];

    // Filter by BHK
    if (bhkFilter !== "all") {
      result = result.filter((u) => u.bhk === bhkFilter);
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
  }, [units, bhkFilter, priceFilter, sortByArea]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredUnits.length]);

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#EDE8DF]">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <SectionLabel>Acquisition</SectionLabel>
          <SectionHeadline size="lg" className="font-display font-light">
            Available <em className="font-normal italic">units</em>
          </SectionHeadline>
        </div>

        {/* Filter Controls Panel */}
        <div className="grid grid-cols-3 gap-1.5 w-full md:flex md:flex-row md:flex-nowrap md:gap-3 md:items-end md:w-auto">
          {/* BHK Filter */}
          <div className="flex flex-col w-full md:w-[130px]">
            <span className="text-[8px] uppercase tracking-wider font-semibold text-dark/50 mb-1.5">Filter BHK</span>
            <select
              value={bhkFilter}
              onChange={(e) => setBhkFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="bg-cream border border-dark/10 px-1.5 sm:px-3 py-1.5 text-[10px] sm:text-xs text-dark outline-none cursor-pointer rounded-sm w-full truncate"
            >
              <option value="all">All BHKs</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5 BHK</option>
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
                      <span className="font-semibold">{u.bhk} BHK</span>
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
            <Annotation className="!text-dark/40">NO AVAILABLE PLOTS MATCH FILTERS</Annotation>
            <button
              onClick={() => { setBhkFilter("all"); setPriceFilter("all"); setSortByArea("none"); }}
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
                            <span className="font-semibold">{u.bhk} BHK</span>
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
            <Annotation className="!text-dark/40">NO AVAILABLE PLOTS MATCH FILTERS</Annotation>
            <button
              onClick={() => { setBhkFilter("all"); setPriceFilter("all"); setSortByArea("none"); }}
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
   8. LOCATION ADVANTAGES & MAP (Styled SVG Map Component)
   =========================================================================== */
function LocationAdvantagesSection({
  nearbyPlaces,
  coordinates: _coordinates,
  rera: _rera
}: {
  nearbyPlaces: ProjectData["nearbyPlaces"];
  coordinates: ProjectData["coordinates"];
  rera: string;
}) {
  const visibleNearbyPlaces = (nearbyPlaces || []).slice(0, 6);

  return (
    <SectionWrapper dark={false} className="!py-12 md:!py-16 bg-[#F5F0E8] border-b border-dark/10">
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">

        {/* Left Side: Compact nearby places */}
        <div className="col-span-12 flex flex-col h-full space-y-7">
          <div className="space-y-6">
            <div>
              <SectionLabel >Connectivity</SectionLabel>
              <SectionHeadline size="lg" className="font-display font-light leading-none">
                Location advantages & <em className="font-normal italic">transit</em>
              </SectionHeadline>
            </div>

            <p className="text-sm text-dark/70 font-light max-w-xl">
              Positioned along Gwinnett County's central access ways, Sydney Oaks bridges the boundary between natural seclusion and rapid civic reach.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleNearbyPlaces.map((place, idx) => (
              <div
                key={idx}
                className="border border-dark/10 bg-cream/55 p-4 flex justify-between items-center gap-4 text-dark transition-colors hover:border-rust/30 hover:bg-rust/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-current/15">
                    <MapPin size={15} />
                  </span>
                  <div>
                    <span className="text-xs font-bold block">{place.name}</span>
                    <span className="text-[9px] text-dark/50 uppercase block font-semibold tracking-wider mt-0.5">{place.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold block">{place.time}</span>
                  <span className="text-[9px] text-dark/50 block font-light">{place.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

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
      price: "From mid $500s",
      location: "Forsyth County, GA",
      details: "Private Wooded Enclave",
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
                  href="/contact"
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
                          href="/contact"
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
  onClose
}: {
  images: { src: string; alt: string }[];
  currentIdx: number;
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
          <Annotation light className="!text-rust">Sydney Oaks Visual Album</Annotation>
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
            src={images[activeIdx].src}
            alt={images[activeIdx].alt}
            fill
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
