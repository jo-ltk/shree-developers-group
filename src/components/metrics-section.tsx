"use client";

import {
  MapPin,
  Phone,
  Dumbbell,
  ShieldCheck,
  Waves,
  Baby,
  ArrowRight,
  Coffee,
  MessageCircle,
  Instagram,
  Trees,
  Building2,
  Users,
  Navigation,
  Shield,
} from "lucide-react";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { SectionLabel } from "./ui/section-label";


const amenities = [
  {
    icon: Trees,
    title: "Landscaped Parks",
    body: "Nature-focused outdoor spaces designed for peaceful community living.",
    num: "01"
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    body: "Resort-inspired leisure amenities with refined detailing.",
    num: "02"
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    body: "Modern wellness facilities crafted for everyday routines.",
    num: "03"
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    body: "Secure gated access with integrated safety infrastructure.",
    num: "04"
  },
  {
    icon: Baby,
    title: "Children’s Play Area",
    body: "Safe and engaging recreational spaces for families.",
    num: "05"
  },
  {
    icon: Coffee,
    title: "Clubhouse",
    body: "Elegant social spaces for gatherings and relaxation.",
    num: "06"
  },
];

const overviewFeatures = [
  { 
    num: "01", 
    title: "Neighborhood Feel.",
    description: "A close-knit community atmosphere where neighbors connect and thrive together."
  },
  { 
    num: "02", 
    title: "Top School Access.",
    description: "Proximity to the region's most prestigious educational institutions and private schools."
  },
  { 
    num: "03", 
    title: "Safe Community.",
    description: "24/7 monitored security and gated access ensuring total peace of mind for families."
  },
  { 
    num: "04", 
    title: "Connected Lifestyle.",
    description: "Effortless access to major highways, business districts, and urban conveniences."
  },
  { 
    num: "05", 
    title: "Walkable Planning.",
    description: "Thoughtfully designed pathways connecting green spaces, amenities, and residences."
  },
  { 
    num: "06", 
    title: "Premium Architecture.",
    description: "Timeless design language blending modern luxury with functional residential comfort."
  },
];

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
];export default function CommunityDetailsPage() {
  return (
    <main className="bg-[#F5F0E8] overflow-hidden">
      {/* HERO */}

      <section className="relative bg-[#160E0A] overflow-hidden min-h-0 md:min-h-[85svh] flex items-center py-12 md:py-0">
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

        <div className="relative z-[2] w-full max-w-[1450px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-10 md:py-14">
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">

            {/* LEFT */}

            <div className="col-span-12 lg:col-span-6 text-center lg:text-left">

              {/* TOP */}

              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5 flex-wrap">

                <span
                  className="text-[#D43F33] font-semibold uppercase"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                  }}
                >
                  Community Details
                </span>

               
              </div>

              {/* TITLE */}
