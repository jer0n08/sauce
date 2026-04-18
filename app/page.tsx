import { Reveal } from "@/components/reveal";
import { RollingText } from "@/components/rolling-text";
import { CursorTiltGallery } from "@/components/cursor-tilt-gallery";
import { ConceptStepsGsap } from "@/components/concept-steps-gsap";
import { HomeMaisonBanner } from "@/components/home-maison-banner";
import { RestaurantsHomeSlider } from "@/components/restaurants/restaurants-home-slider";
import restaurantsDataJson from "@/data/restaurants.json";
import type { RestaurantData } from "@/types/restaurants";
import Image from "next/image";
import Link from "next/link";

const restaurantsData = restaurantsDataJson as RestaurantData;

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-[var(--background)]">
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
            Chez SAUCE, on ne fait pas un kebab classique. On fait un Berliner Kebab,
            fait, grillé et servi comme il faut. Pain croustillant, viande parfaitement
            grillée, légumes ultra-frais et sauces maison qui font toute la difference.
            Chaque kebab est préparé à la commande avec une seule obsession: le goût,
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
            <h1 className="brand-font max-w-md text-5xl uppercase leading-[0.88] text-[var(--cream)] md:text-8xl">
              <span className="inline-block bg-[#A74C17] px-2 text-white">Kebab</span>
              <br />
              <span className="inline-block bg-[#A74C17] px-2 text-white">Berliner</span>
              <br />
              <span className="mt-6 inline-block bg-[#E7CEA0] px-2 text-[#A74C17]">Incontournable</span>
            </h1>
            <Link
              href="/menu"
              className="commander-btn rolling-btn brand-font mt-6 inline-block rounded-xl border-2 border-[#A74C17] bg-white px-5 py-4 text-3xl md:text-4xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17]"
            >
              <RollingText text="Commander" />
            </Link>
          </div>
        </Reveal>
      </section>

      <ConceptStepsGsap />

      <HomeMaisonBanner
        text="100% maison"
        imageSrc="/assets/images/hf_20260418_002637_c1cdcfb3-64e1-4f92-bbda-f014bcfa0ae9.png"
        imageAlt="Banniere Sauce 100% maison"
        tilt="left"
        bannerStart="top 84%"
        bannerEnd="top 56%"
        textStart="top 90%"
        textEnd="top 32%"
      />
      <HomeMaisonBanner
        className="mt-2 md:mt-4 lg:mt-5 "
        text="DE LA BROCHE"
        imageSrc="/assets/images/kebab-spit.png"
        imageAlt="Banniere Sauce viande grillee"
        tilt="right"
        bannerStart="top 100%"
        bannerEnd="top 50%"
        textStart="top 88%"
        textEnd="top 28%"
      />
      <HomeMaisonBanner
        className="mt-2 md:mt-4 lg:mt-5 "
        text="à la sauce"
        imageSrc="/assets/images/sauces-banner.png"
        imageAlt="Banniere Sauce sauces maison"
        tilt="left"
        bannerStart="top 80%"
        bannerEnd="top 30%"
        textStart="top 100%"
        textEnd="top 30%"
      />

      {/*
      <section id="horaires-acces" className="px-6 py-16">
        <Reveal className="container-shell">
          <h1 className="brand-font text-center text-6xl uppercase leading-none text-white [text-shadow:4px_4px_0_#a74c17] md:text-8xl">
            HORAIRES & ACCÈS
          </h1>
          <HorairesActions />

          <div className="mt-16 grid gap-20
           md:grid-cols-[1fr_1fr] flex flex-start">
            <div className="relative mx-auto md:mr-0 aspect-[3/4] w-full max-w-md overflow-hidden rounded-[30px]">
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
                <h3 className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <img src="/assets/images/map.svg" alt="" width={18} height={18} aria-hidden="true" />
                  <span className="pt-1">Adresse</span>
                </h3>
                <p className="paragraph-text mt-2 text-base">57 Rue du Faubourg Montmartre, 75009 Paris</p>
              </div>

              <div className="mb-4">
                <h3 className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <Image src="/assets/images/time.svg" alt="" width={23} height={23} aria-hidden="true" />
                  <span className="pt-1">Horaires</span>
                </h3>
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
                <h3 className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <Image src="/assets/images/metro.svg" alt="" width={23} height={23} aria-hidden="true" />
                  <span className="pt-1">Accès</span>
                </h3>
                <p className="paragraph-text mt-2 flex items-center gap-2 text-base">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f1a3cf] text-[11px] font-semibold text-[#5b1d3d]">
                    7
                  </span>
                  <span>Le Peletier</span>
                </p>
              </div>

              <div>
                <h3 className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                  <Image src="/assets/images/phone.svg" alt="" width={23} height={23} aria-hidden="true" />
                  <span className="pt-1">Téléphone</span>
                </h3>
                <p className="paragraph-text mt-2 text-base">07 43 50 00 25</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/menu"
              className="commander-btn rolling-btn brand-font inline-block rounded-xl border-2 border-[#A74C17] bg-white px-5 py-4 text-3xl md:text-4xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17]"
            >
              <RollingText text="Voir le menu" />
            </Link>
          </div>
        </Reveal>
      </section>
      */}

      <section className="px-6 py-14 md:py-20">
        <Reveal className="container-shell">
          <h2 className="brand-font text-center text-6xl uppercase leading-none text-white [text-shadow:4px_4px_0_#a74c17] md:text-8xl">
            Nos restaurants
          </h2>
          <div className="mt-8 md:mt-10">
            <RestaurantsHomeSlider restaurants={restaurantsData.restaurants} />
          </div>
        </Reveal>
      </section>

      <CursorTiltGallery />
    </div>
  );
}
