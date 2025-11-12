import type { Money } from '@/types/common';

export function formatMoney(m: Money): string {
  return `${m.currency} ${(m.amount / 100).toFixed(2)}`;
}
