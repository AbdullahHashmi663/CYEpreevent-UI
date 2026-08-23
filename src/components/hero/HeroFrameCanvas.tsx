"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HeroFrameCanvasProps {
  scrollProgress: number; // 0 to 1
  onLoadingProgress?: (progress: number) => void;
  onLoaded?: () => void;
  className?: string;
}

const TOTAL_FRAMES = 256;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/images/hero%20frames/ezgif-frame-${frameNumber}.jpg`;
}

export default function HeroFrameCanvas({
  scrollProgress,
  onLoadingProgress,
  onLoaded,
  className = "",
}: HeroFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Draw frame with sub-frame cross-fading & high-quality interpolation
  const drawFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Enable high quality image scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const baseIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(frameFloat)));
    const nextIdx = Math.min(TOTAL_FRAMES - 1, baseIdx + 1);
    const blendRatio = frameFloat - baseIdx;

    let baseImg = imagesRef.current[baseIdx];
    if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) {
      baseImg = imagesRef.current[0];
    }
    if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect-ratio covering dimensions
    const imgRatio = baseImg.naturalWidth / baseImg.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
    }

    // Draw base frame with full opacity
    ctx.globalAlpha = 1.0;
    ctx.drawImage(baseImg, offsetX, offsetY, renderWidth, renderHeight);

    // Sub-frame cross-fade interpolation if scrolling between discrete frames
    if (blendRatio > 0.03 && nextIdx !== baseIdx) {
      const nextImg = imagesRef.current[nextIdx];
      if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
        ctx.globalAlpha = blendRatio;
        ctx.drawImage(nextImg, offsetX, offsetY, renderWidth, renderHeight);
        ctx.globalAlpha = 1.0;
      }
    }
  }, []);

  // Resize canvas to match display size with Device Pixel Ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2.5);
    const rect = canvas.getBoundingClientRect();

    const displayWidth = Math.round(rect.width * dpr);
    const displayHeight = Math.round(rect.height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Load Frame 1 immediately for instant paint, then progressively preload all remaining frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const notifyProgress = (percent: number) => {
      if (onLoadingProgress) {
        onLoadingProgress(percent);
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("cye-hero-frame-progress", {
            detail: { progress: percent },
          })
        );
      }
    };

    // 1. First priority: load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      loadedCount += 1;
      setFirstFrameLoaded(true);
      handleResize();
      drawFrame(0);

      notifyProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));

      // 2. Start progressive batch loading for the rest
      loadRemainingFrames();
    };

    firstImg.onerror = () => {
      if (!isCancelled) {
        firstImg.src = getFrameUrl(0);
      }
    };

    const loadRemainingFrames = () => {
      const BATCH_SIZE = 16;
      let currentIndex = 1;

      const loadNextBatch = () => {
        if (isCancelled || currentIndex >= TOTAL_FRAMES) return;

        const end = Math.min(currentIndex + BATCH_SIZE, TOTAL_FRAMES);
        for (let i = currentIndex; i < end; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            if (isCancelled) return;
            imagesRef.current[i] = img;
            loadedCount += 1;

            const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
            notifyProgress(percent);

            if (loadedCount >= TOTAL_FRAMES) {
              if (onLoaded) onLoaded();
            }
          };
          img.onerror = () => {
            if (isCancelled) return;
            loadedCount += 1;
          };
        }

        currentIndex = end;
        if (currentIndex < TOTAL_FRAMES) {
          if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 12);
          }
        }
      };

      loadNextBatch();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleResize, drawFrame, onLoadingProgress, onLoaded]);

  // Update target frame based on scroll progress
  useEffect(() => {
    if (prefersReducedMotion) {
      targetFrameRef.current = 0;
      currentFrameRef.current = 0;
      drawFrame(0);
      return;
    }

    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    targetFrameRef.current = clampedProgress * (TOTAL_FRAMES - 1);
  }, [scrollProgress, prefersReducedMotion, drawFrame]);

  // RAF loop for buttery-smooth lerped frame rendering with sub-frame cross-fading
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // High-precision smooth lerp dampening
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.26;
        drawFrame(currentFrameRef.current);
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, prefersReducedMotion]);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {/* High-Performance Interactive HTML5 Canvas with Sharpness & Contrast Enhancement */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block pointer-events-none will-change-transform"
        style={{
          opacity: firstFrameLoaded ? 1 : 0,
          filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
          transition: "opacity 0.35s ease-out",
        }}
        aria-hidden="true"
      />

      {/* Cinematic Ambient Lighting Glow Overlay */}
      <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-black/20 pointer-events-none" />

      {/* Fallback Static Image for SSR / Instant First-Paint / No-JS */}
      {!firstFrameLoaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/hero%20frames/ezgif-frame-001.jpg"
          alt="Capital Youth Expo 3D Assembled Monument"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* NoScript Fallback for JavaScript-disabled environments */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero%20frames/ezgif-frame-001.jpg"
          alt="Capital Youth Expo Monument"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </noscript>
    </div>
  );
}
