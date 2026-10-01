"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#ebe9e4] border-t border-[#dedcd4] py-20 px-6 sm:px-12 md:px-20 text-[#666666]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase mb-3">
            02 // PERSPECTIVE
          </div>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] max-w-md leading-relaxed tracking-tight">
            Motion is not merely displacement across space; it is the calibration of weight, proportion, and visual silence.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-mono tracking-wider">
          <a
            href="https://abhiram453.github.io/scroll-animation/"
            className="text-[#111111] hover:opacity-60 transition-opacity flex items-center gap-1 border-b border-[#111111]/30 pb-0.5"
          >
            <span>LIVE WEBPAGE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/Abhiram453/scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] hover:opacity-60 transition-opacity flex items-center gap-1 border-b border-[#111111]/30 pb-0.5"
          >
            <span>GITHUB REPOSITORY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#dedcd4] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-[#888888] gap-4">
        <span>FORM / MOTION — FRONTEND INTERNSHIP ASSIGNMENT</span>
        <span>ABHIRAM • GSAP SCROLLTRIGGER</span>
      </div>
    </footer>
  );
};
