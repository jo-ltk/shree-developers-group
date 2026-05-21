"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeadline } from "@/components/ui/section-headline";
import { BodyText } from "@/components/ui/body-text";
import { FigMarker } from "@/components/ui/fig-marker";
import { ImagePanel } from "@/components/ui/image-panel";
import { Ornament } from "@/components/ui/ornament";
import { StatItem } from "@/components/ui/stat-item";
import { RustLine } from "@/components/ui/rust-line";
import { Annotation } from "@/components/ui/annotation";
import { CrosshairIcon } from "@/components/ui/crosshair-icon";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { ButtonGhost } from "@/components/ui/button-ghost";
import { NavbarEditorial } from "@/components/navbar-editorial";
import { FooterSection } from "@/components/footer-section";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[#F5F0E8] overflow-hidden">
      <NavbarEditorial invertLogoAtTop />
      {/* HERO SECTION */}
      <section className="relative">
        {/* Cinematic Header Image */}
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="Architectural Vision"
            fill
            priority
            className="object-cover transition-transform duration-[4000ms] ease-out scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/90 via-[#1C1208]/20 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 px-8 pb-16 md:px-12 lg:px-20">
            <div className="max-w-[1450px] mx-auto">
              <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-4 mb-8">
                <Annotation light className="!text-[#D43F33]">EST. 1998</Annotation>
                <div className="h-px w-12 bg-[#F5F0E8]/20" />
                <Annotation light className="!text-[#F5F0E8] uppercase">ABOUT SHREE</Annotation>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
                <SectionHeadline 
                  size="hero" 
                  light 
                  className="!text-[#F5F0E8] !text-[clamp(3.5rem,10vw,11rem)] !leading-[0.88]"
                >
                  Disciplined <br />
                  <em className="italic text-[#D43F33]">Architecture</em><br />
                  Lasting Trust.
                </SectionHeadline>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
                <Annotation light className="!text-[#F5F0E8]/60">FOUNDED: 1998</Annotation>
                <Annotation light className="!text-[#F5F0E8]/60">LOCATION: GEORGIA</Annotation>
                <Annotation light className="!text-[#F5F0E8]/60">EXPERTISE: RESIDENTIAL</Annotation>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Brief / Asymmetric Content */}
        <SectionWrapper dark={false} className="!py-16 md:!py-24">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-12 items-start"
          >
            <div className="col-span-12 lg:col-span-5">
              <SectionLabel counter="01 / 04">Our Intent</SectionLabel>
              <SectionHeadline size="md" className="mt-8 !text-[2.2rem] md:!text-[2.8rem] leading-[1.1]">
                We don&apos;t just build structures; we compose environments for living.
              </SectionHeadline>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <BodyText size="lg" className="mb-8 md:mb-12">
                At Shree Developers Group, we believe that a home is more than a structure—it&apos;s a legacy of trust, built with architectural discipline and personal integrity. Our commitment to Georgia&apos;s landscape is reflected in every joint, every stone, and every signature community.
              </BodyText>
              <div className="grid grid-cols-2 gap-8 border-t border-[#1C1208]/10 pt-8 md:pt-12">
                <div>
                  <Annotation className="!text-[#D43F33] mb-2">EXPERIENCE</Annotation>
                  <BodyText size="sm">26+ Years in Development</BodyText>
                </div>
                <div>
                  <Annotation className="!text-[#D43F33] mb-2">COMMUNITIES</Annotation>
                  <BodyText size="sm">25+ Signature Enclaves</BodyText>
                </div>
              </div>
            </div>
          </motion.div>
        </SectionWrapper>
      </section>

      {/* FOUNDATION */}
      <SectionWrapper
        id="foundation"
        className="relative border-t border-[#1C120810]"
      >
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT IMAGE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="sticky top-28">
              <ImagePanel
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
                alt="Founder Portrait"
                aspectRatio="aspect-[4/5]"
                overlay
                counter="02"
                label="FOUNDER PORTRAIT"
              />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="max-w-[720px] lg:pl-12">
              <div className="flex items-center gap-6 mb-10">
                <SectionLabel counter="02">
                  OUR FOUNDATION
                </SectionLabel>
                <div className="h-px flex-1 bg-[#1C120810]" />
              </div>

              <SectionHeadline size="xl" className="!leading-[0.95] !text-[clamp(2.8rem,5.5vw,5.5rem)]">
                The story behind<br />
                the <em className="italic text-[#D43F33] font-serif">craft</em>
              </SectionHeadline>

              <div className="mt-12 space-y-10">
                <BodyText size="lg" className="!text-[#1C1208]/80 leading-relaxed">
                  Shree Developers Group began with a singular vision: to bring
                  architectural discipline and personal integrity back to the
                  residential market. What started as a small, focused team in
                  Georgia has grown into a premiere development firm, yet our
                  approach remains intimate.
                </BodyText>

                <div className="relative pl-8 md:pl-12">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#D43F33]/30" />
                  <BodyText size="lg" className="italic !text-[#1C1208]/90 !leading-[1.6]">
                    &quot;Every project is a personal promise. From our first site
                    to our latest community, we&apos;ve remained focused on the
                    details that turn a structure into a home. Our legacy isn&apos;t
                    just in the steel and stone, but in the families that grow
                    within our walls.&quot;
                  </BodyText>
                  
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-8 h-px bg-[#D43F33]" />
                    <Annotation className="uppercase tracking-[0.2em] font-bold !text-[#1C1208]">Founder&apos;s Mark</Annotation>
                  </div>
                </div>
              </div>
              
              <div className="mt-20 pt-10 border-t border-[#1C120808] flex items-center justify-between">
                <div className="flex gap-12">
                  <div>
                    <Annotation className="block mb-2 !text-[#D43F33]">SINCE</Annotation>
                    <BodyText size="sm" className="font-medium">1998</BodyText>
                  </div>
                  <div>
                    <Annotation className="block mb-2 !text-[#D43F33]">LOCUS</Annotation>
                    <BodyText size="sm" className="font-medium">GEORGIA</BodyText>
                  </div>
                </div>
                <CrosshairIcon className="opacity-20" />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* PHILOSOPHY + VISION */}
      <SectionWrapper dark className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,#D43F33_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="grid grid-cols-12 min-h-[480px] border-y border-[#F5F0E810]">
          {/* LEFT: MAIN PHILOSOPHY */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-6 bg-[#1C1208] p-10 md:p-12 lg:p-16 flex flex-col justify-between relative border-r border-[#F5F0E810]"
          >
            <div className="max-w-[540px]">
              <SectionLabel light counter="03">
                OUR PHILOSOPHY
              </SectionLabel>

              <SectionHeadline size="lg" light className="mt-6 !leading-[1.1] !text-[clamp(2.5rem,5vw,4.5rem)]">
                Built with<br />
                <em className="italic text-[#D43F33]">intention</em>
              </SectionHeadline>

              <BodyText
                light
                size="md"
                className="mt-6 !text-[#F5F0E8]/85 leading-relaxed"
              >
                We believe that excellence is found in the intersection of
                traditional craftsmanship and modern livability. Our philosophy
                is rooted in the idea that a community should enhance its
                environment, not just occupy it.
              </BodyText>
              
              <div className="mt-8 flex items-center gap-6 group cursor-default">
                <div className="relative w-12 h-px bg-[#D43F33] overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-white/40"
                  />
                </div>
                <Annotation light className="uppercase tracking-[0.3em] !text-[#D43F33] !text-[10px]">The Shree Ethos</Annotation>
              </div>
            </div>

            {/* TECHNICAL DATA TO FILL SPACE */}
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#F5F0E808] pt-8">
              <div className="space-y-1">
                <Annotation light className="!text-[#F5F0E8]/30 text-[10px] uppercase tracking-widest">Materiality</Annotation>
                <BodyText light size="sm" className="!text-[#F5F0E8]/60 italic !text-[11px]">Natural Stone, Timber, Bronze</BodyText>
              </div>
              <div className="space-y-1">
                <Annotation light className="!text-[#F5F0E8]/30 text-[10px] uppercase tracking-widest">Philosophy Code</Annotation>
                <BodyText light size="sm" className="!text-[#F5F0E8]/60 font-mono !text-[11px]">SDG.ARCH_03.INTENTION</BodyText>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: VISION & MISSION */}
          <div className="col-span-12 lg:col-span-6 grid grid-rows-2">
            {[
              {
                title: "Vision",
                fig: "fig. 01",
                body:
                  "To set the standard for premium, community-driven living in Georgia, creating spaces that endure for generations.",
              },
              {
                title: "Mission",
                fig: "fig. 02",
                body:
                  "Crafting homes that balance architectural integrity with the warmth of a life well-lived, through transparent execution.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative p-10 md:p-12 flex flex-col justify-center group overflow-hidden transition-colors duration-700 hover:bg-[#24180F]",
                  index === 0 ? "bg-[#24180F]" : "bg-[#1C1208] border-t border-[#F5F0E810]"
                )}
              >
                {/* Unique Animation: Corner brackets that reveal on hover */}
                <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-[#D43F33] opacity-0 -translate-x-2 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-[#D43F33] opacity-0 translate-x-2 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />

                <div className="max-w-[440px] relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Annotation light className="!text-[#D43F33] font-medium tracking-widest text-[10px]">{item.fig}</Annotation>
                    <div className="h-px flex-1 bg-[#F5F0E808] relative overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute inset-0 bg-[#F5F0E820]"
                      />
                    </div>
                  </div>

                  <SectionHeadline
                    size="md"
                    light
                    noPeriod
                    className="mb-4 !text-[1.8rem] md:!text-[2rem] transition-all duration-500 group-hover:tracking-wider group-hover:text-white"
                  >
                    {item.title}
                    <span className="text-[#D43F33]">.</span>
                  </SectionHeadline>

                  <BodyText
                    light
                    size="sm"
                    className="!text-[#F5F0E8]/70 leading-relaxed transition-opacity duration-500 group-hover:!text-[#F5F0E8]/90"
                  >
                    {item.body}
                  </BodyText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* STATS */}
      <SectionWrapper dark className="!pt-0">
        <div className="border-t border-[#F5F0E810] pt-20">
          <div className="grid grid-cols-12 gap-px bg-[#F5F0E810]">
            {[
              ["15+", "Years of Experience"],
              ["200+", "Projects Completed"],
              ["Licensed", "& Insured"],
              ["Georgia", "Local Expertise"],
            ].map(([value, label], i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#24180F] p-10 md:p-14 min-h-[240px] flex items-end"
              >
                <StatItem value={value} label={label} light />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* COMMITMENT */}
      <SectionWrapper className="relative !pb-0 overflow-visible">
        <div className="grid grid-cols-12 gap-10 items-end mb-24">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-6 mb-10">
              <SectionLabel counter="04">
                OUR COMMITMENT
              </SectionLabel>
              <div className="h-px w-24 bg-[#1C120810]" />
            </div>

            <SectionHeadline size="xl" className="!leading-[0.9] !text-[clamp(2.8rem,5.5vw,5.5rem)]">
              The discipline<br />
              of <em className="italic text-[#D43F33] font-serif">delivery</em>
            </SectionHeadline>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <BodyText
              size="lg"
              className="max-w-[420px] !text-[#1C1208]/70"
            >
              Precision in communication, execution, and handover defines every
              stage of our process. We ensure every milestone is met with the same 
              dedication as the first day.
            </BodyText>
          </div>
        </div>

        <div className="grid grid-cols-12 border-t border-[#1C120810]">
          {[
            {
              fig: "fig. 01",
              title: "Clear Documentation",
              body:
                "Every detail, specification, and timeline is documented with absolute clarity from day one.",
            },
            {
              fig: "fig. 02",
              title: "Guided Choices",
              body:
                "Our designers walk you through every material and finish selection to ensure a cohesive aesthetic.",
            },
            {
              fig: "fig. 03",
              title: "Disciplined Updates",
              body:
                "Regular, structured reporting ensures you are always informed of progress and milestones.",
            },
            {
              fig: "fig. 04",
              title: "Dedicated Handover",
              body:
                "A comprehensive walk-through and documentation package at the moment you receive your keys.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className={cn(
                "col-span-12 md:col-span-6 lg:col-span-3 p-10 md:p-12 lg:p-16 flex flex-col min-h-[480px] group transition-colors duration-500 hover:bg-[#F9F7F2]",
                index !== 3 && "border-r border-[#1C120810]"
              )}
            >
              <div className="flex items-start justify-between">
                <Annotation className="!text-[#D43F33] font-medium">{item.fig}</Annotation>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <CrosshairIcon />
                </div>
              </div>

              <div className="mt-auto">
                <SectionHeadline
                  size="md"
                  noPeriod
                  className="mb-8 !text-[1.8rem] md:!text-[2rem] group-hover:translate-x-2 transition-transform duration-500"
                >
                  {item.title}
                  <span className="text-[#D43F33]">.</span>
                </SectionHeadline>

                <BodyText
                  size="sm"
                  className="!text-[#1C1208]/60 leading-relaxed"
                >
                  {item.body}
                </BodyText>
                
                <div className="mt-12 flex gap-1 h-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={cn(
                      "w-1 bg-[#1C120810] transition-all duration-500 group-hover:bg-[#D43F33]",
                      i === 0 && "group-hover:h-3",
                      i === 1 && "group-hover:h-5",
                      i === 2 && "group-hover:h-3"
                    )} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper
        dark
        className="relative overflow-hidden !py-0"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Final Vision"
            fill
            className="object-cover opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208] via-transparent to-[#1C1208]" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 max-w-[1200px] mx-auto text-center py-20 md:py-24"
        >
          <div className="flex justify-center mb-8">
            <Annotation light className="!text-[#D43F33] tracking-[0.4em] uppercase text-[10px]">The Next Chapter</Annotation>
          </div>

          <SectionHeadline
            size="hero"
            light
            className="text-center !leading-[0.85] !text-[clamp(3rem,8vw,7.5rem)]"
          >
            Ready to find your<br />
            <em className="italic text-[#D43F33]">place in Shree</em>
          </SectionHeadline>

          <BodyText
            light
            size="lg"
            className="mt-8 max-w-[640px] mx-auto !text-[#F5F0E8]/70"
          >
            Begin a conversation about your next home, investment, or
            signature community.
          </BodyText>

          <div className="flex flex-col items-center justify-center gap-6 mt-12">
            <ButtonPrimary href="/projects" className="min-w-[260px] justify-center">
              Explore Communities
            </ButtonPrimary>

            <ButtonGhost href="#footer" light className="hover:!text-[#D43F33] transition-colors text-xs tracking-widest">
              Get in Touch
            </ButtonGhost>
          </div>
        </motion.div>

        <FigMarker 
          fig="fig. 04" 
          label="NEXT STEPS" 
          className="absolute bottom-12 left-8 md:left-12 lg:left-20 z-20"
          light
        />
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-[#D43F33] opacity-[0.03] rounded-full blur-[120px] -mr-[15vw] -mt-[15vw]" />
      </SectionWrapper>
      <FooterSection />
    </main>
  );
}