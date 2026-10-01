"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111] relative">
      <Hero />
      <Footer />
    </main>
  );
}
