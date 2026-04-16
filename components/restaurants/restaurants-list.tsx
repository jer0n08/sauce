"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { RestaurantOpenStatus } from "@/components/restaurants/restaurant-open-status";
import { RollingText } from "@/components/rolling-text";
import { XIcon } from "@/components/ui/x";
import type { Restaurant, RestaurantLocation } from "@/types/restaurants";

type RestaurantsListProps = {
  restaurants: Restaurant[];
};

type RestaurantFilterKey = "all" | RestaurantLocation;

const filterOptions: { key: RestaurantFilterKey; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "paris", label: "Paris" },
  { key: "ile-de-france", label: "Ile-de-France" },
  { key: "bordeaux", label: "Bordeaux" },
  { key: "marseille", label: "Marseille" },
  { key: "nice", label: "Nice" },
];

function isRestaurantInFilter(restaurant: Restaurant, filter: RestaurantFilterKey) {
  if (filter === "all") {
    return true;
  }

  return restaurant.locations.includes(filter);
}

function getGoogleMapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function RestaurantsList({ restaurants }: RestaurantsListProps) {
  const [activeFilter, setActiveFilter] = useState<RestaurantFilterKey>("all");
  const [orderPanelRestaurantId, setOrderPanelRestaurantId] = useState<string | null>(null);
  const [isDraggingToggles, setIsDraggingToggles] = useState(false);
  const togglesScrollRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const didDragRef = useRef(false);

  const filteredRestaurants = useMemo(
    () => restaurants.filter((restaurant) => isRestaurantInFilter(restaurant, activeFilter)),
    [activeFilter, restaurants],
  );

  const closeOrderPanel = () => setOrderPanelRestaurantId(null);

  const handleTogglesMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !togglesScrollRef.current) {
      return;
    }

    setIsDraggingToggles(true);
    didDragRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = togglesScrollRef.current.scrollLeft;
  };

  const handleTogglesMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!isDraggingToggles || !togglesScrollRef.current) {
      return;
    }

    event.preventDefault();
    const distance = event.clientX - dragStartXRef.current;
    if (Math.abs(distance) > 4) {
      didDragRef.current = true;
    }
    togglesScrollRef.current.scrollLeft = dragStartScrollLeftRef.current - distance;
  };

  const stopTogglesDrag = () => {
    setIsDraggingToggles(false);
  };

  const handleTogglesClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!didDragRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
  };

  return (
    <div className="space-y-8">
      <div className=" pt-2 md:px-0 ">
        <div
          ref={togglesScrollRef}
          className={`overflow-x-auto pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDraggingToggles ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleTogglesMouseDown}
          onMouseMove={handleTogglesMouseMove}
          onMouseUp={stopTogglesDrag}
          onMouseLeave={stopTogglesDrag}
          onClickCapture={handleTogglesClickCapture}
        >
          <div className="mx-auto flex w-max snap-x snap-mandatory gap-3 pb-3 md:gap-2 md:pb-2">
            {filterOptions.map((filterOption) => {
              const isActive = activeFilter === filterOption.key;

              return (
                <button
                  key={filterOption.key}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filterOption.key);
                    closeOrderPanel();
                  }}
                  aria-pressed={isActive}
                  className={`commander-btn rolling-btn brand-font shrink-0 snap-start cursor-pointer rounded-xl border-2 px-3.5 py-2 text-xl uppercase leading-[1.05] transition-colors  ${
                    isActive
                      ? "border-[var(--brand)] bg-white text-[var(--brand)]"
                      : "border-[#A74C17] bg-[var(--cream)] text-[var(--brand)] hover:bg-white"
                  }`}
                >
                  <RollingText text={filterOption.label} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div key={activeFilter} className="animate-[page-fade-in_320ms_ease-out]">
        {filteredRestaurants.length === 0 ? (
          <div className="surface-card rounded-2xl p-5 text-sm uppercase tracking-[0.08em] text-[var(--paragraph)]/80">
            Aucun restaurant pour ce lieu.
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-center gap-10 md:gap-8 lg:gap-9  md:grid-cols-[repeat(2,minmax(0,50rem))] lg:grid-cols-[repeat(3,minmax(0,23rem))] xl:grid-cols-[repeat(3,minmax(0,23rem))]">
            {filteredRestaurants.map((restaurant) => {
              const isOrderPanelOpen = orderPanelRestaurantId === restaurant.id;

              return (
                <article
                  key={restaurant.id}
                  className="relative min-h-[27rem] w-full overflow-hidden rounded-[36px] border-[6px] border-[var(--brand)] bg-[var(--cream)] text-left text-[var(--paragraph)] !shadow-[8px_8px_0_0_#AF9A72] md:min-h-[30rem]"
                >
                <div className="group relative flex h-full flex-col">
                  <div className="absolute inset-0">
                    <Image
                      src={restaurant.bannerImage}
                      alt={restaurant.bannerAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/20 to-transparent" aria-hidden="true" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col p-4 md:p-5">
                    <div className="flex flex-col items-center text-center">
                      <h2 className="brand-font inline-block bg-[var(--brand)] px-2 py-1 text-3xl uppercase leading-none text-white md:text-3xl">
                        {restaurant.name}
                      </h2>
                      <p className="mt-2 text-sm leading-tight text-white md:text-sm">
                        {restaurant.address}
                      </p>
                      <div className="mt-3 flex justify-center">
                        <RestaurantOpenStatus openingHours={restaurant.openingHours} timeZone={restaurant.timeZone} />
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col items-center gap-3 pt-4">
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
                        onClick={() => setOrderPanelRestaurantId(restaurant.id)}
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
                  onClick={closeOrderPanel}
                >
                  <div
                    className="relative w-full max-w-[17.5rem] rounded-[24px] border-2 border-[var(--brand)] bg-[var(--cream)] px-3.5 pb-3.5 pt-4 shadow-[5px_5px_0_#A74C17]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={closeOrderPanel}
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
            })}
          </div>
        )}
      </div>
    </div>
  );
}
