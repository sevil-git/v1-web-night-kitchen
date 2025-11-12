'use client';
import React from 'react';
import type { Order } from '@/types/order';

export function OrderList({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-2">
      {orders.map((o) => (
        <div key={o.id} className="border rounded p-3 flex items-center justify-between">
          <div>
            <div className="font-medium">Order #{o.id.slice(0, 6)}</div>
            <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
          </div>
          <div className="text-sm">{o.status}</div>
        </div>
      ))}
    </div>
  );
}
