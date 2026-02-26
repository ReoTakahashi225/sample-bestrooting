import { useState, useCallback } from 'react';
import type { DeliveryPin, RouteResult } from '../types';
import { buildDistanceMatrix, calculateRouteDistance, estimateTimeMinutes } from '../lib/geo-utils';
import { optimizeRoute } from '../lib/tsp-solver';

export function useRouteOptimizer() {
  const [result, setResult] = useState<RouteResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimize = useCallback((pins: DeliveryPin[]) => {
    if (pins.length < 3) return;

    setIsOptimizing(true);

    // Small delay for UX feedback
    setTimeout(() => {
      const distances = buildDistanceMatrix(pins);

      // Original: sequential order
      const originalOrder = pins.map((_, i) => i);
      const originalDistance = calculateRouteDistance(originalOrder, distances);

      // Optimized: nearest neighbor + 2-opt
      const optimizedOrder = optimizeRoute(distances);
      const optimizedDistance = calculateRouteDistance(optimizedOrder, distances);

      setResult({
        originalDistance,
        optimizedDistance,
        originalTime: estimateTimeMinutes(originalDistance),
        optimizedTime: estimateTimeMinutes(optimizedDistance),
        savingsPercent:
          originalDistance > 0
            ? ((originalDistance - optimizedDistance) / originalDistance) * 100
            : 0,
        optimizedOrder,
      });
      setIsOptimizing(false);
    }, 400);
  }, []);

  const reset = useCallback(() => {
    setResult(null);
  }, []);

  return { result, isOptimizing, optimize, reset };
}
