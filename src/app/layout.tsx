import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORM / MOTION — Scroll-Driven Hero Animation",
  description: "An editorial exploration of movement, proportion, and scroll-driven interaction built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.",
  keywords: ["FORM / MOTION", "GSAP", "ScrollTrigger", "Next.js", "Tailwind CSS", "Scroll Animation", "Editorial Design"],
  authors: [{ name: "Abhiram" }],
};

export const viewport: Viewport = {
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
    <html lang="en">
      <body className="antialiased bg-[#f5f4f0] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
