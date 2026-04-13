"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Reveal } from "@/components/reveal";

type GalleryPhoto = {
  src: string;
  rotate: string;
};

const galleryPhotos: GalleryPhoto[] = [
  { src: "/assets/images/hf_20260407_110616_70860d9a-2596-429f-ba27-122cc762b314.png", rotate: "rotate-12" },
  { src: "/assets/images/IMG_6933.PNG", rotate: "-rotate-[10deg]" },
  { src: "/assets/images/menu-banner.png", rotate: "rotate-[9deg]" },
  { src: "/assets/images/658440595_17889865677446344_2492821235290666953_n.jpeg", rotate: "-rotate-[12deg]" },
];

function TiltCard({ photo }: { photo: GalleryPhoto }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) {
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const outerRX = gsap.quickTo(outer, "rotationX", { duration: 0.45, ease: "power3.out" });
    const outerRY = gsap.quickTo(outer, "rotationY", { duration: 0.45, ease: "power3.out" });
    const innerX = gsap.quickTo(inner, "x", { duration: 0.45, ease: "power3.out" });
    const innerY = gsap.quickTo(inner, "y", { duration: 0.45, ease: "power3.out" });
    const innerZ = gsap.quickTo(inner, "z", { duration: 0.45, ease: "power3.out" });

    gsap.set(outer, { transformPerspective: 1860, transformOrigin: "center center" });

    const handlePointerMove = (event: PointerEvent) => {
      const rect = outer.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width;
      const yRatio = (event.clientY - rect.top) / rect.height;

      const distanceToCenter = Math.min(1, Math.hypot(xRatio - 0.5, yRatio - 0.5) / 0.71);

      outerRX(gsap.utils.interpolate(15, -15, yRatio));
      outerRY(gsap.utils.interpolate(-15, 15, xRatio));
      innerX(gsap.utils.interpolate(-20, 20, xRatio));
      innerY(gsap.utils.interpolate(-20, 20, yRatio));
      innerZ(gsap.utils.interpolate(8, 24, distanceToCenter));
    };

    const handlePointerLeave = () => {
      outerRX(0);
      outerRY(0);
      innerX(0);
      innerY(0);
      innerZ(0);
    };

    outer.addEventListener("pointermove", handlePointerMove);
    outer.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      outer.removeEventListener("pointermove", handlePointerMove);
      outer.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <Reveal className="flex justify-center">
      <div
        ref={outerRef}
        className={`${photo.rotate} [perspective:650px] w-[85%] md:w-full [transform-style:preserve-3d] transform-gpu will-change-transform`}
      >
        <div
          ref={innerRef}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl border-[20px] border-white shadow-[0_12px_20px_rgba(0,0,0,0.16)] [transform-style:preserve-3d] transform-gpu will-change-transform"
        >
          <Image src={photo.src} alt="Galerie Sauce" fill className="object-cover" sizes="(max-width: 768px) 70vw, 24vw" />
        </div>
      </div>
    </Reveal>
  );
}

export function CursorTiltGallery() {

  return (
    <section className="overflow-hidden px-2 py-20 md:px-6">
      <div className="mx-auto grid max-w-[1240px] gap-4 md:grid-cols-4 md:gap-6">
        {galleryPhotos.map((photo) => (
          <TiltCard key={photo.src} photo={photo} />
        ))}
      </div>
    </section>
  );
}
