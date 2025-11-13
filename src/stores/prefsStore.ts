import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PrefsState {
  vegOnly: boolean;
  setVegOnly: (v: boolean) => void;
  toggleVegOnly: () => void;
}

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set, get) => ({
      vegOnly: false,
      setVegOnly: (v) => set({ vegOnly: v }),
      toggleVegOnly: () => set({ vegOnly: !get().vegOnly }),
    }),
    {
      name: 'bitzy:prefs',
      version: 1,
      partialize: (state) => ({ vegOnly: state.vegOnly }),
    }
  )
);
