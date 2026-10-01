"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: "58%", label: "Increase in pick up point use" },
  { value: "23%", label: "Decreased in customer phone calls" },
  { value: "27%", label: "Increase in pick up point use" },
  { value: "40%", label: "Decreased in customer phone calls" },
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const carImgRef = useRef<HTMLImageElement>(null);
  const statItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Base path for GitHub Pages asset resolution
  const basePath = useMemo(() => {
    return process.env.NODE_ENV === "production" ? "/scroll-animation" : "";
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const headline = headlineRef.current;
    const carWrapper = carWrapperRef.current;
    const carImg = carImgRef.current;
    const statItems = statItemRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !stage || !headline || !carWrapper || !carImg) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // -------------------------------------------------------------
    // 1. INITIAL LOAD ANIMATION (GSAP Timeline)
    // -------------------------------------------------------------
    const introTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.1,
    });

    if (prefersReducedMotion) {
      gsap.set([headline, carImg, statItems], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    // Headline: fade in + slight upward movement
    introTl.fromTo(
      headline,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Car: fade in + slight scale
    introTl.fromTo(
      carImg,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
      "-=0.5"
    );

    // Statistics: small staggered fade
    introTl.fromTo(
      statItems,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      "-=0.5"
    );

    // -------------------------------------------------------------
    // 2. SCROLL-DRIVEN ANIMATION (GSAP ScrollTrigger)
    // -------------------------------------------------------------
    // Pinned hero stage: user's scroll position directly controls the car
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: stage,
        scrub: 1, // Direct, physical, smooth connection to scroll
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Subtle, weighted, controlled movement across the hero
    scrollTl
      .to(carWrapper, {
        xPercent: -25,
        yPercent: 3,
        scale: 1.05,
        rotation: -1.2,
        ease: "power1.inOut",
        duration: 0.45,
      })
      .to(carWrapper, {
        xPercent: -55,
        yPercent: -2,
        scale: 1.01,
        rotation: 0.5,
        ease: "power1.inOut",
        duration: 0.55,
      });

    // Subtle typography response to scroll
    gsap.to(headline, {
      y: -25,
      opacity: 0.8,
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
      className="relative w-full bg-[#fbfbfa]"
      style={{ height: "250vh" }}
      id="hero"
    >
      {/* Pinned 100vh Viewport Hero Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-6 sm:px-12 md:px-16 pt-12 md:pt-16 pb-12 overflow-hidden select-none"
      >
        {/* Top: Large Letter-Spaced Headline */}
        <div className="w-full text-center z-10 pt-2">
          <h1
            ref={headlineRef}
            className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.25em] md:tracking-[0.35em] text-[#111111] uppercase will-change-transform"
          >
            M O V E &nbsp; W I T H &nbsp; P U R P O S E
          </h1>
        </div>

        {/* Center: Large Isolated Car Visual (Transparent PNG, No Card, No Border) */}
        <div className="relative my-auto z-20 flex items-center justify-center w-full pointer-events-none">
          <div ref={carWrapperRef} className="relative will-change-transform">
            <img
              ref={carImgRef}
              src={`${basePath}/car.png`}
              alt="Isolated Supercar"
              className="w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[820px] max-w-none h-auto object-contain select-none pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] will-change-transform"
              draggable={false}
            />
          </div>
        </div>

        {/* Bottom: Four Minimal Statistics */}
        <div className="w-full max-w-6xl mx-auto z-10 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center md:text-left">
            {STATS.map((stat, index) => (
              <div
                key={index}
                ref={(el) => {
                  statItemRefs.current[index] = el;
                }}
                className="flex flex-col items-center md:items-start"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-[#666666] font-medium mt-1 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
