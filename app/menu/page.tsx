import { MenuBannerParallax } from "@/components/menu-banner-parallax";
import { CategoryNav } from "@/components/menu/category-nav";
import { CategorySection } from "@/components/menu/category-section";
import menuDataJson from "@/data/menu.json";
import type { MenuData } from "@/types/menu";

const menuData = menuDataJson as MenuData;

export default function MenuPage() {
  return (
    <div className="bg-[var(--background)]">
      <MenuBannerParallax
        title={menuData.hero.title}
        imageSrc={menuData.hero.imageSrc}
        imageAlt={menuData.hero.imageAlt}
        imageClassName="object-[center_62%] md:object-[center_50%]"
        sectionClassName="h-[40svh]"
      />

      <div className="container-shell px-1 py-10 md:py-14">
        <CategoryNav categories={menuData.categories.map(({ id, label }) => ({ id, label }))} />

        <div className="mt-10 space-y-12 md:space-y-16">
          {menuData.categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
