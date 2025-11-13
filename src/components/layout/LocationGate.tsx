'use client';
import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { APP } from '@/config/constants';
import { Button } from '@/components/ui/Button';
import { reverseGeocode, getLocationFromIP } from '@/utils/geocoding';
import { PanLoader } from '@/components/shared/PanLoader';
import { 
  type DeliveryLocation,
  AKURDI_LAT, 
  AKURDI_LON, 
  SERVICE_RADIUS_KM,
  haversineDistance 
} from '@/config/location';
import Image from 'next/image';

type LocationStatus = 'unknown' | 'granted' | 'denied' | 'out-of-area' | 'manual';

interface LocationContextType {
  locationStatus: LocationStatus;
  requestLocation: () => void;
  currentLocation: DeliveryLocation | null;
  setManualLocation: (location: DeliveryLocation) => void;
  canDeliver: boolean;
}

const LocationContext = createContext<LocationContextType | null>(null);

export function useLocationStatus() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationStatus must be used within LocationGate');
  }
  return context;
}

export function LocationGate({ children }: { children: React.ReactNode }) {
  // Persistent cache keys and helpers
  const STORAGE_KEY = 'bitzy:location';
  const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

  type CachedLocation = {
    status: LocationStatus;
    location: DeliveryLocation | null;
    ts: number;
  };

  const loadCache = (): CachedLocation | null => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as CachedLocation;
      if (!parsed || typeof parsed.ts !== 'number') return null;
      const fresh = Date.now() - parsed.ts < CACHE_TTL_MS;
      if (!fresh) return null;
      return parsed;
    } catch {
      return null;
    }
  };

  const saveCache = (data: CachedLocation) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }
  };

  // Initialize state from cache synchronously to avoid loader flash on revisit
  const cached = loadCache();
  const [locationStatus, setLocationStatus] = useState<LocationStatus>(cached?.status ?? 'unknown');
  const [currentLocation, setCurrentLocation] = useState<DeliveryLocation | null>(cached?.location ?? null);
  const initializedRef = useRef(false);

  // Check if current location allows delivery
  const canDeliver = currentLocation
    ? haversineDistance(currentLocation.lat, currentLocation.lon, AKURDI_LAT, AKURDI_LON) <= SERVICE_RADIUS_KM
    : false;

  const setManualLocation = (location: DeliveryLocation) => {
    setCurrentLocation(location);
    setLocationStatus('manual');
    saveCache({ status: 'manual', location, ts: Date.now() });
  };

  const tryIPGeolocation = async () => {
    console.log('Browser geolocation unavailable, trying IP-based location...');
    const ipLocation = await getLocationFromIP();
    
    if (ipLocation) {
      const d = haversineDistance(ipLocation.lat, ipLocation.lon, AKURDI_LAT, AKURDI_LON);
      console.log('IP location distance from Akurdi:', d, 'km');
      
      const loc = {
        name: ipLocation.city,
        area: ipLocation.city,
        lat: ipLocation.lat,
        lon: ipLocation.lon,
      } as DeliveryLocation;
      setCurrentLocation(loc);
      
      const newStatus = d <= SERVICE_RADIUS_KM ? 'granted' : 'out-of-area';
      console.log('Setting status from IP location to:', newStatus);
      setLocationStatus(newStatus);
      saveCache({ status: newStatus, location: loc, ts: Date.now() });
    } else {
      console.warn('IP geolocation also failed, showing manual selection');
      setLocationStatus('denied');
      saveCache({ status: 'denied', location: null, ts: Date.now() });
    }
  };

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      console.warn('Geolocation not supported, trying IP fallback');
      tryIPGeolocation();
      return;
    }

  console.log('Requesting browser location...');
  setLocationStatus('unknown');
    
    // Shorter timeout since we have IP fallback
    const safetyTimeout = setTimeout(() => {
      console.warn('Browser geolocation timed out, using IP fallback');
      tryIPGeolocation();
    }, 8000);
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(safetyTimeout);
        try {
          console.log('✓ Got precise location:', pos.coords);
          const { latitude, longitude } = pos.coords;
          const d = haversineDistance(latitude, longitude, AKURDI_LAT, AKURDI_LON);
          console.log('Distance from Akurdi:', d, 'km');
          
          const locationName = await reverseGeocode(latitude, longitude);
          console.log('Location name:', locationName);
          
          const loc: DeliveryLocation = {
            name: locationName,
            area: locationName,
            lat: latitude,
            lon: longitude,
          };
          setCurrentLocation(loc);
          
          const newStatus = d <= SERVICE_RADIUS_KM ? 'granted' : 'out-of-area';
          console.log('Setting status to:', newStatus);
          setLocationStatus(newStatus);
          saveCache({ status: newStatus, location: loc, ts: Date.now() });
        } catch (error) {
          console.warn('Error processing location:', error);
          tryIPGeolocation();
        }
      },
      (error) => {
        clearTimeout(safetyTimeout);
        console.warn('Browser geolocation error:', {
          code: error.code,
          message: error.message,
          PERMISSION_DENIED: error.code === 1,
          POSITION_UNAVAILABLE: error.code === 2,
          TIMEOUT: error.code === 3
        });
        
        // If permission denied, don't use IP fallback (respect user choice)
        if (error.code === 1) {
          console.log('Permission denied by user');
          setLocationStatus('denied');
        } else {
          // For timeout or unavailable, try IP fallback
          console.log('Browser geolocation failed, trying IP fallback');
          tryIPGeolocation();
        }
      },
      { timeout: 8000, enableHighAccuracy: false, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    // If we have fresh cached data, don't re-request and don't flash loader
    if (cached) {
      console.log('Using cached location, skipping geolocation request');
      return;
    }
    // Otherwise, try browser geolocation (with IP fallback)
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only show gate if location is still unknown OR denied without fallback location
  const shouldShowGate = locationStatus === 'unknown' || (locationStatus === 'denied' && !currentLocation);
  
  console.log('LocationGate render:', { locationStatus, currentLocation, shouldShowGate, canDeliver });
  
  if (shouldShowGate) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <Image src='/logo.png' alt={APP.NAME} width={100} height={100} className="mx-auto" />

          {locationStatus === 'unknown' && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <PanLoader size="lg" className='mx-auto'/>
              {/* <p className="text-[#272d2f]/70">Checking your location...</p> */}
            </div>
          )}

          {locationStatus === 'denied' && (
            <div className="space-y-4">
              <div className="bg-[#fff6f0] border border-[#ffd6bf] rounded-lg p-6">
                <p className="text-[#272d2f] mb-4">
                  We need your location to check if we can deliver to you. You can enable location permissions or choose a location manually below.
                </p>
                <div className="space-y-3">
                  <Button variant="primary" onClick={requestLocation}>
                    Enable Location
                  </Button>
                  <div className="text-sm text-[#272d2f]/70">or</div>
                  <Button
                    variant="ghost"
                    onClick={() => setManualLocation({
                      name: 'Akurdi',
                      area: 'Pimpri-Chinchwad, Pune',
                      lat: AKURDI_LAT,
                      lon: AKURDI_LON,
                    })}
                  >
                    Browse with Akurdi location
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <LocationContext.Provider
      value={{
        locationStatus,
        requestLocation,
        currentLocation,
        setManualLocation,
        canDeliver,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
