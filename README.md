# ITZFIZZ — Scroll-Driven Supercar Hero Section Animation

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A recreation and enhancement of the scroll-driven hero section animation inspired by the reference demo, focused on motion quality, sub-pixel smoothness, GPU-accelerated interaction logic, and telemetry HUD integration.

---

## 🔗 Live Deliverables

- **Live Webpage:** [https://abhiram453.github.io/scroll-animation/](https://abhiram453.github.io/scroll-animation/)
- **GitHub Repository:** [https://github.com/Abhiram453/scroll-animation](https://github.com/Abhiram453/scroll-animation)

---

## 🏎️ Features & Requirements Matrix

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **1. Hero Section Layout** | Occupies full initial screen (`100vh`, above fold). Prominently features the letter-spaced headline `W E L C O M E   I T Z   F I Z Z`, followed by responsive impact metric cards. | ✅ Complete |
| **2. Initial Load Animation** | Premium staggered entrance on initial mount. Headline letters slide up with subtle 3D lift (`stagger: 0.025s`), the supercar glides into idle grid position, and impact statistics cards reveal sequentially (`stagger: 0.15s`). | ✅ Complete |
| **3. Scroll-Based Animation (Core)** | Section pins smoothly using GSAP ScrollTrigger. As the user scrolls, the supercar traverses the asphalt track with weighted inertia (`scrub: 1.2`), dynamic neon tire trails expand behind the wheels, and headline letters dynamically illuminate as the car sweeps past them. | ✅ Complete |
| **4. Motion & Performance** | Pure GPU-accelerated transforms (`translate3d`, `x`, `scale`, `rotation`). Zero layout thrashing or geometry reflows on scroll ticks. Tested at steady 60+ FPS. | ✅ Complete |
| **5. Bonus: Telemetry HUD** | Dynamic live speedometer (KM/H) driven by scroll velocity, automatic transmission gear indicator (`N` to `7`), and track distance percentage gauge. | 🌟 Extra |
| **6. Bonus: Web Audio Engine** | Client-side synthetic audio engine utilizing Web Audio API oscillators to generate real-time exhaust rumble scaling with vehicle speed (zero external audio files). | 🌟 Extra |
| **7. Bonus: Auto-Drive Mode** | Evaluator shortcut button to auto-pilot the supercar through the animation sequence with cubic easing. | 🌟 Extra |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Static HTML Export)
- **Library:** [React 18](https://react.dev/)
- **Animation Engine:** [GSAP 3.12](https://greensock.com/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Cyberpunk / luxury automotive dark theme)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio:** Web Audio API (Synthesized oscillators)
- **Deployment:** [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 📁 Project Architecture

```
scroll-animation/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── car.png                 # Transparent top-view McLaren 720S asset
│   └── images/
├── src/
│   ├── app/
│   │   ├── globals.css         # Custom animations, grid textures, neon glow styles
│   │   ├── layout.tsx          # HTML shell, viewport, metadata
│   │   └── page.tsx            # Main page coordinator & auto-drive controller
│   ├── components/
│   │   ├── Navbar.tsx          # Brand header, live FPS telemetry pill, controls
│   │   ├── HeroSection.tsx     # Pinned track, car movement, typography illumination, stats
│   │   ├── SpecsSection.tsx    # Technical architecture breakdown & compliance matrix
│   │   └── Footer.tsx          # Attribution, quick links, back-to-top button
│   └── utils/
│       └── audio.ts            # Web Audio API engine sound synthesizer
├── next.config.mjs             # Next.js static export & GitHub Pages basePath configuration
├── tailwind.config.js          # Extended color palette, fonts, spacing
├── tsconfig.json               # TypeScript compiler configuration
└── package.json                # Project dependencies and build scripts
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or later recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhiram453/scroll-animation.git
   cd scroll-animation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build and export for production:**
   ```bash
   npm run build
   ```
   Generates production-ready static assets in the `out/` directory.

---

## 🎯 Implementation Highlights

### 1. Scroll-Coupled Interpolation
Rather than relying on unthrottled scroll listeners, GSAP's `ScrollTrigger` integrates with the browser's `requestAnimationFrame` render loop:
```ts
ScrollTrigger.create({
  trigger: container,
  start: "top top",
  end: "bottom bottom",
  pin: track,
  scrub: 1.2, // Smooth weighted inertia
  onUpdate: (self) => {
    const progress = self.progress;
    const carX = progress * totalCarTravel;
    gsap.set(car, { x: carX, force3D: true });
    // Dynamic trail extension
    gsap.set(trail, { width: carX + 35 });
  }
});
```

### 2. Kinetic Letter Illumination
As the supercar traverses horizontally across the track, real-time bounding box queries compute vehicle projection overlap, transforming the headline letters from a dimmed rested state (`opacity: 0.35`) into high-radiance neon green with dimensional drop-glow.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.