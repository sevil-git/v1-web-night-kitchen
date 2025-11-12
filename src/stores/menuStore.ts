import { create } from 'zustand';
import type { MenuItem, MenuCategory } from '@/types/menu';

interface MenuState {
  categories: MenuCategory[];
  items: MenuItem[];
  loading: boolean;
  setData: (categories: MenuCategory[], items: MenuItem[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  categories: [],
  items: [],
  loading: false,
  setData: (categories, items) => set({ categories, items }),
  setLoading: (loading) => set({ loading }),
}));
