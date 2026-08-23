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

  // Draw a specific image frame onto canvas with cover aspect ratio
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use current frame or fallback to first loaded available frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect-ratio covering dimensions
    const imgRatio = img.naturalWidth / img.naturalHeight;
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

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, []);

  // Resize canvas to match display size with Device Pixel Ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const rect = canvas.getBoundingClientRect();

    const displayWidth = Math.round(rect.width * dpr);
    const displayHeight = Math.round(rect.height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      drawFrame(Math.round(currentFrameRef.current));
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
      // Chunked loading to ensure smooth main thread and rapid cache populating
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

  // RAF loop for buttery-smooth lerped frame rendering at any scroll speed
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Smooth lerp dampening for seamless scrubbing
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.28;
        const targetFrameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );
        drawFrame(targetFrameIndex);
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
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* High-Performance Interactive HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block pointer-events-none"
        style={{
          opacity: firstFrameLoaded ? 1 : 0,
          transition: "opacity 0.35s ease-out",
        }}
        aria-hidden="true"
      />

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
