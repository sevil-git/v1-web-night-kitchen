import { OrderList } from '@/features/orders/components/OrderList';
import type { Order } from '@/types/order';

export default function OrdersPage() {
  const orders: Order[] = [];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <OrderList orders={orders} />
    </main>
  );
}
