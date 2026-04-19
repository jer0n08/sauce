import Image from "next/image";
import {
  Accessibility,
  AirVent,
  Bike,
  CircleHelp,
  Dog,
  MousePointerClick,
  ShoppingBag,
  Ticket,
  Umbrella,
  UtensilsCrossed,
} from "lucide-react";
import { notFound } from "next/navigation";
import { RestaurantOpenStatus } from "@/components/restaurants/restaurant-open-status";
import restaurantsDataJson from "@/data/restaurants.json";
import type { RestaurantData, WeekdayKey } from "@/types/restaurants";
import type { LucideIcon } from "lucide-react";

const restaurantsData = restaurantsDataJson as RestaurantData;

const weekdayOrder: WeekdayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const weekdayLabels: Record<WeekdayKey, string> = {
  mon: "Lun",
  tue: "Mar",
  wed: "Mer",
  thu: "Jeu",
  fri: "Ven",
  sat: "Sam",
  sun: "Dim",
};

const services: { label: string; icon: LucideIcon }[] = [
  { label: "Sur place", icon: UtensilsCrossed },
  { label: "Vente à emporter", icon: ShoppingBag },
  { label: "Click & collect", icon: MousePointerClick },
  { label: "Livraison", icon: Bike },
  { label: "Climatisation", icon: AirVent },
  { label: "Titres restaurant", icon: Ticket },

];

function formatTimeLabel(value: string) {
  return value.replace(":", "h");
}

function formatRange(range?: [string, string]) {
  if (!range) {
    return "-";
  }

  return `${formatTimeLabel(range[0])} - ${formatTimeLabel(range[1])}`;
}

export default function ParisOperaRestaurantPage() {
  const restaurant = restaurantsData.restaurants.find((item) => item.id === "sauce-paris-opera");

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="bg-[var(--background)]">
      <section className="container-shell py-8 md:py-10">
        <div className="mt-18 rounded-[30px] py-4 md:py-6 border-5 border-[var(--brand)] bg-[var(--cream)] px-0 text-[var(--paragraph)] md:px-6 !shadow-[8px_8px_0_0_#AF9A72]">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_1.1fr]">
            <article className="relative hidden min-h-[320px] overflow-hidden rounded-[20px] bg-[var(--cream)] lg:block md:min-h-[520px]">
              <Image
                src={restaurant.bannerImage}
                alt={restaurant.bannerAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
              <div className="absolute left-3 top-3 z-10">
                <RestaurantOpenStatus openingHours={restaurant.openingHours} timeZone={restaurant.timeZone} />
              </div>
            </article>

            <article className="flex h-full flex-col rounded-[30px] px-4 md:px-6">
          <h1 className="brand-font text-5xl uppercase leading-[1] text-white md:text-7xl">
            <span className="box-decoration-clone inline bg-[var(--brand)] px-2 py-0.5">Sauce Paris Opera</span>
          </h1>

          <div className="relative mt-4 min-h-[260px] overflow-hidden rounded-[24px] lg:hidden">
            <Image src={restaurant.bannerImage} alt={restaurant.bannerAlt} fill className="object-cover" sizes="92vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
            <div className="absolute left-3 top-3 z-10">
              <RestaurantOpenStatus openingHours={restaurant.openingHours} timeZone={restaurant.timeZone} />
            </div>
          </div>

          <div className="mt-5 text-[var(--paragraph)]">
            <div className="mb-4">
              <h2 className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                <Image src="/assets/images/map.svg" alt="" width={18} height={18} aria-hidden="true" />
                <span className="pt-1">Adresse</span>
              </h2>
              <p className="paragraph-text mt-2 text-sm leading-relaxed md:text-base">{restaurant.address}</p>
            </div>

            <div className="mb-4">
              <h2 className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                <Image src="/assets/images/time.svg" alt="" width={23} height={23} aria-hidden="true" />
                <span className="pt-1">Horaires</span>
              </h2>
              <div className="mt-2 grid w-fit grid-cols-[auto_max-content_max-content] gap-x-3 gap-y-1 text-sm uppercase text-[var(--paragraph)] md:gap-x-6 md:text-base">
                {weekdayOrder.map((dayKey) => {
                  const ranges = restaurant.openingHours[dayKey] ?? [];

                  return (
                    <div key={dayKey} className="contents">
                      <span className="font-medium text-[var(--brand)]">{weekdayLabels[dayKey]}</span>
                      <span>{formatRange(ranges[0])}</span>
                      <span>{formatRange(ranges[1])}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="display-font inline-flex items-center gap-2 bg-[var(--brand)] px-2 text-3xl uppercase leading-none text-white">
                <Image src="/assets/images/phone.svg" alt="" width={23} height={23} aria-hidden="true" />
                <span className="pt-1">Téléphone</span>
              </h2>
              <p className="paragraph-text mt-2 text-sm md:text-base">07 43 50 00 25</p>
            </div>
          </div>

            </article>
          </div>

          <article className="mt-6 rounded-[24px] p-5 md:p-6">
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                target="_blank"
                rel="noreferrer"
                className="commander-btn rolling-btn brand-font inline-flex rounded-xl border-2 border-[var(--brand)] bg-white px-4 py-2 text-2xl uppercase leading-none text-[var(--brand)]"
              >
                Voir sur maps
              </a>
              <a
                href={restaurant.deliveryLinks.uberEats}
                target="_blank"
                rel="noreferrer"
                className="commander-btn rolling-btn brand-font inline-flex rounded-xl border-2 border-[var(--brand)] bg-white px-4 py-2 text-2xl uppercase leading-none text-[var(--brand)]"
              >
                Uber Eats
              </a>
              <a
                href={restaurant.deliveryLinks.deliveroo}
                target="_blank"
                rel="noreferrer"
                className="commander-btn rolling-btn brand-font inline-flex rounded-xl border-2 border-[var(--brand)] bg-white px-4 py-2 text-2xl uppercase leading-none text-[var(--brand)]"
              >
                Deliveroo
              </a>
            </div>
          </article>

          <article className="mt-8 rounded-[24px] p-5 md:p-6">
            <h2 className="brand-font text-4xl uppercase leading-none text-[var(--brand)] md:text-5xl">Services</h2>
            <ul className="paragraph-text mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-relaxed md:text-base">
              {services.map(({ label, icon: Icon }) => (
                <li key={label} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Icon className="h-4 w-4 shrink-0 text-[var(--brand)] md:h-5 md:w-5" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
