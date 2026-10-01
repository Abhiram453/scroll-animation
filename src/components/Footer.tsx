"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#121212] border-t border-[#222222] py-16 px-6 text-center text-gray-400">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-lg tracking-widest">
            ITZFIZZ
          </span>
          <span className="text-gray-500 text-sm">/</span>
          <span className="text-gray-400 text-sm">Scroll Animation Demo</span>
        </div>

        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Recreation of the scroll-driven hero section inspired by the reference,
          implemented with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.
        </p>

        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://abhiram453.github.io/scroll-animation/"
            className="text-white hover:text-[#45db7d] transition-colors font-medium underline underline-offset-4"
          >
            Live Demo
          </a>
          <a
            href="https://github.com/Abhiram453/scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#45db7d] transition-colors font-medium underline underline-offset-4"
          >
            GitHub Repository
          </a>
        </div>

        <p className="text-xs text-gray-600 pt-4">
          © {new Date().getFullYear()} Abhiram • Scroll-Driven Motion
        </p>
      </div>
    </footer>
  );
};
