export interface DeliveryPin {
  id: string;
  lat: number;
  lng: number;
  label: string;
}

export interface RouteResult {
  originalDistance: number;
  optimizedDistance: number;
  originalTime: number;
  optimizedTime: number;
  savingsPercent: number;
  optimizedOrder: number[];
  /** Road geometry for the original route (if available from OSRM) */
  originalRoad: [number, number][] | null;
  /** Road geometry for the optimized route (if available from OSRM) */
  optimizedRoad: [number, number][] | null;
}
