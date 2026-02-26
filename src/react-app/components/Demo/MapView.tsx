import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import type { DeliveryPin, RouteResult } from '../../types';

function createPinIcon(label: string, color = '#E76F51') {
  return L.divIcon({
    className: '',
    html: `<svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="${color}" stroke="#1B2D2A" stroke-width="1.5"/>
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

/** Auto-fit map bounds when pins change */
function AutoFitBounds({ pins }: { pins: DeliveryPin[] }) {
  const map = useMap();
  const prevCount = useRef(pins.length);

  useEffect(() => {
    if (pins.length >= 2 && (pins.length !== prevCount.current || pins.length >= 3)) {
      const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng] as [number, number]));
      map.flyToBounds(bounds, { padding: [40, 40], duration: 0.6 });
    }
    prevCount.current = pins.length;
  }, [pins, map]);

  return null;
}

/** Animate the optimized polyline drawing in */
function AnimatedPolyline({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  const polyRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (positions.length < 2) return;

    const polyline = L.polyline(positions, {
      color: '#2D6A4F',
      weight: 5,
      opacity: 1,
    }).addTo(map);

    polyRef.current = polyline;

    // Animate via SVG dashoffset
    const el = polyline.getElement() as SVGPathElement | null;
    if (el) {
      const length = el.getTotalLength?.() ?? 0;
      if (length > 0) {
        el.style.strokeDasharray = `${length}`;
        el.style.strokeDashoffset = `${length}`;
        el.style.transition = 'stroke-dashoffset 1.2s ease-in-out';
        // Force reflow then animate
        el.getBoundingClientRect();
        el.style.strokeDashoffset = '0';
      }
    }

    return () => {
      polyline.remove();
    };
  }, [positions, map]);

  return null;
}

interface MapViewProps {
  pins: DeliveryPin[];
  result: RouteResult | null;
  onMapClick: (lat: number, lng: number) => void;
}

export function MapView({ pins, result, onMapClick }: MapViewProps) {
  // Animation phase: show original first, then optimized
  const [showOptimized, setShowOptimized] = useState(false);
  const prevResult = useRef<RouteResult | null>(null);

  useEffect(() => {
    if (result && result !== prevResult.current) {
      setShowOptimized(false);
      const timer = setTimeout(() => setShowOptimized(true), 800);
      prevResult.current = result;
      return () => clearTimeout(timer);
    }
    if (!result) {
      setShowOptimized(false);
      prevResult.current = null;
    }
  }, [result]);

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
      center={[34.9756, 138.3827]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      <AutoFitBounds pins={pins} />

      {pins.map((pin, idx) => {
        let label = pin.label;
        let color = '#E76F51';
        if (result && showOptimized) {
          const visitOrder = result.optimizedOrder.indexOf(idx);
          label = String(visitOrder + 1);
          color = '#2D6A4F';
        }
        return (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            icon={createPinIcon(label, color)}
          />
        );
      })}

      {/* Original route — shown prominently first, then dimmed */}
      {result && originalRoute.length > 1 && (
        <Polyline
          positions={originalRoute}
          pathOptions={{
            color: showOptimized ? '#A0A0A0' : '#E76F51',
            weight: showOptimized ? 3 : 4,
            dashArray: showOptimized ? '8, 6' : undefined,
            opacity: showOptimized ? 0.6 : 1,
          }}
        />
      )}

      {/* Optimized route — animated draw-in */}
      {result && showOptimized && optimizedRoute.length > 1 && (
        <AnimatedPolyline positions={optimizedRoute} />
      )}
    </MapContainer>
  );
}
