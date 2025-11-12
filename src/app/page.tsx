'use client';
import { useState } from 'react';
import { ImagePoster } from '@/components/shared/ImagePoster';
import { CategoryBar } from '@/features/menu/components/CategoryBar';
import { MenuGrid } from '@/features/menu/components/MenuGrid';
import type { MenuItem, MenuCategory } from '@/types/menu';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  // Mock data - replace with real data from API/store
  const categories: MenuCategory[] = [
    {
      id: 'c1' as unknown as MenuCategory['id'],
      name: 'Burgers',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
      position: 1,
    },
    {
      id: 'c2' as unknown as MenuCategory['id'],
      name: 'Pizza',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
      position: 2,
    },
    {
      id: 'c3' as unknown as MenuCategory['id'],
      name: 'Pasta',
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=100&h=100&fit=crop',
      position: 3,
    },
    {
      id: 'c4' as unknown as MenuCategory['id'],
      name: 'Salads',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop',
      position: 4,
    },
    {
      id: 'c5' as unknown as MenuCategory['id'],
      name: 'Desserts',
      imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop',
      position: 5,
    },
  ];

  const menuItems: MenuItem[] = [
    {
      id: '1' as unknown as MenuItem['id'],
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh lettuce, tomato, and our special sauce',
      basePrice: { amount: 899, currency: 'USD' },
      categoryId: 'c1' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '2' as unknown as MenuItem['id'],
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomatoes, and basil on thin crust',
      basePrice: { amount: 1299, currency: 'USD' },
      categoryId: 'c2' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '3' as unknown as MenuItem['id'],
      name: 'Chicken Alfredo',
      description: 'Creamy alfredo sauce with grilled chicken and fettuccine',
      basePrice: { amount: 1499, currency: 'USD' },
      categoryId: 'c3' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '4' as unknown as MenuItem['id'],
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan and croutons',
      basePrice: { amount: 799, currency: 'USD' },
      categoryId: 'c4' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '5' as unknown as MenuItem['id'],
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      basePrice: { amount: 699, currency: 'USD' },
      categoryId: 'c5' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
    {
      id: '6' as unknown as MenuItem['id'],
      name: 'BBQ Bacon Burger',
      description: 'Smoky BBQ sauce, crispy bacon, cheddar cheese, and onion rings',
      basePrice: { amount: 1099, currency: 'USD' },
      categoryId: 'c1' as unknown as MenuItem['categoryId'],
      imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
  ];

  // Filter items by selected category
  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.categoryId === selectedCategory)
    : menuItems;

  return (
    <main className="space-y-6 pb-8 bg-white min-h-screen">
      {/* Hero Poster */}
      <div className="px-6 pt-6">
        <ImagePoster
          imageUrl="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop"
          alt="Bitzy Cloud Kitchen"
          height="h-48 md:h-64"
        />
      </div>

      {/* Categories Bar */}
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-4 text-[#272d2f]">Categories</h2>
        <CategoryBar
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Menu Items */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#272d2f]">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name || 'Menu'
              : 'All Items'}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(undefined)}
              className="text-sm text-[#fe724c] hover:text-secondary-dark font-medium"
            >
              View All
            </button>
          )}
        </div>
        <MenuGrid items={filteredItems} />
      </div>
    </main>
  );
}

