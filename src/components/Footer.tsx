"use client";

import React from "react";
import { Github, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#08090b] border-t border-white/5 py-16 px-6 sm:px-10 md:px-16 text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white font-semibold">
              AURA MOTOR CARS
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-sm">
            Scroll-Driven Hero Section Animation Assignment.
            Designed and engineered with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <a
            href="https://abhiram453.github.io/scroll-animation/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Live Webpage</span>
            <ArrowUpRight className="w-3 h-3 text-[#d4af37]" />
          </a>
          <a
            href="https://github.com/Abhiram453/scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-gray-400 gap-4">
        <span>© {new Date().getFullYear()} Abhiram • Frontend Development Assignment</span>
        <span>GSAP 3 ScrollTrigger • Hardware Accelerated</span>
      </div>
    </footer>
  );
};
