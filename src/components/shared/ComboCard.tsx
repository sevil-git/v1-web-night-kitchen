"use client";
import React, { useMemo } from 'react';
import Image from 'next/image';
import { formatMoney } from '@/utils/format';
import { VegIcon, NonVegIcon } from '@/components/shared/VegToggle';
import { Button } from '@/components/ui/Button';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import type { Combo, MenuItem } from '@/types/menu';
import type { ID } from '@/types/common';

export function ComboCard({ combo }: { combo: Combo }) {
  const { lines, addItem, setQuantity, removeLine } = useCartStore();
  const rating = Math.max(0, Math.min(5, combo.rating ?? 0));

  // Represent combo as a MenuItem for cart storage
  const cartMenuItem: MenuItem = useMemo(() => ({
    id: ("combo_" + (combo.id as unknown as string)) as unknown as ID,
    name: combo.name,
    description: combo.description || `Includes: ${combo.includes.join(', ')}`,
    basePrice: combo.totalPrice,
    categoryId: ("combo" as unknown) as ID,
    imageUrl: combo.imageUrl,
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    options: [],
    tags: ["combo"],
  }), [combo]);

  const cartLine = lines.find((l) => l.item.id === cartMenuItem.id);
  const quantity = cartLine?.quantity || 0;

  const handleAdd = () => addItem(cartMenuItem, 1, []);
  const handleInc = () => cartLine && setQuantity(cartLine.lineId, quantity + 1);
  const handleDec = () => {
    if (!cartLine) return;
    if (quantity <= 1) removeLine(cartLine.lineId);
    else setQuantity(cartLine.lineId, quantity - 1);
  };

  return (
    <div className="relative border border-[#d7d7d7] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
      {/* Tag badge */}
      {combo.tags?.[0] && (
        <div className="absolute top-2 left-2 z-10 text-xs px-2 py-1 rounded-md bg-[#F3B617] text-[#272d2f] font-semibold">
          {combo.tags[0]}
        </div>
      )}

      {/* Image */}
      {combo.imageUrl ? (
        <div className="relative w-full h-36 sm:h-40 md:h-44">
          <Image src={combo.imageUrl} alt={combo.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" />
        </div>
      ) : (
        <div className="w-full h-36 sm:h-40 md:h-44 bg-[#f5f5f5]" />
      )}

      {/* Icons overlay (hide on very small screens) */}
      <div className="hidden sm:flex absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur px-2 py-1 items-center gap-1 text-xs">
        {combo.isVeg ? <VegIcon /> : <NonVegIcon />}
        <span className="ml-1">{rating > 0 ? `${rating.toFixed(1)}★` : 'Combo'}</span>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-[#272d2f] truncate">{combo.name}</div>
            <div className="hidden sm:block text-xs text-[#272d2f]/60 mt-0.5 truncate">Includes: {combo.includes.join(', ')}</div>
          </div>
          <div className="shrink-0 text-sm sm:text-base font-semibold text-[#272d2f]">{formatMoney(combo.totalPrice)}</div>
        </div>
        {combo.description && (
          <p className="hidden sm:block text-sm text-[#272d2f]/70 mt-2 line-clamp-2">{combo.description}</p>
        )}

        {/* Add/Stepper */}
        <div className="mt-3">
          {quantity === 0 ? (
            <Button onClick={handleAdd} className="w-full text-sm h-10">Add combo</Button>
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
