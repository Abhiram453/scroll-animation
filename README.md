# FORM / MOTION — Scroll-Driven Hero Animation

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An original minimal editorial study exploring movement, proportion, and scroll-driven interaction, built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.

---

## 🔗 Live Deliverables

- **Live Webpage:** [https://abhiram453.github.io/scroll-animation/](https://abhiram453.github.io/scroll-animation/)
- **GitHub Repository:** [https://github.com/Abhiram453/scroll-animation](https://github.com/Abhiram453/scroll-animation)

---

## 🎨 Design Philosophy & Concept

- **Concept:** *"FORM / MOTION"* — An experimental editorial visual-design showcase exploring the calibration of weight, proportion, and scroll.
- **Palette:** Warm architectural off-white (`#F5F4F0`), rich near-black (`#111111`), neutral muted gray (`#666666`), and subtle stone hairline dividers (`#D8D6CE`).
- **Composition:**
  - **Left Side:** Small eyebrow (`SCROLL STUDY / 01`), large letter-spaced headline (`M O V E   W I T H   P U R P O S E`), and concise supporting copy.
  - **Right / Center:** High-resolution automotive product visual integrated into the composition with intentional whitespace (no cards, no dashboard, no UI clutter).
  - **Bottom:** Four clean, typography-driven metrics:
    - `03.2s` — 0–100 KM/H
    - `620 KM` — MAX RANGE
    - `480 HP` — PEAK POWER
    - `92%` — EFFICIENCY

---

## ⚙️ Technical Motion Architecture

1. **Initial Load Animation (GSAP Timeline)**
   - Independent intro sequence (~1.0s) with `power3.out` easing:
     - Navigation fades in.
     - Eyebrow fades upward (`opacity: 0 -> 1, y: 15 -> 0`).
     - Headline reveals line-by-line (`opacity: 0 -> 1, y: 32 -> 0, stagger: 0.08s`).
     - Supporting copy appears smoothly.
     - Main visual settles into position (`opacity: 0 -> 1, scale: 0.95 -> 1, y: 20 -> 0`).
     - Statistics appear sequentially (`opacity: 0 -> 1, y: 16 -> 0, stagger: 0.08s`).
   - The visual remains stationary until the user begins scrolling.

2. **Scroll-Driven Animation (GSAP ScrollTrigger)**
   - Pinned hero stage (`pin: true`, `scrub: 1.2`, `anticipatePin: 1`) over a 260vh scroll runway.
   - Movement strictly determined by user scroll position (no timers, no autoplay, fully reversible on scroll up).
   - Motion path:
     - Translates across the frame (`xPercent: 0 -> -60%`).
     - Dynamic scaling and subtle suspension yaw (`rotation: -1.2deg -> 0.4deg -> -0.2deg`).
     - Headline responds with subtle parallax depth (`y: -30px, opacity: 0.75`).
     - Statistics react with subtle vertical translation (`y: -10px, opacity: 0.85`).

3. **Performance & Code Quality**
   - Strictly utilizes GPU-accelerated CSS transforms (`xPercent`, `scale`, `rotation`, `opacity`).
   - Zero React state re-renders during scroll ticks (using direct DOM manipulation & GSAP tweens).
   - Fully respects `prefers-reduced-motion` accessibility preferences.
   - Fully responsive for mobile (390px), tablet (768px-1024px), laptop (1366px-1440px), and desktop (1920px+).

---

## 📁 Project Architecture

```
scroll-animation/
├── public/
│   ├── editorial_car.jpg    # High-resolution automotive visual on warm studio background
│   └── .nojekyll            # Prevents GitHub Pages Jekyll asset filtering
├── src/
│   ├── app/
│   │   ├── globals.css      # Warm off-white palette & typography styles
│   │   ├── layout.tsx       # Root layout, viewport, and metadata
│   │   └── page.tsx         # Focused coordinator (Navigation, Hero, Footer)
│   └── components/
│       ├── Navigation.tsx   # Minimal editorial navigation
│       ├── Hero.tsx         # Pinned hero stage, GSAP ScrollTrigger & statistics
│       └── Footer.tsx       # Perspective statement & repository links
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