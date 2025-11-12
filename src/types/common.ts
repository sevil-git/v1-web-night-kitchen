// Common/shared types for Bitzy
export type ID = string & { readonly __brand: unique symbol };

export type Money = {
  amount: number; // in smallest unit (cents)
  currency: string; // ISO 4217 e.g. "USD"
};

export type Timestamped = {
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
};

export type Paginated<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
};
