'use client';
import React, { useState } from 'react';
import { APP } from '@/config/constants';
import { Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useLocationStatus } from './LocationGate';
import { LocationSearch } from '@/components/shared/LocationSearch';
import Image from 'next/image';

export function AppHeader() {
    const [searchQuery, setSearchQuery] = useState('');
    const lines = useCartStore((state) => state.lines);
    const { currentLocation, canDeliver } = useLocationStatus();

    const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);

    return (
        <header className="bg-white border-b border-[#d7d7d7] sticky top-0 z-50">
            <div className="px-3 sm:px-4 md:px-6 py-2 md:py-3">
                {/* Delivery status banner (hidden on very small screens to reduce clutter) */}
                {currentLocation && !canDeliver && (
                    <div className="hidden sm:block mb-2 text-xs md:text-sm text-[#F67C29] bg-[#fff8f0] border border-[#ffd8c2] rounded-md px-3 py-2 text-center">
                        Outside delivery zone – browsing only.
                    </div>
                )}

                {/* MOBILE (< md): stacked layout */}
                <div className="md:hidden space-y-2">
                    {/* Row 1: Logo + Cart */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Image src="/logo.png" alt={APP.NAME} width={44} height={44} className="rounded" />
                            {/* <span className="font-bold text-lg tracking-tight text-[#272d2f]">{APP.NAME}</span> */}
                        </div>
                        <button
                            aria-label="Cart"
                            className="relative p-2 hover:bg-[#F3B617]/10 rounded-md transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5 text-[#272d2f]" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#F67C29] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                        {/* Row 2: Location selector */}
                        <div className="flex">
                            <LocationSearch />
                        </div>
                    {/* Row 3: Search bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#272d2f]/40" />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-[#d7d7d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3B617] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* DESKTOP (>= md): existing centered grid */}
                <div className="hidden md:grid items-center" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
                    {/* Logo */}
                    <div className="flex items-center h-full">
                        <Image src="/logo.png" alt={APP.NAME} width={60} height={60} />
                    </div>

                    {/* Center: location + search */}
                    <div className="justify-self-center w-full max-w-2xl">
                        <div className="flex items-center gap-3">
                            <LocationSearch />
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#272d2f]/40" />
                                <input
                                    type="text"
                                    placeholder="Search for dishes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 text-base border border-[#d7d7d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3B617] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cart */}
                    <div className="flex items-center justify-end">
                        <button
                            aria-label="Cart"
                            className="relative p-2.5 hover:bg-[#F3B617]/10 rounded-lg transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6 text-[#272d2f]" />
                            {totalItems > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-[#F67C29] text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
