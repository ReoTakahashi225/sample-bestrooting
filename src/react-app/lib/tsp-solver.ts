import { calculateRouteDistance } from './geo-utils';

/**
 * Nearest Neighbor heuristic for TSP.
 * Starts from node 0 (depot) and greedily visits the nearest unvisited node.
 */
export function nearestNeighborTSP(distances: number[][]): number[] {
  const n = distances.length;
  const visited = new Set<number>();
  const route: number[] = [0];
  visited.add(0);

  while (route.length < n) {
    const current = route[route.length - 1];
    let nearest = -1;
    let nearestDist = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited.has(j) && distances[current][j] < nearestDist) {
        nearest = j;
        nearestDist = distances[current][j];
      }
    }

    route.push(nearest);
    visited.add(nearest);
  }

  return route;
}

/**
 * 2-opt improvement: repeatedly reverses sub-segments to reduce total distance.
 */
export function twoOptImprove(route: number[], distances: number[][]): number[] {
  const n = route.length;
  let improved = true;
  let best = [...route];
  let bestDist = calculateRouteDistance(best, distances);

  while (improved) {
    improved = false;
    for (let i = 1; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        const candidate = [
          ...best.slice(0, i),
          ...best.slice(i, j + 1).reverse(),
          ...best.slice(j + 1),
        ];
        const candidateDist = calculateRouteDistance(candidate, distances);
        if (candidateDist < bestDist - 0.0001) {
          best = candidate;
          bestDist = candidateDist;
          improved = true;
        }
      }
    }
  }

  return best;
}

/**
 * Full optimization: nearest neighbor + 2-opt improvement.
 */
export function optimizeRoute(distances: number[][]): number[] {
  const initial = nearestNeighborTSP(distances);
  return twoOptImprove(initial, distances);
}
