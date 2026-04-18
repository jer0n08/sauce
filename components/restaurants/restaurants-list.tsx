"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { RestaurantCard } from "@/components/restaurants/restaurant-card";
import { RollingText } from "@/components/rolling-text";
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
          className={`overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDraggingToggles ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleTogglesMouseDown}
          onMouseMove={handleTogglesMouseMove}
          onMouseUp={stopTogglesDrag}
          onMouseLeave={stopTogglesDrag}
          onClickCapture={handleTogglesClickCapture}
        >
          <div className="mx-auto flex w-max snap-x snap-mandatory gap-2 pb-1 md:gap-3">
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
                  className={`commander-btn rolling-btn brand-font shrink-0 snap-start cursor-pointer rounded-xl border-2 px-3.5 py-1.5 text-xl uppercase leading-none shadow-[4px_4px_0_#A74C17] transition-colors md:text-2xl ${
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
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isOrderPanelOpen={isOrderPanelOpen}
                  onOpenOrderPanel={setOrderPanelRestaurantId}
                  onCloseOrderPanel={closeOrderPanel}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
