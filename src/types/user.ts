import { ID, Timestamped } from './common';

export type UserRole = 'ADMIN' | 'STAFF' | 'CUSTOMER' | 'COURIER';

export type User = Timestamped & {
  id: ID;
  email: string;
  name?: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  lastLoginAt?: string; // ISO
};