<SectionHeadline
          size="xl"
          className="mb-7 text-white" 
        >
            Sydney Oaks<span className="text-[#D43F33]">.</span>
        </SectionHeadline>
              
              {/* LOCATION */}

              <div className="flex flex-col items-center lg:items-start gap-3 mb-8">

                <div className="flex items-center gap-3">

                  <MapPin
                    className="text-[#D43F33] w-[16px] h-[16px]"
                    strokeWidth={1.5}
                  />

                  <span
                    className="text-[#F5F0E8]/65 uppercase leading-[1.6] font-medium"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.22em",
                    }}
                  >
                    Suwanee, Georgia
                  </span>
                </div>
              </div>

              {/* DESCRIPTION */}

              <p
                className="!text-white text-[1rem] sm:text-[1.1rem] md:text-[1.35rem] leading-[1.7] max-w-xl mx-auto lg:mx-0 mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Luxury residences thoughtfully designed around community living,
                connectivity, architecture, and long-term value.
              </p>

              {/* BUTTONS */}

              <div className="flex flex-col gap-4 w-full max-w-[340px] mx-auto lg:mx-0">
                <ButtonPrimary 
                  href="#request-info"
                  className="w-full justify-between !h-[60px] !text-white"
                >
                  Request Information
                </ButtonPrimary>

                <ButtonPrimary 
                  href="#visit"
                  className="w-full justify-between !h-[60px] !bg-white/5 border border-white/30 hover:!bg-white/10 !text-white"
                >
                  Schedule A Visit
                </ButtonPrimary>
              </div>
            </div>

            {/* RIGHT */}

            <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-6 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {features.map((item) => (
                  <div
                    key={item.title}
                    className="relative group bg-white/[0.02] border border-white/5 backdrop-blur-md p-5 sm:p-6 text-center hover:bg-white/[0.04] transition-all duration-500"
                  >
                    {/* CARD CORNERS */}
                    <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D43F33]/40 transition-colors" />

                    {/* ICON BOX */}
                    <div className="relative w-14 h-14 border border-[#D43F33]/20 flex items-center justify-center mx-auto mb-4 group-hover:border-[#D43F33]/50 transition-all duration-500">
                      <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#D43F33]/40" />
                      <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#D43F33]/40" />
                      <item.icon
                        className="text-[#D43F33] transition-transform duration-500 group-hover:scale-110"
                        size={22}
                      />
                    </div>

                    {/* TITLE */}
                    <h3
                      className="text-[#F5F0E8] leading-[1.35] uppercase"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
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

      {/* COMMUNITY OVERVIEW */}
      <SectionWrapper className="py-20 md:py-24">
        <div className="grid grid-cols-12 gap-10 items-center text-center lg:text-left">
          <div className="col-span-12 lg:col-span-5">
            <span
              className="inline-block uppercase font-semibold tracking-[0.25em] text-dark/60 mb-6 md:mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem" }}
            >Community Overview</span>

            <SectionHeadline size="xl" className="mt-0">
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

        {/* SHORT CARDS WITH COLOR TRANSITION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1208]/10 mt-16 border-y border-[#1C1208]/10">
          {overviewFeatures.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ backgroundColor: "#1C1208" }}
              transition={{ 
                duration: 0.5, 
                backgroundColor: { duration: 0.4, ease: "circOut" } 
              }}
              className="relative bg-[#F5F0E8] p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[240px] group cursor-pointer"
            >
              {/* LARGE DECORATIVE NUMBER */}
              <span 
                className="absolute -bottom-6 -right-6 text-black/[0.03] font-serif text-[10rem] md:text-[12rem] leading-none pointer-events-none select-none transition-all duration-700 group-hover:text-white/[0.05] group-hover:-translate-y-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.num}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <Annotation className="!text-[#1C1208]/40 group-hover:!text-white/40 transition-colors">0{index + 1}</Annotation>
                  <div className="group-hover:rotate-90 group-hover:scale-125 transition-all duration-500">
                    <CrosshairIcon className="group-hover:text-white" />
                  </div>
                </div>

                <SectionHeadline size="md" className="leading-tight group-hover:text-white transition-colors duration-500">
                  {item.title}
                </SectionHeadline>
              </div>

              <div className="relative z-10 mt-4 opacity-60 group-hover:opacity-100 transition-all duration-500">
                <BodyText size="sm" className="text-[#1C1208]/60 group-hover:!text-white leading-snug max-w-[240px]">
                  {item.description}
                </BodyText>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* AMENITIES */}
      <SectionWrapper className="py-20 md:py-24">
        <div className="grid grid-cols-12 gap-10 items-end mb-16 text-center lg:text-left">
          {/* LEFT SIDE: DESCRIPTION */}
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <BodyText size="lg" className="max-w-2xl mx-auto lg:mx-0">
              Thoughtfully curated facilities designed to elevate your daily routine. 
              From serene wellness spaces to active community hubs, every amenity 
              reflects a commitment to refined living and personal well-being.
            </BodyText>
          </div>

          {/* RIGHT SIDE: HEADLINE */}
          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 text-center lg:text-right">
            <span
              className="inline-block uppercase font-semibold tracking-[0.25em] text-dark/60 mb-6 md:mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem" }}
            >Amenities</span>

            <SectionHeadline size="xl" className="mt-0 leading-[1.1]">
              Spaces designed
              <br />
              for everyday life
              <span className="text-[#D43F33]">.</span>
            </SectionHeadline>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1208]/10 mt-16 border-y border-[#1C1208]/10">
          {amenities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ backgroundColor: "#D43F33" }}
              transition={{ 
                duration: 0.5, 
                backgroundColor: { duration: 0.4, ease: "circOut" } 
              }}
              className="relative bg-[#F5F0E8] p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[240px] group cursor-pointer"
            >
              {/* LARGE DECORATIVE NUMBER */}
              <span 
                className="absolute -bottom-6 -right-6 text-black/[0.03] font-serif text-[10rem] md:text-[12rem] leading-none pointer-events-none select-none transition-all duration-700 group-hover:text-white/[0.1] group-hover:-translate-y-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.num}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <Annotation className="!text-[#1C1208]/40 group-hover:!text-white/60 transition-colors">{item.num}</Annotation>
                  <div className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <item.icon size={26} className="text-[#D43F33] group-hover:text-white transition-colors" />
                  </div>
                </div>

                <SectionHeadline size="md" className="leading-tight group-hover:text-white transition-colors duration-500">
                  {item.title}
                </SectionHeadline>
              </div>

              <div className="relative z-10 mt-4 opacity-60 group-hover:opacity-100 transition-all duration-500">
                <BodyText size="sm" className="text-[#1C1208]/60 group-hover:text-white/80 leading-snug max-w-[240px]">
                  {item.body}
                </BodyText>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ENQUIRY */}
      <section id="request-info" className="py-20 md:py-32 bg-[#F5F0E8]">
        <div className="px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-12 gap-14 lg:gap-24">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-5 text-center lg:text-left">
              <span
                className="inline-block uppercase font-semibold tracking-[0.25em] text-dark/60 mb-6 md:mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem" }}
              >Contact Us</span>
              <SectionHeadline
                size="xl"
                className="leading-[1.05] mt-0 mb-8"
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
                <motion.a
                  href="tel:+17705550123"
                  whileHover={{ backgroundColor: "#1C1208" }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="flex items-center gap-4 p-6 bg-white border border-[#1C1208]/5 group transition-all"
                >
                  <div className="w-12 h-12 bg-[#1C1208]/5 flex items-center justify-center text-[#1C1208] group-hover:bg-[#D43F33] group-hover:text-white transition-all duration-500">
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="text-left">
                    <Annotation className="!text-[#1C1208]/30 group-hover:!text-white/40 mb-1 transition-colors">
                      Call Now
                    </Annotation>
                    <span
                      className="font-bold tracking-widest text-[#1C1208] group-hover:text-white transition-colors"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      +1 (770) 555-0123
                    </span>
                  </div>
                </motion.a>

                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ backgroundColor: "#1C1208" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex items-center justify-center gap-3 p-6 bg-white border border-[#1C1208]/5 group"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white group-hover:scale-110 transition-all" />
                    <span
                      className="uppercase font-bold tracking-[0.2em] text-[0.65rem] text-[#1C1208] group-hover:text-white transition-colors"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      WhatsApp
                    </span>
                  </motion.a>

                  <motion.a
                    href="#"
                    whileHover={{ backgroundColor: "#1C1208" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex items-center justify-center gap-3 p-6 bg-white border border-[#1C1208]/5 group"
                  >
                    <Instagram className="w-5 h-5 text-[#E4405F] group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all" />
                    <span
                      className="uppercase font-bold tracking-[0.2em] text-[0.65rem] text-[#1C1208] group-hover:text-white transition-colors"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Instagram
                    </span>
                  </motion.a>
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
                  <select className="w-full bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-4 focus:outline-none appearance-none cursor-pointer">
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