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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  
  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [useVideoEngine, setUseVideoEngine] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
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

  // Draw frame on canvas (fallback engine / initial paint)
  const drawFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

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

    ctx.globalAlpha = 1.0;
    ctx.drawImage(baseImg, offsetX, offsetY, renderWidth, renderHeight);

    if (blendRatio > 0.03 && nextIdx !== baseIdx) {
      const nextImg = imagesRef.current[nextIdx];
      if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
        ctx.globalAlpha = blendRatio;
        ctx.drawImage(nextImg, offsetX, offsetY, renderWidth, renderHeight);
        ctx.globalAlpha = 1.0;
      }
    }
  }, []);

  // Resize canvas handler
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
      drawFrame(currentProgressRef.current * (TOTAL_FRAMES - 1));
    }
  }, [drawFrame]);

  // Initialize 4K Video Hardware Engine & Initial Image Load
  useEffect(() => {
    let isCancelled = false;

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

    // 1. Load initial frame for instant first paint
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setFirstFrameLoaded(true);
      handleResize();
      drawFrame(0);
      notifyProgress(40);
    };

    // 2. Warm up 4K video element
    const video = videoRef.current;
    if (video) {
      const handleVideoReady = () => {
        if (isCancelled) return;
        setIsVideoReady(true);
        setUseVideoEngine(true);
        notifyProgress(100);
        if (onLoaded) onLoaded();
      };

      const handleVideoProgress = () => {
        if (video.buffered.length > 0 && video.duration > 0) {
          const loadedFraction = video.buffered.end(0) / video.duration;
          notifyProgress(Math.min(100, Math.floor(40 + loadedFraction * 60)));
        }
      };

      if (video.readyState >= 3) {
        handleVideoReady();
      } else {
        video.addEventListener("canplaythrough", handleVideoReady, { once: true });
        video.addEventListener("loadeddata", handleVideoReady, { once: true });
        video.addEventListener("progress", handleVideoProgress);
      }

      window.addEventListener("resize", handleResize);

      return () => {
        isCancelled = true;
        video.removeEventListener("canplaythrough", handleVideoReady);
        video.removeEventListener("loadeddata", handleVideoReady);
        video.removeEventListener("progress", handleVideoProgress);
        window.removeEventListener("resize", handleResize);
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    }

    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleResize, drawFrame, onLoadingProgress, onLoaded]);

  // Update target progress from scroll
  useEffect(() => {
    if (prefersReducedMotion) {
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      const video = videoRef.current;
      if (video && video.duration > 0) {
        video.currentTime = 0;
      } else {
        drawFrame(0);
      }
      return;
    }

    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    targetProgressRef.current = clampedProgress;
  }, [scrollProgress, prefersReducedMotion, drawFrame]);

  // High-performance RAF scroll scrub loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0008) {
        currentProgressRef.current += diff * 0.22;
        const progress = currentProgressRef.current;

        const video = videoRef.current;
        if (useVideoEngine && video && video.duration > 0 && !isNaN(video.duration)) {
          // Hardware 4K Video Seek
          const targetTime = Math.min(
            video.duration - 0.02,
            Math.max(0, progress * video.duration)
          );
          if (Math.abs(video.currentTime - targetTime) > 0.015) {
            video.currentTime = targetTime;
          }
        } else {
          // Fallback Canvas Draw
          drawFrame(progress * (TOTAL_FRAMES - 1));
        }
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
  }, [drawFrame, useVideoEngine, prefersReducedMotion]);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {/* 1. Hardware-Accelerated 4K Pristine Video Engine */}
      <video
        ref={videoRef}
        src="/images/hero-venue-cinematic.mp4"
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-cover block pointer-events-none will-change-transform"
        style={{
          opacity: isVideoReady ? 1 : 0,
          filter: "contrast(1.04) saturate(1.06) brightness(1.01)",
          transition: "opacity 0.5s ease-out",
        }}
        aria-hidden="true"
      />

      {/* 2. High-Performance Canvas Fallback / Initial Buffer Paint */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover block pointer-events-none will-change-transform"
        style={{
          opacity: firstFrameLoaded && !isVideoReady ? 1 : 0,
          filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
          transition: "opacity 0.35s ease-out",
        }}
        aria-hidden="true"
      />

      {/* Cinematic Ambient Lighting Glow Overlay */}
      <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-black/20 pointer-events-none" />

      {/* Fallback Static Image for SSR / Instant First-Paint / No-JS */}
      {!firstFrameLoaded && !isVideoReady && (
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
