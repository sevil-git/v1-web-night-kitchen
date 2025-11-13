'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePoster } from '@/components/shared/ImagePoster';
import { CategoryBar } from '@/features/menu/components/CategoryBar';
import type { MenuCategory } from '@/types/menu';
import { ProductCard, type HomeProduct } from '@/components/shared/ProductCard';
import { ComboCard } from '@/components/shared/ComboCard';
import type { Combo } from '@/types/menu';
import { usePrefsStore } from '@/stores/prefsStore';

export default function Home() {
  const router = useRouter();

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

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/menu?category=${categoryId}`);
  };

  // Mock products for homepage grid (memoized to avoid useMemo dep churn)
  const products: HomeProduct[] = useMemo(() => [
    {
      id: 'p1',
      name: 'Classic Burger',
      categoryId: 'c1',
      categoryName: 'Burgers',
      description: 'Juicy beef patty with fresh lettuce, tomato and special sauce',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
      isVeg: false,
      rating: 4.6,
      pricePaise: 18900,
      tags: ['20% OFF'],
    },
    {
      id: 'p2',
      name: 'Paneer Tikka Pizza',
      categoryId: 'c2',
      categoryName: 'Pizza',
      description: 'Marinated paneer, capsicum, onions on cheesy base',
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
      isVeg: true,
      rating: 4.4,
      pricePaise: 22900,
    },
    {
      id: 'p3',
      name: 'White Sauce Pasta',
      categoryId: 'c3',
      categoryName: 'Pasta',
      description: 'Creamy alfredo sauce tossed with penne and herbs',
      imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=400&fit=crop',
      isVeg: true,
      rating: 4.3,
      pricePaise: 19900,
    },
    {
      id: 'p4',
      name: 'Grilled Chicken Salad',
      categoryId: 'c4',
      categoryName: 'Salads',
      description: 'Lean grilled chicken, greens and vinaigrette',
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop',
      isVeg: false,
      rating: 4.1,
      pricePaise: 16900,
      tags: ['New'],
    },
    {
      id: 'p5',
      name: 'Chocolate Lava Cake',
      categoryId: 'c5',
      categoryName: 'Desserts',
      description: 'Warm chocolate cake with molten centre',
      imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop',
      isVeg: true,
      rating: 4.8,
      pricePaise: 12900,
      tags: ['Bestseller'],
    },
  ], []);

  const vegOnly = usePrefsStore((s) => s.vegOnly);
  const visibleProducts = useMemo(() => {
    return vegOnly ? products.filter((p) => p.isVeg) : products;
  }, [vegOnly, products]);

  const offerProducts = useMemo(() => {
    return visibleProducts.filter((p) =>
      (p.tags || []).some((t) => /%|OFF|Deal|New/i.test(t))
    );
  }, [visibleProducts]);

  const budgetProducts = useMemo(() => {
    return visibleProducts.filter((p) => p.pricePaise <= 19900);
  }, [visibleProducts]);

  // Mock combos (memoized)
  const combos: Combo[] = useMemo(() => [
    {
      id: 'cb1' as unknown as Combo['id'],
      name: 'Burger + Fries + Coke',
      description: 'Classic combo with medium fries and chilled coke',
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop',
      includes: ['Classic Burger', 'Medium Fries', 'Coke (300ml)'],
      totalPrice: { amount: 24900, currency: 'INR' },
      isVeg: false,
      rating: 4.5,
      tags: ['Combo Deal'],
    },
    {
      id: 'cb2' as unknown as Combo['id'],
      name: 'Paneer Pizza + Garlic Bread',
      description: 'Paneer tikka personal pizza paired with garlic breadsticks',
      imageUrl: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=1200&auto=format&fit=crop',
      includes: ['Paneer Tikka Pizza (Personal)', 'Garlic Breadsticks'],
      totalPrice: { amount: 29900, currency: 'INR' },
      isVeg: true,
      rating: 4.7,
      tags: ['Bestseller'],
    },
  ], []);

  const visibleCombos = useMemo(() => (vegOnly ? combos.filter((c) => c.isVeg) : combos), [vegOnly, combos]);

  return (
    <main className="space-y-6 pb-8 bg-white min-h-screen">
      {/* Hero Poster */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6">
        <ImagePoster
          imageUrl="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop"
          alt="Bitzy Cloud Kitchen"
          height="h-48 md:h-64"
        />
      </div>

      {/* Categories Bar */}
      <div className="px-4 sm:px-6">
        <h2 className="text-xl font-semibold mb-4 text-[#272d2f]">Explore Categories</h2>
        <CategoryBar
          categories={categories}
          onSelect={handleCategorySelect}
        />
      </div>

      {/* Featured Products */}
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#272d2f]">Popular this week</h2>
          <a href="/menu" className="text-sm text-[#F67C29] hover:text-secondary-dark font-medium">View all →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>

      {/* Limited-time offers */}
      {offerProducts.length > 0 && (
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4 mt-2">
            <h2 className="text-xl font-semibold text-[#272d2f]">Limited-time offers</h2>
            <a href="/menu" className="text-sm text-[#F67C29] hover:text-secondary-dark font-medium">Explore offers →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {offerProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}

      {/* Budget bites under ₹199 */}
      {budgetProducts.length > 0 && (
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4 mt-2">
            <h2 className="text-xl font-semibold text-[#272d2f]">Budget bites under ₹199</h2>
            <a href="/menu" className="text-sm text-[#F67C29] hover:text-secondary-dark font-medium">See all →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {budgetProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}

      {/* Combos and meal deals */}
      {visibleCombos.length > 0 && (
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4 mt-2">
            <h2 className="text-xl font-semibold text-[#272d2f]">Combos and meal deals</h2>
            <a href="/menu" className="text-sm text-[#F67C29] hover:text-secondary-dark font-medium">View combos →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visibleCombos.map((c) => (
              <ComboCard key={(c.id as unknown as string)} combo={c} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

