"use client";
import React, { useMemo } from 'react';
import { formatMoney } from '@/utils/format';
import { VegIcon, NonVegIcon } from '@/components/shared/VegToggle';
import { Button } from '@/components/ui/Button';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import type { MenuItem } from '@/types/menu';
import type { ID } from '@/types/common';

export type HomeProduct = {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  description?: string;
  imageUrl?: string;
  isVeg: boolean;
  rating?: number; // 0..5
  pricePaise: number; // amount in paise
  tags?: string[]; // e.g., ["20% OFF"]
};

export function ProductCard({ p }: { p: HomeProduct }) {
  const price = { amount: p.pricePaise, currency: 'INR' as const };
  const rating = Math.max(0, Math.min(5, p.rating ?? 0));
  const { lines, addItem, setQuantity, removeLine } = useCartStore();

  const menuItem: MenuItem = useMemo(() => ({
    id: (p.id as unknown) as ID,
    name: p.name,
    description: p.description,
    basePrice: { amount: p.pricePaise, currency: 'INR' },
    categoryId: (p.categoryId as unknown) as ID,
    imageUrl: p.imageUrl,
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    options: [],
  }), [p.id, p.name, p.description, p.pricePaise, p.categoryId, p.imageUrl]);

  const cartLine = lines.find((l) => l.item.id === menuItem.id);
  const quantity = cartLine?.quantity || 0;

  const handleAdd = () => addItem(menuItem, 1, []);
  const handleInc = () => cartLine && setQuantity(cartLine.lineId, quantity + 1);
  const handleDec = () => {
    if (!cartLine) return;
    if (quantity <= 1) removeLine(cartLine.lineId);
    else setQuantity(cartLine.lineId, quantity - 1);
  };

  return (
  <div className="relative border border-[#d7d7d7] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
      {/* Tag badge */}
      {p.tags?.[0] && (
        <div className="absolute top-2 left-2 z-10 text-xs px-2 py-1 rounded-md bg-[#F3B617] text-[#272d2f] font-semibold">
          {p.tags[0]}
        </div>
      )}

      {/* Image */}
      {p.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.imageUrl} alt={p.name} className="w-full h-36 sm:h-40 md:h-44 object-cover" />
      ) : (
        <div className="w-full h-36 sm:h-40 md:h-44 bg-[#f5f5f5]" />
      )}

      {/* Icons overlay (hide on very small screens to reduce clutter) */}
      <div className="hidden sm:flex absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur px-2 py-1 items-center gap-1 text-xs">
        {p.isVeg ? <VegIcon /> : <NonVegIcon />}
        <span className="ml-1">{rating.toFixed(1)}★</span>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-[#272d2f] truncate">{p.name}</div>
            <div className="hidden sm:block text-xs text-[#272d2f]/60 mt-0.5 truncate">{p.categoryName || p.categoryId}</div>
          </div>
          <div className="shrink-0 text-sm sm:text-base font-semibold text-[#272d2f]">{formatMoney(price)}</div>
        </div>
        {p.description && (
          <p className="hidden sm:-mt-0.5 sm:block text-sm text-[#272d2f]/70 mt-2 line-clamp-2">{p.description}</p>
        )}

        {/* Add/Stepper */}
        <div className="mt-3">
          {quantity === 0 ? (
            <Button onClick={handleAdd} className="w-full text-sm h-10">Add</Button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#272d2f]/60">In cart: {quantity}</div>
              <div className="flex items-center gap-2 border border-[#d7d7d7] rounded-md bg-white">
                <button
                  onClick={handleDec}
                  className="p-2 hover:bg-[#F3B617]/20 transition-colors rounded-l-md min-w-10 min-h-10 flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-[#272d2f]" />
                </button>
                <div className="px-2 text-sm min-w-6 text-center">{quantity}</div>
                <button
                  onClick={handleInc}
                  className="p-2 hover:bg-[#F3B617]/20 transition-colors rounded-r-md min-w-10 min-h-10 flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-[#272d2f]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
