"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#111111] relative">
      <Navigation />
      <Hero />
      <Footer />
    </main>
  );
}
