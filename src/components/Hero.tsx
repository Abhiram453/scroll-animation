"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E", " ",
  "I", "T", "Z", "F", "I", "Z", "Z"
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const valueTextRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const box4Ref = useRef<HTMLDivElement>(null);

  const basePath = useMemo(() => {
    return process.env.NODE_ENV === "production" ? "/scroll-animation" : "";
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const valueText = valueTextRef.current;
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    const b1 = box1Ref.current;
    const b2 = box2Ref.current;
    const b3 = box3Ref.current;
    const b4 = box4Ref.current;

    if (!section || !track || !road || !car || !trail || !valueText) return;

    // -------------------------------------------------------------
    // 1. INITIAL LOAD ANIMATION (GSAP Timeline)
    // -------------------------------------------------------------
    const introTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.15,
    });

    // Initial state: hide boxes, hide trail, rest car & headline
    gsap.set(trail, { width: 0 });
    gsap.set([b1, b2, b3, b4], { opacity: 0, y: 24 });
    gsap.set(letters, { opacity: 0 });

    // 1. Headline letters reveal smoothly with subtle upward movement
    introTl.fromTo(
      letters,
      { opacity: 0, y: 20 },
      {
        opacity: 0.18, // Subtle resting state so letters are faintly visible before car passes
        y: 0,
        duration: 0.8,
        stagger: 0.03,
      }
    );

    // 2. Car glides smoothly into the starting position
    introTl.fromTo(
      car,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // 3. Four statistics cards fade in sequentially with a subtle stagger delay
    introTl.to(
      [b1, b2, b3, b4],
      {
        opacity: 0.35, // Resting state on initial load before scroll activates them
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.4"
    );

    // -------------------------------------------------------------
    // 2. SCROLL-DRIVEN ANIMATION (Core Feature: GSAP + ScrollTrigger)
    // -------------------------------------------------------------
    const calculatePositions = () => {
      const roadWidth = road.offsetWidth || window.innerWidth;
      const carWidth = car.offsetWidth || 350;
      return {
        roadWidth,
        carWidth,
        endX: Math.max(0, roadWidth - carWidth),
      };
    };

    let { roadWidth, carWidth, endX } = calculatePositions();

    const handleResize = () => {
      const updated = calculatePositions();
      roadWidth = updated.roadWidth;
      carWidth = updated.carWidth;
      endX = updated.endX;
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Main Car + Trail + Letter Reveal ScrollTrigger (Pinned)
    const carTween = gsap.to(car, {
      x: () => endX,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: track,
        scrub: 1.2, // Smooth, weighted, organic inertia
        invalidateOnRefresh: true,
        onUpdate: () => {
          // Dynamic calculation of car head position
          const currentCarX = gsap.getProperty(car, "x") as number;
          const carHeadX = currentCarX + carWidth * 0.45;

          // Extend solid green trail directly behind the car
          gsap.set(trail, { width: Math.max(0, currentCarX + carWidth * 0.15) });

          // Kinetic Typography: as the car passes each letter, illuminate to full opacity
          if (valueText) {
            const roadRect = road.getBoundingClientRect();
            letters.forEach((letter) => {
              const letterRect = letter.getBoundingClientRect();
              const letterRelativeX = letterRect.left - roadRect.left;

              if (carHeadX >= letterRelativeX) {
                letter.style.opacity = "1";
                letter.style.color = "#111111";
              } else {
                letter.style.opacity = "0.18";
                letter.style.color = "#666666";
              }
            });
          }
        },
      },
    });

    // ScrollTrigger reveal for Statistics Box 1 (58% Increase in pick up point use)
    const b1Tween = gsap.to(b1, {
      opacity: 1,
      y: 0,
      scale: 1.02,
      scrollTrigger: {
        trigger: section,
        start: "top+=25% top",
        end: "top+=40% top",
        scrub: true,
      },
    });

    // ScrollTrigger reveal for Statistics Box 2 (23% Decreased in customer phone calls)
    const b2Tween = gsap.to(b2, {
      opacity: 1,
      y: 0,
      scale: 1.02,
      scrollTrigger: {
        trigger: section,
        start: "top+=40% top",
        end: "top+=55% top",
        scrub: true,
      },
    });

    // ScrollTrigger reveal for Statistics Box 3 (27% Increase in pick up point use)
    const b3Tween = gsap.to(b3, {
      opacity: 1,
      y: 0,
      scale: 1.02,
      scrollTrigger: {
        trigger: section,
        start: "top+=55% top",
        end: "top+=70% top",
        scrub: true,
      },
    });

    // ScrollTrigger reveal for Statistics Box 4 (40% Decreased in customer phone calls)
    const b4Tween = gsap.to(b4, {
      opacity: 1,
      y: 0,
      scale: 1.02,
      scrollTrigger: {
        trigger: section,
        start: "top+=70% top",
        end: "top+=85% top",
        scrub: true,
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      introTl.kill();
      carTween.kill();
      b1Tween.kill();
      b2Tween.kill();
      b3Tween.kill();
      b4Tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [basePath]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#121212]"
      style={{ height: "240vh" }}
    >
      {/* Pinned Viewport Track (sticky 100vh) */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#d1d1d1] overflow-hidden select-none"
      >
        {/* The Central Road Element */}
        <div
          ref={roadRef}
          className="w-screen h-[180px] md:h-[200px] bg-[#1e1e1e] relative overflow-hidden flex items-center"
        >
          {/* Green Trail (#45db7d) expanding dynamically as the car travels */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full bg-[#45db7d] z-[1] will-change-[width]"
            style={{ width: 0 }}
          />

          {/* Letter-Spaced Headline inside the road */}
          <div
            ref={valueTextRef}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 z-[5] flex items-center gap-[0.25rem] md:gap-[0.4rem] font-black tracking-[0.2em] md:tracking-[0.35em] uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl select-none pointer-events-none"
          >
            {HEADLINE_LETTERS.map((char, index) => {
              if (char === " ") {
                return (
                  <span
                    key={`space-${index}`}
                    className="inline-block w-4 md:w-8"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </span>
                );
              }
              return (
                <span
                  key={`char-${index}`}
                  ref={(el) => {
                    lettersRef.current[index] = el;
                  }}
                  className="inline-block transition-opacity duration-150 ease-out"
                  style={{ color: "#111111", opacity: 0 }}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Supercar Asset (McLaren 720S Top View) */}
          <img
            ref={carRef}
            src={`${basePath}/car.png`}
            alt="McLaren 720S"
            className="absolute top-0 left-0 h-full w-auto object-contain z-[10] select-none pointer-events-none will-change-transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Four Statistics / Impact Metrics (Faithful to Reference)      */}
        {/* ------------------------------------------------------------- */}

        {/* Box 1 (Top Left / Center) - #def54f Lime Yellow */}
        <div
          ref={box1Ref}
          className="absolute z-[15] rounded-xl flex flex-col justify-center items-start text-[#111] transition-all duration-300 pointer-events-none"
          style={{
            top: "8%",
            right: "32%",
            backgroundColor: "#def54f",
            padding: "24px 28px",
            maxWidth: "280px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <span className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
            58%
          </span>
          <span className="text-xs md:text-sm font-medium leading-snug">
            Increase in pick up point use
          </span>
        </div>

        {/* Box 2 (Bottom Left / Center) - #6ac9ff Sky Blue */}
        <div
          ref={box2Ref}
          className="absolute z-[15] rounded-xl flex flex-col justify-center items-start text-[#111] transition-all duration-300 pointer-events-none"
          style={{
            bottom: "8%",
            right: "35%",
            backgroundColor: "#6ac9ff",
            padding: "24px 28px",
            maxWidth: "280px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <span className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
            23%
          </span>
          <span className="text-xs md:text-sm font-medium leading-snug">
            Decreased in customer phone calls
          </span>
        </div>

        {/* Box 3 (Top Right) - #333333 Charcoal with White Text */}
        <div
          ref={box3Ref}
          className="absolute z-[15] rounded-xl flex flex-col justify-center items-start text-white transition-all duration-300 pointer-events-none"
          style={{
            top: "8%",
            right: "8%",
            backgroundColor: "#333333",
            padding: "24px 28px",
            maxWidth: "280px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <span className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
            27%
          </span>
          <span className="text-xs md:text-sm font-medium leading-snug text-gray-200">
            Increase in pick up point use
          </span>
        </div>

        {/* Box 4 (Bottom Right) - #fa7328 Warm Orange */}
        <div
          ref={box4Ref}
          className="absolute z-[15] rounded-xl flex flex-col justify-center items-start text-[#111] transition-all duration-300 pointer-events-none"
          style={{
            bottom: "8%",
            right: "12%",
            backgroundColor: "#fa7328",
            padding: "24px 28px",
            maxWidth: "280px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <span className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
            40%
          </span>
          <span className="text-xs md:text-sm font-medium leading-snug">
            Decreased in customer phone calls
          </span>
        </div>
      </div>
    </div>
  );
};
