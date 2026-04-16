export type WeekdayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type OpeningRange = [string, string];

export type OpeningHours = Record<WeekdayKey, OpeningRange[]>;

export type RestaurantLocation = "paris" | "ile-de-france" | "bordeaux" | "marseille" | "nice";

export type DeliveryLinks = {
  uberEats: string;
  deliveroo: string;
};

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  bannerImage: string;
  bannerAlt: string;
  locations: RestaurantLocation[];
  timeZone: string;
  openingHours: OpeningHours;
  deliveryLinks: DeliveryLinks;
};

export type RestaurantsHero = {
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export type RestaurantData = {
  hero: RestaurantsHero;
  restaurants: Restaurant[];
};
