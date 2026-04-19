"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { RestaurantOpenStatus } from "@/components/restaurants/restaurant-open-status";
import { RollingText } from "@/components/rolling-text";
import { XIcon } from "@/components/ui/x";
import type { Restaurant } from "@/types/restaurants";

type RestaurantCardProps = {
  restaurant: Restaurant;
  isOrderPanelOpen: boolean;
  onOpenOrderPanel: (restaurantId: string) => void;
  onCloseOrderPanel: () => void;
  className?: string;
  imageSizes?: string;
};

function getGoogleMapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function RestaurantCard({
  restaurant,
  isOrderPanelOpen,
  onOpenOrderPanel,
  onCloseOrderPanel,
  className,
  imageSizes = "(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 30vw",
}: RestaurantCardProps) {
  return (
    <article
      className={`relative isolate h-[27rem] w-full overflow-hidden rounded-[36px] border-[6px] border-[var(--brand)] bg-[var(--cream)] text-left text-[var(--paragraph)] !shadow-[8px_8px_0_0_#AF9A72] md:h-[30rem] ${className ?? ""}`}
    >
      <div className="group relative flex h-full flex-col">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
          <Image
            src={restaurant.bannerImage}
            alt={restaurant.bannerAlt}
            fill
            className="pointer-events-none select-none object-cover transition-transform duration-500 will-change-transform motion-safe:group-hover:scale-105"
            sizes={imageSizes}
            draggable={false}
          />
          <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-black/72 via-black/20 to-transparent" aria-hidden="true" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-4 md:p-5 pointer-events-none select-none">
          <div className="flex flex-col items-center text-center">
            <h2 className="brand-font inline-block text-3xl uppercase leading-[1.2] text-white md:text-3xl md:leading-[1.08]">
              <span className="box-decoration-clone bg-[var(--brand)] px-2 py-1">{restaurant.name}</span>
            </h2>
            <a
              href={getGoogleMapsUrl(restaurant.address)}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto mt-2 text-sm leading-tight text-white decoration-white/65 underline-offset-2 transition-opacity duration-250 hover:underline hover:opacity-85 md:text-sm"
            >
              {restaurant.address}
            </a>
            <div className="mt-3 flex justify-center">
              <RestaurantOpenStatus openingHours={restaurant.openingHours} timeZone={restaurant.timeZone} />
            </div>
          </div>

          <div className="mt-auto flex flex-col items-center gap-3 pt-4 pointer-events-auto">
            <a
              href={getGoogleMapsUrl(restaurant.address)}
              target="_blank"
              rel="noreferrer"
              className="commander-btn-compact rolling-btn brand-font inline-flex w-fit cursor-pointer rounded-lg border-2 border-[var(--brand)] bg-white px-5 py-2 text-2xl uppercase leading-none text-[var(--brand)] transition-colors duration-250"
            >
              <RollingText text="Sur place" />
            </a>

            <button
              type="button"
              onClick={() => onOpenOrderPanel(restaurant.id)}
              className="commander-btn-compact rolling-btn brand-font inline-flex w-fit cursor-pointer rounded-lg border-2 border-[var(--brand)] bg-white px-5 py-2 text-2xl uppercase leading-none text-[var(--brand)] transition-colors duration-250"
            >
              <RollingText text="Livraison / à Emporter" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 z-20 flex items-center justify-center bg-[#421800]/45 p-4 transition-opacity duration-300 ${
          isOrderPanelOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOrderPanelOpen}
        onClick={onCloseOrderPanel}
      >
        <div
          className="relative w-full max-w-[17.5rem] rounded-[24px] border-2 border-[var(--brand)] bg-[var(--cream)] px-3.5 pb-3.5 pt-4 shadow-[5px_5px_0_#A74C17]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onCloseOrderPanel}
            aria-label="Fermer"
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--brand)] bg-white text-[var(--brand)] transition-colors duration-250 hover:bg-[var(--brand)] hover:text-white"
          >
            <XIcon size={18} className="shrink-0" aria-hidden="true" />
          </button>

          <p className="brand-font text-2xl uppercase leading-none text-[var(--brand)] md:text-3xl">Commander</p>
          <p className="paragraph-text mt-1 text-xs uppercase tracking-[0.08em] md:text-sm">Choisis ta plateforme</p>
          <div className="mt-2.5 grid gap-2">
            <a
              href={restaurant.deliveryLinks.uberEats}
              target="_blank"
              rel="noreferrer"
              className="rolling-btn flex items-center justify-between gap-2.5 rounded-xl border-2 border-[var(--brand)] bg-white px-3.5 py-2.5 text-left text-xl leading-none text-[#162328] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="inline-flex items-center gap-0">
                <RollingText text="Uber" className="[&>.rolling-text-row-back]:text-[#162328]" />
                <RollingText
                  text="Eats"
                  className="[&_.rolling-char]:font-medium [&>.rolling-text-row-front]:text-[#162328] [&>.rolling-text-row-back]:text-[#3FC060]"
                />
              </span>
              <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
            <a
              href={restaurant.deliveryLinks.deliveroo}
              target="_blank"
              rel="noreferrer"
              className="rolling-btn flex items-center justify-between gap-2.5 rounded-xl border-2 border-[var(--brand)] bg-white px-3.5 py-2.5 text-left text-xl font-bold leading-none text-[#00CDBC] transition-transform duration-300 hover:scale-[1.02]"
            >
              <RollingText
                text="deliveroo"
                className="[&_.rolling-char]:font-bold [&>.rolling-text-row-front]:text-[#00CDBC] [&>.rolling-text-row-back]:text-[#00CDBC]"
              />
              <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
