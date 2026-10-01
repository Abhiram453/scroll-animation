# Scroll-Driven Hero Section Animation — WELCOME ITZFIZZ

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A scroll-driven hero section animation where a car travels along a road as the user scrolls, and its movement sequentially reveals the letters of the headline one by one. Built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.

---

## 🔗 Live Deliverables

- **Live Webpage:** [https://abhiram453.github.io/scroll-animation/](https://abhiram453.github.io/scroll-animation/)
- **GitHub Repository:** [https://github.com/Abhiram453/scroll-animation](https://github.com/Abhiram453/scroll-animation)

---

## 🎯 Core Interaction & Architecture

1. **Sequential Letter Reveal (Car-Driven Typography)**
   - The headline is rendered as individual animated characters:
     `W` `E` `L` `C` `O` `M` `E` &nbsp; `I` `T` `Z` `F` `I` `Z` `Z`.
   - **Initial State:** Letters begin in a hidden/lower position (`y: 80px, opacity: 0`) beneath the road.
   - **Scroll Interaction:** As the user scrolls down, the car drives horizontally along the road. Behind and as a direct result of the car's progression, each letter emerges upward and locks into place in the headline.
   - **Reversibility:** Scrolling upward reverses the car and sinks the letters back down.
   - **Full Assembly:** At 80–100% scroll progress, the complete headline `W E L C O M E   I T Z F I Z Z` is fully assembled.

2. **Road & Isolated Vehicle**
   - Clean horizontal asphalt road spanning across the center.
   - High-resolution isolated supercar with full alpha transparency riding directly on the road.
   - Subtle, weighted physical motion (micro suspension tilt and vertical settling).

3. **Four Core Statistics**
   - **58%** `Increase in pick up point use`
   - **23%** `Decreased in customer phone calls`
   - **27%** `Increase in pick up point use`
   - **40%** `Reduction in turnaround time`
   - Pure typography: large numbers in `#111111`, concise labels in `#666666`, zero cards or borders.

4. **Initial Load Animation (GSAP Timeline)**
   - Micro-label fades in.
   - Car fades/settles into starting line position on the road.
   - Statistics animate in sequentially.
   - **Zero Autoplay:** As soon as the ~0.8s intro completes, everything halts until user scroll begins.

5. **Performance & Standards**
   - Strictly utilizes GPU transforms (`x`, `y`, `scale`, `rotation`, `opacity`).
   - Zero React state re-renders during scroll ticks (using direct DOM manipulation & GSAP tweens).
   - Fully supports `prefers-reduced-motion`.

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