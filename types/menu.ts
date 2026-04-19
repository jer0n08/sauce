export type MenuCategoryId = "berliner" | "pain" | "sauce" | "ingredient" | "extra" | "frites" | "soif";

export type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  alt?: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  titlePrice?: string;
  description?: string;
  items: MenuItem[];
  badges?: Array<{
    label: string;
    price?: string;
  }>;
};

export type MenuHero = {
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export type MenuData = {
  hero: MenuHero;
  categories: MenuCategory[];
};
