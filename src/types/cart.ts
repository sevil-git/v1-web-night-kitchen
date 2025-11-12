import { ID, Money } from './common';
import { MenuItem, MenuItemOption } from './menu';

export type CartLine = {
  lineId: ID;
  item: MenuItem;
  quantity: number;
  selectedOptions?: MenuItemOption[];
};

export type Cart = {
  lines: CartLine[];
  subtotal: Money;
  total: Money;
};
