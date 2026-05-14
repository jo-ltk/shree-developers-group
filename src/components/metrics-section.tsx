"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Dumbbell,
  ShieldCheck,
  Waves,
  Baby,
  ArrowRight,
  ArrowDown,
  Coffee,
  MessageCircle,
  Instagram,
  Trees,
} from "lucide-react";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { BrandMark } from "@/components/ui/brand-mark";
import { SectionLabel } from "./ui/section-label";
import { GridLines } from "@/components/ui/grid-lines";

const amenities = [
  {
    icon: Trees,
    title: "Landscaped Parks",
    body: "Nature-focused outdoor spaces designed for peaceful community living.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    body: "Resort-inspired leisure amenities with refined detailing.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    body: "Modern wellness facilities crafted for everyday routines.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    body: "Secure gated access with integrated safety infrastructure.",
  },
  {
    icon: Baby,
    title: "Children’s Play Area",
    body: "Safe and engaging recreational spaces for families.",
  },
  {
    icon: Coffee,
    title: "Clubhouse",
    body: "Elegant social spaces for gatherings and relaxation.",
  },
];

export default function CommunityDetailsPage() {
  return (
    <main className="bg-[#F5F0E8] overflow-hidden">
      {/* HERO */}

      <section className="relative bg-[#160E0A] overflow-hidden min-h-[100svh] lg:min-h-[95vh] flex items-center">
        {/* BG */}

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2200&auto=format&fit=crop"
            alt="Sydney Oaks"
            className="w-full h-full object-cover opacity-30 scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#160E0A]/90 via-[#160E0A]/70 to-[#160E0A]/95" />
        </div>

        {/* TEXTURE */}

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(212,63,51,0.015) 3px, rgba(212,63,51,0.015) 4px)",
          }}
        />

        <GridLines />

        {/* CONTENT */}

        <div className="relative z-[2] w-full max-w-[1450px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-20 md:py-24">
          <div className="grid grid-cols-12 gap-14 lg:gap-10 items-center">
            {/* LEFT */}

            <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
              {/* TOP */}

              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8 flex-wrap">
                <span
                  className="text-[#D43F33] font-semibold uppercase"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                  }}
                >
                  Community Details
                </span>

                <div className="w-4 h-4 relative opacity-50 hidden sm:block">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#F5F0E8] -translate-y-1/2"></div>
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#F5F0E8] -translate-x-1/2"></div>
                </div>

                <span
                  className="text-[#F5F0E8]/40 uppercase font-medium"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                  }}
                >
                  01 / 06
                </span>
              </div>

              {/* TITLE */}

              <h1
                className="text-[#F5F0E8] leading-[0.92] mb-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(4rem,14vw,8.5rem)",
                  fontWeight: 400,
                }}
              >
                Sydney
                <br />
                Oaks<span className="text-[#D43F33]">.</span>
              </h1>

              {/* LOCATION */}

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12">
                <div className="flex items-center gap-3">
                  <MapPin
                    className="text-[#D43F33] w-[18px] h-[18px]"
                    strokeWidth={1.5}
                  />

                  <span
                    className="text-[#F5F0E8]/60 uppercase leading-[1.6] font-medium text-left"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                    }}
                  >
                    Suwanee,
                    <br />
                    Georgia
                  </span>
                </div>

                <div className="hidden sm:block w-10 h-px bg-[#D43F33]/40"></div>

                <span
                  className="text-[#F5F0E8]/60 uppercase leading-[1.6] font-medium"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                  }}
                >
                  34.0523° N · 84.0657° W
                </span>
              </div>

              {/* DESCRIPTION */}

              <p
                className="text-[#F5F0E8]/60 text-[1.2rem] md:text-[1.45rem] leading-[1.6] max-w-xl mx-auto lg:mx-0 mb-14"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Luxury residences thoughtfully designed around community living,
                connectivity, architecture, and long-term value.
              </p>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                {/* PRIMARY */}

                <button className="bg-[#D43F33] text-white py-5 px-6 w-full sm:w-64 relative group flex items-center justify-between hover:bg-[#b03228] transition-colors">
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40" />

                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40" />

                  <span
                    className="uppercase font-bold text-left leading-[1.3]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                    }}
                  >
                    Request
                    <br />
                    Information
                  </span>

                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center rounded-sm">
                    <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                  </div>
                </button>

                {/* SECONDARY */}

                <div className="flex items-center gap-5">
                  <button className="group flex items-center gap-3">
                    <span
                      className="text-[#F5F0E8] uppercase font-bold leading-[1.3] text-left"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                      }}
                    >
                      Schedule
                      <br />
                      A Visit
                    </span>

                    <ArrowRight
                      className="w-[14px] h-[14px] text-[#F5F0E8]"
                      strokeWidth={2.5}
                    />
                  </button>

                  <div className="w-[48px] h-[48px] rounded-full border border-[#F5F0E8]/20 flex items-center justify-center">
                    <ArrowDown
                      className="w-5 h-5 text-[#F5F0E8]/80"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-20 lg:mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-1 border-t border-[#F5F0E8]/10 lg:border-t-0 lg:border-l lg:pl-14">
                {[
                  { num: "01", title: "Luxury\nResidences" },
                  { num: "02", title: "Family\nCommunity" },
                  { num: "03", title: "Prime\nConnectivity" },
                  { num: "04", title: "Premium\nAmenities" },
                ].map((item, idx) => (
                  <div
                    key={item.num}
                    className={`flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-10 py-10 border-b border-[#F5F0E8]/10 text-center lg:text-left ${
                      idx % 2 === 0 ? "border-r lg:border-r-0" : ""
                    }`}
                  >
                    <span
                      className="text-[#F5F0E8]/30 lg:pt-3 font-medium"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {item.num}
                    </span>

                    <h3
                      className="text-[#F5F0E8]/80 whitespace-pre-line leading-[1.1]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
                        fontWeight: 400,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}

      <SectionWrapper className="py-20 md:py-24">
        <div className="grid grid-cols-12 gap-10 items-center text-center lg:text-left">
          <div className="col-span-12 lg:col-span-5">
            <Annotation>COMMUNITY OVERVIEW</Annotation>

            <SectionHeadline size="xl" className="mt-5">
              Built around
              <br />
              family living
            </SectionHeadline>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <BodyText size="lg" className="max-w-3xl mx-auto lg:mx-0">
              Sydney Oaks combines premium planning, nearby schools, connected
              commute access, landscaped spaces, and a refined residential
              atmosphere designed for modern families.
            </BodyText>
          </div>
        </div>

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1208]/10 mt-16">
          {[
            "Neighborhood Feel",
            "Top School Access",
            "Safe Community",
            "Connected Lifestyle",
            "Walkable Planning",
            "Premium Architecture",
          ].map((item, index) => (
            <div
              key={item}
              className="bg-[#F5F0E8] p-8 md:p-10 text-center md:text-left hover:bg-[#EDE8DF] transition-all duration-700"
            >
              <div className="flex items-center justify-between mb-10">
                <Annotation>0{index + 1}</Annotation>

                <CrosshairIcon />
              </div>

              <SectionHeadline size="md">
                {item}
              </SectionHeadline>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* AMENITIES */}

      <SectionWrapper className="py-20 md:py-24">
        <div className="text-center mb-16">
          <Annotation>AMENITIES</Annotation>

          <SectionHeadline size="xl" className="mt-5">
            Spaces designed
            <br />
            for everyday life
          </SectionHeadline>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1208]/10">
          {amenities.map((item, index) => (
            <div
              key={item.title}
              className="bg-[#F5F0E8] p-8 md:p-12 hover:bg-[#EDE8DF] transition-all duration-700 text-center md:text-left"
            >
              <div className="flex items-center justify-between mb-10">
                <Annotation>0{index + 1}</Annotation>

                <item.icon
                  size={26}
                  className="text-[#D43F33]"
                />
              </div>

              <SectionHeadline size="md">
                {item.title}
              </SectionHeadline>

              <BodyText className="mt-4">
                {item.body}
              </BodyText>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ENQUIRY */}

      <section
        id="enquiry"
        className="py-20 md:py-32 bg-[#F5F0E8]"
      >
        <div className="px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-12 gap-14 lg:gap-24">
            {/* LEFT */}

            <div className="col-span-12 lg:col-span-5 text-center lg:text-left">
              <SectionLabel>Contact Us</SectionLabel>

              <SectionHeadline
                size="xl"
                className="leading-[0.98] mt-5 mb-8"
              >
                Start the
                <br />
                conversation
              </SectionHeadline>

              <BodyText className="mb-12 max-w-lg mx-auto lg:mx-0">
                Our advisors are available to provide detailed project
                briefings, pricing schedules, and site visit coordination.
              </BodyText>

              <div className="space-y-4">
                <a
                  href="tel:#"
                  className="flex items-center gap-4 p-5 bg-white border border-[#1C1208]/5 hover:border-rust transition-all"
                >
                  <div className="w-10 h-10 bg-[#1C1208]/5 flex items-center justify-center text-[#1C1208]">
                    <Phone className="w-4 h-4" />
                  </div>

                  <div className="text-left">
                    <Annotation className="!text-[#1C1208]/30 mb-1">
                      Call Now
                    </Annotation>

                    <span
                      className="font-bold tracking-widest text-[#1C1208]"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      +1 (770) 555-0123
                    </span>
                  </div>
                </a>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex items-center justify-center gap-3 p-5 bg-white border border-[#1C1208]/5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />

                    <span
                      className="uppercase font-bold tracking-[0.2em] text-[0.6rem]"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      WhatsApp
                    </span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-3 p-5 bg-white border border-[#1C1208]/5"
                  >
                    <Instagram className="w-4 h-4 text-[#E4405F]" />

                    <span
                      className="uppercase font-bold tracking-[0.2em] text-[0.6rem]"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="col-span-12 lg:col-span-7">
              <form className="bg-white p-6 md:p-12 border border-[#1C1208]/5 space-y-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none"
                      placeholder="+1 (000) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="uppercase tracking-[0.2em] text-[0.55rem] font-bold text-[#1C1208]/40">
                    Preferred Callback
                  </label>

                  <select className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none appearance-none">
                    <option>Morning (9AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 7PM)</option>
                  </select>
                </div>

                <div className="pt-4">
                  <ButtonPrimary href="#" className="w-full">
                    Submit Enquiry
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}