"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { Annotation } from "@/components/ui/annotation";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Map as MapIcon, 
  Settings2, 
  HardHat, 
  Key 
} from "lucide-react";

const steps = [
  {
    num: "01",
    label: "Consultation",
    icon: <MessageSquare className="w-5 h-5" />,
    desc: "A deep dive into your vision, lifestyle requirements, and preferred location."
  },
  {
    num: "02",
    label: "Floor Plan Selection",
    icon: <MapIcon className="w-5 h-5" />,
    desc: "Choosing from our curated architectural layouts optimized for flow and light."
  },
  {
    num: "03",
    label: "Customization",
    icon: <Settings2 className="w-5 h-5" />,
    desc: "Refining materials, finishes, and interior details to match your personal aesthetic."
  },
  {
    num: "04",
    label: "Construction",
    icon: <HardHat className="w-5 h-5" />,
    desc: "Our master craftsmen begin the build, managed with obsessive attention to detail."
  },
  {
    num: "05",
    label: "Handover",
    icon: <Key className="w-5 h-5" />,
    desc: "The final walkthrough and keys to your new legacy. Welcome home."
  }
];

export function ProcessTimeline() {
  return (
    <SectionWrapper id="process" className="!py-24 md:!py-36 bg-[#F5F0E8]">
      <div className="px-8 md:px-12 lg:px-20 mb-20 text-center md:text-left">
        <SectionLabel counter="09 / 09">Our Process</SectionLabel>
        <SectionHeadline size="xl" className="!text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98]">
          How we build <em className="italic">legacies</em>
        </SectionHeadline>
      </div>

      <div className="relative px-8 md:px-12 lg:px-20">
        {/* Horizontal Line - Desktop */}
        <div className="hidden lg:block absolute top-[45px] left-20 right-20 h-px bg-[#1C1208]/10 z-0">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-rust/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
          {steps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center lg:items-start group"
            >
              {/* Icon Circle */}
              <div className="w-[90px] h-[90px] rounded-full border border-[#1C1208]/10 bg-white flex items-center justify-center mb-8 relative transition-all duration-500 group-hover:border-rust group-hover:shadow-[0_12px_30px_rgba(212,63,51,0.1)]">
                <div className="text-rust">
                  {step.icon}
                </div>
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#1C1208] text-white flex items-center justify-center text-[0.6rem] font-bold tracking-widest rounded-full border-2 border-[#F5F0E8]">
                  {step.num}
                </div>
                
                <CrosshairIcon className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="text-center lg:text-left">
                <h4 className="uppercase font-bold tracking-[0.2em] text-[0.75rem] text-[#1C1208] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {step.label}
                </h4>
                <BodyText size="sm" className="text-[#1C1208]/60 leading-relaxed">
                  {step.desc}
                </BodyText>
              </div>

              {/* Vertical Connector - Mobile/Tablet */}
              {i < steps.length - 1 && (
                <div className="lg:hidden w-px h-12 bg-[#1C1208]/10 mt-12 mx-auto md:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-24 text-center">
        <Annotation className="opacity-30">FROM BLUEPRINT TO REALITY</Annotation>
      </div>
    </SectionWrapper>
  );
}
