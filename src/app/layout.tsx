import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA // DRIVE THE FUTURE — Scroll-Driven Hero Animation",
  description: "An original luxury electric hypercar product-launch hero experience powered by Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.",
  keywords: ["AURA", "GSAP", "ScrollTrigger", "Next.js", "Tailwind CSS", "Scroll Animation", "Interactive UI"],
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
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0b0c0f] text-[#f5f5f7] selection:bg-[#d4af37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
