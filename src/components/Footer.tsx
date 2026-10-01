"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f8f7f4] border-t border-[#e5e4de] py-10 px-6 text-center text-xs text-[#888888]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <span>DRIVE WITH PURPOSE / SCROLL STUDY</span>
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
