"use client";

import React from "react";
import { Zap, Wind, Shield } from "lucide-react";

export const NarrativeSection: React.FC = () => {
  const pillars = [
    {
      icon: <Wind className="w-4 h-4 text-[#d4af37]" />,
      number: "01",
      title: "Active Aero Profile",
      desc: "Carbon-composite bodywork calibrated in supersonic wind tunnels to reduce drag coefficient to 0.19 Cd.",
    },
    {
      icon: <Zap className="w-4 h-4 text-[#d4af37]" />,
      number: "02",
      title: "800V Architecture",
      desc: "Dual permanent-magnet synchronous motors with direct stator oil cooling delivering instant throttle response.",
    },
    {
      icon: <Shield className="w-4 h-4 text-[#d4af37]" />,
      number: "03",
      title: "Monocoque Chassis",
      desc: "Autoclaved structural tub maximizing torsional rigidity while preserving ultra-low unsprung corner mass.",
    },
  ];

  return (
    <section className="relative z-30 w-full bg-[#0b0c0f] border-t border-white/10 py-24 px-6 sm:px-10 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Subtle Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
            ENGINEERING PHILOSOPHY
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight uppercase max-w-xl leading-tight mb-16">
          Crafted at the intersection of <span className="font-semibold text-white">aerodynamic purity</span> and raw velocity.
        </h2>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((item) => (
            <div
              key={item.number}
              className="flex flex-col justify-between border-t border-white/10 pt-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono text-gray-400">
                  {item.number} //
                </span>
                {item.icon}
              </div>

              <div>
                <h3 className="text-base font-semibold text-white tracking-wide mb-2 uppercase">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
