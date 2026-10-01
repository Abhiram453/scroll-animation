"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#111111] relative">
      <Hero />
      <Footer />
    </main>
  );
}
