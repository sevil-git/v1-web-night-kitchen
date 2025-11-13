import type { Money } from '@/types/common';

export function formatMoney(m: Money): string {
  if (m.currency === 'INR') {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(m.amount / 100);
    } catch {
      return `₹ ${Math.round(m.amount / 100)}`;
    }
  }
  return `${m.currency} ${(m.amount / 100).toFixed(2)}`;
}
