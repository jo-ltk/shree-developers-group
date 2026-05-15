"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
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

export function ProjectDetailClient({ project }: { project: ProjectData }) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el as Element, {
          autoAlpha: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el as Element, start: "top 88%", once: true },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-hidden bg-cream">
      <NavbarEditorial />

      {/* 1. HERO SECTION */}
      <HeroSection project={project} />

      {/* 2. PLANS & SPECS */}
      <PlansSection plans={project.plans} />

      {/* 3. VISUAL GALLERY */}
      <RendersSection renders={project.renders} />

      {/* 4. AMENITIES */}
      <AmenitiesSection amenities={project.amenities} />

      {/* 5. LOCATION MAP */}
      <LocationSection locationMap={project.locationMap} locationName={project.location} />

      {/* 6. PROGRESS LOG */}
      <ProgressSection progress={project.progress} title={project.title} />

      {/* 7. ENQUIRY FORM */}
      <EnquirySection projectTitle={project.title} />

      {/* BACK TO PORTFOLIO */}
      <section className="bg-dark py-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <CrosshairIcon className="absolute top-1/4 left-1/4" />
          <CrosshairIcon className="absolute bottom-1/4 right-1/4" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center relative z-10">
          <Annotation light className="!text-rust">CONCLUSION / NEXT STEPS</Annotation>
          <SectionHeadline size="lg" light className="!text-[#F5F0E8] !text-[2.5rem] md:!text-[3.5rem] leading-none">
            Ready to explore<br />another address?
          </SectionHeadline>
          <Link
            href="/#gallery"
            className="group flex h-[54px] items-center gap-6 border border-rust/30 px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5F0E8] transition-all duration-500 rounded-full hover:border-rust hover:bg-rust/5"
          >
            Back to Portfolio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

