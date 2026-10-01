"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Play, Github, Activity, RotateCcw } from "lucide-react";
import { soundEngine } from "@/utils/audio";

interface NavbarProps {
  onAutoDrive?: () => void;
  onReset?: () => void;
  isAutoDriving?: boolean;
  scrollProgress?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onAutoDrive,
  onReset,
  isAutoDriving = false,
  scrollProgress = 0,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleSound = () => {
    const newState = soundEngine.toggle();
    setAudioEnabled(newState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-5 py-2.5 shadow-2xl">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00f5a0] via-[#00d9f5] to-white flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(0,245,160,0.5)]">
            IF
          </div>
          <div>
            <div className="font-extrabold text-base tracking-wider text-white flex items-center gap-1.5">
              ITZFIZZ
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#00f5a0] border border-[#00f5a0]/30 font-semibold">
                HERO LAB
              </span>
            </div>
          </div>
        </div>

        {/* Center Live Telemetry Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 bg-black/40 border border-white/10 rounded-full px-4 py-1 text-xs font-mono text-gray-300">
          <span className="flex items-center gap-1.5 text-[#00f5a0]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5a0]"></span>
            </span>
            GSAP 3 ENGINE
          </span>
          <span className="text-white/20">|</span>
          <span className="text-gray-400">
            PROGRESS: <span className="text-white font-semibold">{Math.round(scrollProgress * 100)}%</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[#00d9f5] flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />
            60 FPS
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Audio Engine Button */}
          <button
            onClick={toggleSound}
            title={audioEnabled ? "Mute engine rumble" : "Enable synthetic engine rumble sound"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              audioEnabled
                ? "bg-[#00f5a0]/20 text-[#00f5a0] border border-[#00f5a0]/40 shadow-[0_0_12px_rgba(0,245,160,0.3)]"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:bg-white/10"
            }`}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{audioEnabled ? "Engine ON" : "Sound"}</span>
          </button>

          {/* Auto Drive / Reset Button */}
          {scrollProgress > 0.05 ? (
            <button
              onClick={onReset}
              title="Reset scroll to beginning"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          ) : (
            <button
              onClick={onAutoDrive}
              disabled={isAutoDriving}
              title="Auto-drive car demonstration"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isAutoDriving
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                  : "bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] text-black font-bold hover:opacity-95 shadow-[0_0_15px_rgba(0,245,160,0.4)]"
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isAutoDriving ? "Driving..." : "Auto Drive"}</span>
            </button>
          )}

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/Abhiram453/scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all hover:scale-105"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
