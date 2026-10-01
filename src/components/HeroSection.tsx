"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, Zap, TrendingUp, ShieldCheck, ChevronDown, Sparkles } from "lucide-react";
import { soundEngine } from "@/utils/audio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  id: string;
  value: string;
  label: string;
  color: string;
  bgGlow: string;
  borderGlow: string;
  activeAt: number; // scroll progress threshold (0 to 1)
  positionClass: string;
}

const STATS: StatItem[] = [
  {
    id: "box1",
    value: "58%",
    label: "Increase in pick up point use",
    color: "#def54f",
    bgGlow: "rgba(222, 245, 79, 0.12)",
    borderGlow: "rgba(222, 245, 79, 0.4)",
    activeAt: 0.18,
    positionClass: "top-4 lg:top-8 left-4 lg:left-12",
  },
  {
    id: "box2",
    value: "23%",
    label: "Decreased in customer phone calls",
    color: "#6ac9ff",
    bgGlow: "rgba(106, 201, 255, 0.12)",
    borderGlow: "rgba(106, 201, 255, 0.4)",
    activeAt: 0.42,
    positionClass: "bottom-4 lg:bottom-8 left-4 lg:left-1/4",
  },
  {
    id: "box3",
    value: "89%",
    label: "Aerodynamic downforce efficiency",
    color: "#a78bfa",
    bgGlow: "rgba(167, 139, 250, 0.12)",
    borderGlow: "rgba(167, 139, 250, 0.4)",
    activeAt: 0.68,
    positionClass: "top-4 lg:top-8 right-4 lg:right-1/4",
  },
  {
    id: "box4",
    value: "40%",
    label: "Reduction in dispatch turnaround",
    color: "#fa7328",
    bgGlow: "rgba(250, 115, 40, 0.12)",
    borderGlow: "rgba(250, 115, 40, 0.4)",
    activeAt: 0.88,
    positionClass: "bottom-4 lg:bottom-8 right-4 lg:right-12",
  },
];

const HEADLINE_TEXT = "W E L C O M E   I T Z   F I Z Z";

