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
};
