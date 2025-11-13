'use client';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MenuGrid } from '@/features/menu/components/MenuGrid';
import { CategoryHeader } from '@/features/menu/components/CategoryHeader';
import { FilterBar, type Filters } from '@/features/menu/components/FilterBar';
import type { MenuItem, MenuCategory } from '@/types/menu';
import { usePrefsStore } from '@/stores/prefsStore';
import Link from 'next/link';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');

  // Mock categories data - same as home page
  const categories: MenuCategory[] = [
    { id: 'c1' as unknown as MenuCategory['id'], name: 'Burgers', position: 1 },
    { id: 'c2' as unknown as MenuCategory['id'], name: 'Pizza', position: 2 },
    { id: 'c3' as unknown as MenuCategory['id'], name: 'Pasta', position: 3 },
    { id: 'c4' as unknown as MenuCategory['id'], name: 'Salads', position: 4 },
    { id: 'c5' as unknown as MenuCategory['id'], name: 'Desserts', position: 5 },
  ];

  // Mock menu items data - INR, ratings, veg/non-veg tags
  const menuItems: MenuItem[] = [
    {
      id: '1' as unknown as MenuItem['id'],
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh lettuce, tomato, and our special sauce',
      basePrice: { amount: 18900, currency: 'INR' },
      categoryId: 'c1' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
      isAvailable: true,
      rating: 4.6,
      tags: ['non-veg', 'Bestseller'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '2' as unknown as MenuItem['id'],
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomatoes, and basil on thin crust',
      basePrice: { amount: 22900, currency: 'INR' },
      categoryId: 'c2' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
      isAvailable: true,
      rating: 4.4,
      tags: ['veg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '3' as unknown as MenuItem['id'],
      name: 'Chicken Alfredo',
      description: 'Creamy alfredo sauce with grilled chicken and fettuccine',
      basePrice: { amount: 24900, currency: 'INR' },
      categoryId: 'c3' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=400&fit=crop',
      isAvailable: true,
      rating: 4.2,
      tags: ['non-veg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '4' as unknown as MenuItem['id'],
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan and croutons',
      basePrice: { amount: 16900, currency: 'INR' },
      categoryId: 'c4' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop',
      isAvailable: true,
      rating: 4.1,
      tags: ['non-veg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '5' as unknown as MenuItem['id'],
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      basePrice: { amount: 12900, currency: 'INR' },
      categoryId: 'c5' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop',
      isAvailable: true,
      rating: 4.8,
      tags: ['veg', 'Bestseller'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '6' as unknown as MenuItem['id'],
      name: 'BBQ Bacon Burger',
      description: 'Smoky BBQ sauce, crispy bacon, cheddar cheese, and onion rings',
      basePrice: { amount: 20900, currency: 'INR' },
      categoryId: 'c1' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=400&fit=crop',
      isAvailable: true,
      rating: 4.3,
      tags: ['non-veg', 'New'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
  ];

  const itemsWithTags: MenuItem[] = menuItems;

  const vegOnlyGlobal = usePrefsStore((s) => s.vegOnly);
  const setVegOnlyGlobal = usePrefsStore((s) => s.setVegOnly);

  // Filters state
  const [filters, setFilters] = useState<Filters>({
    vegOnly: vegOnlyGlobal,
    availableOnly: false,
    sort: 'price-asc',
  });

  // keep local vegOnly in sync with global toggle from header
  // when header toggle changes, reflect it in local FilterBar state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setFilters((prev) => (prev.vegOnly === vegOnlyGlobal ? prev : { ...prev, vegOnly: vegOnlyGlobal }));
  }, [vegOnlyGlobal]);

  const filteredItems = useMemo(() => {
    let items = categoryId
      ? itemsWithTags.filter((item) => item.categoryId === categoryId)
      : itemsWithTags;

    if (vegOnlyGlobal || filters.vegOnly) items = items.filter((i) => i.tags?.includes('veg'));
    if (filters.availableOnly) items = items.filter((i) => i.isAvailable);

    switch (filters.sort) {
      case 'price-asc':
        items = [...items].sort((a, b) => a.basePrice.amount - b.basePrice.amount);
        break;
      case 'price-desc':
        items = [...items].sort((a, b) => b.basePrice.amount - a.basePrice.amount);
        break;
      case 'rating-desc':
        items = [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'rating-asc':
        items = [...items].sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
        break;
      case 'name-asc':
        items = [...items].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        items = [...items].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return items;
  }, [categoryId, filters, itemsWithTags, vegOnlyGlobal]);

  // Get category name for title
  const categoryName = categoryId
    ? categories.find((c) => c.id === categoryId)?.name
    : null;

  return (
    <main className="p-4 sm:p-6 space-y-4 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CategoryHeader title={categoryName || 'All Menu Items'} count={filteredItems.length} />
        {categoryId && (
          <Link
            href="/"
            className="text-sm text-[#F67C29] hover:text-secondary-dark font-medium"
          >
            ← Back to Categories
          </Link>
        )}
      </div>

      <FilterBar
        value={filters}
        onChange={(next) => {
          setFilters(next);
          if (next.vegOnly !== vegOnlyGlobal) setVegOnlyGlobal(next.vegOnly);
        }}
      />

      {filteredItems.length === 0 ? (
        <div className="py-16 text-center text-[#272d2f]/60">No items match your filters.</div>
      ) : (
        <MenuGrid items={filteredItems} />
      )}
    </main>
  );
}
