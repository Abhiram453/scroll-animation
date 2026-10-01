"use client";

import React from "react";
import { Github, ExternalLink, Heart, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-30 bg-[#07090d] border-t border-white/10 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Credits */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#00f5a0] to-[#00d9f5] flex items-center justify-center font-black text-black text-xs">
              IF
            </div>
            <span className="font-extrabold text-white tracking-wider text-sm">
              ITZFIZZ HERO ANIMATION
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-sm">
            Developed for the Scroll-Driven Hero Section Animation Assignment.
            Crafted with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.
          </p>
        </div>

        {/* Deliverables Links */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://abhiram453.github.io/scroll-animation/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-[#00f5a0] border border-[#00f5a0]/30 hover:bg-emerald-500/20 transition-all shadow-[0_0_15px_rgba(0,245,160,0.15)]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Webpage</span>
          </a>
          <a
            href="https://github.com/Abhiram453/scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
          <button
            onClick={scrollToTop}
            title="Scroll back to top"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
        <div>
          © {new Date().getFullYear()} ITZFIZZ Assignment • Built by Abhiram453
        </div>
        <div className="flex items-center gap-1">
          <span>Engineered with passion</span>
          <Heart className="w-3 h-3 text-red-500 fill-current inline mx-0.5" />
          <span>and sub-pixel GSAP precision</span>
        </div>
      </div>
    </footer>
  );
};
