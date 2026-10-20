export type Place = { address: string; lat: number; lng: number };

// Nominatim is called through our own /api/geo route (browsers cannot set User-Agent, and Nominatim requires one)
export async function geocodeAddress(q: string) {
  const r = await fetch(`/api/geo?type=search&q=${encodeURIComponent(q)}`);
  return r.ok ? ((await r.json()) as { display_name: string; lat: string; lon: string; place_id: number }[]) : [];
}
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const r = await fetch(`/api/geo?type=reverse&lat=${lat}&lng=${lng}`);
  if (!r.ok) return "Address unavailable";
  return (await r.json()).display_name ?? "Address unavailable";
}
export async function calculateDistance(a: Place, b: Place) {
  const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`);
  const rt = (await r.json()).routes?.[0];
  if (!rt) throw new Error("No route found");
  return { distanceKm: rt.distance / 1000, durationMins: Math.ceil(rt.duration / 60), polyline: rt.geometry };
}
// All Day R1500: 2 trips/day, 15 km max per trip, R5/km over, R200 for an extra trip
export function fare(distanceKm: number, tripsToday: number) {
  const extraKm = Math.max(0, distanceKm - 15);
  const extraCharge = tripsToday >= 2 ? 200 : +(extraKm * 5).toFixed(2);
  return { extraKm: +extraKm.toFixed(1), extraCharge, total: 1500 + extraCharge };
}
export const mapsLink = (lat: number, lng: number) => `https://maps.google.com/?q=${lat},${lng}`;
export const osmLink = (lat: number, lng: number) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
