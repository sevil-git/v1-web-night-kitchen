import { MenuGrid } from '@/features/menu/components/MenuGrid';
import type { MenuItem } from '@/types/menu';

export default function MenuPage() {
  // Static placeholder items for scaffolding
  const items: MenuItem[] = [
    {
      id: '1' as any,
      name: 'Classic Burger',
      description: 'Juicy patty with fresh toppings',
      basePrice: { amount: 899, currency: 'USD' },
      categoryId: 'c1' as any,
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
  ];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Menu</h1>
      <MenuGrid items={items} />
    </main>
  );
}
