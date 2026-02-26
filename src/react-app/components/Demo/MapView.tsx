import { MapContainer, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import type { DeliveryPin, RouteResult } from '../../types';

function createPinIcon(label: string) {
  return L.divIcon({
    className: '',
    html: `<svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="#E76F51" stroke="#1B2D2A" stroke-width="1.5"/>
      <text x="14" y="15" text-anchor="middle" dominant-baseline="central"
        fill="#F0EDE6" font-size="11" font-family="'DM Sans',sans-serif" font-weight="700">${label}</text>
    </svg>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapViewProps {
  pins: DeliveryPin[];
  result: RouteResult | null;
  onMapClick: (lat: number, lng: number) => void;
}

export function MapView({ pins, result, onMapClick }: MapViewProps) {
  // Straight-line fallbacks
  const originalStraight = result
    ? [...pins.map(p => [p.lat, p.lng] as [number, number]), [pins[0].lat, pins[0].lng] as [number, number]]
    : [];

  const optimizedStraight = result
    ? [...result.optimizedOrder.map(i => [pins[i].lat, pins[i].lng] as [number, number]),
       [pins[result.optimizedOrder[0]].lat, pins[result.optimizedOrder[0]].lng] as [number, number]]
    : [];

  // Prefer road geometries from OSRM, fall back to straight lines
  const originalRoute = result?.originalRoad ?? originalStraight;
  const optimizedRoute = result?.optimizedRoad ?? optimizedStraight;

  return (
    <MapContainer
      center={[35.6812, 139.7671]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />

      {pins.map(pin => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={createPinIcon(pin.label)}
        />
      ))}

      {/* Original route (gray dashed) */}
      {result && originalRoute.length > 1 && (
        <Polyline
          positions={originalRoute}
          pathOptions={{
            color: '#A0A0A0',
            weight: 3,
            dashArray: '8, 6',
          }}
        />
      )}

      {/* Optimized route (green solid) */}
      {result && optimizedRoute.length > 1 && (
        <Polyline
          positions={optimizedRoute}
          pathOptions={{
            color: '#2D6A4F',
            weight: 4,
          }}
        />
      )}
    </MapContainer>
  );
}
