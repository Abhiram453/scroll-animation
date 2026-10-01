"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORD_1 = ["W", "E", "L", "C", "O", "M", "E"];
const WORD_2 = ["I", "T", "Z", "F", "I", "Z", "Z"];

const STATS = [
  { value: "58%", label: "Increase in pick up point use" },
  { value: "23%", label: "Decreased in customer phone calls" },
  { value: "27%", label: "Increase in pick up point use" },
  { value: "40%", label: "Reduction in turnaround time" },
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const roadRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const carImgRef = useRef<HTMLImageElement>(null);

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Base path for GitHub Pages asset resolution
  const basePath = useMemo(() => {
    return process.env.NODE_ENV === "production" ? "/scroll-animation" : "";
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const label = labelRef.current;
    const road = roadRef.current;
    const carWrapper = carWrapperRef.current;
    const carImg = carImgRef.current;
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    const statItems = statItemRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !stage || !road || !carWrapper || !carImg) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([label, carImg, letters, statItems], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    // -------------------------------------------------------------
    // 1. INITIAL STATE & LOAD ANIMATION (GSAP Timeline)
    // -------------------------------------------------------------
    // Letters initially start hidden in a lower position beneath the road/car
    gsap.set(letters, {
      y: 80,
      opacity: 0,
      scale: 0.9,
    });

    const introTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.15,
    });

    // 1. Small label fades in
    introTl.fromTo(
      label,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    // 2. Car fades and settles into its starting position on the road
    introTl.fromTo(
      carImg,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // 3. Statistics animate in sequentially
    introTl.fromTo(
      statItems,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      "-=0.5"
    );

    // After the intro finishes: CAR AND EVERYTHING STOPS.
    // Only scroll controls progression.

    // -------------------------------------------------------------
    // 2. SCROLL-DRIVEN ANIMATION (GSAP ScrollTrigger)
    // -------------------------------------------------------------
    // Calculate horizontal travel distance across the road
    const calculateTravel = () => {
      const roadWidth = road.offsetWidth || window.innerWidth;
      const carWidth = carWrapper.offsetWidth || 240;
      return Math.max(0, roadWidth - carWidth - 16);
    };

    let totalTravel = calculateTravel();

    const handleResize = () => {
      totalTravel = calculateTravel();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

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

    // A. Main horizontal car movement across the road
    scrollTl.to(
      carWrapper,
      {
        x: () => totalTravel,
        ease: "none",
        duration: 1,
      },
      0
    );

    // B. Subtle physical car motion (suspension tilt and micro vertical settling)
    scrollTl.to(
      carWrapper,
      {
        rotation: -1,
        y: 2,
        ease: "sine.inOut",
        duration: 0.3,
      },
      0.1
    );

    scrollTl.to(
      carWrapper,
      {
        rotation: 0.8,
        y: -2,
        ease: "sine.inOut",
        duration: 0.4,
      },
      0.4
    );

    scrollTl.to(
      carWrapper,
      {
        rotation: 0,
        y: 0,
        ease: "sine.inOut",
        duration: 0.3,
      },
      0.8
    );

    // C. Sequential letter reveal:
    // As the car drives along the road, each letter emerges from below and rises into place!
    const totalLetters = letters.length; // 14 letters
    const startProgress = 0.06;
    const endProgress = 0.86;
    const progressStep = (endProgress - startProgress) / totalLetters;

    letters.forEach((letter, i) => {
      const letterStartTime = startProgress + i * progressStep;
      const letterDuration = progressStep * 1.6; // smooth overlapping lift

      scrollTl.fromTo(
        letter,
        {
          y: 80, // initial position beneath the road/car
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0, // rises into headline position
          opacity: 1,
          scale: 1,
          duration: letterDuration,
          ease: "power2.out",
        },
        letterStartTime
      );
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      introTl.kill();
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f8f7f4]"
      style={{ height: "250vh" }}
      id="hero"
    >
      {/* Pinned 100vh Viewport Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-6 sm:px-12 md:px-16 pt-8 pb-10 overflow-hidden select-none"
      >
        {/* TOP: Small Minimal Brand / Micro-Label */}
        <div
          ref={labelRef}
          className="w-full max-w-6xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#666666] uppercase"
        >
          <span>ITZFIZZ / SCROLL STUDY</span>
          <span className="hidden sm:inline text-[#888888]">SCROLL TO DRIVE</span>
        </div>

        {/* UPPER/MIDDLE: Large Headline Area ("W E L C O M E   I T Z F I Z Z") */}
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto pt-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 md:gap-x-14 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black uppercase text-[#111111]">
            {/* Word 1: W E L C O M E */}
            <div className="flex items-center gap-x-1.5 sm:gap-x-2.5 md:gap-x-3.5">
              {WORD_1.map((char, index) => (
                <span
                  key={`w1-${index}`}
                  className="inline-block overflow-hidden py-1"
                >
                  <span
                    ref={(el) => {
                      letterRefs.current[index] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{ transform: "translateY(80px)", opacity: 0 }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </div>

            {/* Word 2: I T Z F I Z Z */}
            <div className="flex items-center gap-x-1.5 sm:gap-x-2.5 md:gap-x-3.5">
              {WORD_2.map((char, index) => (
                <span
                  key={`w2-${index}`}
                  className="inline-block overflow-hidden py-1"
                >
                  <span
                    ref={(el) => {
                      letterRefs.current[WORD_1.length + index] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{ transform: "translateY(80px)", opacity: 0 }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER/LOWER: Road + Isolated Car */}
        <div className="relative w-full max-w-6xl mx-auto my-auto flex flex-col justify-center">
          {/* The Road Strip */}
          <div
            ref={roadRef}
            className="relative w-full h-[70px] sm:h-[85px] md:h-[95px] bg-[#18181b] rounded-2xl overflow-hidden shadow-inner flex items-center"
          >
            {/* Subtle Center Dashed Lane Marking */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] border-b-2 border-dashed border-white/20" />

            {/* Isolated Car riding directly on the road */}
            <div
              ref={carWrapperRef}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 will-change-transform pointer-events-none"
              style={{ width: "fit-content" }}
            >
              <img
                ref={carImgRef}
                src={`${basePath}/car.png`}
                alt="McLaren 720S"
                className="h-[55px] sm:h-[70px] md:h-[80px] w-auto object-contain select-none pointer-events-none drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] will-change-transform"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM: Exactly Four Statistics (Minimal Typography) */}
        <div className="w-full max-w-6xl mx-auto z-10 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {STATS.map((stat, index) => (
              <div
                key={index}
                ref={(el) => {
                  statItemRefs.current[index] = el;
                }}
                className="flex flex-col items-start"
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
