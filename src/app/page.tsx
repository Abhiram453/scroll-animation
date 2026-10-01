"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NarrativeSection } from "@/components/NarrativeSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0c0f] text-[#f5f5f7] relative">
      <Header />
      <Hero />
      <NarrativeSection />
      <Footer />
    </main>
  );
}
