const OSRM_BASE = 'https://router.project-osrm.org/route/v1/driving';

export interface RoadRoute {
  /** [lat, lng] coordinate pairs along actual roads */
  coordinates: [number, number][];
  /** Road distance in km */
  distanceKm: number;
  /** Estimated duration in minutes */
  durationMin: number;
}

/**
 * Fetch the road route through the given waypoints from OSRM.
 * Returns the road geometry, distance, and duration.
 * Falls back to straight lines if the request fails.
 */
export async function fetchRoadRoute(
  waypoints: { lat: number; lng: number }[],
): Promise<RoadRoute | null> {
  if (waypoints.length < 2) return null;

  // OSRM uses lng,lat order
  const coords = waypoints.map(p => `${p.lng},${p.lat}`).join(';');
  const url = `${OSRM_BASE}/${coords}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.length) return null;

    const route = data.routes[0];
    // GeoJSON coordinates are [lng, lat] — convert to [lat, lng] for Leaflet
    const coordinates: [number, number][] = route.geometry.coordinates.map(
      (c: [number, number]) => [c[1], c[0]],
    );

    return {
      coordinates,
      distanceKm: route.distance / 1000,
      durationMin: route.duration / 60,
    };
  } catch {
    return null;
  }
}
