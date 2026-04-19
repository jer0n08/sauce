"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type BannerParallaxProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  sectionClassName?: string;
};

export function BannerParallax({ title, imageSrc, imageAlt, imageClassName = "", sectionClassName = "" }: BannerParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleCharsRef = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    const heading = titleRef.current;
    if (!heading) {
      return;
    }

    const chars = titleCharsRef.current.filter((char): char is HTMLSpanElement => Boolean(char));

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(heading, { autoAlpha: 1, y: 0 });
        gsap.set(chars, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(chars, { autoAlpha: 0, y: 34 });
      gsap.fromTo(heading, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" });
      gsap.to(chars, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.045, ease: "power3.out", delay: 0.04 });
    }, heading);

    return () => ctx.revert();
  }, [title]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(media, { y: 0, scale: 1.18 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        {
          y: () => (window.innerWidth < 768 ? 64 : 86),
          scale: 1.18,
        },
        {
          y: () => (window.innerWidth < 768 ? -96 : -128),
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative isolate h-[52svh] min-h-[360px] overflow-hidden md:min-h-[480px] ${sectionClassName}`.trim()}
    >
      <div
        ref={mediaRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-20%", bottom: "-20%", transform: "scale(1.18)" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={`object-cover ${imageClassName}`.trim()}
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/38" />

      <div className="container-shell relative z-10 flex h-full items-center justify-center text-center">
        <h1
          ref={titleRef}
          className="brand-font text-6xl md:text-7xl uppercase leading-none text-white [text-shadow:4px_4px_0_var(--brand)] md:text-9xl"
        >
          {Array.from(title).map((char, index) => (
            <span
              key={`${char}-${index}`}
              ref={(node) => {
                titleCharsRef.current[index] = node;
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
