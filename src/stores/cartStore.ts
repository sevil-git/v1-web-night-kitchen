import { create } from 'zustand';
import type { Cart, CartLine } from '@/types/cart';
import type { MenuItem, MenuItemOption } from '@/types/menu';
import type { ID, Money } from '@/types/common';

function money(amount: number, currency = 'USD'): Money {
  return { amount: Math.round(amount), currency };
}

interface CartState extends Cart {
  addItem: (item: MenuItem, quantity?: number, selectedOptions?: MenuItemOption[]) => void;
  removeLine: (lineId: ID) => void;
  clear: () => void;
  setQuantity: (lineId: ID, quantity: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  subtotal: money(0),
  total: money(0),
  addItem: (item, quantity = 1, selectedOptions = []) => {
    const line: CartLine = {
      lineId: (crypto.randomUUID() as unknown) as ID,
      item,
      quantity,
      selectedOptions,
    };
    const lines = [...get().lines, line];
    const subtotalAmount = lines.reduce((sum, l) => sum + l.item.basePrice.amount * l.quantity, 0);
    set({
      lines,
      subtotal: money(subtotalAmount),
      total: money(subtotalAmount),
    });
  },
  removeLine: (lineId) => {
    const lines = get().lines.filter((l) => l.lineId !== lineId);
    const subtotalAmount = lines.reduce((sum, l) => sum + l.item.basePrice.amount * l.quantity, 0);
    set({
      lines,
      subtotal: money(subtotalAmount),
      total: money(subtotalAmount),
    });
  },
  clear: () => set({ lines: [], subtotal: money(0), total: money(0) }),
  setQuantity: (lineId, quantity) => {
    const lines = get().lines.map((l) => (l.lineId === lineId ? { ...l, quantity } : l));
    const subtotalAmount = lines.reduce((sum, l) => sum + l.item.basePrice.amount * l.quantity, 0);
    set({
      lines,
      subtotal: money(subtotalAmount),
      total: money(subtotalAmount),
    });
  },
}));
