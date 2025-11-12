import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <CheckoutForm />
    </main>
  );
}
