"use client";

import React from "react";
import { Github, ArrowUpRight } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none">
      {/* Brand Identity */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-300 font-semibold">
          AURA // GT ELECTRIC
        </span>
      </div>

      {/* Direct Deliverables Link */}
      <div className="flex items-center gap-4 pointer-events-auto text-xs font-mono">
        <a
          href="https://github.com/Abhiram453/scroll-animation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors py-1.5 px-3 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-md bg-black/30"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3 h-3 text-[#d4af37]" />
        </a>
      </div>
    </header>
  );
};
