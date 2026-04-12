const questions = [
  {
    q: "Quels sont vos horaires ?",
    a: "Lundi au dimanche, 11h30 - 23h00.",
  },
  {
    q: "Proposez-vous la livraison ?",
    a: "Oui, via les plateformes partenaires.",
  },
  {
    q: "Y a-t-il des options vegetarian ?",
    a: "Oui, plusieurs recettes sont disponibles.",
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold md:text-5xl">FAQ</h1>
      </header>

      <section className="space-y-4">
        {questions.map((item) => (
          <details key={item.q} className="surface-card rounded-2xl p-5">
            <summary className="cursor-pointer list-none font-medium">{item.q}</summary>
            <p className="mt-3 text-black/70">{item.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
