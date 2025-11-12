'use client';
import React from 'react';
import type { MenuCategory } from '@/types/menu';

interface CategoryBarProps {
  categories: MenuCategory[];
  selectedId?: string;
  onSelect?: (categoryId: string) => void;
}

export function CategoryBar({ categories, selectedId, onSelect }: CategoryBarProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect?.(category.id)}
          className="flex flex-col items-center gap-2 min-w-20 transition-all"
        >
          <div
            className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-colors ${
              selectedId === category.id
                ? 'border-[#F67C29] ring-2 ring-[#F67C29]/30'
                : 'border-[#d7d7d7] hover:border-[#F3B617]'
            }`}
          >
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-[#F3B617]/20 to-[#F67C29]/20 flex items-center justify-center">
                <span className="text-xl">🍽️</span>
              </div>
            )}
          </div>
          <span
            className={`text-sm font-medium text-center ${
              selectedId === category.id ? 'text-[#F67C29]' : 'text-[#272d2f]'
            }`}
          >
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
