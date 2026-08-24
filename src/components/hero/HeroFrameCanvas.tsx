"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HeroFrameCanvasProps {
  scrollProgress: number; // 0 to 1
  onLoadingProgress?: (progress: number) => void;
  onLoaded?: () => void;
  className?: string;
  isMobile?: boolean;
}

const TOTAL_FRAMES = 260;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/images/hero-frames/frame-${frameNumber}.webp`;
}

export default function HeroFrameCanvas({
  scrollProgress,
  onLoadingProgress,
  onLoaded,
  className = "",
  isMobile: isMobileProp,
}: HeroFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedIdxRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Check prefers-reduced-motion and screen width for mobile optimization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const checkScreen = () => {
        setIsMobileScreen(window.innerWidth < 768);
      };
      checkScreen();

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      window.addEventListener("resize", checkScreen);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        window.removeEventListener("resize", checkScreen);
      };
    }
  }, []);

  const effectiveIsMobile = isMobileProp ?? isMobileScreen;

  // High-performance canvas frame drawer
  const drawFrame = useCallback((frameFloat: number, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameFloat)));

    // Skip redundant drawing if the frame hasn't changed unless forced (e.g. on resize)
    if (!forceRedraw && frameIdx === lastRenderedIdxRef.current) {
      return;
    }

    let img = imagesRef.current[frameIdx];
    // Fallback to closest loaded frame or frame 0 if current frame is still loading
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let nearestImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = frameIdx - offset;
        const right = frameIdx + offset;
        if (left >= 0 && imagesRef.current[left]?.complete && imagesRef.current[left]!.naturalWidth > 0) {
          nearestImg = imagesRef.current[left];
          break;
        }
        if (right < TOTAL_FRAMES && imagesRef.current[right]?.complete && imagesRef.current[right]!.naturalWidth > 0) {
          nearestImg = imagesRef.current[right];
          break;
        }
      }
      img = nearestImg || imagesRef.current[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Fast aspect-ratio covering calculation
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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

    lastRenderedIdxRef.current = frameIdx;
  }, []);

  // Resize canvas to match display size with optimal Device Pixel Ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);
    const rect = canvas.getBoundingClientRect();

    const displayWidth = Math.round(rect.width * dpr);
    const displayHeight = Math.round(rect.height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      drawFrame(currentFrameRef.current, true);
    }
  }, [drawFrame]);

  // Load Frame 1 immediately for instant paint.
  // On mobile: stop here and do NOT load the other 259 frames to avoid lag & cellular data waste.
  // On desktop: progressively batch-preload all remaining frames.
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
      drawFrame(0, true);

      // On mobile screens: instant completion with single high-res poster frame
      if (effectiveIsMobile) {
        notifyProgress(100);
        if (onLoaded) onLoaded();
        return;
      }

      notifyProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));

      // 2. Start progressive batch loading for remaining 259 frames on desktop
      loadRemainingFrames();
    };

    firstImg.onerror = () => {
      if (!isCancelled) {
        firstImg.src = getFrameUrl(0);
      }
    };

    const loadRemainingFrames = () => {
      if (effectiveIsMobile) return;
      const BATCH_SIZE = 15;
      let currentIndex = 1;

      const loadNextBatch = () => {
        if (isCancelled || effectiveIsMobile || currentIndex >= TOTAL_FRAMES) return;

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
        if (currentIndex < TOTAL_FRAMES && !effectiveIsMobile) {
          if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 15);
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
  }, [handleResize, drawFrame, onLoadingProgress, onLoaded, effectiveIsMobile]);

  // Update target frame based on scroll progress (desktop only)
  useEffect(() => {
    if (prefersReducedMotion || effectiveIsMobile) {
      targetFrameRef.current = 0;
      currentFrameRef.current = 0;
      drawFrame(0, true);
      return;
    }

    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    targetFrameRef.current = clampedProgress * (TOTAL_FRAMES - 1);
  }, [scrollProgress, prefersReducedMotion, effectiveIsMobile, drawFrame]);

  // RAF loop for buttery-smooth lerped frame rendering (desktop only)
  useEffect(() => {
    if (prefersReducedMotion || effectiveIsMobile) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Snappy and smooth lerp dampening across 260 frames
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.35;
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
  }, [drawFrame, prefersReducedMotion, effectiveIsMobile]);

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
          src="/images/hero-frames/frame-001.jpg"
          alt="Capital Youth Expo 3D Assembled Monument"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* NoScript Fallback for JavaScript-disabled environments */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-frames/frame-001.jpg"
          alt="Capital Youth Expo Monument"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </noscript>
    </div>
  );
}
