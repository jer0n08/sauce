"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const conceptSteps = [
  {
    title: "Berliner",
    options: ["Poulet", "Halloumi", "Veggie"],
  },
  {
    title: "Pain",
    options: ["Pain rond", "Galette"],
  },
  {
    title: "Sauce",
    options: ["Sauce a l'ail", "Blanche", "Harissa fumee", "Secret sauce"],
  },
  {
    title: "Extras",
    options: ["Frites", "Supplements"],
  },
];

export function ConceptStepsGsap() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector<HTMLElement>("[data-concept-title]");
      const steps = sectionRef.current?.querySelectorAll<HTMLElement>("[data-concept-step]");

      if (!title || !steps?.length) {
        return;
      }

      gsap.set(steps, { autoAlpha: 0, y: 56 });

      const titleTimeline = gsap.timeline({ paused: true }).fromTo(
        title,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" },
      );

      const titleObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }
          titleTimeline.play();
          titleObserver.disconnect();
        },
        { threshold: 0.2 },
      );
      titleObserver.observe(sectionRef.current as Element);
      observers.push(titleObserver);

      steps.forEach((stepNode, index) => {
        const stepObserver = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) {
              return;
            }

            const bigChars = stepNode.querySelectorAll<HTMLElement>("[data-concept-big-char]");
            const badges = stepNode.querySelectorAll<HTMLElement>("[data-concept-badge]");
            gsap.set(bigChars, { autoAlpha: 0, yPercent: 110 });
            gsap.set(badges, { autoAlpha: 0, x: -22 });

            const stepTimeline = gsap.timeline({ delay: index * 0.04 });
            stepTimeline
              .to(stepNode, {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              })
              .to(
                bigChars,
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 0.48,
                  ease: "power3.out",
                  stagger: 0.045,
                },
                "-=0.22",
              )
              .to(
                badges,
                {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.42,
                  ease: "power3.out",
                  stagger: 0.05,
                },
                "-=0.08",
              );

            stepObserver.disconnect();
          },
          { threshold: 0.45 },
        );

        stepObserver.observe(stepNode);
        observers.push(stepObserver);
      });
    }, sectionRef);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div ref={sectionRef} className="container-shell">
        <div data-concept-title className="text-center">
    
          <h2 className="brand-font mt-3 text-5xl uppercase leading-[0.82] text-[var(--brand)] md:text-[6.5rem]">
            Ton kebab,
            <br />
            ta compo<span className="round-dot-font">.</span>
          </h2>
      
        </div>

        <div className="mt-12 space-y-14 md:mt-16 md:space-y-20">
          {conceptSteps.map((step, index) => (
            <article
              key={step.title}
              data-concept-step
              className="text-center"
            >
              <h3
                aria-label={step.title}
                className={`brand-font mx-auto mt-2 flex w-fit items-end gap-[0.06em] bg-[var(--brand)] px-3 py-1 uppercase leading-[0.86] text-[clamp(4rem,14vw,10rem)] text-white ${
                  index % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                {Array.from(`${step.title}.`).map((char, charIndex, chars) => (
                  <span
                    key={`${step.title}-${charIndex}`}
                    data-concept-big-char
                    aria-hidden="true"
                    className={`inline-block ${
                      charIndex === chars.length - 1
                        ? "round-dot-font -translate-x-[2px] -translate-y-[2.8px]"
                        : char !== " " && charIndex < chars.length - 1
                          ? "-mr-[0.045em]"
                          : ""
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h3>

              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 md:mt-7 md:gap-3">
                {step.options.map((option) => (
                  <li
                    key={option}
                    data-concept-badge
                    className="brand-font bg-white px-2 py-1 text-2xl uppercase leading-none text-[var(--brand)] md:text-3xl"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
