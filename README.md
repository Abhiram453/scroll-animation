# Scroll-Driven Hero Section Animation

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A clean, minimal, scroll-driven hero experience demonstrating motion quality and interaction logic, built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.

---

## 🔗 Live Deliverables

- **Live Webpage:** [https://abhiram453.github.io/scroll-animation/](https://abhiram453.github.io/scroll-animation/)
- **GitHub Repository:** [https://github.com/Abhiram453/scroll-animation](https://github.com/Abhiram453/scroll-animation)

---

## 🎯 Architecture & Composition

The page focuses exclusively on the core assignment requirements:

1. **Letter-Spaced Headline**
   - Centered headline: `M O V E   W I T H   P U R P O S E`
   - Large typographic scale with generous tracking and whitespace.

2. **Central Isolated Visual Element**
   - High-resolution isolated supercar with full transparent background.
   - Positioned centrally within the hero composition, visually prominent and unrestricted by cards, borders, or dashboards.

3. **Four Core Statistics**
   - **58%** `Increase in pick up point use`
   - **23%** `Decreased in customer phone calls`
   - **27%** `Increase in pick up point use`
   - **40%** `Decreased in customer phone calls`

4. **Initial Load Animation (GSAP Timeline)**
   - Headline: fades in with slight upward movement.
   - Car: fades in with slight scale settling.
   - Statistics: staggered entrance.
   - The vehicle stops immediately after the intro, waiting for scroll input.

5. **Scroll-Driven Animation (GSAP ScrollTrigger)**
   - Pinned hero viewport (`pin: true`, `scrub: 1`).
   - Movement strictly driven by scroll position.
   - Fluid, weighted interpolation using GPU transforms (`xPercent`, `yPercent`, `scale`, `rotation`).
   - Reverses naturally when scrolling upward.

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

# Build for production
npm run build
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.