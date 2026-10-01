"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Hero />
      <Footer />
    </main>
  );
}
