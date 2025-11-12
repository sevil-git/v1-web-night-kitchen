/**
 * Geocoding utilities using OpenStreetMap Nominatim API
 * No API key required, but rate-limited to 1 request per second
 */

/**
 * Get approximate location from IP address (fallback when geolocation fails)
 * Using ipapi.co - free tier allows 1000 requests/day, no API key needed
 */
export async function getLocationFromIP(): Promise<{ lat: number; lon: number; city: string } | null> {
  try {
    console.log('Trying IP-based geolocation...');
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      throw new Error('IP geolocation failed');
    }
    
    const data = await response.json();
    console.log('IP geolocation result:', data);
    
    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lon: data.longitude,
        city: data.city || data.region || 'Unknown location'
      };
    }
    
    return null;
  } catch (error) {
    console.error('IP geolocation error:', error);
    return null;
  }
}

export interface GeocodingResult {
  name: string;
  displayName: string;
  lat: number;
  lon: number;
  type: string;
  address?: {
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const USER_AGENT = 'BitzyApp/1.0';

/**
 * Reverse geocoding: Convert coordinates to location name
 */
export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': USER_AGENT,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }
    
    const data = await response.json();
    
    // Try to get the most specific location name
    const suburb = data.address?.suburb || data.address?.neighbourhood || data.address?.city_district || '';
    const city = data.address?.city || data.address?.town || data.address?.village || '';
    
    return suburb || city || data.display_name || 'Unknown location';
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return 'Unknown location';
  }
}

/**
 * Forward geocoding: Search for locations by name
 * Bounded to Pune region for relevant results
 */
export async function searchLocations(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    // Bounding box for Pune region (approx)
    const viewbox = '73.6,18.4,74.0,18.8'; // lon_min,lat_min,lon_max,lat_max
    
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(query)}&viewbox=${viewbox}&bounded=1&addressdetails=1&limit=10`,
      {
        headers: {
          'User-Agent': USER_AGENT,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Search request failed');
    }
    
    const data = await response.json();
    
    interface NominatimSearchResult {
      lat: string;
      lon: string;
      display_name: string;
      name?: string;
      type: string;
      address?: {
        suburb?: string;
        neighbourhood?: string;
        city?: string;
        [key: string]: string | undefined;
      };
    }
    
    return (data as NominatimSearchResult[]).map((item) => ({
      name: item.address?.suburb || item.address?.neighbourhood || item.address?.city || item.name || 'Unknown',
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type,
      address: item.address,
    }));
  } catch (error) {
    console.error('Location search failed:', error);
    return [];
  }
}

/**
 * Get full address details for coordinates
 */
export async function getFullAddress(lat: number, lon: number): Promise<GeocodingResult | null> {
  try {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': USER_AGENT,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }
    
    const data = await response.json();
    
    return {
      name: data.address?.suburb || data.address?.neighbourhood || data.address?.city || data.name,
      displayName: data.display_name,
      lat: parseFloat(data.lat),
      lon: parseFloat(data.lon),
      type: data.type,
      address: data.address,
    };
  } catch (error) {
    console.error('Failed to get full address:', error);
    return null;
  }
}
