const R = 6371; // Earth radius in km

export function haversineDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
): number {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function buildDistanceMatrix(points: { lat: number; lng: number }[]): number[][] {
  const n = points.length;
  const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = haversineDistance(points[i].lat, points[i].lng, points[j].lat, points[j].lng);
      matrix[i][j] = d;
      matrix[j][i] = d;
    }
  }
  return matrix;
}

export function calculateRouteDistance(order: number[], distances: number[][]): number {
  let total = 0;
  for (let i = 0; i < order.length - 1; i++) {
    total += distances[order[i]][order[i + 1]];
  }
  // Return to start
  total += distances[order[order.length - 1]][order[0]];
  return total;
}

export function estimateTimeMinutes(distanceKm: number, avgSpeedKmh = 30): number {
  return (distanceKm / avgSpeedKmh) * 60;
}