function HeroSection({ project }: { project: ProjectData }) {
  return (
    <section className="relative">
      {/* Cinematic Header Image */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover transition-transform duration-[4000ms] ease-out scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0 px-8 pb-16 md:px-12 lg:px-20">
          <div className="max-w-[1450px] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Annotation light className="!text-rust">{project.index}</Annotation>
              <div className="h-px w-12 bg-[#F5F0E8]/20" />
              <Annotation light className="!text-[#F5F0E8] uppercase">{project.status}</Annotation>
            </div>
            <SectionHeadline 
              size="hero" 
              light 
              className="!text-[#F5F0E8] !text-[clamp(3.5rem,10vw,11rem)] !leading-[0.88]"
            >
              {project.title}
            </SectionHeadline>
            <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
              <Annotation light className="!text-[#F5F0E8]/60">TYPE: {project.type}</Annotation>
              <Annotation light className="!text-[#F5F0E8]/60">LOCATION: {project.location}</Annotation>
              <Annotation light className="!text-[#F5F0E8]/60">ESTABLISHED: {project.year}</Annotation>
            </div>
          </div>
        </div>
      </div>

      {/* Brief / Asymmetric Content */}
      <SectionWrapper dark={false} className="!py-16 md:!py-24">
        <div data-reveal className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <SectionLabel counter="01 / 04">Project Intent</SectionLabel>
            <SectionHeadline size="md" className="mt-8 !text-[2.2rem] md:!text-[2.8rem] leading-[1.1]">
              {project.highlight}
            </SectionHeadline>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <BodyText size="lg" className="mb-8 md:mb-12">
              {project.brief}
            </BodyText>
            <div className="grid grid-cols-2 gap-8 border-t border-dark/10 pt-8 md:pt-12">
              <div>
                <Annotation className="!text-rust mb-2">STATUS</Annotation>
                <BodyText size="sm">{project.status === "active" ? "Under Construction" : "Completed"}</BodyText>
              </div>
              <div>
                <Annotation className="!text-rust mb-2">TIMELINE</Annotation>
                <BodyText size="sm">{project.year} &mdash; Handover</BodyText>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}

function PlansSection({ plans }: { plans: ProjectData["plans"] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <SectionWrapper id="plans" dark={true} className="!py-16 md:!py-24 overflow-hidden">
      <div data-reveal className="grid grid-cols-12 gap-8 items-end mb-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel counter="02 / 04" light>Technical Study</SectionLabel>
          <SectionHeadline size="xl" light className="!text-[#F5F0E8] !text-[clamp(2rem,4vw,4rem)] leading-none">
            Spatial planning &<br /><em className="italic">layouts</em>
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <BodyText size="md" light className="!text-[#F5F0E8]/60">
            Engineered for airflow, light distribution, and family comfort. 
            View the verified architectural blueprints for this address.
          </BodyText>
        </div>
      </div>

      <div data-reveal className="flex flex-col gap-12 lg:flex-row">
        {/* Nav Tabs */}
        <div className="flex flex-row gap-4 overflow-x-auto lg:flex-col lg:w-72 lg:shrink-0 pb-4 lg:pb-0 scrollbar-hide">
          {plans.map((plan, i) => (
            <button
              key={plan.label}
              onClick={() => setActiveIdx(i)}
              className={`group flex items-center justify-between p-6 border transition-all duration-500 rounded-lg text-left ${
                activeIdx === i 
                  ? "bg-[#F5F0E8]/5 border-rust/40" 
                  : "bg-transparent border-[#F5F0E8]/10 hover:border-[#F5F0E8]/30"
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-[10px] font-bold tracking-widest uppercase mb-1 transition-colors ${activeIdx === i ? "text-rust" : "text-[#F5F0E8]/40"}`}>
                  Plan {i + 1}
                </span>
                <span className={`text-sm font-medium transition-colors ${activeIdx === i ? "text-[#F5F0E8]" : "text-[#F5F0E8]/60"}`}>
                  {plan.label}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-all duration-500 ${activeIdx === i ? "text-rust translate-x-1" : "text-[#F5F0E8]/20 group-hover:translate-x-1"}`} />
            </button>
          ))}
        </div>

        {/* Viewer */}
        <div className="relative flex-1 bg-[#1C1208]/40 border border-[#F5F0E8]/5 rounded-xl overflow-hidden min-h-[500px] flex items-center justify-center p-8 lg:p-12">
          <div className="absolute top-8 left-8 opacity-20"><CrosshairIcon light /></div>
          <div className="absolute top-8 right-8 opacity-20"><CrosshairIcon light /></div>
          <div className="absolute bottom-8 left-8 opacity-20"><CrosshairIcon light /></div>
          <div className="absolute bottom-8 right-8 opacity-20"><CrosshairIcon light /></div>
          
          <div className="relative w-full h-full aspect-[4/3]">
            <Image
              src={plans[activeIdx].image}
              alt={plans[activeIdx].label}
              fill
              className="object-contain transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <Annotation light className="!text-[#F5F0E8]/30 !text-[0.6rem] whitespace-nowrap">
              VERIFIED ARCHITECTURAL SPECIFICATION // {plans[activeIdx].label.toUpperCase()}
            </Annotation>
          </div>
        </div>
      </div>
      <FigMarker fig="fig. 24" label="Site Blueprints" light className="mt-16" />
    </SectionWrapper>
  );
}

function RendersSection({ renders }: { renders: ProjectData["renders"] }) {
  return (
    <SectionWrapper id="renders" dark={false} className="!py-16 md:!py-24">
      <div data-reveal className="mb-12">
        <SectionLabel counter="03 / 04">Visual Evidence</SectionLabel>
        <SectionHeadline size="xl" className="mt-8 !text-[clamp(2rem,4vw,4rem)] leading-none">
          Candid renders &<br /><em className="italic">walkthroughs</em>
        </SectionHeadline>
      </div>

      <div data-reveal className="grid grid-cols-12 gap-6">
        {renders.map((item, i) => (
          <div 
            key={item.label}
            className={`group relative overflow-hidden rounded-xl border border-dark/5 ${
              i % 3 === 0 ? "col-span-12 lg:col-span-8" : "col-span-12 lg:col-span-4"
            }`}
          >
            <div className={`relative w-full ${i % 3 === 0 ? "aspect-[16/9] lg:aspect-auto lg:h-[600px]" : "aspect-[4/5]"}`}>
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
              <Annotation light className="!text-[#F5F0E8]">{item.label}</Annotation>
              {item.isVideo && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-rust rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-cream border-b-[6px] border-b-transparent ml-1" />
                  </div>
                  <Annotation light className="!text-[#F5F0E8]/60 font-bold">PLAY WALKTHROUGH</Annotation>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <FigMarker fig="fig. 25" label="Render Mosaic" className="mt-16" />
    </SectionWrapper>
  );
}

function ProgressSection({ progress, title }: { progress: ProjectData["progress"]; title: string }) {
  return (
    <SectionWrapper id="progress" dark={false} className="!py-16 md:!py-24 bg-[#F5F0E8]/50 border-t border-dark/5">
      <div data-reveal className="mb-12">
        <SectionLabel counter="04 / 04">Development Log</SectionLabel>
        <SectionHeadline size="xl" className="mt-8 !text-[clamp(2rem,4vw,4rem)] leading-none">
          Chronological<br /><em className="italic">updates</em>
        </SectionHeadline>
      </div>

      <div data-reveal className="relative">
        <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-dark/10 -translate-x-px" />
        
        <div className="space-y-24">
          {progress.map((entry, i) => (
            <div 
              key={`${entry.date}-${i}`}
              className={`relative grid grid-cols-12 gap-8 md:gap-16 items-start ${
                i % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-3 h-3 bg-rust rounded-full ring-8 ring-cream" />

              {/* Text Side */}
              <div className={`col-span-12 md:col-span-5 pl-16 md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:order-2"}`}>
                <Annotation className="!text-rust mb-4">{entry.date}</Annotation>
                <BodyText size="lg" className="!leading-tight mb-4">{entry.note}</BodyText>
                <div className={`flex items-center gap-4 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  <Annotation className="!text-dark/40 !text-[0.6rem]">VERIFIED BY SITE OFFICE</Annotation>
                  <div className="w-6 h-px bg-dark/10" />
                </div>
              </div>

              {/* Image Side */}
              <div className="col-span-12 md:col-span-5 pl-16 md:pl-0 md:col-start-7">
                {entry.image ? (
                  <div className="group relative overflow-hidden rounded-lg border border-dark/5 bg-dark/5">
                    <div className="relative aspect-[16/10] grayscale hover:grayscale-0 transition-all duration-700">
                      <Image
                        src={entry.image}
                        alt={entry.note}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/10] border border-dashed border-dark/10 flex items-center justify-center rounded-lg">
                    <Annotation className="!text-dark/20 uppercase tracking-widest">Awaiting Media</Annotation>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FigMarker fig="fig. 26" label="Project Milestones" className="mt-24" />
    </SectionWrapper>
  );
}

function AmenitiesSection({ amenities }: { amenities: string[] }) {
  return (
    <SectionWrapper dark={true} className="!py-16 md:!py-24">
      <div data-reveal className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-4">
          <SectionLabel counter="05 / 07" light>Infrastructure</SectionLabel>
          <SectionHeadline size="lg" light className="!text-[#F5F0E8] leading-none">
            Curated<br /><em className="italic">amenities</em>
          </SectionHeadline>
          <BodyText size="md" light className="mt-8 !text-[#F5F0E8]/50">
            Every facility is designed to enhance the daily ritual of living, ensuring comfort, security, and community.
          </BodyText>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#F5F0E8]/10 border border-[#F5F0E8]/10">
            {amenities.map((amenity, i) => (
              <div key={i} className="bg-dark p-8 flex items-center gap-6 group">
                <div className="w-10 h-10 border border-[#F5F0E8]/20 flex items-center justify-center transition-colors group-hover:border-rust">
                  <CrosshairIcon light className="opacity-40" />
                </div>
                <Annotation light className="!text-[#F5F0E8]/80 font-bold">{amenity.toUpperCase()}</Annotation>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FigMarker fig="fig. 27" label="Facility Audit" light className="mt-16" />
    </SectionWrapper>
  );
}

function LocationSection({ locationMap, locationName }: { locationMap: string; locationName: string }) {
  return (
    <SectionWrapper className="!py-16 md:!py-24">
      <div data-reveal className="grid grid-cols-12 gap-8 items-end mb-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel counter="06 / 07">Connectivity</SectionLabel>
          <SectionHeadline size="xl" className="!text-[clamp(2rem,4vw,4rem)] leading-none">
            Location &<br /><em className="italic">surroundings</em>
          </SectionHeadline>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 text-right">
          <Annotation className="!text-rust mb-2">PRIMARY ADDRESS</Annotation>
          <BodyText size="lg">{locationName}</BodyText>
        </div>
      </div>

      <div data-reveal className="relative h-[500px] md:h-[650px] w-full overflow-hidden rounded-xl border border-dark/5 shadow-2xl">
        <Image
          src={locationMap}
          alt={`Location Map for ${locationName}`}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 pointer-events-none border-[20px] border-cream/10" />
        
        <div className="absolute bottom-8 right-8 bg-dark p-6 text-white max-w-xs">
          <Annotation light className="!text-rust mb-2">MAP LEGEND</Annotation>
          <BodyText light size="sm">
            Strategically positioned near major transit corridors, educational hubs, and healthcare facilities.
          </BodyText>
        </div>
      </div>
      <FigMarker fig="fig. 28" label="Geospatial Context" className="mt-16" />
    </SectionWrapper>
  );
}

function EnquirySection({ projectTitle }: { projectTitle: string }) {
  return (
    <SectionWrapper id="enquiry" dark={true} className="!py-24 md:!py-36 bg-[#1A2C1E]">
      <div className="grid grid-cols-12 gap-12 items-start">
        <div className="col-span-12 lg:col-span-5">
          <SectionLabel counter="07 / 07" light>Consultation</SectionLabel>
          <SectionHeadline size="xl" light className="!text-[#F5F0E8] leading-tight">
            Secure your<br />interest in<br />{projectTitle}
          </SectionHeadline>
          <BodyText light size="lg" className="mt-8 !text-[#F5F0E8]/60">
            Speak with our advisory team to receive the complete dossier, pricing tiers, and availability schedule for this address.
          </BodyText>
          
          <div className="mt-12 space-y-6">
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-[#F5F0E8]/20 flex items-center justify-center text-rust">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                   <Annotation light className="!text-[#F5F0E8]/40">ADVISORY LINE</Annotation>
                   <BodyText light className="font-bold">+1 (404) 555-0123</BodyText>
                </div>
             </div>
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-[#F5F0E8]/20 flex items-center justify-center text-rust">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                   <Annotation light className="!text-[#F5F0E8]/40">GENERAL INQUIRIES</Annotation>
                   <BodyText light className="font-bold">hello@shreedev.com</BodyText>
                </div>
             </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7 bg-[#F5F0E8] p-8 md:p-12 shadow-2xl relative">
           <div className="absolute top-0 right-0 p-8 opacity-10"><CrosshairIcon /></div>
           <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <Annotation className="!text-rust">FULL NAME</Annotation>
                    <input type="text" className="w-full bg-transparent border-b border-dark/20 py-2 focus:border-rust outline-none transition-colors" placeholder="Enter your name" />
                 </div>
                 <div className="space-y-2">
                    <Annotation className="!text-rust">EMAIL ADDRESS</Annotation>
                    <input type="email" className="w-full bg-transparent border-b border-dark/20 py-2 focus:border-rust outline-none transition-colors" placeholder="email@example.com" />
                 </div>
              </div>
              <div className="space-y-2">
                 <Annotation className="!text-rust">PHONE NUMBER</Annotation>
                 <input type="tel" className="w-full bg-transparent border-b border-dark/20 py-2 focus:border-rust outline-none transition-colors" placeholder="+1 (000) 000-0000" />
              </div>
              <div className="space-y-2">
                 <Annotation className="!text-rust">PREFERED UNIT TYPE</Annotation>
                 <select className="w-full bg-transparent border-b border-dark/20 py-4 focus:border-rust outline-none transition-colors appearance-none cursor-pointer">
                    <option>Select Option</option>
                    <option>2BHK Apartment</option>
                    <option>3BHK Premium</option>
                    <option>Penthouse / Duplex</option>
                    <option>Villa Plot</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <Annotation className="!text-rust">MESSAGE</Annotation>
                 <textarea rows={3} className="w-full bg-transparent border-b border-dark/20 py-2 focus:border-rust outline-none transition-colors resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full h-[54px] bg-dark text-white uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-rust transition-colors duration-500">
                 Send Inquiry
              </button>
           </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
