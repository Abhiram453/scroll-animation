"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: "03.2", unit: "s", label: "0–100 KM/H" },
  { value: "620", unit: "KM", label: "MAX RANGE" },
  { value: "480", unit: "HP", label: "PEAK POWER" },
  { value: "92", unit: "%", label: "EFFICIENCY" },
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const visualImgRef = useRef<HTMLImageElement>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const statItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Base path for GitHub Pages asset resolution
  const basePath = useMemo(() => {
    return process.env.NODE_ENV === "production" ? "/scroll-animation" : "";
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const subtext = subtextRef.current;
    const visualWrapper = visualWrapperRef.current;
    const visualImg = visualImgRef.current;
    const statItems = statItemRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !stage || !headline || !visualWrapper || !visualImg) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // -------------------------------------------------------------
    // 1. INITIAL LOAD ANIMATION (GSAP Timeline)
    // -------------------------------------------------------------
    const headlineLines = headline.querySelectorAll(".headline-line");
    const nav = document.querySelector(".site-nav");

    const introTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.1,
    });

    if (prefersReducedMotion) {
      // Respect accessibility preference
      gsap.set([nav, eyebrow, headlineLines, subtext, visualImg, statItems], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    // Step 1: Navigation fades in
    if (nav) {
      introTl.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    }

    // Step 2: Eyebrow fades upward
    introTl.fromTo(
      eyebrow,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    // Step 3: Headline reveals line-by-line
    introTl.fromTo(
      headlineLines,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
      },
      "-=0.4"
    );

    // Step 4: Supporting text appears
    introTl.fromTo(
      subtext,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.5"
    );

    // Step 5: Main visual fades/slides into position
    introTl.fromTo(
      visualImg,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Step 6: Statistics appear sequentially
    introTl.fromTo(
      statItems,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
      },
      "-=0.5"
    );

    // -------------------------------------------------------------
    // 2. CORE FEATURE — SCROLL ANIMATION (GSAP ScrollTrigger)
    // -------------------------------------------------------------
    // Pinned hero stage: user's scroll position directly controls motion
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: stage,
        scrub: 1.2, // Smooth interpolation and weighted inertia
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Original motion path:
    // Visual glides across the stage, scaling subtly and experiencing natural yaw
    scrollTl
      .to(visualWrapper, {
        xPercent: -22,
        scale: 1.05,
        rotation: -1.2,
        ease: "power1.inOut",
        duration: 0.35,
      })
      .to(visualWrapper, {
        xPercent: -45,
        scale: 1.02,
        rotation: 0.4,
        ease: "power1.inOut",
        duration: 0.4,
      })
      .to(visualWrapper, {
        xPercent: -60,
        scale: 0.98,
        rotation: -0.2,
        ease: "power1.inOut",
        duration: 0.25,
      });

    // Subtle typography response to scroll
    gsap.to(headline, {
      y: -30,
      opacity: 0.75,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Subtle statistics response to scroll
    gsap.to(statItems, {
      y: -10,
      opacity: 0.85,
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
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="motion-section relative w-full bg-[#f5f4f0]"
      style={{ height: "260vh" }}
      id="hero"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="motion-stage sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-28 pb-10 overflow-hidden select-none"
      >
        {/* Upper Two-Part Composition: Headline (Left) & Visual (Right/Center) */}
        <div className="relative w-full flex-1 flex flex-col lg:flex-row items-start justify-between mt-2 md:mt-6">
          {/* Left Side: Eyebrow, Letter-Spaced Headline, Supporting Statement */}
          <div className="relative z-10 max-w-xl">
            {/* Small Eyebrow */}
            <div
              ref={eyebrowRef}
              className="text-[11px] font-mono tracking-[0.25em] text-[#666666] uppercase mb-4"
            >
              SCROLL STUDY / 01
            </div>

            {/* Large Letter-Spaced Headline: M O V E   W I T H   P U R P O S E */}
            <h1
              ref={headlineRef}
              className="flex flex-col font-extrabold uppercase text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.92] text-[#111111] tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.26em]"
            >
              <span className="headline-line inline-block will-change-transform">
                M O V E
              </span>
              <span className="headline-line inline-block will-change-transform">
                W I T H
              </span>
              <span className="headline-line inline-block will-change-transform">
                P U R P O S E
              </span>
            </h1>

            {/* Small Supporting Text */}
            <p
              ref={subtextRef}
              className="mt-6 text-xs sm:text-sm text-[#666666] font-normal max-w-xs sm:max-w-sm leading-relaxed tracking-wide"
            >
              An exploration of movement, proportion and scroll.
            </p>
          </div>

          {/* Right / Center: Large High-Resolution Automotive Visual */}
          <div className="absolute top-[52%] lg:top-[48%] -translate-y-1/2 right-[-12%] sm:right-[-6%] md:right-[0%] lg:right-[3%] w-[96vw] sm:w-[82vw] md:w-[68vw] lg:w-[58vw] max-w-[980px] pointer-events-none z-20">
            <div ref={visualWrapperRef} className="relative will-change-transform">
              <img
                ref={visualImgRef}
                src={`${basePath}/editorial_car.jpg`}
                alt="Automotive motion visual study"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] will-change-transform"
                style={{ mixBlendMode: "multiply" }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom: Four Minimal Statistics                               */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={statsRef}
          className="relative z-30 w-full pt-6 border-t border-[#e2e0d8]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                ref={(el) => {
                  statItemRefs.current[index] = el;
                }}
                className="flex flex-col border-l border-[#d8d6ce] pl-4 sm:pl-5 py-0.5"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] font-sans">
                    {stat.value}
                  </span>
                  <span className="text-sm sm:text-base font-mono font-medium text-[#666666]">
                    {stat.unit}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#666666] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Minimal Editorial Subtext */}
          <div className="flex items-center justify-between mt-6 text-[10px] font-mono text-[#888888] uppercase tracking-widest">
            <span>SCROLL TO MODULATE TRAJECTORY</span>
            <span className="hidden sm:inline">PROPORTION / MOTION STUDY</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};
