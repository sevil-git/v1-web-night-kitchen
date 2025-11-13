"use client";
import React from "react";

export function VegIcon({ className = "" }: { className?: string }) {
    return (
        <span className={`relative inline-flex items-center justify-center ${className}`} aria-hidden>
            <span className="inline-block w-4 h-4 rounded-sm border-2 border-emerald-600"></span>
            <span className="absolute w-2 h-2 rounded-full bg-emerald-600"></span>
        </span>
    );
}

export function NonVegIcon({ className = "" }: { className?: string }) {
    return (
        <span className={`relative inline-flex items-center justify-center ${className}`} aria-hidden>
            <span className="inline-block w-4 h-4 rounded-sm border-2 border-rose-600"></span>
            <span className="absolute w-2 h-2 rounded-full bg-rose-600"></span>
        </span>
    );
}

export function VegToggle({
    value,
    onToggle,
    className = "",
    showLabel = true,
}: {
    value: boolean;
    onToggle: () => void;
    className?: string;
    showLabel?: boolean;
}): React.JSX.Element {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={value}
            aria-label="Toggle veg-only"
            className={`group relative inline-flex items-center gap-2 rounded-full transition-all duration-300 ${className}`}
        >
            {/* Track */}
            <div className="relative flex items-center gap-3 pl-3 pr-3 py-1.5">
                <div className="relative w-12 h-6 rounded-full bg-white border border-[#d7d7d7] overflow-hidden">
                    {/* Active background highlight */}
                    <div className="absolute left-0 -top-0.5 w-1/2 h-full transition-opacity duration-300 pointer-events-none" style={{ opacity: value ? 1 : 0 }} >
                        on
                    </div>
                    {/* Knob */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${value
                            ? "translate-x-5.5 bg-emerald-500"
                            : "translate-x-1 bg-rose-500"
                            }`}
                    />
                    <div className="absolute right-0 -top-0.5 w-1/2 h-full transition-opacity duration-300 pointer-events-none" style={{ opacity: value ? 0 : 1 }} >
                        off
                    </div>
                </div>
            </div>
        </button>
    );
}
