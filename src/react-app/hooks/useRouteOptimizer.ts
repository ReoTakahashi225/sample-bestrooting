import { useState, useCallback } from 'react';
import type { DeliveryPin, RouteResult } from '../types';
import { buildDistanceMatrix, calculateRouteDistance } from '../lib/geo-utils';
import { optimizeRoute } from '../lib/tsp-solver';
import { fetchRoadRoute } from '../lib/osrm';

export function useRouteOptimizer() {
  const [result, setResult] = useState<RouteResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimize = useCallback(async (pins: DeliveryPin[]) => {
    if (pins.length < 3) return;

    setIsOptimizing(true);

    try {
      // TSP optimization using Haversine distances
      const distances = buildDistanceMatrix(pins);
      const originalOrder = pins.map((_, i) => i);
      const optimizedOrder = optimizeRoute(distances);

      // Build waypoint lists (closed loop: return to start)
      const originalWaypoints = [...originalOrder, originalOrder[0]].map(i => pins[i]);
      const optimizedWaypoints = [...optimizedOrder, optimizedOrder[0]].map(i => pins[i]);

      // Fetch road routes in parallel
      const [originalRoad, optimizedRoad] = await Promise.all([
        fetchRoadRoute(originalWaypoints),
        fetchRoadRoute(optimizedWaypoints),
      ]);

      // Use road distances if available, otherwise fall back to Haversine
      const originalDistance = originalRoad
        ? originalRoad.distanceKm
        : calculateRouteDistance(originalOrder, distances);
      const optimizedDistance = optimizedRoad
        ? optimizedRoad.distanceKm
        : calculateRouteDistance(optimizedOrder, distances);

      const originalTime = originalRoad
        ? originalRoad.durationMin
        : (originalDistance / 30) * 60;
      const optimizedTime = optimizedRoad
        ? optimizedRoad.durationMin
        : (optimizedDistance / 30) * 60;

      setResult({
        originalDistance,
        optimizedDistance,
        originalTime,
        optimizedTime,
        savingsPercent:
          originalDistance > 0
            ? ((originalDistance - optimizedDistance) / originalDistance) * 100
            : 0,
        optimizedOrder,
        originalRoad: originalRoad?.coordinates ?? null,
        optimizedRoad: optimizedRoad?.coordinates ?? null,
      });
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
  }, []);

  return { result, isOptimizing, optimize, reset };
}
