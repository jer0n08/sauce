"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { MenuItem } from "@/types/menu";

type MenuItemCardProps = {
  item: MenuItem;
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const media = mediaRef.current;
    if (!card || !media) {
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.set(card, { transformPerspective: 2400, transformOrigin: "center center" });

    const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.35, ease: "power3.out" });
    const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.35, ease: "power3.out" });
    const scaleTo = gsap.quickTo(card, "scale", { duration: 0.35, ease: "power3.out" });
    const mediaXTo = gsap.quickTo(media, "x", { duration: 0.35, ease: "power3.out" });
    const mediaYTo = gsap.quickTo(media, "y", { duration: 0.35, ease: "power3.out" });

    const handlePointerEnter = () => {
      scaleTo(1.006);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width;
      const yRatio = (event.clientY - rect.top) / rect.height;

      rotateXTo(gsap.utils.interpolate(5, -5, yRatio));
      rotateYTo(gsap.utils.interpolate(-5, 5, xRatio));
      mediaXTo(gsap.utils.interpolate(1, 1, xRatio));
      mediaYTo(gsap.utils.interpolate(-1, 1, yRatio));
    };

    const handlePointerLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      mediaXTo(0);
      mediaYTo(0);
      scaleTo(1);
    };

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[40px] border-[6px] border-[var(--brand)] bg-white text-left transform-gpu [transform-style:preserve-3d] will-change-transform"
    >
      <div className="p-4">
        <div ref={mediaRef} className="relative aspect-square w-full overflow-hidden rounded-[20px] will-change-transform">
          <Image src={item.image} alt={item.alt ?? item.name} fill className="object-cover" sizes="(max-width: 768px) 76vw, (max-width: 1200px) 38vw, 24vw" />
        </div>
      </div>

      <div className="space-y-3 px-4 pb-4 pt-0 md:px-5 md:pb-5 md:pt-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="brand-font text-3xl uppercase leading-none text-[var(--brand)] md:text-4xl">{item.name}</h3>
          <p className="brand-font shrink-0 bg-[var(--brand)] px-2 py-1 text-xl leading-none text-white md:text-2xl">{item.price}</p>
        </div>
        <p className="paragraph-text text-sm leading-relaxed md:text-base">{item.description}</p>
      </div>
    </article>
  );
}
