'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { searchLocations, type GeocodingResult } from '@/utils/geocoding';
import { useLocationStatus } from '../layout/LocationGate';
import  {PanLoader}  from './PanLoader';
import {
  type DeliveryLocation,
  AKURDI_LAT,
  AKURDI_LON,
  SERVICE_RADIUS_KM,
  haversineDistance,
} from '@/config/location';

export function LocationSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { currentLocation, setManualLocation } = useLocationStatus();

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchLocations(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSelectLocation = (result: GeocodingResult) => {
    const location: DeliveryLocation = {
      name: result.name,
      area: result.address?.city || result.address?.town || 'Pune',
      lat: result.lat,
      lon: result.lon,
    };
    setManualLocation(location);
    setIsOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const getDeliveryStatus = (lat: number, lon: number) => {
    const distance = haversineDistance(lat, lon, AKURDI_LAT, AKURDI_LON);
    const canDeliver = distance <= SERVICE_RADIUS_KM;
    return { canDeliver, distance: distance.toFixed(1) };
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 md:py-2.5 text-sm md:text-base border border-[#d7d7d7] rounded-lg hover:border-[#F3B617] transition-colors bg-white"
      >
        <MapPin className="w-4 h-4 text-[#F67C29] shrink-0" />
        <span className="font-medium text-[#272d2f] max-w-[100px] md:max-w-[150px] truncate">
          {currentLocation?.name || 'Select location'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => {
              setIsOpen(false);
              setSearchQuery('');
              setSearchResults([]);
            }}
          />
          <div className="absolute top-full left-0 mt-2 w-80 md:w-96 bg-white border border-[#d7d7d7] rounded-lg shadow-lg z-20 max-h-[500px] overflow-hidden flex flex-col">
            {/* Search Input */}
            <div className="p-3 border-b border-[#d7d7d7]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#272d2f]/40" />
                <input
                  type="text"
                  placeholder="Search for your area or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 text-sm border border-[#d7d7d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3B617] focus:border-transparent"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-[#272d2f]/40 hover:text-[#272d2f]" />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto flex-1">
              {isSearching && (
                <div className="flex items-center justify-center py-8">
                  <PanLoader size="sm" />
                </div>
              )}

              {!isSearching && searchResults.length === 0 && searchQuery.trim().length >= 2 && (
                <div className="p-4 text-center text-sm text-[#272d2f]/60">
                  No locations found. Try searching for a different area.
                </div>
              )}

              {!isSearching && searchResults.length === 0 && searchQuery.trim().length < 2 && (
                <div className="p-4">
                  <div className="text-xs font-semibold text-[#272d2f]/60 mb-2">
                    Search Tips
                  </div>
                  <ul className="text-sm text-[#272d2f]/70 space-y-1 list-disc list-inside">
                    <li>Enter your area name (e.g., &quot;Akurdi&quot;, &quot;Pimpri&quot;)</li>
                    <li>Use landmarks or locality names</li>
                    <li>We serve within {SERVICE_RADIUS_KM} km of Akurdi</li>
                  </ul>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="py-2">
                  {searchResults.map((result, index) => {
                    const { canDeliver, distance } = getDeliveryStatus(result.lat, result.lon);
                    return (
                      <button
                        key={`${result.lat}-${result.lon}-${index}`}
                        onClick={() => handleSelectLocation(result)}
                        className={`w-full text-left px-4 py-3 hover:bg-[#F3B617]/10 transition-colors border-b border-[#d7d7d7] last:border-b-0 ${
                          currentLocation?.lat === result.lat && currentLocation?.lon === result.lon
                            ? 'bg-[#F3B617]/20'
                            : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-[#F67C29] shrink-0 mt-1" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#272d2f] truncate">
                              {result.name}
                            </div>
                            <div className="text-xs text-[#272d2f]/60 truncate mt-0.5">
                              {result.displayName}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  canDeliver
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-orange-100 text-orange-700'
                                }`}
                              >
                                {canDeliver ? '✓ Delivery available' : `${distance} km from Akurdi`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
