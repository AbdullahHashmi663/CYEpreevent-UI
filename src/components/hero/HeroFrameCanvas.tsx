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

// Low-frequency keyframe indices across the full 0-259 range for instantaneous scrub availability (~470 KB)
const KEYFRAME_STRIDE = 16;
const KEYFRAME_INDICES: number[] = [];
for (let i = 0; i < TOTAL_FRAMES; i += KEYFRAME_STRIDE) {
  KEYFRAME_INDICES.push(i);
}
if (KEYFRAME_INDICES[KEYFRAME_INDICES.length - 1] !== TOTAL_FRAMES - 1) {
  KEYFRAME_INDICES.push(TOTAL_FRAMES - 1);
}

// Medium-frequency indices (stride 4)
const MIDFRAME_INDICES: number[] = [];
for (let i = 0; i < TOTAL_FRAMES; i += 4) {
  if (!KEYFRAME_INDICES.includes(i)) {
    MIDFRAME_INDICES.push(i);
  }
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
  const loadingStatusRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedIdxRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef<boolean>(false);

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

  // Ultra-fast canvas frame drawer with nearest loaded frame fallback
  const drawFrame = useCallback((frameFloat: number, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameFloat)));

    if (!forceRedraw && frameIdx === lastRenderedIdxRef.current) {
      return;
    }

    let img = imagesRef.current[frameIdx];

    // Intelligent nearest-neighbor keyframe fallback if target frame hasn't completed loading yet
    if (!img || !img.complete || img.naturalWidth === 0) {
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
    ctx.imageSmoothingQuality = "medium";
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

    lastRenderedIdxRef.current = frameIdx;
  }, []);

  // Responsive canvas sizing capped to native 1280x720 aspect to save VRAM memory
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cap DPR at 1.25x (source frames are 720p; avoids wasteful 4K texture allocation)
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.25);
    const rect = canvas.getBoundingClientRect();

    const displayWidth = Math.round(rect.width * dpr);
    const displayHeight = Math.round(rect.height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      drawFrame(currentFrameRef.current, true);
    }
  }, [drawFrame]);

  // Load a single frame with off-main-thread image decoding (img.decode())
  const loadSingleFrame = useCallback((index: number): Promise<HTMLImageElement | null> => {
    if (imagesRef.current[index]) {
      return Promise.resolve(imagesRef.current[index]);
    }
    if (loadingStatusRef.current[index]) {
      return Promise.resolve(null);
    }

    loadingStatusRef.current[index] = true;

    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFrameUrl(index);

      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => {
            imagesRef.current[index] = img;
            resolve(img);
          })
          .catch(() => {
            // Fallback for decode errors or aborted loads
            imagesRef.current[index] = img;
            resolve(img);
          });
      } else {
        img.onload = () => {
          imagesRef.current[index] = img;
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      }
    });
  }, []);

  // Multi-Pass Keyframe Preload Orchestrator
  useEffect(() => {
    let isCancelled = false;
    let totalLoaded = 0;

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

    // ================= PASS 1: Frame 0 Instant Paint (< 100ms) =================
    loadSingleFrame(0).then((firstImg) => {
      if (isCancelled || !firstImg) return;
      setFirstFrameLoaded(true);
      handleResize();
      drawFrame(0, true);

      // On mobile devices: unlock immediately with the high-res poster frame to avoid mobile data & battery drain
      if (effectiveIsMobile) {
        notifyProgress(100);
        if (onLoaded) onLoaded();
        return;
      }

      totalLoaded += 1;
      notifyProgress(10); // Signals loader that initial visual is ready

      // ================= PASS 2: 16 Keyframes (~470 KB) =================
      // Once these 16 frames load, scroll scrubbing is fully functional across the runway!
      const keyframePromises = KEYFRAME_INDICES.filter((idx) => idx !== 0).map((idx) =>
        loadSingleFrame(idx).then((img) => {
          if (img) totalLoaded += 1;
        })
      );

      Promise.all(keyframePromises).then(() => {
        if (isCancelled || effectiveIsMobile) return;

        // Keyframes ready: notify 60% progress
        notifyProgress(60);

        // ================= PASS 3: Mid-frequency In-Betweens (Stride 4) =================
        const midPromises = MIDFRAME_INDICES.map((idx) =>
          loadSingleFrame(idx).then((img) => {
            if (img) totalLoaded += 1;
          })
        );

        Promise.all(midPromises).then(() => {
          if (isCancelled || effectiveIsMobile) return;

          notifyProgress(95);

          // ================= PASS 4: Idle Background Filling of All Remaining Details =================
          const remainingIndices: number[] = [];
          for (let i = 0; i < TOTAL_FRAMES; i++) {
            if (!imagesRef.current[i]) {
              remainingIndices.push(i);
            }
          }

          let remIdx = 0;
          const BATCH_SIZE = 8;

          const loadRemainingBatch = () => {
            if (isCancelled || effectiveIsMobile || remIdx >= remainingIndices.length) {
              notifyProgress(100);
              if (onLoaded) onLoaded();
              return;
            }

            const batch = remainingIndices.slice(remIdx, remIdx + BATCH_SIZE);
            remIdx += BATCH_SIZE;

            Promise.all(batch.map((i) => loadSingleFrame(i))).then(() => {
              if (isCancelled || effectiveIsMobile) return;
              if (typeof window !== "undefined" && "requestIdleCallback" in window) {
                (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
                  loadRemainingBatch
                );
              } else {
                setTimeout(loadRemainingBatch, 25);
              }
            });
          };

          loadRemainingBatch();
        });
      });
    });

    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, drawFrame, loadSingleFrame, onLoadingProgress, onLoaded, effectiveIsMobile]);

  // Priority queue: whenever the user scrolls to a frame, ensure adjacent frames load immediately
  useEffect(() => {
    if (effectiveIsMobile || prefersReducedMotion) return;

    const currentTarget = targetFrameRef.current;
    const centerIdx = Math.round(currentTarget);

    // Prioritize loading frames within +/- 3 of current target frame
    for (let offset = -3; offset <= 3; offset++) {
      const idx = centerIdx + offset;
      if (idx >= 0 && idx < TOTAL_FRAMES && !imagesRef.current[idx]) {
        loadSingleFrame(idx);
      }
    }
  }, [scrollProgress, effectiveIsMobile, prefersReducedMotion, loadSingleFrame]);

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

    // Trigger on-demand render loop if not already running
    if (!isLoopRunningRef.current) {
      startRenderLoop();
    }
  }, [scrollProgress, prefersReducedMotion, effectiveIsMobile, drawFrame]);

  // Smart On-Demand RAF loop (stops when settled - ZERO CPU consumption when idle!)
  const startRenderLoop = useCallback(() => {
    if (isLoopRunningRef.current || prefersReducedMotion || effectiveIsMobile) return;
    isLoopRunningRef.current = true;

    const renderTick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Snappy and smooth lerp dampening
      if (Math.abs(diff) > 0.002) {
        currentFrameRef.current += diff * 0.38;
        drawFrame(currentFrameRef.current);
        rafIdRef.current = requestAnimationFrame(renderTick);
      } else {
        // Snapped to final target frame: draw final crisp frame and shut down the loop
        currentFrameRef.current = target;
        drawFrame(target);
        isLoopRunningRef.current = false;
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      }
    };

    rafIdRef.current = requestAnimationFrame(renderTick);
  }, [drawFrame, prefersReducedMotion, effectiveIsMobile]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      isLoopRunningRef.current = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {/* High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block pointer-events-none will-change-transform"
        style={{
          opacity: firstFrameLoaded ? 1 : 0,
          filter: "contrast(1.04) saturate(1.06) brightness(1.02)",
          transition: "opacity 0.25s ease-out",
        }}
        aria-hidden="true"
      />

      {/* Cinematic Ambient Lighting Glow Overlay */}
      <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-black/20 pointer-events-none" />

      {/* Instant Fallback Poster for SSR / First-Paint */}
      {!firstFrameLoaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/hero-frames/frame-001.webp"
          alt="Capital Youth Expo Monument"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}
    </div>
  );
}
