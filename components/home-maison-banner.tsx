"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HomeMaisonBannerProps = {
  text: string;
  imageSrc: string;
  imageAlt: string;
  tilt?: "left" | "right";
  className?: string;
  bannerStart?: string;
  bannerEnd?: string;
  textStart?: string;
  textEnd?: string;
};

export function HomeMaisonBanner({
  text,
  imageSrc,
  imageAlt,
  tilt = "left",
  className = "",
  bannerStart = "top 80%",
  bannerEnd = "top 52%",
  textStart = "top 70%",
  textEnd = "top 20%",
}: HomeMaisonBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !bannerRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const collapsedHeight = window.innerWidth < 768 ? 100 : 200;
    const expandedHeight = window.innerWidth < 768 ? 220 : 400;
    const growthOffset = expandedHeight - collapsedHeight;
    const chars = sectionRef.current.querySelectorAll<HTMLElement>("[data-maison-char]");
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(bannerRef.current, { minHeight: collapsedHeight, y: growthOffset });
      gsap.set(chars, { autoAlpha: 0, yPercent: 35 });

      const bannerTween = gsap.to(bannerRef.current, {
        minHeight: expandedHeight,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: bannerStart,
          end: bannerEnd,
          scrub: 0.5,
        },
      });

      const textTween = gsap.to(chars, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.38,
        ease: "power3.out",
        stagger: 0.028,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: textStart,
          end: textEnd,
          scrub: 0.25,
        },
      });

      return () => {
        bannerTween.scrollTrigger?.kill();
        textTween.scrollTrigger?.kill();
        bannerTween.kill();
        textTween.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={` ${className}`.trim()}>
      <div
        ref={bannerRef}
        className={`relative min-h-[320px] w-[106%] -mx-[3%] md:min-h-[460px] md:w-[104%] md:-mx-[2%] ${
          tilt === "left" ? "-rotate-[1.8deg]" : "rotate-[1.8deg]"
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <p className="brand-font text-7xl uppercase leading-none text-white md:text-9xl lg:text-[10rem]  xl:text-[14rem]" aria-label={text}>
            {Array.from(text).map((char, index) => (
              <span key={`${char}-${index}`} data-maison-char aria-hidden="true" className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
