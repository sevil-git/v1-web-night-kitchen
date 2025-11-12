'use client';
import React from 'react';
import type { MenuItem } from '@/types/menu';
import { MenuCard } from './MenuCard';

export function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
