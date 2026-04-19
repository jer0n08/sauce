import { BannerParallax } from "@/components/banner-parallax";
import { CategorySection } from "@/components/menu/category-section";
import menuDataJson from "@/data/menu.json";
import type { MenuData } from "@/types/menu";

const menuData = menuDataJson as MenuData;

export default function MenuPage() {
  return (
    <div className="bg-[var(--background)]">
      <BannerParallax
        title={menuData.hero.title}
        imageSrc={menuData.hero.imageSrc}
        imageAlt={menuData.hero.imageAlt}
        imageClassName="object-[center_62%] md:object-[center_50%]"
        sectionClassName="h-[40svh]"
      />

      <div className="container-shell px-1 py-10 md:py-14">
        <div className="space-y-12 md:space-y-16">
          {menuData.categories.map((category, index) => (
            <CategorySection key={category.id} category={category} order={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
