"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { ensureGsapPlugins } from "@/lib/gsap";
import { allProjects } from "@/lib/projects-data";
import type { ProjectData } from "@/lib/projects-data";

export function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "[data-gallery-reveal]",
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from("[data-gallery-reveal] > *", {
          autoAlpha: 0,
          y: 32,
          duration: 1,
          stagger: 0.14,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = allProjects.slice(0, 4);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F5F0E8] py-24 md:py-36 lg:py-44"
    >
      {/* subtle blueprint vertical lines */}
      <div className="pointer-events-none absolute inset-0 hidden lg:flex justify-between px-20 opacity-40">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-full w-px bg-[#D43F33]/10" />
        ))}
      </div>

      <div className="mx-auto max-w-[1450px] px-8 md:px-12 lg:px-20">
        {/* ================= Header ================= */}
        <div
          data-gallery-reveal
          className="grid grid-cols-12 gap-6 items-end mb-16 md:mb-24"
        >
          <div className="col-span-12 lg:col-span-7">
            <div className="mb-7 flex items-center gap-4">
              <span
                className="text-[#D43F33]"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  fontWeight: 600,
                }}
              >
                03 / 06
              </span>

              <span
                className="text-[#1C120880] uppercase"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  fontWeight: 600,
                }}
              >
                Signature Communities
              </span>
            </div>

            <h2
              className="font-light leading-[0.98] tracking-[-0.025em] text-[#1C1208]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.8rem,5vw,5.5rem)",
              }}
            >
              Communities planned
              <br />
              for lasting comfort
              <span className="text-[#D43F33]">.</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pl-10">
            <p
              className="text-[#1C1208]/60 leading-[1.7]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1rem,1.2vw,1.15rem)",
              }}
            >
              Thoughtful planning, verified approvals, and disciplined
              construction come together to create addresses that remain
              dependable long after possession day.
            </p>
          </div>
        </div>

        {/* ================= Editorial Mosaic ================= */}
        <div className="grid grid-cols-12 gap-px bg-[#1C1208]/10">
          <div className="col-span-12 lg:col-span-8 bg-[#F5F0E8]">
            <ProjectCardLarge project={featured[0]} />
          </div>

          <div className="col-span-12 lg:col-span-4 bg-[#1C1208] p-10 lg:p-12 flex flex-col justify-end">
  <span
    className="text-[#F5F0E8]/45 uppercase mb-6"
    style={{
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "0.55rem",
      letterSpacing: "0.28em",
    }}
  >
    FIG. 08 / FEATURED ADDRESS
  </span>

  <h3
    className="text-[#F5F0E8] font-light leading-[1.02]"
    style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "clamp(2rem,3vw,3.2rem)",
    }}
  >
    Built with
    <br />
    measured intent
    <span className="text-[#D43F33]">.</span>
  </h3>

  <p
    className="mt-5 leading-[1.7]"
    style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "rgba(245, 240, 232, 0.65)",
    }}
  >
    Every project reflects a practical understanding of family life,
    spatial comfort, and long-term structural trust.
  </p>

  <Link
    href="/gallery"
    className="group mt-10 inline-flex items-center gap-3"
    style={{
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "0.6rem",
      letterSpacing: "0.24em",
      fontWeight: 700,
      color: "rgba(245, 240, 232, 1)",
    }}
  >
    VIEW FULL PORTFOLIO
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12H19M19 12L12 5M19 12L12 19" />
    </svg>
  </Link>
</div>

          <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8]">
            <ProjectCardSmall project={featured[1]} />
          </div>

          <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8]">
            <ProjectCardSmall project={featured[2]} />
          </div>

          <div className="col-span-12 lg:col-span-4 bg-[#F5F0E8]">
            <ProjectCardSmall project={featured[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= LARGE FEATURE CARD ================= */

function ProjectCardLarge({ project }: { project: ProjectData }) {
  return (
    <article className="group relative overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208]/10 via-[#1C1208]/30 to-[#1C1208]/88" />
      </div>

      <div className="absolute top-6 left-6 flex items-center gap-4">
        <span
          className="text-[#F5F0E8]/75"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
          }}
        >
          {project.index}
        </span>
        <span
          className="text-[#F5F0E8]/75 uppercase"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
          }}
        >
          {project.location}
        </span>
      </div>

      <div className="absolute bottom-8 left-8 max-w-[70%] text-[#F5F0E8]">
        <h3
          className="font-light leading-[1]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem,3vw,3.5rem)",
          }}
        >
          {project.title}
          <span className="text-[#D43F33]">.</span>
        </h3>

        <p
          className="mt-3 text-[#F5F0E8]/70 leading-[1.6]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1rem",
          }}
        >
          {project.summary}
        </p>
      </div>
    </article>
  );
}

/* ================= SMALL CARD ================= */

function ProjectCardSmall({ project }: { project: ProjectData }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="relative overflow-hidden">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208]/10 via-[#1C1208]/20 to-[#1C1208]/90" />
        </div>

        <div className="absolute top-5 left-5 text-[#F5F0E8]/70">
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
            }}
          >
            {project.index}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-[#F5F0E8]">
          <h3
            className="font-light leading-[1.05]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.6rem,2.3vw,2.4rem)",
            }}
          >
            {project.title}
            <span className="text-[#D43F33]">.</span>
          </h3>

          <div
            className="mt-4 inline-flex items-center gap-2 text-[#F5F0E8]/70 group-hover:text-[#F5F0E8]"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.24em",
              fontWeight: 700,
            }}
          >
            EXPLORE
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}