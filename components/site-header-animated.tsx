"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DeliveryPopup } from "@/components/delivery-popup";
import { RollingText } from "@/components/rolling-text";

type NavLink =
  | { label: string; href: string; action?: never }
  | { label: string; action: "delivery"; href?: never };

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { action: "delivery", label: "Livraison" },
  { href: "/#horaires-acces", label: "Horaires & accès" },
  { href: "/faq", label: "FAQ" },
];

function createTimeFormatter(timeZone: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone });
  } catch {
    return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }
}

const cityTimeFormatters = {
  paris: createTimeFormatter("Europe/Paris"),
  berlin: createTimeFormatter("Europe/Berlin"),
  istanbul: createTimeFormatter("Europe/Istanbul"),
};

function getCityTimes() {
  const now = new Date();
  return {
    paris: cityTimeFormatters.paris.format(now),
    berlin: cityTimeFormatters.berlin.format(now),
    istanbul: cityTimeFormatters.istanbul.format(now),
  };
}

const initialCityTimes = {
  paris: "--:--",
  berlin: "--:--",
  istanbul: "--:--",
};

function getMenuExpandedHeight() {
  const viewportHeight = window.innerHeight;
  if (window.innerWidth < 768) {
    return Math.max(260, viewportHeight - 40);
  }
  return Math.max(420, Math.min(viewportHeight - 40, 1080));
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.6 3v2.1c.5 1.2 1.6 2.1 2.9 2.4v2.5c-1.1-.1-2.1-.5-2.9-1.1v4a5.1 5.1 0 1 1-4.8-5.1v2.4a2.7 2.7 0 1 0 2.3 2.7V3h2.5Z"
      />
    </svg>
  );
}

