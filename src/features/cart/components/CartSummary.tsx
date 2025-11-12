'use client';
import React from 'react';
import { useCartStore } from '@/stores/cartStore';
import { formatMoney } from '@/utils/format';

export function CartSummary() {
  const { lines, subtotal, total, removeLine } = useCartStore();
  return (
    <div className="space-y-2">
      <div className="font-semibold">Cart</div>
      <ul className="divide-y">
        {lines.map((l) => (
          <li key={l.lineId} className="flex items-center justify-between py-2">
            <span className="text-sm">{l.item.name} × {l.quantity}</span>
            <button className="text-xs text-red-600" onClick={() => removeLine(l.lineId)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="text-sm text-gray-600">Subtotal: {formatMoney(subtotal)}</div>
      <div className="text-sm font-medium">Total: {formatMoney(total)}</div>
    </div>
  );
}
