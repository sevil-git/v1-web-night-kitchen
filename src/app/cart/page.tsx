import { CartSummary } from '@/features/cart/components/CartSummary';

export default function CartPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      <CartSummary />
    </main>
  );
}
