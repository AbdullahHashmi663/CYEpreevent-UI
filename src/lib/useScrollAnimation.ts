/**
 * useScrollAnimation – A custom hook that registers GSAP ScrollTrigger-powered
 * entrance animations for any element ref. Keeps all GSAP logic centralised so
 * components stay declarative.
 */
"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fadeIn"
  | "scaleUp"
  | "flipX"
  | "slideReveal"
  | "counterUp"
  | "staggerChildren";

interface UseScrollAnimationOptions {
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  staggerAmount?: number; // only used with staggerChildren
  childSelector?: string; // CSS selector for stagger children
  start?: string; // ScrollTrigger start position, e.g. "top 85%"
  once?: boolean;
}

export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollAnimationOptions = {}
) {
  const {
    variant = "fadeUp",
    delay = 0,
    duration = 0.8,
    staggerAmount = 0.12,
    childSelector = "> *",
    start = "top 88%",
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: gsap.Context;

    const buildAnimation = () => {
      ctx = gsap.context(() => {
        if (variant === "staggerChildren") {
          const children = el.querySelectorAll(childSelector);
          gsap.fromTo(
            children,
            getFromProps(variant),
            {
              ...getToProps(variant),
              duration,
              delay,
              stagger: staggerAmount,
              scrollTrigger: {
                trigger: el,
                start,
                once,
              },
            }
          );
        } else {
          gsap.fromTo(
            el,
            getFromProps(variant),
            {
              ...getToProps(variant),
              duration,
              delay,
              scrollTrigger: {
                trigger: el,
                start,
                once,
              },
            }
          );
        }
      }, el);
    };

    buildAnimation();

    return () => ctx?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function getFromProps(variant: AnimationVariant) {
  switch (variant) {
    case "fadeUp":
      return { opacity: 0, y: 60, ease: "power3.out" };
    case "fadeDown":
      return { opacity: 0, y: -50, ease: "power3.out" };
    case "fadeLeft":
      return { opacity: 0, x: -70, ease: "power3.out" };
    case "fadeRight":
      return { opacity: 0, x: 70, ease: "power3.out" };
    case "fadeIn":
      return { opacity: 0, ease: "power2.inOut" };
    case "scaleUp":
      return { opacity: 0, scale: 0.82, ease: "back.out(1.7)" };
    case "flipX":
      return { opacity: 0, rotationX: 80, transformOrigin: "top center", ease: "power3.out" };
    case "slideReveal":
      return { clipPath: "inset(0 100% 0 0)", ease: "power4.inOut" };
    case "counterUp":
      return { opacity: 0, y: 30, ease: "power2.out" };
    case "staggerChildren":
      return { opacity: 0, y: 45, ease: "power3.out" };
    default:
      return { opacity: 0, y: 60, ease: "power3.out" };
  }
}

function getToProps(variant: AnimationVariant) {
  switch (variant) {
    case "slideReveal":
      return { clipPath: "inset(0 0% 0 0)", opacity: 1 };
    default:
      return { opacity: 1, x: 0, y: 0, scale: 1, rotationX: 0, clipPath: undefined };
  }
}
