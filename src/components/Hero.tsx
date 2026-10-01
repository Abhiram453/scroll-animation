"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORD = "DRIVEWITHPURPOSE";
const LETTERS = Array.from(WORD);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const wakeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const roadLettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Base path for GitHub Pages asset resolution
  const basePath = useMemo(() => {
    return process.env.NODE_ENV === "production" ? "/scroll-animation" : "";
  }, []);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const roadLetters = roadLettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const car = carRef.current;
    const hero = heroRef.current;
    const stage = stageRef.current;
    const progress = progressRef.current;
    const wake = wakeRef.current;

    if (!hero || !stage || !car || !wake || !progress || letters.length === 0) return;

    const finalLetterStartY = () => window.innerHeight * 0.44;

    // Initial reveal: subtle, quick, and completely separate from scroll-driven motion.
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.to("[data-intro]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.15);

    // Headline letters begin at the road and travel upward into the final headline.
    gsap.set(letters, {
      y: finalLetterStartY,
      opacity: 0,
      scale: 0.9,
      transformOrigin: "50% 100%",
    });
    gsap.set(roadLetters, { opacity: 0, scale: 0.82 });
    gsap.set(wake, { width: 0, opacity: 0.8 });
    gsap.set(car, { opacity: 0, scale: 0.82, yPercent: -50 });
    intro.to(car, { opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" }, 0.25);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tl: gsap.core.Timeline | null = null;

    if (!reduced) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=2300",
          scrub: 1.05,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
        },
      });

      // The car stays planted on one lane and travels from the left toward the visual centre.
      tl.to(car, { left: "76%", duration: 1, ease: "none" }, 0);

      // The wake follows the car and is the only persistent trace on the road.
      tl.to(wake, { width: "68%", duration: 1, ease: "none" }, 0);
      tl.to(wake, { opacity: 1, duration: 0.12, ease: "power2.out" }, 0.02);

      letters.forEach((letter, i) => {
        const start = 0.055 + i * 0.06;
        const reveal = roadLetters[i];
        const duration = 0.16;

        if (reveal) {
          tl!.to(
            reveal,
            {
              opacity: 0.72,
              scale: 1.03,
              filter: "blur(0px)",
              duration: 0.04,
              ease: "power2.out",
            },
            start
          );

          // Bird-flight inspired motion: a gentle S-curve, tiny tilt, then a clean landing.
          const dir = i % 2 === 0 ? 1 : -1;
          tl!.to(
            reveal,
            {
              x: dir * 28,
              y: -window.innerHeight * 0.08,
              rotation: dir * -5,
              opacity: 0,
              scale: 0.86,
              filter: "blur(1.8px)",
              duration: duration,
              ease: "power2.inOut",
            },
            start + 0.015
          );

          tl!.to(
            letter,
            {
              x: dir * 22,
              y: -window.innerHeight * 0.035,
              rotation: dir * -4,
              opacity: 0.76,
              scale: 0.94,
              duration: duration * 0.38,
              ease: "power2.out",
            },
            start + 0.015
          );

          tl!.to(
            letter,
            {
              x: dir * -10,
              y: window.innerHeight * 0.018,
              rotation: dir * 2,
              opacity: 0.9,
              scale: 1.01,
              duration: duration * 0.25,
              ease: "sine.inOut",
            },
            start + duration * 0.38
          );

          tl!.to(
            letter,
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: duration * 0.37,
              ease: "power3.out",
            },
            start + duration * 0.63
          );

          tl!.set(reveal, { opacity: 0 }, start + duration + 0.01);
        }
      });

      tl.to({}, { duration: 0.18 }, 0.91);
      tl.to(wake, { opacity: 0, duration: 0.08, ease: "power2.in" }, 0.93);
    } else {
      gsap.set(letters, { y: 0, opacity: 1, scale: 1 });
      gsap.set(roadLetters, { opacity: 0, scale: 0.96 });
      gsap.set(wake, { width: 0, opacity: 0.8 });
      gsap.set(car, { opacity: 1, scale: 1, left: "50%", yPercent: -50 });
    }

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      intro.kill();
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="hero" id="hero" ref={heroRef}>
      <section className="stage" id="stage" ref={stageRef}>
        <div className="top-left micro intro-hide" data-intro="">
          ITZ FIZZ <span className="mx-2 opacity-40">/</span> MOTION STUDY
        </div>
        <div className="top-right micro intro-hide" data-intro="">
          SCROLL TO DRIVE <i />
        </div>

        <div
          className="headline"
          id="headline"
          aria-label="DRIVE WITH PURPOSE"
          style={{ textTransform: "uppercase" }}
        >
          {LETTERS.map((char, i) => (
            <span key={`headline-${i}`} className="letter-mask">
              <span
                ref={(el) => {
                  lettersRef.current[i] = el;
                }}
                className="letter"
                data-letter={char}
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        <div className="reveal-field" id="revealField">
          <div className="wake" id="wake" ref={wakeRef} />
          {LETTERS.map((char, i) => (
            <span
              key={`road-${i}`}
              ref={(el) => {
                roadLettersRef.current[i] = el;
              }}
              className="road-letter"
              style={{ left: `${10 + (i * 66) / (LETTERS.length - 1)}%` }}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="road-wrap">
          <div className="road" id="road">
            <img
              ref={carRef}
              className="car"
              id="car"
              src={`${basePath}/car.png`}
              alt="Sports car"
            />
          </div>
        </div>

        <div className="micro-specs" id="specs">
          <div className="micro-spec intro-hide" data-intro="">
            <strong>16</strong> LETTERS
          </div>
          <div className="micro-spec intro-hide" data-intro="">
            <strong>01</strong> CONTINUOUS PATH
          </div>
          <div className="micro-spec intro-hide" data-intro="">
            <strong>100%</strong> SCROLL DRIVEN
          </div>
          <div className="micro-spec intro-hide" data-intro="">
            <strong>0</strong> AUTOPLAY
          </div>
        </div>

        <div className="bottom-left micro intro-hide" data-intro="">
          01 <span className="mx-2 opacity-40">/</span> SCROLL MOTION
        </div>
        <div className="bottom-right micro intro-hide" data-intro="">
          GSAP <span className="mx-2 opacity-40">·</span> SCROLLTRIGGER
        </div>
        <div className="progress" id="progress" ref={progressRef} />
      </section>
    </main>
  );
};
