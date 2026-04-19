"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RestaurantCard } from "@/components/restaurants/restaurant-card";
import type { Restaurant } from "@/types/restaurants";

type RestaurantsHomeSliderProps = {
  restaurants: Restaurant[];
};

export function RestaurantsHomeSlider({ restaurants }: RestaurantsHomeSliderProps) {
  const [orderPanelRestaurantId, setOrderPanelRestaurantId] = useState<string | null>(null);

  return (
    <Swiper
      centeredSlides={false}
      slidesPerView="auto"
      slidesOffsetBefore={0}
      spaceBetween={20}
      className="!overflow-visible pb-4 md:[--swiper-slide-width:22.5rem] lg:[--swiper-slide-width:23rem]"
      breakpoints={{
        768: { spaceBetween: 28, slidesOffsetBefore: 0 },
      }}
    >
      {restaurants.map((restaurant) => (
        <SwiperSlide key={restaurant.id} className="!w-[82vw] md:!w-[var(--swiper-slide-width)]">
          <RestaurantCard
            restaurant={restaurant}
            isOrderPanelOpen={orderPanelRestaurantId === restaurant.id}
            onOpenOrderPanel={setOrderPanelRestaurantId}
            onCloseOrderPanel={() => setOrderPanelRestaurantId(null)}
            className="h-[25.5rem] w-full md:h-[28rem]"
            imageSizes="(max-width: 768px) 82vw, (max-width: 1024px) 22.5rem, 23rem"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
