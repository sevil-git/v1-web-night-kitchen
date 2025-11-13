'use client';
import React from 'react';
import Image from 'next/image';
import type { MenuItem } from '@/types/menu';
import { VegIcon, NonVegIcon } from '@/components/shared/VegToggle';
import { Button } from '@/components/ui/Button';
import { formatMoney } from '@/utils/format';
import { useCartStore } from '@/stores/cartStore';
import { Plus, Minus } from 'lucide-react';

export function MenuCard({ item }: { item: MenuItem }) {
  const { lines, addItem, setQuantity, removeLine } = useCartStore();
  const isVeg = (item.tags || []).includes('veg');
  const rating = Math.max(0, Math.min(5, item.rating ?? 0));
  
  // Find if this item is already in the cart
  const cartLine = lines.find((line) => line.item.id === item.id);
  const quantity = cartLine?.quantity || 0;

  const handleAdd = () => {
    addItem(item, 1);
  };

  const handleIncrement = () => {
    if (cartLine) {
      setQuantity(cartLine.lineId, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cartLine) {
      if (quantity === 1) {
        removeLine(cartLine.lineId);
      } else {
        setQuantity(cartLine.lineId, quantity - 1);
      }
    }
  };

  return (
    <div className="relative border border-[#d7d7d7] rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
      {/* Icons overlay (hide on very small screens) */}
      <div className="hidden sm:flex absolute top-2 right-2 z-10 rounded-full bg-white/90 backdrop-blur px-2 py-1 items-center gap-1 text-xs">
        {isVeg ? <VegIcon /> : <NonVegIcon />}
        {rating > 0 && <span className="ml-1">{rating.toFixed(1)}★</span>}
      </div>
      {item.imageUrl && (
        <div className="relative w-full h-40">
          <Image 
            src={item.imageUrl} 
            alt={item.name} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <div className="font-medium text-lg">{item.name}</div>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-semibold text-[#272d2f]">{formatMoney(item.basePrice)}</span>
          
          {quantity === 0 ? (
            <Button onClick={handleAdd} className="text-sm px-4 h-10">
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 border border-[#d7d7d7] rounded-lg bg-white">
              <button
                onClick={handleDecrement}
                className="p-2 hover:bg-[#F3B617]/20 transition-colors rounded-l-lg min-w-10 min-h-10 flex items-center justify-center"
              >
                <Minus className="w-4 h-4 text-[#272d2f]" />
              </button>
              <span className="font-medium min-w-6 text-center text-[#272d2f]">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="p-2 hover:bg-[#F3B617]/20 transition-colors rounded-r-lg min-w-10 min-h-10 flex items-center justify-center"
              >
                <Plus className="w-4 h-4 text-[#272d2f]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
