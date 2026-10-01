"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Headline words: DRIVE WITH PURPOSE
const WORD_1 = ["D", "R", "I", "V", "E"];
const WORD_2 = ["W", "I", "T", "H"];
const WORD_3 = ["P", "U", "R", "P", "O", "S", "E"];

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
  const trailRef = useRef<HTMLDivElement>(null);
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
    const trail = trailRef.current;
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
        rotation: 0,
      });
      return;
    }

    // -------------------------------------------------------------
    // 1. INITIAL STATE & LOAD ANIMATION (GSAP Timeline)
    // -------------------------------------------------------------
    // Letters initially start in lower/hidden position beneath headline baseline
    gsap.set(letters, {
      y: 70,
      opacity: 0,
      scale: 0.94,
      rotation: -1.5,
    });

    if (trail) {
      gsap.set(trail, { width: 0 });
    }

    const introTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.15,
    });

    // 1. Small brand label fades in
    introTl.fromTo(
      label,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    // 2. Car fades and settles onto starting position on the road
    introTl.fromTo(
      carImg,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // 3. Statistics animate in sequentially
    introTl.fromTo(
      statItems,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      "-=0.5"
    );

    // After intro finishes: CAR AND EVERYTHING STOPS.
    // Only scroll controls progression.

    // -------------------------------------------------------------
    // 2. SCROLL-DRIVEN ANIMATION (GSAP ScrollTrigger)
    // -------------------------------------------------------------
    // Calculate total horizontal travel distance across the road
    const calculateTravel = () => {
      const roadWidth = road.offsetWidth || window.innerWidth;
      const carWidth = carWrapper.offsetWidth || 180;
      return Math.max(0, roadWidth - carWidth - 16);
    };

    let totalTravel = calculateTravel();

    const handleResize = () => {
      totalTravel = calculateTravel();
      ScrollTrigger.refresh();
    };

    const handleImgLoad = () => {
      totalTravel = calculateTravel();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    if (!carImg.complete) {
      carImg.addEventListener("load", handleImgLoad);
    }

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: stage,
        scrub: 1, // Smooth, physical connection to user scroll
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

    // B. Subtle wake/trail extending along the road behind the car
    if (trail) {
      scrollTl.to(
        trail,
        {
          width: () => totalTravel + 30,
          ease: "none",
          duration: 1,
        },
        0
      );
    }

    // C. Physical car motion (micro suspension tilt and vertical settling)
    scrollTl.to(
      carWrapper,
      {
        rotation: -0.8,
        y: 1.5,
        ease: "sine.inOut",
        duration: 0.3,
      },
      0.1
    );

    scrollTl.to(
      carWrapper,
      {
        rotation: 0.6,
        y: -1.5,
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

    // D. Sequential letter reveal:
    // As the car drives along the road, each letter emerges from below
    // and settles into the exact, unified headline baseline!
    const totalLetters = letters.length; // 16 letters
    const startProgress = 0.05;
    const endProgress = 0.88;
    const progressStep = (endProgress - startProgress) / totalLetters;

    letters.forEach((letter, i) => {
      const letterStartTime = startProgress + i * progressStep;
      const letterDuration = progressStep * 1.5; // overlapping smooth lift

      scrollTl.fromTo(
        letter,
        {
          y: 70, // starts in lower position beneath the road/car level
          opacity: 0,
          scale: 0.94,
          rotation: -1.5,
        },
        {
          y: 0, // finishes at exact 0px baseline
          opacity: 1,
          scale: 1,
          rotation: 0, // finishes with exact 0deg rotation
          duration: letterDuration,
          ease: "power2.out",
          immediateRender: false,
        },
        letterStartTime
      );
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      carImg.removeEventListener("load", handleImgLoad);
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
        className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 md:px-16 pt-8 pb-10 overflow-hidden select-none"
      >
        {/* TOP: Small Minimal Brand / Micro-Label */}
        <div
          ref={labelRef}
          className="w-full max-w-6xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase"
        >
          <span>ITZFIZZ / MOTION STUDY</span>
          <span className="hidden sm:inline text-[#999999]">SCROLL TO DRIVE</span>
        </div>

        {/* UPPER/MIDDLE: Headline Area ("DRIVE WITH PURPOSE" in Gloock Serif) */}
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto pt-2">
          <div className="w-full text-center">
            {/* Headline is kept as ONE clean line on desktop */}
            <h1 className="flex items-baseline justify-center flex-nowrap whitespace-nowrap gap-x-3 min-[400px]:gap-x-4 sm:gap-x-7 md:gap-x-10 lg:gap-x-12 text-2xl min-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] uppercase text-[#111111] font-editorial tracking-[0.14em] sm:tracking-[0.18em] leading-none">
              {/* Word 1: DRIVE */}
              <span className="inline-flex items-baseline gap-x-0.5 sm:gap-x-1.5 md:gap-x-2">
                {WORD_1.map((char, index) => (
                  <span
                    key={`w1-${index}`}
                    className="inline-flex items-baseline overflow-hidden py-1.5 -my-1.5 leading-none select-none"
                  >
                    <span
                      ref={(el) => {
                        letterRefs.current[index] = el;
                      }}
                      className="letter-char inline-block leading-none will-change-transform font-editorial"
                      style={{ transform: "translateY(70px)", opacity: 0 }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>

              {/* Word 2: WITH */}
              <span className="inline-flex items-baseline gap-x-0.5 sm:gap-x-1.5 md:gap-x-2">
                {WORD_2.map((char, index) => (
                  <span
                    key={`w2-${index}`}
                    className="inline-flex items-baseline overflow-hidden py-1.5 -my-1.5 leading-none select-none"
                  >
                    <span
                      ref={(el) => {
                        letterRefs.current[WORD_1.length + index] = el;
                      }}
                      className="letter-char inline-block leading-none will-change-transform font-editorial"
                      style={{ transform: "translateY(70px)", opacity: 0 }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>

              {/* Word 3: PURPOSE */}
              <span className="inline-flex items-baseline gap-x-0.5 sm:gap-x-1.5 md:gap-x-2">
                {WORD_3.map((char, index) => (
                  <span
                    key={`w3-${index}`}
                    className="inline-flex items-baseline overflow-hidden py-1.5 -my-1.5 leading-none select-none"
                  >
                    <span
                      ref={(el) => {
                        letterRefs.current[WORD_1.length + WORD_2.length + index] = el;
                      }}
                      className="letter-char inline-block leading-none will-change-transform font-editorial"
                      style={{ transform: "translateY(70px)", opacity: 0 }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>

        {/* CENTER/LOWER: Minimal Road + Grounded Isolated Car */}
        <div className="relative w-full max-w-6xl mx-auto my-auto flex flex-col justify-center">
          {/* Road Container with Car riding on top */}
          <div
            ref={roadRef}
            className="relative w-full h-[36px] sm:h-[42px] md:h-[48px] flex items-center"
          >
            {/* Asphalt Surface Strip (Rounded Pill with clean clipping for lane divider & trail) */}
            <div className="absolute inset-0 bg-[#1c1d21] rounded-full border-y border-neutral-300/60 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
              {/* Center Dashed Lane Divider */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[1.5px] border-b border-dashed border-white/20" />

              {/* Subtle surface wake/trail behind the vehicle */}
              <div
                ref={trailRef}
                className="absolute left-0 top-0 bottom-0 pointer-events-none rounded-l-full will-change-[width]"
                style={{
                  width: 0,
                  background: "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.14) 100%)",
                  borderRight: "2px solid rgba(255,255,255,0.35)",
                }}
              />
            </div>

            {/* Isolated Car visibly sitting directly ON the road (NOT clipped) */}
            <div
              ref={carWrapperRef}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 will-change-transform pointer-events-none"
              style={{ width: "fit-content" }}
            >
              <img
                ref={carImgRef}
                src={`${basePath}/car.png`}
                alt="McLaren 720S"
                className="h-[50px] sm:h-[62px] md:h-[72px] w-auto object-contain select-none pointer-events-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)] will-change-transform"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM: Four Minimal Secondary Statistics */}
        <div className="w-full max-w-6xl mx-auto z-10 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {STATS.map((stat, index) => (
              <div
                key={index}
                ref={(el) => {
                  statItemRefs.current[index] = el;
                }}
                className="flex flex-col items-start border-l border-neutral-300/50 pl-3 sm:pl-4 py-0.5"
              >
                <span className="text-xl sm:text-2xl font-light font-mono text-[#111111] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#777777] mt-0.5 leading-snug">
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
