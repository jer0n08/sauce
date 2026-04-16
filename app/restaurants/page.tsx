import restaurantsDataJson from "@/data/restaurants.json";
import { RestaurantsList } from "@/components/restaurants/restaurants-list";
import { MenuBannerParallax } from "@/components/menu-banner-parallax";
import type { RestaurantData } from "@/types/restaurants";

const restaurantsData = restaurantsDataJson as RestaurantData;

export default function RestaurantsPage() {
  return (
    <div className="bg-[var(--background)]">
      <MenuBannerParallax
        title={restaurantsData.hero.title}
        imageSrc={restaurantsData.hero.imageSrc}
        imageAlt={restaurantsData.hero.imageAlt}
        imageClassName="object-[center_58%] md:object-[center_48%]"
        sectionClassName="h-[40svh]"
      />

      <section className="container-shell space-y-8 px-1 py-8 ">
 
        <RestaurantsList restaurants={restaurantsData.restaurants} />
      </section>
    </div>
  );
}
