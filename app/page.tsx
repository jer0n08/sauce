import { Reveal } from "@/components/reveal";
import { RollingText } from "@/components/rolling-text";
import { HorairesActions } from "@/components/horaires-actions";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[var(--background)]">
      <Reveal className="relative isolate h-[86svh] min-h-[620px] overflow-hidden">
        <video
          className="h-full w-full object-cover"
          src="/assets/images/hero-showreel.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20" />

        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center px-6 text-center text-[var(--cream)] md:bottom-24">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="commander-btn rolling-btn brand-font inline-block rounded-xl border-2 border-[#A74C17] bg-white px-5 py-4 text-4xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17]"
            >
              <RollingText text="Menu" />
            </Link>
          </div>
        </div>
      </Reveal>

      <section className="px-6 py-24 text-center md:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <div className="mx-auto w-fit">
            <Image
              src="/assets/brand/logo-brown.svg"
              alt="Sauce"
              width={280}
              height={110}
              loading="eager"
              className="h-16 w-auto md:h-20"
            />
          </div>
          <h3 className="brand-font mt-2 text-3xl uppercase leading-none text-[var(--brand)] md:text-4xl">
            LE GOÛT BRUT DE BERLIN, REVISITÉ À NOTRE MANIÈRE
          </h3>
          <p className="paragraph-text mx-auto mt-7 max-w-2xl text-sm leading-relaxed md:text-base">
            Chez SAUCE, on ne fait pas un kebab classique. On fait un Berliner kebab,
            fait, grille et servi comme il faut. Pain croustillant, viande parfaitement
            grillee, legumes ultra-frais et sauces maison qui font toute la difference.
            Chaque kebab est prepare a la commande avec une seule obsession: le gout,
            le vrai.
          </p>
        </Reveal>
      </section>

      <section className="relative min-h-[520px] overflow-hidden md:min-h-[760px]">
        <Image
          src="/assets/images/hf_20260407_110616_70860d9a-2596-429f-ba27-122cc762b314.png"
          alt="Plateaux de kebab Sauce"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
        <Reveal className="relative z-10 flex min-h-[520px] items-center px-6 md:min-h-[760px]">
          <div className="container-shell">
            <h1 className="brand-font max-w-md text-6xl uppercase leading-[0.88] text-[var(--cream)] md:text-8xl">
              <span className="inline-block bg-[#A74C17] px-2 text-white">Kebab</span>
              <br />
              <span className="inline-block bg-[#A74C17] px-2 text-white">Berliner</span>
              <br />
              <span className="mt-6 inline-block bg-[#E7CEA0] px-2 text-[#A74C17]">Incontournable</span>
            </h1>
            <Link
              href="/menu"
              className="commander-btn rolling-btn brand-font mt-6 inline-block rounded-xl border-2 border-[#A74C17] bg-white px-5 py-4 text-4xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17]"
            >
              <RollingText text="Commander" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section id="horaires-acces" className="px-6 py-16">
        <Reveal className="container-shell">
          <h1 className="brand-font text-center text-6xl uppercase leading-none text-white [text-shadow:4px_4px_0_#a74c17] md:text-8xl">
            HORAIRES & ACCÈS
          </h1>
          <HorairesActions />

          <div className="mt-16 grid gap-8 md:grid-cols-[1fr_1.2fr]">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[30px]">
              <Image
                src="/assets/images/658440595_17889865677446344_2492821235290666953_n.jpeg"
                alt="Client degustant un kebab"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 33vw"
              />
            </div>

            <div className="text-[var(--brand)]">
              <div className="mb-4">
                <p className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <img src="/assets/images/map.svg" alt="" width={18} height={18} aria-hidden="true" />
                  <span className="pt-1">Adresse</span>
                </p>
                <p className="paragraph-text mt-2 text-base">57 Rue du Faubourg Montmartre, 75009 Paris</p>
              </div>

              <div className="mb-4">
                <p className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <Image src="/assets/images/time.svg" alt="" width={23} height={23} aria-hidden="true" />
                  <span className="pt-1">Horaires</span>
                </p>
                <div className="mt-2 grid w-fit grid-cols-[auto_max-content_max-content] gap-x-3 gap-y-1 text-base uppercase text-[var(--paragraph)] md:gap-x-6">
                  <span className="font-medium text-[var(--brand)]">Lun</span>
                  <span>11h30 - 14h30</span>
                  <span>18h00 - 23h00</span>
                  <span className="font-medium text-[var(--brand)]">Mar</span>
                  <span>11h30 - 15h30</span>
                  <span>18h00 - 23h00</span>
                  <span className="font-medium text-[var(--brand)]">Mer</span>
                  <span>11h30 - 15h30</span>
                  <span>18h00 - 2h00</span>
                  <span className="font-medium text-[var(--brand)]">Jeu</span>
                  <span>11h30 - 15h30</span>
                  <span>18h00 - 2h00</span>
                  <span className="font-medium text-[var(--brand)]">Ven</span>
                  <span>11h30 - 15h30</span>
                  <span>18h00 - 2h00</span>
                  <span className="font-medium text-[var(--brand)]">Sam</span>
                  <span>11h30 - 2h00</span>
                  <span>-</span>
                  <span className="font-medium text-[var(--brand)]">Dim</span>
                  <span>11h30 - 15h30</span>
                  <span>19h30 - 23h00</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <Image src="/assets/images/metro.svg" alt="" width={23} height={23} aria-hidden="true" />
                  <span className="pt-1">Accès</span>
                </p>
                <p className="paragraph-text mt-2 flex items-center gap-2 text-base">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f1a3cf] text-[11px] font-semibold text-[#5b1d3d]">
                    7
                  </span>
                  <span>Le Peletier</span>
                </p>
              </div>

              <div>
                <p className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <Image src="/assets/images/phone.svg" alt="" width={23} height={23} aria-hidden="true" />
                  <span className="pt-1">Téléphone</span>
                </p>
                <p className="paragraph-text mt-2 text-base">07 43 50 00 25</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/menu"
              className="commander-btn rolling-btn brand-font inline-block rounded-xl border-2 border-[#A74C17] bg-white px-5 py-4 text-4xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17]"
            >
              <RollingText text="Voir le menu" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="overflow-hidden px-2 py-20 md:px-6">
        <div className="mx-auto grid max-w-[1240px] gap-4 md:grid-cols-4 md:gap-6">
          {[
            { src: "/assets/images/hf_20260407_110616_70860d9a-2596-429f-ba27-122cc762b314.png", rotate: "rotate-12" },
            { src: "/assets/images/IMG_6933.PNG", rotate: "-rotate-[10deg]" },
            { src: "/assets/images/IMG_6930.PNG", rotate: "rotate-[9deg]" },
            { src: "/assets/images/658440595_17889865677446344_2492821235290666953_n.jpeg", rotate: "-rotate-[12deg]" },
          ].map((photo) => (
            <Reveal key={photo.src} className="flex justify-center">
              <div
                className={`${photo.rotate} relative aspect-[3/4] w-[85%] overflow-hidden rounded-2xl border-[20px] border-white shadow-[0_12px_20px_rgba(0,0,0,0.16)] md:w-full`}
              >
                <Image src={photo.src} alt="Galerie Sauce" fill className="object-cover" sizes="(max-width: 768px) 70vw, 24vw" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
