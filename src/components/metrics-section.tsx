"use client";
import { useState } from "react";

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
  ChevronDown
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { SectionLabel } from "./ui/section-label";
import { ElysianGatesDetails } from "./community-details";

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
];

export default function CommunityDetailsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Morning (9AM - 12PM)");
  const [showMore, setShowMore] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);

  const timeOptions = [
    "Morning (9AM - 12PM)",
    "Afternoon (12PM - 4PM)",
    "Evening (4PM - 7PM)"
  ];

  return (
    <div className="bg-[#F5F0E8] overflow-hidden">
      {/* SECTION ANCHOR */}
      <div id="visit" className="scroll-mt-20" />

      {/* COMMUNITY OVERVIEW */}
      <SectionWrapper noPadding className="!pt-8 !pb-0 md:!pt-24 md:!pb-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-10 items-center justify-items-center text-center lg:text-left w-full">
          <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start responsive-minimum-gap">
            <SectionLabel className="mx-auto lg:mx-0 !mb-0">Community Overview</SectionLabel>

            <SectionHeadline size="xl" className="m-0 text-center lg:text-left mx-auto lg:mx-0 responsive-headline-xl leading-tight">
              Built around{" "}
              <br className="hidden sm:block" />
              family living
            </SectionHeadline>
          </div>

          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start">
            <BodyText size="lg" className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left responsive-body-sm">
              Sydney Oaks combines premium planning, nearby schools, connected
              commute access, landscaped spaces, and a refined residential
              atmosphere designed for modern families.
            </BodyText>
          </div>
        </div>

        {/* CARDS */}

        {/* SHORT CARDS WITH COLOR TRANSITION */}
        <div className="-mx-6 sm:-mx-8 md:-mx-12 lg:-mx-20 xl:-mx-24 2xl:-mx-32 grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1208]/10 mt-8 border-y border-[#1C1208]/10">
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
              className={`relative bg-[#F5F0E8] p-4 sm:p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[140px] sm:min-h-[240px] group cursor-pointer ${
                index >= 2 && !showMore ? "hidden lg:flex" : "flex"
              }`}
            >
              {/* LARGE DECORATIVE NUMBER */}
              <span 
                className="absolute -bottom-2 -right-2 sm:-bottom-6 sm:-right-6 text-black/[0.03] font-serif text-[4rem] sm:text-[10rem] md:text-[12rem] leading-none pointer-events-none select-none transition-all duration-700 group-hover:text-white/[0.05] group-hover:-translate-y-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.num}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-8">
                  <Annotation className="!text-dark/40 group-hover:!text-white/40 transition-colors responsive-stat-label">0{index + 1}</Annotation>
                  <div className="group-hover:rotate-90 group-hover:scale-125 transition-all duration-500">
                    <CrosshairIcon className="group-hover:text-white w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <SectionHeadline size="sm" className="leading-tight group-hover:!text-white transition-colors duration-500">
                  {item.title}
                </SectionHeadline>
              </div>

              <div className="relative z-10 mt-1.5 sm:mt-4 opacity-60 group-hover:opacity-100 transition-all duration-500">
                <BodyText size="sm" className="text-dark/60 group-hover:!text-white leading-snug max-w-[240px] responsive-body-sm">
                  {item.description}
                </BodyText>
              </div>
            </motion.div>
          ))}
        </div>

        {!showMore && (
          <div className="flex justify-center mt-10 mb-10 lg:hidden">
            <button 
              onClick={() => setShowMore(true)}
              className="group relative inline-flex h-[46px] sm:h-[52px] items-center gap-3 sm:gap-4 bg-rust px-5 sm:px-8 text-white no-underline overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,63,51,0.27)] responsive-btn-text cursor-pointer"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
              }}
            >
              {/* Corner accents */}
              <span className="absolute top-[5px] left-[5px] w-2 h-2 pointer-events-none border-t border-l border-white/30" />
              <span className="absolute bottom-[5px] right-[5px] w-2 h-2 pointer-events-none border-b border-r border-white/30" />

              <span className="uppercase font-bold whitespace-nowrap relative z-10">Read More</span>

              {/* Arrow box */}
              <div className="flex items-center justify-center w-7 h-7 border border-white/30 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </SectionWrapper>

      <ElysianGatesDetails />
      <ElysianGatesOverview />

      {/* AMENITIES */}
      <SectionWrapper noPadding className="!pt-4 !pb-0 md:!pt-4 md:!pb-0">
        <div className="flex flex-col items-center text-center gap-2 mb-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-end lg:text-left">
          {/* RIGHT SIDE: HEADLINE — shown first on mobile */}
          <div className="lg:col-span-5 lg:order-2 flex flex-col items-center lg:items-end w-full lg:text-right responsive-minimum-gap">
            <SectionLabel className="mx-auto lg:mx-0 !mb-0">Amenities</SectionLabel>

            <SectionHeadline 
              size="xl" 
              className="mt-0 leading-[1.1] text-center lg:text-right mx-auto lg:mx-0 whitespace-normal responsive-headline-xl"
            >
              Spaces designed for everyday life
            </SectionHeadline>
          </div>

          {/* LEFT SIDE: DESCRIPTION */}
          <div className="lg:col-span-7 lg:order-1 flex flex-col items-center lg:items-start w-full">
            <BodyText size="lg" className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left responsive-body-sm">
              Thoughtfully curated facilities designed to elevate your daily routine. 
              From serene wellness spaces to active community hubs, every amenity 
              reflects a commitment to refined living and personal well-being.
            </BodyText>
          </div>
        </div>

        <div className="-mx-6 sm:-mx-8 md:-mx-12 lg:-mx-20 xl:-mx-24 2xl:-mx-32 grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1208]/10 mt-8 border-y border-[#1C1208]/10">
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
              className={`relative bg-[#F5F0E8] p-4 sm:p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[140px] sm:min-h-[240px] group cursor-pointer ${
                index >= 2 && !showMoreAmenities ? "hidden lg:flex" : "flex"
              }`}
            >
              {/* LARGE DECORATIVE NUMBER */}
              <span 
                className="absolute -bottom-2 -right-2 sm:-bottom-6 sm:-right-6 text-black/[0.03] font-serif text-[4rem] sm:text-[10rem] md:text-[12rem] leading-none pointer-events-none select-none transition-all duration-700 group-hover:text-white/[0.1] group-hover:-translate-y-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.num}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-8">
                  <Annotation className="!text-dark/40 group-hover:!text-white/60 transition-colors responsive-stat-label">{item.num}</Annotation>
                  <div className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <item.icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-rust group-hover:text-white transition-colors" />
                  </div>
                </div>

                <SectionHeadline size="sm" className="leading-tight group-hover:!text-white transition-colors duration-500">
                  {item.title}
                </SectionHeadline>
              </div>

              <div className="relative z-10 mt-1.5 sm:mt-4 opacity-60 group-hover:opacity-100 transition-all duration-500">
                <BodyText size="sm" className="text-dark/60 group-hover:!text-white leading-snug max-w-[240px] responsive-body-sm">
                  {item.body}
                </BodyText>
              </div>
            </motion.div>
          ))}
        </div>

        {!showMoreAmenities && (
          <div className="flex justify-center mt-10 lg:hidden">
            <button 
              onClick={() => setShowMoreAmenities(true)}
              className="group relative inline-flex h-[46px] sm:h-[52px] items-center gap-3 sm:gap-4 bg-rust px-5 sm:px-8 text-white no-underline overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,63,51,0.27)] responsive-btn-text cursor-pointer"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
              }}
            >
              {/* Corner accents */}
              <span className="absolute top-[5px] left-[5px] w-2 h-2 pointer-events-none border-t border-l border-white/30" />
              <span className="absolute bottom-[5px] right-[5px] w-2 h-2 pointer-events-none border-b border-r border-white/30" />

              <span className="uppercase font-bold whitespace-nowrap relative z-10">Read More</span>

              {/* Arrow box */}
              <div className="flex items-center justify-center w-7 h-7 border border-white/30 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </SectionWrapper>

      {/* ENQUIRY */}
      <section id="request-info" className="!pt-6 !pb-6 md:!pt-16 md:!pb-16 bg-[#F5F0E8]">
        <div className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-24 items-center justify-items-center w-full">
            {/* LEFT */}
            <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left responsive-minimum-gap">
              <SectionLabel className="mx-auto lg:mx-0 !mb-0">Contact Us</SectionLabel>
              <SectionHeadline
                size="xl"
                className="leading-[1.05] m-0 text-center lg:text-left mx-auto lg:mx-0 whitespace-nowrap responsive-headline-xl"
              >
                Start the conversation
              </SectionHeadline>

              <BodyText className="m-0 max-w-lg mx-auto lg:mx-0 text-center lg:text-left opacity-60 responsive-body-sm">
                Our advisors are available to provide detailed project
                briefings, pricing schedules, and site visit coordination.
              </BodyText>

              <div className="space-y-4 w-full mx-auto lg:mx-0">
                <motion.a
                  href="tel:+17705550123"
                  whileHover={{ backgroundColor: "#1C1208" }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="flex items-center justify-between gap-4 p-5 md:p-6 bg-white border border-[#1C1208]/5 group transition-all w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 md:w-13 md:h-13 bg-[#1C1208]/5 flex items-center justify-center text-[#1C1208] group-hover:bg-[#D43F33] group-hover:text-white transition-all duration-500 flex-shrink-0">
                      <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="text-left">
                      <Annotation className="!text-dark/30 group-hover:!text-white/40 mb-1 transition-colors responsive-stat-label">
                        Call Now
                      </Annotation>
                      <span
                        className="font-sans font-bold tracking-widest text-dark group-hover:text-white transition-colors"
                        style={{ fontSize: "1rem", letterSpacing: "0.08em" }}
                      >
                        +1 (770) 555-0123
                      </span>
                    </div>
                  </div>

                  {/* Right arrow */}
                  <div className="w-8 h-8 flex items-center justify-center border border-[#1C1208]/10 group-hover:border-white/20 transition-colors flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-dark/40 group-hover:text-white transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.a>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ backgroundColor: "#1C1208" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex items-center justify-center gap-3 p-4 md:p-6 bg-white border border-[#1C1208]/5 group"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-[#25D366] group-hover:text-white group-hover:scale-110 transition-all" />
                    <Annotation
                      className="!font-bold transition-colors responsive-stat-label"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      WhatsApp
                    </Annotation>
                  </motion.a>

                  <motion.a
                    href="#"
                    whileHover={{ backgroundColor: "#1C1208" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex items-center justify-center gap-3 p-4 md:p-6 bg-white border border-[#1C1208]/5 group"
                  >
                    <Instagram className="w-4 h-4 md:w-5 md:h-5 text-[#E4405F] group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all" />
                    <Annotation
                      className="!font-bold transition-colors responsive-stat-label"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Instagram
                    </Annotation>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:col-span-7">
              <form className="bg-white p-5 sm:p-8 md:p-12 border border-[#1C1208]/5 space-y-4 md:space-y-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5">
                    <Annotation className="!text-dark/40 responsive-stat-label">Full Name</Annotation>
                    <input
                      type="text"
                      className="w-full bg-cream/50 border-b border-dark/10 p-3 md:p-4 focus:outline-none text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Annotation className="!text-dark/40 responsive-stat-label">Phone Number</Annotation>
                    <input
                      type="tel"
                      className="w-full bg-cream/50 border-b border-dark/10 p-3 md:p-4 focus:outline-none text-sm"
                      placeholder="+1 (000) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Annotation className="!text-dark/40 responsive-stat-label">Email Address</Annotation>
                  <input
                    type="email"
                    className="w-full bg-cream/50 border-b border-dark/10 p-3 md:p-4 focus:outline-none text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <Annotation className="!text-dark/40 responsive-stat-label">Preferred Callback</Annotation>
                  
                  {/* Custom Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between bg-[#F5F0E8]/50 border-b border-[#1C1208]/10 p-3 md:p-4 focus:outline-none text-sm text-left transition-colors hover:bg-[#F5F0E8]/80"
                    >
                      <span className="text-[#1C1208]">{selectedTime}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-rust transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
                      />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: "circOut" }}
                          className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-[#1C1208]/10 shadow-2xl overflow-hidden"
                        >
                          {timeOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setSelectedTime(option);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left p-4 text-sm transition-colors hover:bg-cream
                                ${selectedTime === option ? "text-rust font-bold bg-cream/50" : "text-[#1C1208]/70"}`}
                            >
                              {option}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-4">
                  <ButtonPrimary href="#" className="w-full responsive-btn-text">
                    Submit Enquiry
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export function ElysianGatesOverview() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-[#F5F0E8] overflow-hidden">
      {/* SECTION ANCHOR */}
      <div id="visit-elysian" className="scroll-mt-20" />

      {/* COMMUNITY OVERVIEW */}
      <SectionWrapper noPadding className="!pt-8 !pb-0 md:!pt-24 md:!pb-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-10 items-center justify-items-center text-center lg:text-left w-full">
          <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start responsive-minimum-gap">
            <SectionLabel className="mx-auto lg:mx-0 !mb-0">Community Overview</SectionLabel>

            <SectionHeadline size="xl" className="m-0 text-center lg:text-left mx-auto lg:mx-0 responsive-headline-xl leading-tight">
              Built around{" "}
              <br className="hidden sm:block" />
              natural seclusion
            </SectionHeadline>
          </div>

          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start">
            <BodyText size="lg" className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left responsive-body-sm">
              Elysian Gates combines high-performance systems, expansive wooded backyards, underground utilities, and a refined residential atmosphere designed for those who seek architectural precision and natural seclusion.
            </BodyText>
          </div>
        </div>

        {/* CARDS */}
        <div className="-mx-6 sm:-mx-8 md:-mx-12 lg:-mx-20 xl:-mx-24 2xl:-mx-32 grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1208]/10 mt-8 border-y border-[#1C1208]/10">
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
              className={`relative bg-[#F5F0E8] p-4 sm:p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[140px] sm:min-h-[240px] group cursor-pointer ${
                index >= 2 && !showMore ? "hidden lg:flex" : "flex"
              }`}
            >
              {/* LARGE DECORATIVE NUMBER */}
              <span 
                className="absolute -bottom-2 -right-2 sm:-bottom-6 sm:-right-6 text-black/[0.03] font-serif text-[4rem] sm:text-[10rem] md:text-[12rem] leading-none pointer-events-none select-none transition-all duration-700 group-hover:text-white/[0.05] group-hover:-translate-y-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.num}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-8">
                  <Annotation className="!text-dark/40 group-hover:!text-white/40 transition-colors responsive-stat-label">0{index + 1}</Annotation>
                  <div className="group-hover:rotate-90 group-hover:scale-125 transition-all duration-500">
                    <CrosshairIcon className="group-hover:text-white w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <SectionHeadline size="sm" className="leading-tight group-hover:!text-white transition-colors duration-500">
                  {item.title}
                </SectionHeadline>
              </div>

              <div className="relative z-10 mt-1.5 sm:mt-4 opacity-60 group-hover:opacity-100 transition-all duration-500">
                <BodyText size="sm" className="text-dark/60 group-hover:!text-white leading-snug max-w-[240px] responsive-body-sm">
                  {item.description}
                </BodyText>
              </div>
            </motion.div>
          ))}
        </div>

        {!showMore && (
          <div className="flex justify-center mt-10 lg:hidden">
            <button 
              onClick={() => setShowMore(true)}
              className="group relative inline-flex h-[46px] sm:h-[52px] items-center gap-3 sm:gap-4 bg-rust px-5 sm:px-8 text-white no-underline overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,63,51,0.27)] responsive-btn-text cursor-pointer"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
              }}
            >
              {/* Corner accents */}
              <span className="absolute top-[5px] left-[5px] w-2 h-2 pointer-events-none border-t border-l border-white/30" />
              <span className="absolute bottom-[5px] right-[5px] w-2 h-2 pointer-events-none border-b border-r border-white/30" />

              <span className="uppercase font-bold whitespace-nowrap relative z-10">Read More</span>

              {/* Arrow box */}
              <div className="flex items-center justify-center w-7 h-7 border border-white/30 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}