# Scroll-Driven Hero Section Animation — DRIVE WITH PURPOSE

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A scroll-driven hero section animation where a car travels along a sleek road as the user scrolls, revealing the letters of the editorial headline **DRIVE WITH PURPOSE** one by one. Built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.

---

## 🔗 Live Deliverables

- **Live Webpage:** [https://abhiram453.github.io/scroll-animation/](https://abhiram453.github.io/scroll-animation/)
- **GitHub Repository:** [https://github.com/Abhiram453/scroll-animation](https://github.com/Abhiram453/scroll-animation)

---

## 🎯 Core Interaction & Architecture

1. **Editorial Typography & Sequential Letter Reveal**
   - **Headline:** `DRIVE WITH PURPOSE` set in high-fashion editorial serif Google Font **Gloock** on **one clean line on desktop**.
   - **Individual Letter Animation:** Each of the 16 characters (`D` `R` `I` `V` `E` &nbsp; `W` `I` `T` `H` &nbsp; `P` `U` `R` `P` `O` `S` `E`) is masked in an `inline-flex items-baseline` container.
   - **Scroll Interaction:** As the car advances along the road, letters sequentially emerge upward and settle into the exact, unified font baseline (`y: 0`, `opacity: 1`, `scale: 1`, `rotation: 0deg`).
   - **Reversibility:** Scrolling upward reverses the car and sinks the letters back down smoothly with scrubbed GSAP interpolation.

2. **Minimal Road & Isolated Vehicle**
   - Sleek, thinner minimal road strip (`h-[36px]` to `h-[48px]`) with rounded pill contours and subtle dashed divider.
   - Genuine isolated McLaren 720S top view sitting grounded directly **on** the road surface (never clipped).
   - Subtle surface wake/trail expanding behind the vehicle as it drives.
   - Subtle, weighted physical motion (micro suspension tilt and vertical settling).

3. **Four Secondary Statistics**
   - **58%** `Increase in pick up point use`
   - **23%** `Decreased in customer phone calls`
   - **27%** `Increase in pick up point use`
   - **40%** `Reduction in turnaround time`
   - Minimal monospace numbers and understated labels, presented as clean secondary metrics with subtle border dividers.

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