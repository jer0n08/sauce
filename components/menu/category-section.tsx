import type { MenuCategory } from "@/types/menu";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { MenuCardsSwiper } from "@/components/menu/menu-cards-swiper";

type CategorySectionProps = {
  category: MenuCategory;
  order: number;
};

export function CategorySection({ category, order }: CategorySectionProps) {
  const hasCards = category.items.length > 0;
  const useCardsSwiper = category.id === "berliner" && category.items.length === 3;
  const hasBadges = (category.badges?.length ?? 0) > 0;
  const isExtraCategory = category.id === "extra";

  return (
    <section id={category.id} className="scroll-mt-32 text-center md:scroll-mt-36">
      <header className="mx-auto max-w-3xl">
        <div className="inline-flex items-start gap-2">
          <span className="brand-font -rotate-6 bg-white px-2 py-1 text-xl leading-none text-[var(--brand)] md:text-2xl">{order}.</span>
          <h2
            className={`display-font inline-flex items-center bg-[var(--brand)] px-2 text-5xl uppercase leading-none text-white md:text-5xl ${
              order % 2 === 0 ? "rotate-2" : "-rotate-2"
            }`}
          >
            <span className="pt-1">{category.label}</span>
          </h2>
          {category.titlePrice ? (
            <span className="brand-font -rotate-6 bg-[var(--brand)] px-1 py-1 text-lg leading-none text-white md:text-xl">{category.titlePrice}</span>
          ) : null}
        </div>
        {category.description ? <p className="paragraph-text mt-2 text-sm md:text-base">{category.description}</p> : null}
      </header>

      {hasCards ? (
        useCardsSwiper ? (
          <MenuCardsSwiper items={category.items} />
        ) : (
          <div className="mt-6 grid justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:max-lg:[&>*:last-child:nth-child(odd)]:col-span-2 sm:max-lg:[&>*:last-child:nth-child(odd)]:justify-self-center">
            {category.items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )
      ) : null}

      {hasBadges ? (
        <ul
          className={`mt-6 flex items-center justify-center gap-2 md:mt-7 md:gap-3 ${
            isExtraCategory ? "flex-col" : "flex-wrap"
          }`}
        >
          {category.badges?.map((badge) => (
            <li key={badge.label} className="inline-flex items-center gap-2">
              <span className="brand-font bg-white px-2 py-1 text-2xl uppercase leading-none text-[var(--brand)] md:text-3xl">{badge.label}</span>
              {badge.price ? (
                <span className="brand-font -rotate-6 bg-[var(--brand)] px-1 py-1 text-lg leading-none text-white md:text-xl">{badge.price}</span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
