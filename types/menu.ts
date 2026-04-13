export type MenuCategoryId = "berliner" | "durums" | "assiettes" | "frites";

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
  description?: string;
  items: MenuItem[];
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
