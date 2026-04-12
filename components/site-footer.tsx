import Link from "next/link";
import Image from "next/image";
import { RollingText } from "@/components/rolling-text";

const footerNavLinks = [
  { label: "Accueil", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Livraison", href: "https://www.ubereats.com/fr", external: true },
  { label: "Horaires & accès", href: "/#horaires-acces" },
  { label: "FAQ", href: "/faq" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.6 3v2.1c.5 1.2 1.6 2.1 2.9 2.4v2.5c-1.1-.1-2.1-.5-2.9-1.1v4a5.1 5.1 0 1 1-4.8-5.1v2.4a2.7 2.7 0 1 0 2.3 2.7V3h2.5Z"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--brand)] px-4 py-14 text-center text-[var(--cream)]">
      <div className="container-shell">
        <div className="mx-auto w-fit">
          <Image src="/assets/brand/logo-nav.svg" alt="Sauce" width={160} height={52} className="h-12 w-auto" />
        </div>
        <nav className="mt-5 flex flex-col gap-2 text-3xl uppercase leading-none">
          {footerNavLinks.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rolling-btn brand-font inline-block tracking-[0.02em] transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:4px_4px_0_#772C00]"
              >
                <RollingText text={item.label} />
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="rolling-btn brand-font inline-block tracking-[0.02em] transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:4px_4px_0_#772C00]"
              >
                <RollingText text={item.label} />
              </Link>
            ),
          )}

          <div className="mt-2 inline-flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/sauce.berliner"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center text-[var(--cream)] transition-colors duration-300 hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@sauce.berliner"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="inline-flex items-center justify-center text-[var(--cream)] transition-colors duration-300 hover:text-white"
            >
              <TikTokIcon />
            </a>
          </div>
        </nav>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.15em] text-[var(--cream)]/90">
          <Link href="/politique-confidentialite">Politique de confidentialite</Link>
          <Link href="/mentions-legales">Mentions legales</Link>
        </div>
        <p className="mt-8 text-xs text-[var(--cream)]/80">2026 Sauce. Tous droits réservés</p>
        <p className="mt-2 text-xs tracking-[0.12em] text-[var(--cream)]/70">
          Design & dev par{" "}
          <a href="https://jer0n.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-white">
            jer0n
          </a>
        </p>
      </div>
    </footer>
  );
}
