"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  id: string;
  value: string;
  unit: string;
  label: string;
  threshold: number; // scroll progress milestone (0.0 to 1.0)
}

const PERFORMANCE_STATS: StatItem[] = [
  {
    id: "stat-accel",
    value: "03.2",
    unit: "s",
    label: "0–100 km/h Acceleration",
    threshold: 0.2,
  },
  {
    id: "stat-range",
    value: "620",
    unit: "km",
    label: "Target WLTP Range",
    threshold: 0.45,
  },
  {
    id: "stat-power",
    value: "480",
    unit: "hp",
    label: "Dual Motor Peak Power",
    threshold: 0.7,
  },
  {
    id: "stat-eff",
    value: "92",
    unit: "%",
    label: "Powertrain Efficiency",
    threshold: 0.9,
  },
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const carImgRef = useRef<HTMLImageElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statBoxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Base path for GitHub Pages compatibility
  const basePath = useMemo(() => {
    return process.env.NODE_ENV === "production" ? "/scroll-animation" : "";
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const headline = headlineRef.current;
    const subtext = subtextRef.current;
    const carWrapper = carWrapperRef.current;
    const carImg = carImgRef.current;
    const statBoxes = statBoxRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !stage || !headline || !carWrapper || !carImg) return;

    // -------------------------------------------------------------
    // 1. INITIAL LOAD ANIMATION (GSAP Timeline)
    // -------------------------------------------------------------
    const introTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.15,
    });

    // Headline elements (split lines)
    const headlineLines = headline.querySelectorAll(".headline-line");

    introTl
      .fromTo(
        headlineLines,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        }
      )
      .fromTo(
        subtext,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.6"
      )
      .fromTo(
        carImg,
        { opacity: 0, scale: 0.94, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.7"
      )
      .fromTo(
        statBoxes,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.6"
      );

    // -------------------------------------------------------------
    // 2. SCROLL-DRIVEN ANIMATION (GSAP ScrollTrigger)
    // -------------------------------------------------------------
    // Main scroll-controlled vehicle movement across the pinned hero stage
    const carScrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: stage,
        scrub: 1.2, // Smooth weighted inertia
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Milestone-based indicator highlights on performance stats
          statBoxes.forEach((box, i) => {
            const stat = PERFORMANCE_STATS[i];
            const indicator = box.querySelector(".stat-indicator") as HTMLElement | null;
            if (indicator) {
              if (progress >= stat.threshold - 0.08) {
                indicator.style.backgroundColor = "#d4af37";
                indicator.style.opacity = "1";
                box.style.borderColor = "rgba(212, 175, 55, 0.4)";
              } else {
                indicator.style.backgroundColor = "transparent";
                indicator.style.opacity = "0.2";
                box.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }
            }
          });
        },
      },
    });

    // Original cinematic movement path:
    // As the user scrolls, the hypercar sweeps across the hero,
    // scaling up into dynamic focus, with realistic steering angle
    carScrollTimeline
      .to(carWrapper, {
        xPercent: -35,
        yPercent: 4,
        scale: 1.08,
        rotation: -1.6,
        ease: "power1.inOut",
        duration: 0.6,
      })
      .to(carWrapper, {
        xPercent: -65,
        yPercent: -2,
        scale: 1.02,
        rotation: 0.8,
        ease: "power1.inOut",
        duration: 0.4,
      });

    // Subtle parallax depth on headline & supporting copy during scroll
    gsap.to(headline, {
      opacity: 0.3,
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(subtext, {
      opacity: 0.2,
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      introTl.kill();
      carScrollTimeline.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0b0c0f]"
      style={{ height: "260vh" }}
      id="hero"
    >
      {/* Pinned 100vh Hero Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-10 md:px-16 pt-24 pb-8 overflow-hidden select-none"
      >
        {/* Subtle Ambient Studio Lighting behind vehicle */}
        <div
          className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[700px] h-[400px] pointer-events-none rounded-full blur-[160px]"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.09) 0%, rgba(11,12,15,0) 70%)",
          }}
        />

        {/* ------------------------------------------------------------- */}
        {/* Top/Left: Editorial Letter-Spaced Headline                    */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 max-w-2xl">
          {/* Subtle Category Pretitle */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#d4af37]">
              01 // THE NEXT ERA OF VELOCITY
            </span>
          </div>

          {/* Letter-Spaced Headline: D R I V E   T H E   F U T U R E */}
          <div
            ref={headlineRef}
            className="flex flex-col font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] text-white tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.28em]"
          >
            <span className="headline-line inline-block will-change-transform">
              D R I V E
            </span>
            <span className="headline-line inline-block text-white/90 will-change-transform">
              T H E
            </span>
            <span className="headline-line inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 will-change-transform">
              F U T U R E
            </span>
          </div>

          {/* Editorial Supporting Copy */}
          <p
            ref={subtextRef}
            className="mt-4 text-xs sm:text-sm text-gray-400 font-normal max-w-md leading-relaxed tracking-wide"
          >
            Performance engineered for the next generation of pure electric velocity.
            Sculpted carbon aerodynamics meeting dual-motor instant torque.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Center / Right: The Hypercar Main Visual                      */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute top-[48%] -translate-y-1/2 right-[-15%] sm:right-[-5%] md:right-[2%] lg:right-[6%] w-[95vw] sm:w-[80vw] md:w-[65vw] lg:w-[56vw] max-w-[960px] pointer-events-none z-20">
          <div ref={carWrapperRef} className="relative will-change-transform">
            <img
              ref={carImgRef}
              src={`${basePath}/hypercar.jpg`}
              alt="AURA GT Electric Hypercar"
              className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)] will-change-transform"
              draggable={false}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom: Four Performance Statistics (Typography-driven)       */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-30 w-full pt-4 border-t border-white/10">
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {PERFORMANCE_STATS.map((stat, index) => (
              <div
                key={stat.id}
                ref={(el) => {
                  statBoxRefs.current[index] = el;
                }}
                className="flex flex-col justify-start border-l border-white/10 pl-4 py-1 transition-all duration-300"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="stat-indicator w-1.5 h-1.5 rounded-full border border-[#d4af37]/40 bg-transparent transition-all duration-300" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                    METRIC 0{index + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
                    {stat.value}
                  </span>
                  <span className="text-sm sm:text-base font-mono text-[#d4af37] font-semibold">
                    {stat.unit}
                  </span>
                </div>

                <span className="text-[11px] sm:text-xs text-gray-400 font-medium mt-0.5 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Minimal Scroll Prompt */}
          <div className="flex items-center justify-between mt-6 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              SCROLL DRIVEN INTERACTION
            </span>
            <span className="hidden sm:flex items-center gap-1 text-gray-400">
              EXPLORE PERFORMANCE <ArrowDown className="w-3 h-3 text-[#d4af37] inline" />
            </span>
            <span>AURA MOTOR CARS © 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};
