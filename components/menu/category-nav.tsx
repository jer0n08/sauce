"use client";

import { RollingText } from "@/components/rolling-text";
import type { MenuCategoryId } from "@/types/menu";

type CategoryLink = {
  id: MenuCategoryId;
  label: string;
};

type CategoryNavProps = {
  categories: CategoryLink[];
};

export function CategoryNav({ categories }: CategoryNavProps) {
  const handleScrollTo = (categoryId: MenuCategoryId) => {
    const target = document.getElementById(categoryId);
    if (!target) {
      return;
    }

    const offset = window.innerWidth < 768 ? 112 : 128;
    const absoluteY = target.getBoundingClientRect().top + window.scrollY - offset;
    const targetY = Math.max(0, absoluteY);

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <nav aria-label="Categories du menu" className="mx-auto max-w-5xl px-1">
      <ul className="flex flex-wrap items-center justify-center gap-2 pb-1 md:gap-3">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              className="commander-btn rolling-btn brand-font cursor-pointer rounded-xl border-2 border-[#A74C17] bg-white px-3.5 py-1.5 text-xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17] md:text-2xl"
              onClick={() => handleScrollTo(category.id)}
            >
              <RollingText text={category.label} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
