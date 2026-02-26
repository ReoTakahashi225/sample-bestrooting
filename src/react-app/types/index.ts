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
}
