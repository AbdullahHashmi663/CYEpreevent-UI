"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InteractiveSpotlightTextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // Default to center 50% 50% so the orange fill is immediately luminous and active
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const ctx = gsap.context(() => {
      // Descend-on-scroll reveal for the spotlight headline container
      gsap.fromTo(
        textEl,
        {
          y: -50,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setMousePos({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full min-h-[50vh] bg-white overflow-hidden flex items-center justify-center select-none cursor-default py-8 border-y border-slate-100"
    >
      {/* 100% Width & At least 50vh Height Container */}
      <div
        ref={textRef}
        className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden px-0 will-change-transform"
      >
        {/* Warm Ambient Orange Glow Centered on Cursor */}
        <div
          className="absolute pointer-events-none rounded-full blur-3xl transition-transform duration-75"
          style={{
            width: "550px",
            height: "550px",
            transform: "translate(-50%, -50%)",
            left: mousePos.x,
            top: mousePos.y,
            background:
              "radial-gradient(circle, rgba(242, 101, 34, 0.32) 0%, rgba(242, 101, 34, 0.1) 45%, transparent 75%)",
          }}
        />

        {/* LAYER 1: BASE GREEN OUTLINE TEXT (NEUE MACHINA ULTRABOLD - 100% WIDTH STRETCH) */}
        <h2
          className="w-full text-center tracking-[-0.035em] leading-none whitespace-nowrap text-[9.8vw] select-none"
          style={{
            fontFamily: "'Neue Machina', var(--font-sans), sans-serif",
            fontWeight: 800,
            fontStyle: "normal",
            color: "transparent",
            WebkitTextStroke: "2.2px #167C38",
            WebkitTextFillColor: "transparent",
          }}
        >
          Capital Youth Expo
        </h2>

        {/* LAYER 2: ORANGE FILLED TEXT (SPOTLIGHT MASKED TO CURSOR) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            WebkitMaskImage: `radial-gradient(circle 300px at ${mousePos.x} ${mousePos.y}, black 0%, black 50%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`,
            maskImage: `radial-gradient(circle 300px at ${mousePos.x} ${mousePos.y}, black 0%, black 50%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`,
          }}
        >
          <h2
            className="w-full text-center tracking-[-0.035em] leading-none whitespace-nowrap text-[9.8vw] select-none"
            style={{
              fontFamily: "'Neue Machina', var(--font-sans), sans-serif",
              fontWeight: 800,
              fontStyle: "normal",
              color: "#F26522",
              WebkitTextStroke: "2.2px #F26522",
              WebkitTextFillColor: "#F26522",
              textShadow: "0 0 45px rgba(242, 101, 34, 0.5)",
            }}
          >
            Capital Youth Expo
          </h2>
        </div>
      </div>
    </section>
  );
}
