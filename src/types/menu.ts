import { ID, Money, Timestamped } from './common';

export type MenuCategory = {
  id: ID;
  name: string;
  description?: string;
  imageUrl?: string;
  position: number;
};

export type MenuItemOption = {
  id: ID;
  name: string;
  priceDelta?: Money; // additional cost
};

export type MenuItem = Timestamped & {
  id: ID;
  name: string;
  description?: string;
  sku?: string;
  basePrice: Money;
  categoryId: ID;
  imageUrl?: string;
  isAvailable: boolean;
  options?: MenuItemOption[];
  tags?: string[];
  rating?: number; // optional 0..5 for display/sorting
};

// Combos and meal deals
export type Combo = {
  id: ID;
  name: string;
  description?: string;
  imageUrl?: string;
  // List of included items (names or short labels)
  includes: string[];
  // Total price in Money terms
  totalPrice: Money;
  // For quick filtering/display
  isVeg: boolean;
  // Optional rating 0..5
  rating?: number;
  tags?: string[];
};
