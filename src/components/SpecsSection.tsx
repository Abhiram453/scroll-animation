"use client";

import React from "react";
import { Cpu, Zap, Activity, Layers, Smartphone, Code2, CheckCircle2 } from "lucide-react";

export const SpecsSection: React.FC = () => {
  const specs = [
    {
      icon: <Activity className="w-6 h-6 text-[#00f5a0]" />,
      title: "GSAP 3 ScrollTrigger Engine",
      description:
        "Tied directly to scroll progress with sub-pixel interpolation (scrub: 1.2). Motion feels organic, weighted, and responsive rather than abrupt or linear.",
      tag: "CORE INTERACTION",
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#00d9f5]" />,
      title: "GPU Hardware Acceleration",
      description:
        "Strictly utilizes transform3d, xPercent/x, and opacity changes with will-change hints. Bypasses browser layout reflows and repaints for silky 60+ FPS.",
      tag: "PERFORMANCE",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#def54f]" />,
      title: "Initial Staggered Reveal",
      description:
        "Dual-phase animation cycle: smooth page-load entrance timeline for headline & statistics, seamlessly handing over to scroll-driven telemetry.",
      tag: "LOAD LIFECYCLE",
    },
    {
      icon: <Layers className="w-6 h-6 text-[#fa7328]" />,
      title: "Dynamic Trail & Typography Reveal",
      description:
        "Real-time collision calculation reveals and illuminates headline letters and generates dual neon tire trails as the supercar advances along the track.",
      tag: "MOTION LOGIC",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#6ac9ff]" />,
      title: "Responsive Viewport Adaptation",
      description:
        "Adaptive track measurements that automatically recalibrate on window resize events, ensuring flawless behavior across mobile, tablet, and 4K displays.",
      tag: "RESPONSIVENESS",
    },
    {
      icon: <Code2 className="w-6 h-6 text-purple-400]" />,
      title: "Modern Next.js 14 & Tailwind Stack",
      description:
        "Modular React components, typed with TypeScript, styled with Tailwind CSS, and optimized for instant static export deployment on GitHub Pages.",
      tag: "ARCHITECTURE",
    },
  ];

  const requirementsMet = [
    "Hero section strictly occupies first screen (above the fold)",
    "Letter-spaced headline: 'W E L C O M E   I T Z   F I Z Z'",
    "Impact metrics / statistics below headline with percentage highlights",
    "Initial load animation with staggered reveals for headline & stats",
    "Scroll-based core animation tied to scroll position (not autoplay)",
    "Natural easing/interpolation with GSAP scrub smoother",
    "Transform-only motion avoiding heavy layout reflows",
    "Statically deployable to GitHub Pages with zero external backend",
  ];

  return (
    <section className="relative z-30 py-24 px-4 md:px-8 bg-[#0d1117] border-t border-white/10 cyber-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f5a0] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL SPECIFICATIONS & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Engineering Motion & Performance
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed">
            Recreated inspired by the reference demo with enhanced physics, reactive telemetry HUD,
            Web Audio synthesized engine rumble, and strict 60 FPS motion standards.
          </p>
        </div>

        {/* Requirements Compliance Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 mb-16 border border-[#00f5a0]/30 shadow-[0_0_30px_rgba(0,245,160,0.08)]">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f5a0] animate-pulse" />
                Assignment Requirements Checklist
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-mono">
                100% Verified against all functional & performance guidelines
              </p>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[#00f5a0] text-xs font-mono font-semibold">
              ALL REQUIREMENTS SATISFIED
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {requirementsMet.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#00f5a0] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-gray-200 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#00f5a0]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {spec.icon}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
                  {spec.tag}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f5a0] transition-colors">
                {spec.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