interface HeroSectionProps {
  onScrollProgressUpdate?: (progress: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollProgressUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statBoxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Telemetry HUD state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [speedKmH, setSpeedKmH] = useState(0);
  const [currentGear, setCurrentGear] = useState("1");
  const [activeStatIndex, setActiveStatIndex] = useState(-1);

  // Asset base path for GitHub Pages compatibility
  const basePath = useMemo(() => {
    return process.env.NODE_ENV === "production" ? "/scroll-animation" : "";
  }, []);

  const headlineLetters = useMemo(() => {
    return HEADLINE_TEXT.split("");
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const headline = headlineRef.current;
    const statBoxes = statBoxRefs.current.filter(Boolean) as HTMLDivElement[];
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    if (!container || !track || !road || !car || !trail || !headline) return;

    // -------------------------------------------------------------
    // 1. INITIAL LOAD ANIMATION (Requirement 2)
    // -------------------------------------------------------------
    const introTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.2,
    });

    // Staggered reveal of the headline letters with subtle 3D lift & blur
    introTl.fromTo(
      letters,
      {
        opacity: 0,
        y: 28,
        scale: 0.92,
        filter: "blur(4px)",
      },
      {
        opacity: 0.35, // Initial rested opacity before car illuminates them
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.025,
      }
    );

    // Initial car entrance - drifts gently into starting grid
    introTl.fromTo(
      car,
      {
        x: -120,
        opacity: 0,
        scale: 0.95,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Initial load animation for statistics cards (one by one with subtle delay)
    introTl.fromTo(
      statBoxes,
      {
        opacity: 0,
        y: 35,
        scale: 0.88,
      },
      {
        opacity: 0.75,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.2)",
      },
      "-=0.5"
    );

    // Initial trail setup
    gsap.set(trail, { width: 0 });

    // -------------------------------------------------------------
    // 2. SCROLL-BASED ANIMATION (Core Feature - Requirement 3 & 4)
    // -------------------------------------------------------------
    let lastScrollProgress = 0;
    let velocitySmoother = 0;

    const calcCarTravel = () => {
      const roadBounds = road.getBoundingClientRect();
      const carBounds = car.getBoundingClientRect();
      // Total travel distance across the road
      return Math.max(0, roadBounds.width - carBounds.width);
    };

    let totalCarTravel = calcCarTravel();

    const handleResize = () => {
      totalCarTravel = calcCarTravel();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: track,
      scrub: 1.2, // Smooth interpolation / inertia
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const velocity = Math.abs(self.getVelocity() || 0);

        // Smooth velocity calculation for realistic telemetry HUD
        velocitySmoother = gsap.utils.interpolate(velocitySmoother, velocity, 0.2);
        const calculatedSpeed = Math.min(340, Math.round(progress * 180 + velocitySmoother * 0.055));
        setSpeedKmH(calculatedSpeed);

        // Gear calculation based on speed
        let gear = "1";
        if (calculatedSpeed > 280) gear = "7";
        else if (calculatedSpeed > 220) gear = "6";
        else if (calculatedSpeed > 160) gear = "5";
        else if (calculatedSpeed > 110) gear = "4";
        else if (calculatedSpeed > 65) gear = "3";
        else if (calculatedSpeed > 25) gear = "2";
        else if (calculatedSpeed === 0) gear = "N";
        setCurrentGear(gear);

        // Update Web Audio synthesizer
        soundEngine.updateSpeed(calculatedSpeed);

        // Car position along the road
        const carX = progress * totalCarTravel;
        gsap.set(car, {
          x: carX,
          // Subtle torque roll angle simulating acceleration dynamics
          rotation: (progress - lastScrollProgress) * 45,
          force3D: true,
        });

        // Glowing trail expands right behind the car
        // Car rear axle offset: car is roughly 180-220px wide, rear is at ~30%
        const trailWidth = Math.max(0, carX + 35);
        gsap.set(trail, { width: trailWidth });

        // Letter-spaced headline illumination:
        // As the car moves past each letter, light it up!
        const carCenter = car.getBoundingClientRect().left + car.getBoundingClientRect().width / 2;
        letters.forEach((letter) => {
          const letterRect = letter.getBoundingClientRect();
          if (carCenter >= letterRect.left - 15) {
            letter.style.opacity = "1";
            letter.style.color = "#00f5a0";
            letter.style.textShadow = "0 0 16px rgba(0, 245, 160, 0.8), 0 0 32px rgba(0, 217, 245, 0.4)";
            letter.style.transform = "translateY(-2px) scale(1.04)";
          } else {
            letter.style.opacity = "0.35";
            letter.style.color = "#ffffff";
            letter.style.textShadow = "none";
            letter.style.transform = "translateY(0) scale(1)";
          }
        });

        // Statistics cards active state
        let currentActive = -1;
        STATS.forEach((stat, index) => {
          const box = statBoxes[index];
          if (box) {
            if (progress >= stat.activeAt - 0.08) {
              currentActive = index;
              box.style.opacity = "1";
              box.style.transform = "scale(1.04) translateY(-3px)";
              box.style.borderColor = stat.color;
              box.style.boxShadow = `0 0 25px ${stat.borderGlow}`;
            } else {
              box.style.opacity = "0.75";
              box.style.transform = "scale(1) translateY(0)";
              box.style.borderColor = "rgba(255, 255, 255, 0.1)";
              box.style.boxShadow = "none";
            }
          }
        });
        setActiveStatIndex(currentActive);

        // Update progress state
        setScrollProgress(progress);
        if (onScrollProgressUpdate) {
          onScrollProgressUpdate(progress);
        }

        lastScrollProgress = progress;
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTriggerInstance.kill();
      introTl.kill();
    };
  }, [basePath, onScrollProgressUpdate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0a0c10]"
      style={{ height: "260vh" }}
      id="hero"
    >
      {/* Pinned 100vh Hero Frame */}
      <div
        ref={trackRef}
        className="w-full h-screen sticky top-0 overflow-hidden flex flex-col justify-between pt-20 pb-6 px-4 md:px-8 cyber-grid select-none"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#00f5a0]/10 via-[#00d9f5]/10 to-[#6ac9ff]/5 blur-[120px] pointer-events-none rounded-full" />

        {/* ------------------------------------------------------------- */}
        {/* Top Header & Letter-Spaced Headline (Requirement 1)           */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center mt-2 md:mt-4">
          {/* Subtitle / Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00f5a0]" />
            <span>PRECISION MOTION LAB • SCROLL-DRIVEN ARCHITECTURE</span>
          </div>

          {/* Letter-Spaced Headline: W E L C O M E   I T Z   F I Z Z */}
          <div
            ref={headlineRef}
            className="flex items-center justify-center flex-wrap gap-x-2 md:gap-x-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-[0.2em] md:tracking-[0.35em] text-white py-2"
          >
            {headlineLetters.map((char, index) => {
              if (char === " ") {
                return (
                  <span
                    key={`space-${index}`}
                    className="inline-block w-3 md:w-6"
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
                  className="value-letter inline-block transition-all duration-200 ease-out will-change-transform"
                >
                  {char}
                </span>
              );
            })}
          </div>

          <p className="text-xs md:text-sm text-gray-400 font-mono tracking-widest mt-1 max-w-lg mx-auto">
            SCROLL TO ACCELERATE • OBSERVE DYNAMIC VEHICLE TELEMETRY
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* The Track / Road with Car & Glowing Trail (Requirement 3)     */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto my-auto py-2">
          {/* Track Surface Wrapper */}
          <div
            ref={roadRef}
            className="relative w-full h-[180px] md:h-[220px] rounded-3xl road-asphalt border-y border-white/10 overflow-hidden shadow-2xl flex items-center"
          >
            {/* Road Grid markings & distance telemetry */}
            <div className="absolute inset-0 road-grid opacity-30 pointer-events-none" />

            {/* Lane Dash Markers (Top, Middle, Bottom) */}
            <div className="absolute top-4 left-0 right-0 h-[2px] border-b border-dashed border-white/15" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] border-b-2 border-dashed border-[#00f5a0]/30" />
            <div className="absolute bottom-4 left-0 right-0 h-[2px] border-b border-dashed border-white/15" />

            {/* Distance Milestone Markers */}
            <div className="absolute bottom-2 left-6 text-[10px] font-mono text-gray-400">000M / START</div>
            <div className="absolute bottom-2 left-1/4 text-[10px] font-mono text-gray-400">125M / SECTOR 1</div>
            <div className="absolute bottom-2 left-2/4 text-[10px] font-mono text-gray-400">250M / APEX</div>
            <div className="absolute bottom-2 left-3/4 text-[10px] font-mono text-gray-400">375M / SECTOR 3</div>
            <div className="absolute bottom-2 right-6 text-[10px] font-mono text-[#00f5a0]">500M / FINISH</div>

            {/* Dynamic Glowing Neon Tire Trail */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
              style={{
                width: 0,
                background: "linear-gradient(90deg, rgba(0,245,160,0.02) 0%, rgba(0,245,160,0.18) 75%, rgba(0,217,245,0.4) 100%)",
                boxShadow: "0 0 35px rgba(0, 245, 160, 0.35)",
                borderRight: "3px solid #00f5a0",
              }}
            >
              {/* Twin tire friction lines */}
              <div className="absolute top-[28%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00f5a0]/50 to-[#00f5a0] shadow-[0_0_10px_#00f5a0]" />
              <div className="absolute bottom-[28%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00f5a0]/50 to-[#00f5a0] shadow-[0_0_10px_#00f5a0]" />
            </div>

            {/* The Supercar Element (McLaren 720S Top View) */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 will-change-transform"
              style={{ width: "fit-content" }}
            >
              <div className="relative">
                {/* Twin Forward Headlight Projection Beam */}
                <div
                  className="absolute left-[85%] top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: "360px",
                    height: "170px",
                    background: "radial-gradient(ellipse at left, rgba(106, 201, 255, 0.35) 0%, rgba(0, 245, 160, 0.12) 40%, transparent 75%)",
                    transform: "rotate(-1deg)",
                    transformOrigin: "left center",
                    filter: "blur(6px)",
                  }}
                />

                {/* Car Image with drop shadow */}
                <img
                  ref={carRef}
                  src={`${basePath}/car.png`}
                  alt="McLaren 720S Supercar Top View"
                  className="h-[120px] md:h-[155px] w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Floating Impact Metrics / Statistics (Requirements 1 & 2)      */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={statsContainerRef}
          className="relative z-30 w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-2"
        >
          {STATS.map((stat, idx) => (
            <div
              key={stat.id}
              ref={(el) => {
                statBoxRefs.current[idx] = el;
              }}
              style={{
                backgroundColor: stat.bgGlow,
              }}
              className={`rounded-2xl p-3.5 md:p-4 border border-white/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group ${
                activeStatIndex === idx ? "ring-1 ring-white/20" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs"
                  style={{ backgroundColor: stat.color }}
                >
                  {idx === 0 && <TrendingUp className="w-3.5 h-3.5" />}
                  {idx === 1 && <ShieldCheck className="w-3.5 h-3.5" />}
                  {idx === 2 && <Zap className="w-3.5 h-3.5" />}
                  {idx === 3 && <Gauge className="w-3.5 h-3.5" />}
                </div>
              </div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                {stat.label}
              </p>
              {/* Progress Indicator line */}
              <div className="w-full bg-white/10 h-1 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: stat.color,
                    width: scrollProgress >= stat.activeAt ? "100%" : `${Math.max(10, (scrollProgress / stat.activeAt) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom Bar: Telemetry HUD & Scroll Prompt                      */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-400 font-mono">
          {/* Left HUD: Speed & Gear */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1 bg-black/60 px-3 py-1 rounded-xl border border-white/10">
              <span className="text-gray-400 text-[10px]">VELOCITY:</span>
              <span className="text-lg font-bold text-white tracking-wider">{speedKmH}</span>
              <span className="text-[10px] text-[#00f5a0]">KM/H</span>
            </div>
            <div className="hidden sm:flex items-baseline gap-1 bg-black/60 px-3 py-1 rounded-xl border border-white/10">
              <span className="text-gray-400 text-[10px]">GEAR:</span>
              <span className="text-base font-bold text-[#00d9f5]">{currentGear}</span>
            </div>
          </div>

          {/* Center: Scroll down indicator */}
          <div className="flex items-center gap-2 text-gray-400 animate-pulse-subtle">
            <span className="hidden md:inline text-[11px] tracking-widest uppercase">
              Scroll down to propel supercar
            </span>
            <ChevronDown className="w-4 h-4 text-[#00f5a0]" />
          </div>

          {/* Right: Scrub Progress percentage */}
          <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-xl border border-white/10">
            <span className="text-gray-400 text-[10px]">TRACK:</span>
            <span className="text-white font-bold">{Math.round(scrollProgress * 100)}%</span>
            <div className="w-12 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] rounded-full transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
