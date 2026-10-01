import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZFIZZ — Scroll-Driven Supercar Hero Animation",
  description: "High-performance scroll-driven hero section animation built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.",
  keywords: ["GSAP", "ScrollTrigger", "Next.js", "Tailwind CSS", "Scroll Animation", "ITZFIZZ", "Interactive UI"],
  authors: [{ name: "Abhiram" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0a0c10] text-gray-100 selection:bg-[#00f5a0] selection:text-black">
        {children}
      </body>
    </html>
  );
}
