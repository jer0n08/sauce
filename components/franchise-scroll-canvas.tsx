"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";

const DESKTOP_FRAME_COUNT = 91;
const MOBILE_FRAME_COUNT = 91;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function getFramePath(index: number, isMobile: boolean) {
  const folder = isMobile ? "/assets/video-franchise-mobile" : "/assets/video-franchise-desktop";
  const ext = "webp";
  return `${folder}/ezgif-frame-${String(index + 1).padStart(3, "0")}.${ext}`;
}

function getDesktopPngFallbackPath(index: number) {
  const sourceIndex = Math.min(index * 2 + 1, 181);
  return `/assets/video-franchise/ezgif-frame-${String(sourceIndex).padStart(3, "0")}.png`;
}

export function FranchiseScrollCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const cardShellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const reviewsCounterShellRef = useRef<HTMLDivElement>(null);
  const reviewsCounterValueRef = useRef<HTMLSpanElement>(null);
  const finalTitleRef = useRef<HTMLHeadingElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const starRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const starFillRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    if (!section || !pin || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
    const preloadRadius = isMobile ? 6 : 12;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frames: Array<HTMLImageElement | null> = new Array(frameCount).fill(null);
    const loading = new Set<number>();

    let renderedFrame = -1;
    let rafId = 0;
    let ticking = false;
    let disposed = false;

    const updateReviewsOverlay = (progress: number) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.round(progress * 100)}%`;
      }

      const scoreProgress = clamp((progress - 0.24) / 0.18);
      const score = 3 + scoreProgress * 2;
      if (scoreRef.current) {
        scoreRef.current.textContent = score.toFixed(1);
      }

      if (veilRef.current) {
        const veilOpacity = clamp((progress - 0.14) / 0.2) * 0.62;
        veilRef.current.style.opacity = `${veilOpacity}`;
      }

      const cardRevealStart = 0.2;
      const cardRevealDuration = 0.2;
      const cardReveal = clamp((progress - cardRevealStart) / cardRevealDuration);
      const fadeOutStart = 0.86;
      const fadeOut = clamp((progress - fadeOutStart) / 0.03);
      const elementsOpacity = 1 - fadeOut;
      const titleRevealStart = 0.91;
      const titleReveal = clamp((progress - titleRevealStart) / 0.02);

      if (cardShellRef.current) {
        cardShellRef.current.style.opacity = `${cardReveal * elementsOpacity}`;
        cardShellRef.current.style.transform = `translate(-50%, ${(1 - cardReveal) * 24}px)`;
      }

      if (reviewsCounterShellRef.current && reviewsCounterValueRef.current) {
        const counterStart = cardRevealStart + cardRevealDuration + 0.04;
        const counterReveal = progress >= counterStart ? clamp((progress - counterStart) / 0.1) : 0;
        const counterValue = Math.round(counterReveal * 1000);
        reviewsCounterShellRef.current.style.opacity = `${counterReveal * elementsOpacity}`;
        reviewsCounterShellRef.current.style.transform = `translateY(${(1 - counterReveal) * 12}px)`;
        reviewsCounterValueRef.current.textContent = `+${counterValue.toLocaleString("fr-FR")}`;
      }

      if (finalTitleRef.current) {
        finalTitleRef.current.style.opacity = `${titleReveal}`;
        finalTitleRef.current.style.transform = `translateY(${16 - titleReveal * 16}px)`;
      }

      if (cardRef.current) {
        cardRef.current.style.transform = "translateY(0)";
        const shadowOffset = 6;
        cardRef.current.style.boxShadow = `${shadowOffset}px ${shadowOffset}px 0 var(--brand)`;
      }

      for (let index = 0; index < 5; index += 1) {
        const star = starRefs.current[index];
        const starFill = starFillRefs.current[index];
        if (!star || !starFill) {
          continue;
        }

        const fillProgress = clamp(score - index);
        starFill.style.width = `${fillProgress * 100}%`;

        if (index < 3) {
          star.style.opacity = "1";
          star.style.transform = "scale(1)";
          continue;
        }

        const revealStart = index === 3 ? 0.2 : 0.56;
        const reveal = clamp((progress - revealStart) / 0.26);
        star.style.opacity = `${0.22 + reveal * 0.78}`;
        star.style.transform = `scale(${0.86 + reveal * 0.14})`;
      }
    };

    const drawFrame = (frameIndex: number) => {
      if (frameIndex === renderedFrame) {
        return;
      }

      const image = frames[frameIndex];
      if (!image) {
        return;
      }

      const { width, height } = canvas;
      const scale = Math.max(width / image.width, height / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const drawX = (width - drawWidth) / 2;
      const drawY = (height - drawHeight) / 2;

      context.clearRect(0, 0, width, height);
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      renderedFrame = frameIndex;
    };

    const ensureFrame = (frameIndex: number) => {
      if (frameIndex < 0 || frameIndex >= frameCount || frames[frameIndex] || loading.has(frameIndex)) {
        return;
      }

      loading.add(frameIndex);
      const image = new Image();
      image.src = getFramePath(frameIndex, isMobile);
      image.onload = () => {
        loading.delete(frameIndex);
        if (disposed) {
          return;
        }

        frames[frameIndex] = image;
        requestTick();
      };
      image.onerror = () => {
        if (!isMobile) {
          image.onerror = () => {
            loading.delete(frameIndex);
          };
          image.src = getDesktopPngFallbackPath(frameIndex);
          return;
        }

        loading.delete(frameIndex);
      };
    };

    const preloadAround = (frameIndex: number) => {
      ensureFrame(frameIndex);
      for (let offset = 1; offset <= preloadRadius; offset += 1) {
        ensureFrame(frameIndex - offset);
        ensureFrame(frameIndex + offset);
      }
    };

    const getScrollProgress = () => {
      const sectionHeight = section.offsetHeight - pin.offsetHeight;
      if (sectionHeight <= 0) {
        return 0;
      }

      const scrolledDistance = Math.min(Math.max(-section.getBoundingClientRect().top, 0), sectionHeight);
      return clamp(scrolledDistance / sectionHeight);
    };

    const getFrameFromProgress = (progress: number) => {
      return Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
    };

    const updateFrame = () => {
      ticking = false;

      const progress = prefersReducedMotion ? 1 : getScrollProgress();
      const videoProgress = prefersReducedMotion ? 1 : clamp(progress / 0.76);
      const frameIndex = prefersReducedMotion ? frameCount - 1 : getFrameFromProgress(videoProgress);

      updateReviewsOverlay(progress);
      preloadAround(frameIndex);
      drawFrame(frameIndex);
    };

    const resizeCanvas = () => {
      const maxDpr = isMobile ? 1.4 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.round(pin.clientWidth * dpr);
      canvas.height = Math.round(pin.clientHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      renderedFrame = -1;
      updateFrame();
    };

    const requestTick = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      rafId = window.requestAnimationFrame(updateFrame);
    };

    resizeCanvas();

    ensureFrame(0);
    preloadAround(0);

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    requestTick();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh] " aria-label="Animation franchise Sauce">
      <div ref={pinRef} className="sticky top-0 h-[100svh] lg:h-[85svh] overflow-hidden bg-black">
        <canvas ref={canvasRef} className="h-full w-full" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.26),transparent_100%,transparent_68%,rgba(0,0,0,1))]" />
        <div
          ref={veilRef}
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,8,1),rgba(8,8,8,1))]"
          style={{ opacity: 0, transition: "opacity 180ms linear" }}
        />

        <div className="pointer-events-none absolute inset-x-4 bottom-3 z-20 h-1.5 overflow-hidden rounded-full bg-[var(--cream)]/80 md:inset-x-8 md:bottom-5">
          <div
            ref={progressBarRef}
            className="h-full w-0 rounded-full bg-[var(--brand)]"
            style={{ transition: "width 120ms linear" }}
          />
        </div>

        <div
          ref={cardShellRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[calc(100%-2.5rem)] max-w-[300px] md:w-[360px] md:max-w-[360px]"
          style={{ top: "calc(50% - 90px)", opacity: 0, transform: "translate(-50%, 24px)", transition: "opacity 220ms linear, transform 220ms linear" }}
        >
          <article
            ref={cardRef}
            className="relative flex min-h-[160px] flex-col items-center overflow-hidden rounded-[22px] border-2 border-[var(--brand)] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(255,255,255,0.93))] p-3 text-[#202124] md:min-h-[188px] md:p-5"
            style={{ fontFamily: '"Google Sans", "Product Sans", Roboto, Arial, sans-serif', transform: "translateY(0)", boxShadow: "6px 6px 0 var(--brand)", transition: "transform 220ms linear, box-shadow 220ms linear" }}
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,188,4,0.42),rgba(251,188,4,0))]" />
            <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.24),rgba(66,133,244,0))]" />

            <div className="relative mb-2 flex justify-center md:mb-3">
              <NextImage
                src="/assets/images/search.png"
                alt="Google"
                width={44}
                height={44}
                className="h-9 w-9 object-contain md:h-11 md:w-11"
                sizes="44px"
              />
            </div>

            <div className="relative text-center">
              <span ref={scoreRef} className="text-4xl font-bold leading-none text-[#202124] md:text-6xl">
                3.0
              </span>
            </div>

            <div className="relative mt-2 flex items-center justify-center gap-1 md:mt-3 md:gap-1.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  ref={(node) => {
                    starRefs.current[index] = node;
                  }}
                  className="relative inline-flex h-5 w-5 items-center justify-center origin-center transition-transform duration-200 md:h-6 md:w-6"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#dadce0] md:h-6 md:w-6" aria-hidden="true">
                    <path d="M12 2.2l2.93 5.93 6.55.95-4.74 4.62 1.12 6.52L12 17.14l-5.86 3.08 1.12-6.52L2.52 9.08l6.55-.95L12 2.2z" />
                  </svg>
                  <span
                    ref={(node) => {
                      starFillRefs.current[index] = node;
                    }}
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: index < 3 ? "100%" : "0%" }}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#fbbc04] md:h-6 md:w-6" aria-hidden="true">
                      <path d="M12 2.2l2.93 5.93 6.55.95-4.74 4.62 1.12 6.52L12 17.14l-5.86 3.08 1.12-6.52L2.52 9.08l6.55-.95L12 2.2z" />
                    </svg>
                  </span>
                </span>
              ))}
            </div>

          </article>

          <div
            ref={reviewsCounterShellRef}
            className="mx-auto mt-4 text-center"
            style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 220ms linear, transform 220ms linear" }}
          >
            <p className="text-4xl font-bold tracking-[0.08em] text-white md:text-5xl">
              <span ref={reviewsCounterValueRef}>+0</span> avis
            </p>
          </div>
        </div>

        <h1
          ref={finalTitleRef}
          className="brand-font pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-6xl uppercase leading-none text-white [text-shadow:6px_6px_0_var(--brand)] opacity-0 md:text-8xl"
          style={{ transform: "translateY(16px)", transition: "opacity 220ms linear, transform 220ms linear" }}
        >
          DEVENEZ FRANCHISÉ
        </h1>
      </div>
    </section>
  );
}
