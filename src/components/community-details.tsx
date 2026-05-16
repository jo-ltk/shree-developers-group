"use client";
import { useState } from "react";
import {
  MapPin,
  Building2,
  Users,
  Navigation,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeadline } from "@/components/ui/section-headline";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { Annotation } from "./ui/annotation";
import { BodyText } from "./ui/body-text";

const features = [
  {
    num: "01",
    title: "Luxury Residences",
    icon: Building2,
  },
  {
    num: "02",
    title: "Family Community",
    icon: Users,
  },
  {
    num: "03",
    title: "Prime Connectivity",
    icon: Navigation,
  },
  {
    num: "04",
    title: "Premium Amenities",
    icon: Shield,
  },
];

export function CommunityDetails() {
  return (
    <section className="relative bg-[#160E0A] overflow-hidden min-h-0 md:min-h-[65svh] flex items-center pt-8 pb-0 md:py-24 lg:py-32">
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2200&auto=format&fit=crop"
          alt="Sydney Oaks"
          className="w-full h-full object-cover opacity-30 scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160E0A]/88 via-[#160E0A]/72 to-[#160E0A]/96" />
      </div>

      {/* TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(212,63,51,0.015) 3px, rgba(212,63,51,0.015) 4px)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-[2] w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-12 gap-0 md:gap-12 items-center">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap flex-1 min-w-0">
            <Annotation className="!text-[#D43F33] !font-bold responsive-stat-label">
              Community Details
            </Annotation>

            <SectionHeadline
              size="xl"
              className="text-white responsive-headline-xl m-0 leading-tight"
            >
              Sydney Oaks<span className="text-[#D43F33]">.</span>
            </SectionHeadline>

            <div className="flex items-center responsive-minimum-gap">
              <MapPin className="text-[#D43F33] w-[14px] h-[14px]" strokeWidth={2} />
              <Annotation className="!text-[#F5F0E8]/80 !font-medium responsive-stat-label">
                Suwanee, Georgia
              </Annotation>
            </div>

            <BodyText
              className="!text-white/80 responsive-body-sm max-w-xl mx-auto lg:mx-0 m-0 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Luxury residences thoughtfully designed around community living,
              connectivity, architecture, and long-term value.
            </BodyText>

            {/* Actions Group */}
            <div className="flex flex-nowrap sm:flex-wrap items-center justify-center lg:justify-start responsive-minimum-gap w-full pt-4">
              <ButtonPrimary
                href="#request-info"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Req Info</span>
                <span className="hidden sm:inline">Request Information</span>
              </ButtonPrimary>

              <ButtonPrimary
                href="#visit"
                className="w-1/2 sm:w-auto !h-[50px] sm:!h-[56px] !px-2 sm:!px-10 !bg-white/5 border border-white/30 hover:!bg-white/10 !text-white flex justify-center text-center responsive-minimum-gap"
              >
                <span className="sm:hidden text-[9px]">Visit</span>
                <span className="hidden sm:inline">Schedule A Visit</span>
              </ButtonPrimary>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-8 lg:mt-0">
            <div className="-mx-6 sm:mx-0 grid grid-cols-2 gap-[1px] sm:gap-4 bg-white/10 sm:bg-transparent border-y sm:border-y-0 border-white/10">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="relative group bg-white/[0.02] border border-white/5 backdrop-blur-md py-3 px-2 sm:p-6 text-center hover:bg-white/[0.04] transition-all duration-500"
                >
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />

                  <div className="relative w-8 h-8 sm:w-14 sm:h-14 border border-[#D43F33]/20 flex items-center justify-center mx-auto mb-1 sm:mb-4 group-hover:border-[#D43F33]/50 transition-all duration-500">
                    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#D43F33]/40" />
                    <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#D43F33]/40" />
                    <item.icon
                      className="text-[#D43F33] transition-transform duration-500 group-hover:scale-110"
                      size={18}
                    />
                  </div>

                  <Annotation
                    className="!text-[#F5F0E8] !font-bold responsive-stat-label"
                  >
                    {item.title}
                  </Annotation>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
