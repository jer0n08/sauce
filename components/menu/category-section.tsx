import type { MenuCategory } from "@/types/menu";
import { MenuItemCard } from "@/components/menu/menu-item-card";

type CategorySectionProps = {
  category: MenuCategory;
};

export function CategorySection({ category }: CategorySectionProps) {
  return (
    <section id={category.id} className="scroll-mt-32 text-center md:scroll-mt-36">
      <header className="mx-auto max-w-3xl">
        <h2 className="brand-font text-5xl uppercase leading-none text-[var(--brand)] md:text-7xl">{category.label}</h2>
        {category.description ? <p className="paragraph-text mt-2 text-sm md:text-base">{category.description}</p> : null}
      </header>

      <div className="mt-6 grid justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
