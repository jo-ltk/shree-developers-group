"use client";
import { useState } from "react";

import {
  Phone,
  MessageCircle,
  Instagram,
  ChevronDown,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { SectionLabel } from "./ui/section-label";

export default function CommunityDetailsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Morning (9AM - 12PM)");

  const timeOptions = [
    "Morning (9AM - 12PM)",
    "Afternoon (12PM - 4PM)",
    "Evening (4PM - 7PM)"
  ];

  return (
    <div className="bg-[#F5F0E8] overflow-hidden">
      <div id="visit" className="scroll-mt-20" />

      {/* ENQUIRY */}
      <section id="request-info" className="!pt-4 !pb-6 md:!pt-8 md:!pb-16 bg-[#F5F0E8]">
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
