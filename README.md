# AURA // DRIVE THE FUTURE — Scroll-Driven Hero Section Animation

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An original, modern luxury electric hypercar hero section experience inspired by scroll-driven storytelling concepts, built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.

---

## 🔗 Live Deliverables

- **Live Webpage:** [https://abhiram453.github.io/scroll-animation/](https://abhiram453.github.io/scroll-animation/)
- **GitHub Repository:** [https://github.com/Abhiram453/scroll-animation](https://github.com/Abhiram453/scroll-animation)

---

## 🎨 Original Design Identity & Concept

- **Concept:** *"AURA // DRIVE THE FUTURE"* — A luxury electric GT hypercar product launch.
- **Visual Style:** Deep charcoal studio atmosphere (`#0b0c0f`), warm titanium reflections, gold/amber hairline accents (`#d4af37`), generous negative space, and modern editorial typography.
- **Hero Composition:**
  - **Left / Editorial:** Large letter-spaced headline (`D R I V E   T H E   F U T U R E`) and supporting engineering narrative.
  - **Center / Right:** Prominent, high-resolution metallic titanium GT coupe visual.
  - **Bottom:** Four compact, typography-driven performance statistics:
    - `03.2s` — 0–100 km/h Acceleration
    - `620km` — Target WLTP Range
    - `480hp` — Dual Motor Peak Power
    - `92%` — Powertrain Efficiency

---

## ⚙️ Technical Motion Architecture

1. **Initial Load Animation (GSAP Timeline)**
   - Independent intro sequence (~1.1s):
     - Headline lines slide up and reveal (`y: 35 -> 0, opacity: 0 -> 1, stagger: 0.1s`).
     - Supporting copy fades in.
     - Hypercar settles gracefully into resting position (`scale: 0.94 -> 1, opacity: 0 -> 1`).
     - Performance statistics stagger up cleanly from the bottom.
   - Vehicle remains stationary until the user begins scrolling.

2. **Scroll-Driven Animation (GSAP ScrollTrigger)**
   - Pinned hero stage (`pin: true`, `scrub: 1.2`).
   - Movement strictly driven by scroll position (no timers, no autoplay, fully reversible on scroll up).
   - Fluid cinematic trajectory:
     - Translates horizontally across the frame (`xPercent: 0 -> -65%`).
     - Dynamic scaling and subtle suspension steering yaw (`rotation: -1.6deg -> 0.8deg`).
     - Headline undergoes subtle parallax depth fading (`opacity: 1 -> 0.3`).
     - Milestone-based accent indicator lighting across performance metrics as scroll advances.

3. **Performance Optimization**
   - Strictly utilizes GPU-accelerated CSS transforms (`translate3d`, `scale`, `rotation`).
   - Zero React state re-renders during scroll ticks (using direct DOM manipulation & GSAP tweens).
   - Zero layout thrashing or geometry recalculations on scroll.

---

## 📁 Project Architecture

```
scroll-animation/
├── public/
│   ├── hypercar.jpg         # High-resolution metallic titanium GT coupe visual
│   └── .nojekyll            # Prevents GitHub Pages Jekyll asset filtering
├── src/
│   ├── app/
│   │   ├── globals.css      # Luxury dark palette & typography helpers
│   │   ├── layout.tsx       # Root layout, viewport, and metadata
│   │   └── page.tsx         # Main entry point coordinating sections
│   └── components/
│       ├── Header.tsx       # Minimal editorial brand header
│       ├── Hero.tsx         # Pinned hero stage, GSAP ScrollTrigger & typography
│       ├── NarrativeSection.tsx # Post-hero engineering pillars
│       └── Footer.tsx       # Attribution & quick deliverable links
├── next.config.mjs          # Static export & GitHub Pages basePath configuration
├── tailwind.config.js       # Color tokens, fonts, and letter spacing
├── tsconfig.json            # TypeScript compiler configuration
└── package.json             # Scripts & dependencies
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/Abhiram453/scroll-animation.git
cd scroll-animation

# Install dependencies
npm install

# Start development server
npm run dev

# Build static production bundle
npm run build
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.