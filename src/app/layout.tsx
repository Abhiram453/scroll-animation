import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZ FIZZ — Scroll Motion",
  description: "A scroll-driven hero section animation where a car travels along a road and reveals the letters of DRIVE WITH PURPOSE one by one.",
  keywords: ["GSAP", "ScrollTrigger", "Next.js", "Tailwind CSS", "Scroll Animation", "ITZFIZZ", "Editorial Typography"],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gloock&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
