import { ID, Money, Timestamped } from './common';
import type { MenuItemOption } from './menu';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export type OrderItem = {
  id: ID;
  menuItemId: ID;
  quantity: number;
  selectedOptions?: MenuItemOption[];
  notes?: string;
  unitPrice: Money; // price for single unit including options
  totalPrice: Money; // unitPrice * quantity
};

export type Order = Timestamped & {
  id: ID;
  userId?: ID; // guest orders may not have a user
  status: OrderStatus;
  items: OrderItem[];
  subtotal: Money;
  tax: Money;
  fees: Money;
  total: Money;
  deliveryAddressId?: ID;
  estimatedReadyTime?: string; // ISO
  placedAt: string; // ISO
};
