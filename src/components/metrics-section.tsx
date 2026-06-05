"use client";
import { useState } from "react";

import {
  Phone,
  Instagram,
  ChevronDown,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { SectionLabel } from "./ui/section-label";
import { WhatsAppBrandIcon } from "@/components/ui/whatsapp-brand-icon";
import {
  COMPANY_CONTACT,
  COMPANY_TEL,
  COMPANY_WHATSAPP,
} from "@/lib/contact";
import { submitContactForm } from "@/lib/submit-contact-form";

export default function CommunityDetailsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Morning (9AM - 12PM)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const timeOptions = [
    "Morning (9AM - 12PM)",
    "Afternoon (12PM - 4PM)",
    "Evening (4PM - 7PM)",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setSubmitError("Please fill in your name, phone, and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        callbackTime: selectedTime,
        source: "Homepage enquiry form",
      });
      setSubmitted(true);
      setName("");
      setPhone("");
      setEmail("");
      setSelectedTime(timeOptions[0]);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F0E8] overflow-hidden">
      <div id="visit" className="scroll-mt-20" />

      {/* ENQUIRY */}
      <section id="request-info" className="scroll-mt-24 !pt-4 !pb-6 md:!pt-8 md:!pb-16 bg-[#F5F0E8]">
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
                briefings, floor plan details, and site visit coordination.
              </BodyText>

              <div className="space-y-4 w-full mx-auto lg:mx-0">
                <motion.a
                  href={COMPANY_TEL}
                  whileHover={{ backgroundColor: "#1C1208" }}
                  transition={{ duration: 0.15, ease: "circOut" }}
                  className="flex items-center justify-between gap-4 p-5 md:p-6 bg-white border border-[#1C1208]/5 group transition-all duration-150 w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 md:w-13 md:h-13 bg-[#1C1208]/5 flex items-center justify-center text-[#1C1208] group-hover:bg-[#D43F33] group-hover:text-white transition-all duration-150 flex-shrink-0">
                      <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-150" />
                    </div>

                    <div className="text-left">
                      <Annotation className="!text-dark/30 group-hover:!text-white/40 mb-1 transition-colors duration-150 responsive-stat-label">
                        Call Now
                      </Annotation>
                      <span
                        className="font-sans font-bold tracking-widest text-dark group-hover:text-white transition-colors duration-150"
                        style={{ fontSize: "1rem", letterSpacing: "0.08em" }}
                      >
                        {COMPANY_CONTACT.phoneDisplay}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 flex items-center justify-center border border-[#1C1208]/10 group-hover:border-white/20 transition-colors duration-150 flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-dark/40 group-hover:text-white transition-colors duration-150">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.a>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <motion.a
                    href={COMPANY_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ backgroundColor: "#1C1208" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex items-center justify-center gap-3 p-4 md:p-6 bg-white border border-[#1C1208]/5 group"
                  >
                    <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center md:h-6 md:w-6">
                      <WhatsAppBrandIcon className="h-4 w-4 text-[#25D366] transition-colors duration-300 group-hover:text-white md:h-5 md:w-5" />
                    </span>
                    <Annotation
                      className="!font-bold !text-dark/70 transition-colors duration-300 group-hover:!text-white responsive-stat-label"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      WhatsApp
                    </Annotation>
                  </motion.a>

                  <motion.a
                    href={COMPANY_CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ backgroundColor: "#1C1208" }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex items-center justify-center gap-3 p-4 md:p-6 bg-white border border-[#1C1208]/5 group"
                  >
                    <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center md:h-6 md:w-6">
                      <Instagram className="h-4 w-4 text-[#E4405F] transition-colors duration-300 group-hover:text-white md:h-5 md:w-5" strokeWidth={1.75} />
                    </span>
                    <Annotation
                      className="!font-bold !text-dark/70 transition-colors duration-300 group-hover:!text-white responsive-stat-label"
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
              {submitted ? (
                <div className="bg-white p-8 md:p-12 border border-[#1C1208]/5 text-center space-y-3">
                  <p className="font-serif text-xl text-dark">Thank you</p>
                  <BodyText className="opacity-70 responsive-body-sm">
                    Your enquiry has been received. An advisor will reach out during your preferred callback window.
                  </BodyText>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-5 sm:p-8 md:p-12 border border-[#1C1208]/5 space-y-4 md:space-y-6 shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1.5">
                      <Annotation className="!text-dark/40 responsive-stat-label">Full Name</Annotation>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-cream/50 border-b border-dark/10 p-3 md:p-4 focus:outline-none text-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Annotation className="!text-dark/40 responsive-stat-label">Phone Number</Annotation>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-cream/50 border-b border-dark/10 p-3 md:p-4 focus:outline-none text-sm"
                        placeholder={COMPANY_CONTACT.phoneDisplay}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Annotation className="!text-dark/40 responsive-stat-label">Email Address</Annotation>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-cream/50 border-b border-dark/10 p-3 md:p-4 focus:outline-none text-sm"
                      placeholder={COMPANY_CONTACT.email}
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <Annotation className="!text-dark/40 responsive-stat-label">Preferred Callback</Annotation>

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

                  {submitError && (
                    <p className="text-sm text-rust" role="alert">
                      {submitError}
                    </p>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex h-[46px] sm:h-[52px] w-full items-center justify-center gap-3 sm:gap-4 bg-rust px-5 sm:px-8 !text-white transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,63,51,0.27)] disabled:opacity-60 disabled:cursor-not-allowed responsive-btn-text uppercase font-bold tracking-[0.25em]"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem" }}
                    >
                      {isSubmitting ? "Submitting…" : "Submit Enquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
