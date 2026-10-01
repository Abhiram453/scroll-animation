"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#fbfbfa] border-t border-[#e8e6de] py-12 px-6 text-center text-xs text-[#888888]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <span>SCROLL-DRIVEN HERO ANIMATION</span>
        <div className="flex items-center gap-6">
          <a
            href="https://abhiram453.github.io/scroll-animation/"
            className="text-[#111111] hover:underline"
          >
            LIVE WEBPAGE
          </a>
          <a
            href="https://github.com/Abhiram453/scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] hover:underline"
          >
            GITHUB REPOSITORY
          </a>
        </div>
        <span>ABHIRAM • 2026</span>
      </div>
    </footer>
  );
};
