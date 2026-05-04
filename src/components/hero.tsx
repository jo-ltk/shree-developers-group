"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsapPlugins } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; } to { opacity: 1; }
      }
      @keyframes scrollPulse {
        0%,100% { transform: scaleY(1); opacity: 1; }
        50% { transform: scaleY(0.6); opacity: 0.4; }
      }
      .hero-eyebrow { opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards; }
      .hero-heading { opacity: 0; animation: fadeUp 0.9s ease 0.35s forwards; }
      .hero-sub { opacity: 0; animation: fadeUp 0.9s ease 0.5s forwards; }
      .hero-ornament { opacity: 0; animation: fadeUp 0.9s ease 0.6s forwards; }
      .hero-stats { opacity: 0; animation: fadeUp 0.9s ease 0.65s forwards; }
      .hero-btns { opacity: 0; animation: fadeUp 0.9s ease 0.8s forwards; }
      .hero-scroll { opacity: 0; animation: fadeUp 1s ease 1.2s forwards; }
      .btn-primary-custom { transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .btn-primary-custom:hover { transform: translateY(-2px); box-shadow: 0 12px 40px #D43F3344; }
      .btn-primary-custom:hover .btn-arrow-box { transform: translateX(4px); }
      .btn-arrow-box { transition: transform 0.3s; }
      .btn-ghost-custom { position: relative; padding-bottom: 4px; }
      .btn-ghost-custom::after {
        content: ''; position: absolute; bottom: 0; left: 0;
        width: 0; height: 1px; background: #D43F33; transition: width 0.4s ease;
      }
      .btn-ghost-custom:hover::after { width: 100%; }
      .btn-ghost-custom:hover .ghost-arrow { transform: translateX(4px); }
      .ghost-arrow { transition: transform 0.3s; }
      .scroll-line-anim { animation: scrollPulse 2s ease-in-out 1.5s infinite; }
    `;
    document.head.appendChild(style);
    return () => { if (document.head.contains(style)) document.head.removeChild(style); };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative flex w-full flex-col overflow-hidden bg-[#FAF8F3] lg:h-screen lg:min-h-[650px] lg:justify-center"
    >
      {/* Full Screen Background Image - Mobile: Top, Desktop: Background */}
      <div data-hero-visual className="relative z-0 h-[40vh] w-full sm:h-[60vh] lg:absolute lg:inset-0 lg:h-full">
        <Image
          src="/images/hero-redesign2.png"
          alt="Premium residential community by Shree Developers Group"
          fill
          className="object-cover object-center lg:object-[center_right]"
          priority
        />
        
        {/* Mobile Heading Overlay (Shows only on mobile, positioned top-left over image area) */}
        <div className="absolute top-[32%] left-8 z-20 max-w-[280px] lg:hidden">
           {/* Eyebrow */}
           <div className="mb-3">
            <span
              className="text-[#D43F33] font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "8px", fontFamily: "'Montserrat', sans-serif" }}
            >
              Est. 2001 · Premium Residences
            </span>
          </div>
          <h1
            className="leading-[1.1] tracking-[-0.02em] text-[#1C1208]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 8.5vw, 2.6rem)",
              fontWeight: 300,
            }}
          >
            Where trust
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>finds</em> always
            <br />
            a home<span className="text-[#C94B3C]">.</span>
          </h1>
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-8 pt-8 pb-8 lg:px-20 lg:py-0">
        <div data-hero-content className="max-w-[750px] lg:pt-20">
          {/* Eyebrow - Desktop only */}
          <div className="hero-eyebrow hidden lg:flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#D43F33]" />
            <span
              className="text-[#D43F33] font-semibold uppercase tracking-[0.3em]"
              style={{ fontSize: "10px", fontFamily: "'Montserrat', sans-serif" }}
            >
              Est. 2001 · Premium Residences
            </span>
          </div>

          {/* Heading - Desktop only */}
          <h1
            className="hero-heading hidden lg:block leading-[1.0] tracking-[-0.02em] text-[#1C1208]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(4rem, 6.5vw, 7.5rem)",
              fontWeight: 300,
            }}
          >
            Where trust
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>finds</em> always home
            <span className="text-[#C94B3C]">.</span>
          </h1>

          {/* Sub */}
          <p
            className="hero-sub mt-4 lg:mt-5 text-center lg:text-left text-[#1C1208]/55"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.1rem, 4vw, 1.25rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            Communities composed for daily comfort.
          </p>

          {/* Ornament divider */}
          <div className="hero-ornament flex items-center gap-3 my-6 lg:my-5 max-w-[400px] mx-auto lg:mx-0">
            <div className="flex-1 h-px bg-[#1C1208]/12" />
            <div
              className="w-[6px] h-[6px] bg-[#D43F33] flex-shrink-0"
              style={{ transform: "rotate(45deg)" }}
            />
            <div className="flex-1 h-px bg-[#1C1208]/12" />
          </div>

          {/* Stats - Refined for single line on mobile, compact on desktop */}
          <div className="hero-stats flex flex-nowrap items-center justify-between lg:justify-start gap-3 sm:gap-8 lg:gap-20 mb-10 lg:max-w-[650px]">
            {[
              { num: "24+", label: "Projects Delivered" },
              { num: "2.4k", label: "Families Housed" },
              { num: "98%", label: "Satisfaction Rate" },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-1 lg:flex-none items-stretch gap-3 sm:gap-8 lg:gap-20 min-w-0">
                {i > 0 && <div className="w-px bg-[#1C1208]/12 self-stretch flex-shrink-0" />}
                <div className="min-w-0">
                  <div
                    className="text-[#1C1208] leading-none whitespace-nowrap"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.3rem, 5vw, 2.2rem)",
                      fontWeight: 300,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-[#1C1208]/50 uppercase tracking-[0.1em] mt-1 font-medium leading-tight"
                    style={{ fontSize: "clamp(6px, 1.8vw, 9px)", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons - Forced to single line on mobile */}
          <div className="hero-btns flex flex-nowrap items-center gap-6 sm:gap-8">
            <a 
              href="#gallery" 
              className="btn-primary-custom relative flex h-[50px] lg:h-[60px] items-center gap-3 lg:gap-4 bg-[#D43F33] px-6 lg:px-10 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.25em] text-white no-underline transition-all"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
               {/* Corner accents */}
              <span
                className="absolute top-[5px] left-[5px] w-2 h-2 pointer-events-none"
                style={{ borderTop: "1px solid #ffffff66", borderLeft: "1px solid #ffffff66" }}
              />
              <span
                className="absolute bottom-[5px] right-[5px] w-2 h-2 pointer-events-none"
                style={{ borderBottom: "1px solid #ffffff66", borderRight: "1px solid #ffffff66" }}
              />
              <span className="whitespace-nowrap">Start Exploring</span>
              <div
                className="btn-arrow-box flex items-center justify-center flex-shrink-0"
                style={{
                  width: "28px",
                  height: "28px",
                  border: "1px solid #ffffff55",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            
            <a 
              href="mailto:hello@shreedevelopersgroup.com" 
              className="btn-ghost-custom flex items-center gap-2 lg:gap-3 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1208] no-underline whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Get in touch
              <svg className="ghost-arrow h-4 w-4 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>


      {/* Blueprint Detail (Bottom Right) */}
      <div className="absolute bottom-10 right-10 z-10 hidden opacity-20 lg:block">
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-[#1C1208]">
          <span>fig. 08</span>
          <div className="h-2 w-10 bg-[#1C1208]/30" />
        </div>
      </div>
    </section>
  );
}
