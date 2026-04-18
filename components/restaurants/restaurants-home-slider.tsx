"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import { RestaurantCard } from "@/components/restaurants/restaurant-card";
import type { Restaurant } from "@/types/restaurants";

type RestaurantsHomeSliderProps = {
  restaurants: Restaurant[];
};

export function RestaurantsHomeSlider({ restaurants }: RestaurantsHomeSliderProps) {
  const [orderPanelRestaurantId, setOrderPanelRestaurantId] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div className="-mr-10 overflow-hidden pb-4 pr-10 md:-mr-24 md:pr-24 lg:-mr-44 lg:pr-44" ref={emblaRef}>
      <div className="flex touch-pan-y gap-5 md:gap-7">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="min-w-0 flex-[0_0_82vw] md:flex-[0_0_22.5rem] lg:flex-[0_0_23rem]">
            <RestaurantCard
              restaurant={restaurant}
              isOrderPanelOpen={orderPanelRestaurantId === restaurant.id}
              onOpenOrderPanel={setOrderPanelRestaurantId}
              onCloseOrderPanel={() => setOrderPanelRestaurantId(null)}
              className="h-[25.5rem] w-full md:h-[28rem]"
              imageSizes="(max-width: 768px) 82vw, (max-width: 1024px) 22.5rem, 23rem"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
