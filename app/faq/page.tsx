import { BannerParallax } from "@/components/banner-parallax";
const faqs = [
  {
    question: "Quels sont vos horaires ?",
    answer: "Nous sommes ouverts tous les jours. Retrouvez le detail dans la section Horaires & acces.",
  },
  {
    question: "Peut-on commander en livraison ?",
    answer: "Oui, via Uber Eats et Deliveroo selon votre zone.",
  },
  {
    question: "Y a-t-il des options vegetariennes ?",
    answer: "Oui, nous proposons des options adaptees au menu.",
  },
  {
    question: "Ou se situe le restaurant ?",
    answer: "57 Rue du Faubourg Montmartre, 75009 Paris.",
  },
  {
    question: "Comment connaitre les allergenes ?",
    answer: "Demandez a l'equipe sur place avant de commander.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-[var(--background)]">
      <BannerParallax
        title="FAQ"
        imageSrc="/assets/images/menu-banner.png"
        imageAlt="Comptoir et equipe Sauce"
        imageClassName="object-[center_56%] md:object-[center_45%]"
        sectionClassName="h-[40svh]"
      />

      <section className="container-shell px-1 py-10 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="brand-font text-5xl uppercase leading-none text-[var(--brand)] md:text-7xl">Questions frequentes</h2>
        </div>

        <div className="mx-auto mt-8 max-w-4xl space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group surface-card rounded-2xl border-2 border-[var(--brand)]/20 p-4 transition-colors open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <span className="display-font text-2xl uppercase leading-none text-[var(--brand)] md:text-3xl">{item.question}</span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand)] bg-[var(--cream)] text-xl leading-none text-[var(--brand)] transition-transform duration-250 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="paragraph-text mt-3 text-sm leading-relaxed md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