export function SiteHeaderAnimated() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [cityTimes, setCityTimes] = useState(initialCityTimes);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const closeMenuImmediately = () => {
    menuTimelineRef.current?.pause(0);
    setIsOpen(false);
    setIsMenuVisible(false);
  };

  useLayoutEffect(() => {
    if (!menuPanelRef.current || !menuListRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const menuItemNodes = Array.from(menuPanelRef.current?.querySelectorAll<HTMLElement>(".site-menu-item") ?? []);

      gsap.set(menuPanelRef.current, {
        height: 64,
        borderRadius: 36,
      });
      gsap.set(menuItemNodes, {
        autoAlpha: 0,
        x: -24,
        force3D: true,
      });

      menuTimelineRef.current = gsap
        .timeline({
          paused: true,
          onReverseComplete: () => setIsMenuVisible(false),
        })
        .to(menuPanelRef.current, {
          height: () => getMenuExpandedHeight(),
          duration: 0.62,
          ease: "expo.out",
        })
        .to(
          menuItemNodes,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.42,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.2",
        );
    }, menuPanelRef);

    return () => {
      menuTimelineRef.current?.kill();
      menuTimelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMenuVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const timeline = menuTimelineRef.current;
    if (!timeline) {
      if (!isOpen) {
        setIsMenuVisible(false);
      }
      return;
    }

    if (isOpen) {
      requestAnimationFrame(() => {
        timeline.invalidate().timeScale(1).play(0);
      });
      return;
    }

    if (isMenuVisible) {
      timeline.timeScale(1.15).reverse();
    }
  }, [isOpen, isMenuVisible]);

  useEffect(() => {
    if (!isOpen || !menuPanelRef.current) {
      return;
    }

    const handleResize = () => {
      if (menuPanelRef.current) {
        gsap.set(menuPanelRef.current, { height: getMenuExpandedHeight() });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    const updateTimes = () => setCityTimes(getCityTimes());
    updateTimes();
    const intervalId = window.setInterval(updateTimes, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell relative py-5">
        <div className="pointer-events-auto relative z-50 flex h-16 items-center justify-between rounded-full bg-[var(--brand)] px-5 text-[var(--cream)] md:px-6">
          <Link href="/" className="display-font text-2xl leading-none" onClick={closeMenuImmediately}>
            <Image
              src="/assets/brand/logo-nav.svg"
              alt="Sauce"
              width={128}
              height={42}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="site-nav-drawer"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="touch-manipulation flex cursor-pointer items-center justify-center p-0"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className={`site-burger ${isOpen ? "is-open" : ""}`} aria-hidden="true">
              <span className="site-burger-line" />
              <span className="site-burger-line" />
              <span className="site-burger-line" />
            </span>
          </button>
        </div>

        <nav
          id="site-nav-drawer"
          className={`fixed inset-0 z-40 ${isMenuVisible ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={menuPanelRef}
            className="absolute left-1/2 top-[1.25rem] flex w-[min(1280px,calc(100%_-_2rem))] -translate-x-1/2 overflow-hidden rounded-[2.25rem] bg-[var(--brand)] text-[var(--cream)] shadow-[0_30px_70px_rgba(66,24,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="menu-scroll h-full w-full overflow-y-auto overscroll-contain">
              <div className="flex min-h-full flex-col items-center px-5 pb-8 pt-8 md:pt-10">
                <ul ref={menuListRef} className="space-y-4 text-center pt-24">
                  {navLinks.map((link) => (
                    <li key={link.label} className="site-menu-item">
                      {link.action === "delivery" ? (
                        <button
                          type="button"
                          className="site-menu-link rolling-btn brand-font block w-full cursor-pointer px-2 py-1 text-4xl uppercase leading-none tracking-[0.02em] text-[var(--cream)] transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:4px_4px_0_#772C00] md:text-6xl lg:text-7xl xl:text-7xl"
                          onClick={() => {
                            setIsOpen(false);
                            setIsDeliveryOpen(true);
                          }}
                        >
                          <RollingText text={link.label} />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="site-menu-link rolling-btn brand-font block cursor-pointer px-2 py-1 text-4xl uppercase leading-none tracking-[0.02em] text-[var(--cream)] transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:4px_4px_0_#772C00] md:text-6xl lg:text-7xl xl:text-7xl"
                          onClick={closeMenuImmediately}
                        >
                          <RollingText text={link.label} />
                        </Link>
                      )}
                    </li>
                  ))}

                  <li className="site-menu-item mt-2 flex items-center justify-center gap-4 md:mt-3">
                    <a
                      href="https://www.instagram.com/sauce.berliner"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="inline-flex items-center justify-center text-[var(--cream)] transition-[transform,color] duration-300 hover:scale-110 hover:text-white"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href="https://www.tiktok.com/@sauce.berliner"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="TikTok"
                      className="inline-flex items-center justify-center text-[var(--cream)] transition-[transform,color] duration-300 hover:scale-110 hover:text-white"
                    >
                      <TikTokIcon />
                    </a>
                  </li>
                </ul>

                <div className="mt-auto w-[min(560px,92%)] pt-6">
                  <div className="grid grid-cols-3 gap-2 text-center uppercase text-[var(--cream)]">
                    <div className="site-menu-item px-2 py-2">
                      <p className="inline-flex items-center gap-1 text-[10px] tracking-[0.08em] text-[var(--cream)]/80 md:text-xs">
                        <Image src="/assets/images/paris.png" alt="" width={14} height={14} aria-hidden="true" />
                        <span>Paris</span>
                      </p>
                      <p className="brand-font text-2xl leading-none md:text-3xl">{cityTimes.paris}</p>
                    </div>
                    <div className="site-menu-item px-2 py-2">
                      <p className="inline-flex items-center gap-1 text-[10px] tracking-[0.08em] text-[var(--cream)]/80 md:text-xs">
                        <Image src="/assets/images/berlin.png" alt="" width={14} height={14} aria-hidden="true" />
                        <span>Berlin</span>
                      </p>
                      <p className="brand-font text-2xl leading-none md:text-3xl">{cityTimes.berlin}</p>
                    </div>
                    <div className="site-menu-item px-2 py-2">
                      <p className="inline-flex items-center gap-1 text-[10px] tracking-[0.08em] text-[var(--cream)]/80 md:text-xs">
                        <Image src="/assets/images/instabul.png" alt="" width={14} height={14} aria-hidden="true" />
                        <span>Istanbul</span>
                      </p>
                      <p className="brand-font text-2xl leading-none md:text-3xl">{cityTimes.istanbul}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <DeliveryPopup isOpen={isDeliveryOpen} onClose={() => setIsDeliveryOpen(false)} />
      </div>
    </header>
  );
}
