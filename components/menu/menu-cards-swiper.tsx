"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import type { MenuItem } from "@/types/menu";

type MenuCardsSwiperProps = {
  items: MenuItem[];
};

export function MenuCardsSwiper({ items }: MenuCardsSwiperProps) {
  return (
    <div className="mx-auto mt-6 w-full max-w-sm">
      <Swiper
        effect="cards"
        cardsEffect={{ slideShadows: false, perSlideOffset: 14 }}
        slidesPerView={1}
        rewind
        initialSlide={0}
        grabCursor
        pagination={{ clickable: true }}
        modules={[EffectCards, Pagination]}
        className="menu-cards-swiper !overflow-visible"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <MenuItemCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
