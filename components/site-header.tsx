"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RollingText } from "@/components/rolling-text";

type NavLink = { label: string; href: string };

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/franchise", label: "Franchise" },
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

const initialCityTimes = {
  paris: "--:--",
  berlin: "--:--",
  istanbul: "--:--",
};

function getCityTimes() {
  const now = new Date();
  return {
    paris: cityTimeFormatters.paris.format(now),
    berlin: cityTimeFormatters.berlin.format(now),
    istanbul: cityTimeFormatters.istanbul.format(now),
  };
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

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [cityTimes, setCityTimes] = useState(initialCityTimes);

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const updateTimes = () => setCityTimes(getCityTimes());
    updateTimes();
    const intervalId = window.setInterval(updateTimes, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell relative py-5">
        <div className="pointer-events-auto relative z-50 flex h-16 items-center justify-between rounded-full bg-[var(--brand)] px-5 text-[var(--cream)] md:px-6">
          <Link href="/" className="display-font text-2xl leading-none" onClick={handleLogoClick}>
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
            className="site-burger-trigger touch-manipulation flex cursor-pointer items-center justify-center p-0"
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
          aria-hidden={!isOpen}
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"}`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`absolute left-1/2 top-[1.25rem] flex max-h-[calc(100svh-2.5rem)] w-[min(1280px,calc(100%_-_2rem))] -translate-x-1/2 flex-col overflow-hidden rounded-[2.25rem] bg-[var(--brand)] text-[var(--cream)] shadow-[0_30px_70px_rgba(66,24,0,0.35)] transition-all duration-300 ease-out ${isOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-3 scale-[0.98] opacity-0"}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="menu-scroll h-full w-full overflow-y-auto overscroll-contain">
              <div className="flex min-h-full flex-col items-center px-5 pb-8 pt-8 md:pt-10">
                <ul className="space-y-4 pt-24 text-center">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rolling-btn brand-font inline-flex cursor-pointer px-2 py-1 text-3xl uppercase leading-none tracking-[0.02em] text-[var(--cream)] transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:4px_4px_0_#772C00] md:text-5xl lg:text-6xl xl:text-6xl"
                        onClick={() => setIsOpen(false)}
                      >
                        <RollingText text={link.label} />
                        <RollingText text="." className="round-dot-font -translate-y-[0.03em]" />
                      </Link>
                    </li>
                  ))}

                  <li className="mt-2 flex items-center justify-center gap-4 md:mt-3">
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
                    <div className="px-2 py-2">
                      <p className="inline-flex items-center gap-1 text-[10px] tracking-[0.08em] text-[var(--cream)]/80 md:text-xs">
                        <Image src="/assets/images/paris.png" alt="" width={14} height={14} aria-hidden="true" />
                        <span>Paris</span>
                      </p>
                      <p className="brand-font text-2xl leading-none md:text-3xl">{cityTimes.paris}</p>
                    </div>
                    <div className="px-2 py-2">
                      <p className="inline-flex items-center gap-1 text-[10px] tracking-[0.08em] text-[var(--cream)]/80 md:text-xs">
                        <Image src="/assets/images/berlin.png" alt="" width={14} height={14} aria-hidden="true" />
                        <span>Berlin</span>
                      </p>
                      <p className="brand-font text-2xl leading-none md:text-3xl">{cityTimes.berlin}</p>
                    </div>
                    <div className="px-2 py-2">
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
      </div>
    </header>
  );
}
