import Image from "next/image";
import Link from "next/link";
import { MenuBannerParallax } from "@/components/menu-banner-parallax";
import { RollingText } from "@/components/rolling-text";

const processSteps = [
  {
    title: "Prise de contact",
    description: "Vous envoyez votre candidature avec vos informations clefs et votre zone cible.",
  },
  {
    title: "Etude du projet",
    description: "Nous analysons votre profil, votre budget et la viabilite du secteur choisi.",
  },
  {
    title: "Validation",
    description: "Nous construisons le plan d'ouverture: local, formation, planning et lancement.",
  },
  {
    title: "Ouverture",
    description: "Vous lancez votre restaurant avec un accompagnement operationnel et marketing.",
  },
];

const supportHighlights = [
  "Accompagnement terrain avant et apres ouverture",
  "Formation equipe cuisine et service",
  "Supports marketing locaux et digitaux",
  "Pilotage qualite et performance continue",
];

export default function FranchisePage() {
  return (
    <div className="bg-[var(--background)]">
      <MenuBannerParallax
        title="Franchise"
        imageSrc="/assets/images/658440595_17889865677446344_2492821235290666953_n.jpeg"
        imageAlt="Equipe Sauce dans un restaurant"
        imageClassName="object-[center_40%]"
        sectionClassName="h-[42svh]"
      />

      <section className="container-shell px-1 py-10 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="brand-font text-5xl uppercase leading-none text-[var(--brand)] md:text-7xl">Developpons SAUCE ensemble</h2>
          <p className="paragraph-text mt-4 text-sm leading-relaxed md:text-base">
            Nous recherchons des partenaires engages pour ouvrir de nouvelles adresses SAUCE en France. Notre modele
            combine identite forte, execution rapide et accompagnement serre pour des ouvertures solides.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="surface-card rounded-3xl border-2 border-[var(--brand)]/20 p-5 text-center">
            <p className="brand-font text-5xl leading-none text-[var(--brand)] md:text-6xl">4</p>
            <p className="display-font mt-2 text-2xl uppercase text-[var(--brand)]">Piliers</p>
            <p className="paragraph-text mt-2 text-sm leading-relaxed">Produit, process, marque et accompagnement.</p>
          </article>
          <article className="surface-card rounded-3xl border-2 border-[var(--brand)]/20 p-5 text-center">
            <p className="brand-font text-5xl leading-none text-[var(--brand)] md:text-6xl">360</p>
            <p className="display-font mt-2 text-2xl uppercase text-[var(--brand)]">Support</p>
            <p className="paragraph-text mt-2 text-sm leading-relaxed">Suivi de la pre-ouverture jusqu'au rythme de croisiere.</p>
          </article>
          <article className="surface-card rounded-3xl border-2 border-[var(--brand)]/20 p-5 text-center">
            <p className="brand-font text-5xl leading-none text-[var(--brand)] md:text-6xl">1</p>
            <p className="display-font mt-2 text-2xl uppercase text-[var(--brand)]">Marque</p>
            <p className="paragraph-text mt-2 text-sm leading-relaxed">Une image forte et une experience client claire.</p>
          </article>
        </div>
      </section>

      <section className="container-shell grid gap-6 px-1 pb-12 md:grid-cols-[1.05fr_0.95fr] md:pb-14">
        <article className="relative min-h-[420px] overflow-hidden rounded-[32px] border-[5px] border-[var(--brand)] bg-[var(--cream)] !shadow-[8px_8px_0_#AF9A72]">
          <Image
            src="/assets/images/hf_20260407_110616_70860d9a-2596-429f-ba27-122cc762b314.png"
            alt="Kebab Sauce pret a etre servi"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 92vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15" />
          <div className="absolute inset-x-5 bottom-5">
            <h3 className="brand-font inline-block bg-[var(--brand)] px-2 py-1 text-4xl uppercase leading-none text-white md:text-5xl">
              Concept rentable
            </h3>
            <p className="paragraph-text mt-3 max-w-md text-sm leading-relaxed text-white md:text-base">
              Une offre lisible, un flux operationnel optimise et un format pense pour la salle comme la livraison.
            </p>
          </div>
        </article>

        <article className="surface-card rounded-[32px] border-2 border-[var(--brand)]/20 p-6 md:p-7">
          <h3 className="brand-font text-4xl uppercase leading-none text-[var(--brand)] md:text-5xl">Notre accompagnement</h3>
          <ul className="mt-5 space-y-3">
            {supportHighlights.map((item) => (
              <li key={item} className="paragraph-text flex items-start gap-3 text-sm leading-relaxed md:text-base">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              href="/restaurants"
              className="commander-btn rolling-btn brand-font inline-block rounded-xl border-2 border-[#A74C17] bg-white px-4 py-2 text-2xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17]"
            >
              <RollingText text="Voir nos restos" />
            </Link>
          </div>
        </article>
      </section>

      <section className="container-shell px-1 pb-12 md:pb-14">
        <article className="surface-card rounded-[32px] border-2 border-[var(--brand)]/20 p-6 md:p-8">
          <h3 className="brand-font text-4xl uppercase leading-none text-[var(--brand)] md:text-5xl">Processus franchise</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border-2 border-[var(--brand)]/20 bg-white/70 p-4">
                <p className="brand-font text-2xl leading-none text-[var(--brand)]">0{index + 1}</p>
                <p className="display-font mt-2 text-2xl uppercase leading-none text-[var(--brand)]">{step.title}</p>
                <p className="paragraph-text mt-2 text-sm leading-relaxed md:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="contact-franchise" className="px-6 pb-16 md:pb-20">
        <article className="container-shell rounded-[36px] border-[6px] border-[var(--brand)] bg-[var(--cream)] p-6 !shadow-[8px_8px_0_#AF9A72] md:p-8">
          <div className="mx-auto max-w-4xl">
            <h3 className="brand-font text-5xl uppercase leading-none text-[var(--brand)] md:text-7xl">Contact franchise</h3>
            <p className="paragraph-text mt-3 text-sm leading-relaxed md:text-base">
              Remplissez ce formulaire et notre equipe reviendra vers vous rapidement pour un premier echange.
            </p>

            <form className="mt-6 grid gap-4" action="mailto:franchise@sauceberlinerkebab.fr" method="post" encType="text/plain">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Prenom</span>
                  <input
                    type="text"
                    name="prenom"
                    required
                    className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                    placeholder="Ex: Sami"
                  />
                </label>

                <label className="space-y-1">
                  <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Nom</span>
                  <input
                    type="text"
                    name="nom"
                    required
                    className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                    placeholder="Ex: Benali"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                    placeholder="nom@email.com"
                  />
                </label>

                <label className="space-y-1">
                  <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Telephone</span>
                  <input
                    type="tel"
                    name="telephone"
                    required
                    className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                    placeholder="06 00 00 00 00"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Ville cible</span>
                  <input
                    type="text"
                    name="ville"
                    required
                    className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                    placeholder="Ex: Lyon"
                  />
                </label>

                <label className="space-y-1">
                  <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Budget estime</span>
                  <select
                    name="budget"
                    defaultValue=""
                    required
                    className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                  >
                    <option value="" disabled>
                      Selectionner
                    </option>
                    <option value="150-250k">150k - 250k</option>
                    <option value="250-400k">250k - 400k</option>
                    <option value="400k+">400k et +</option>
                  </select>
                </label>
              </div>

              <label className="space-y-1">
                <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Experience en restauration</span>
                <textarea
                  name="experience"
                  rows={3}
                  className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                  placeholder="Parlez-nous de votre experience operationnelle ou manageriale."
                />
              </label>

              <label className="space-y-1">
                <span className="paragraph-text text-xs font-semibold uppercase tracking-[0.08em]">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border-2 border-[var(--brand)]/40 bg-white px-4 py-3 text-sm text-[var(--paragraph)] outline-none transition-colors focus:border-[var(--brand)]"
                  placeholder="Dites-nous ce que vous recherchez, votre timing et vos questions."
                />
              </label>

              <label className="paragraph-text mt-1 flex items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  name="consentement"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[var(--brand)] text-[var(--brand)] accent-[var(--brand)]"
                />
                <span>J'accepte d'etre contacte(e) dans le cadre de ma demande franchise.</span>
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="commander-btn rolling-btn brand-font inline-block rounded-xl border-2 border-[#A74C17] bg-white px-5 py-3 text-3xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17]"
                >
                  <RollingText text="Envoyer" />
                </button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}
