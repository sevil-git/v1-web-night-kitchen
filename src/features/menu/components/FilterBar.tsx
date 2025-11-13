"use client";
import React from "react";

export type SortKey = "price-asc" | "price-desc" | "rating-desc" | "rating-asc" | "name-asc" | "name-desc";
export type Filters = {
  vegOnly: boolean;
  availableOnly: boolean;
  sort: SortKey;
};

interface FilterBarProps {
  value: Filters;
  onChange: (next: Filters) => void;
}

export function FilterBar({ value, onChange }: FilterBarProps) {
  const set = (patch: Partial<Filters>) => onChange({ ...value, ...patch });

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 p-3 border border-[#d7d7d7] rounded-lg bg-white">
      <label className="inline-flex items-center gap-2 text-sm text-[#272d2f]">
        <input
          type="checkbox"
          checked={value.vegOnly}
          onChange={(e) => set({ vegOnly: e.target.checked })}
        />
        Veg only
      </label>

      <label className="inline-flex items-center gap-2 text-sm text-[#272d2f]">
        <input
          type="checkbox"
          checked={value.availableOnly}
          onChange={(e) => set({ availableOnly: e.target.checked })}
        />
        Available now
      </label>

      <div className="hidden sm:block sm:ml-auto" />

      <label className="text-sm text-[#272d2f] inline-flex items-center gap-2 sm:ml-auto">
        Sort by
        <select
          value={value.sort}
          onChange={(e) => set({ sort: e.target.value as SortKey })}
          className="border border-[#d7d7d7] rounded-md px-2 py-2 text-sm bg-white w-full sm:w-auto"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>
      </label>
    </div>
  );
}
