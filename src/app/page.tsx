"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SpecsSection } from "@/components/SpecsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoDriving, setIsAutoDriving] = useState(false);

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  const handleAutoDrive = () => {
    if (isAutoDriving) return;
    setIsAutoDriving(true);

    const startPos = window.scrollY;
    // Pinned section height is approx 2.6x viewport height
    const targetPos = window.innerHeight * 2.3;
    const duration = 5500; // 5.5 seconds smooth glide
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Smooth cubic in-out easing for natural acceleration and brake
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPos + (targetPos - startPos) * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsAutoDriving(false);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleReset = () => {
    setIsAutoDriving(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#0a0c10] text-gray-100 flex flex-col relative selection:bg-[#00f5a0] selection:text-black">
      <Navbar
        onAutoDrive={handleAutoDrive}
        onReset={handleReset}
        isAutoDriving={isAutoDriving}
        scrollProgress={scrollProgress}
      />
      <HeroSection onScrollProgressUpdate={handleScrollProgress} />
      <SpecsSection />
      <Footer />
    </main>
  );
}
