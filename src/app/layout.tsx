import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WELCOME ITZFIZZ — Scroll-Driven Hero Section Animation",
  description: "A scroll-driven hero section animation where a car travels along a road and reveals the letters of the headline one by one.",
  keywords: ["GSAP", "ScrollTrigger", "Next.js", "Tailwind CSS", "Scroll Animation", "ITZFIZZ"],
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
      <body className="antialiased bg-[#f8f7f4] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
