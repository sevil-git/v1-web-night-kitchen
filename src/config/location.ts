/**
 * Location and service area configuration for Bitzy
 */

export interface DeliveryLocation {
  name: string;
  area: string;
  lat: number;
  lon: number;
}

// Akurdi coordinates - central service location
export const AKURDI_LAT = 18.6400;
export const AKURDI_LON = 73.8040;
export const SERVICE_RADIUS_KM = 10;

/**
 * Calculate distance between two points using Haversine formula
 */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Check if a location is within the service radius of Akurdi
 */
export function isWithinServiceArea(lat: number, lon: number): boolean {
  const distance = haversineDistance(lat, lon, AKURDI_LAT, AKURDI_LON);
  return distance <= SERVICE_RADIUS_KM;
}
