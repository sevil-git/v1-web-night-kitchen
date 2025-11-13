"use client";
import React from "react";
import { useLocationStatus } from "@/components/layout/LocationGate";

export function CategoryHeader({ title, count }: { title: string; count: number }) {
  const { currentLocation, canDeliver } = useLocationStatus();

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-semibold text-[#272d2f]">{title}</h1>
        <span className="text-sm text-[#272d2f]/60">{count} items</span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border ${
            canDeliver
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              canDeliver ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {currentLocation?.area
            ? canDeliver
              ? `Delivering to ${currentLocation.area}`
              : `Out of delivery range for ${currentLocation.area}`
            : "Location not set"}
        </span>
      </div>
    </div>
  );
}
