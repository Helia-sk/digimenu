export interface MenuItem {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  ingredients?: string[];
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface Menu {
  categories: MenuCategory[];
}