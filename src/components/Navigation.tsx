"use client";

import React from "react";
import { Github, ArrowUpRight } from "lucide-react";

export const Navigation: React.FC = () => {
  return (
    <header className="site-nav fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 md:px-20 py-7 flex items-center justify-between pointer-events-none transition-opacity duration-500">
      {/* Brand: FORM / MOTION */}
      <div className="pointer-events-auto flex items-center gap-2">
        <span className="font-semibold text-xs tracking-[0.25em] uppercase text-[#111111]">
          FORM / MOTION
        </span>
      </div>

      {/* Right Navigation Items */}
      <div className="pointer-events-auto flex items-center gap-6 sm:gap-10 text-[11px] font-mono tracking-widest text-[#666666]">
        <span className="hidden sm:inline hover:text-[#111111] transition-colors cursor-default">
          01 — INTRO
        </span>
        <span className="hidden sm:inline hover:text-[#111111] transition-colors cursor-default">
          02 — MOTION
        </span>

        {/* GitHub Deliverable Link */}
        <a
          href="https://github.com/Abhiram453/scroll-animation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#111111] hover:opacity-70 transition-opacity"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden md:inline">REPOSITORY</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </header>
  );
};
