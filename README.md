# ITZFIZZ — Scroll-Driven Supercar Hero Section Animation

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A faithful recreation of the scroll-driven hero section animation inspired by the reference demo ([car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)), built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.

---

## 🔗 Live Deliverables

- **Live Webpage:** [https://abhiram453.github.io/scroll-animation/](https://abhiram453.github.io/scroll-animation/)
- **GitHub Repository:** [https://github.com/Abhiram453/scroll-animation](https://github.com/Abhiram453/scroll-animation)

---

## 🏎️ Core Functional Features

1. **Hero Section Layout**
   - Full viewport pinned hero (`100vh`) with central road container.
   - Large letter-spaced headline: `W E L C O M E   I T Z   F I Z Z`.
   - Four simple impact metrics / statistics matching the reference:
     - `58% Increase in pick up point use` (Lime / Yellow)
     - `23% Decreased in customer phone calls` (Sky Blue)
     - `27% Increase in pick up point use` (Charcoal)
     - `40% Decreased in customer phone calls` (Warm Orange)

2. **Initial Load Animation**
   - Smooth GSAP timeline on mount (`gsap.timeline()`):
     - Headline letters fade and reveal with subtle upward lift.
     - Supercar glides into idle grid position.
     - Four statistics cards animate in with sequential stagger.

3. **Scroll-Driven Animation**
   - Controlled strictly by scroll position using GSAP `ScrollTrigger` with smooth weighted inertia (`scrub: 1.2`).
   - The supercar moves horizontally along the road.
   - Solid green trail expands dynamically behind the vehicle.
   - Kinetic typography: each letter of `W E L C O M E   I T Z   F I Z Z` illuminates as the vehicle sweeps past.
   - Statistics reveal cleanly at defined scroll milestones.
   - 100% reversible upon scrolling back up.

4. **Performance & Motion Quality**
   - Strictly utilizes hardware-accelerated transforms (`x`, `y`, `opacity`) without layout reflows or DOM thrashing.
   - Responsive recalculation on window resize.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, Static Export)
- **Library:** React 18
- **Animation Engine:** GSAP 3.12 + ScrollTrigger
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (via GitHub Actions & `gh-pages` branch)

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Abhiram453/scroll-animation.git
cd scroll-animation

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.