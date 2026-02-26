import { useState, useCallback } from 'react';
import type { DeliveryPin } from '../types';

const MAX_PINS = 20;

const SAMPLE_PINS: [number, number][] = [
  [35.6812, 139.7671],  // Tokyo Station
  [35.6895, 139.6917],  // Shinjuku
  [35.6580, 139.7016],  // Shibuya
  [35.7100, 139.8107],  // Asakusa
  [35.6284, 139.7387],  // Shinagawa
  [35.7295, 139.7109],  // Ikebukuro
  [35.6600, 139.7280],  // Roppongi
  [35.6715, 139.7640],  // Ginza
  [35.7023, 139.7745],  // Ueno
  [35.6455, 139.7478],  // Meguro
];

export function useMapPins() {
  const [pins, setPins] = useState<DeliveryPin[]>([]);

  const addPin = useCallback((lat: number, lng: number) => {
    setPins(prev => {
      if (prev.length >= MAX_PINS) return prev;
      const label = String.fromCharCode(65 + prev.length);
      return [...prev, { id: crypto.randomUUID(), lat, lng, label }];
    });
  }, []);

  const removePin = useCallback((id: string) => {
    setPins(prev =>
      prev
        .filter(p => p.id !== id)
        .map((p, i) => ({ ...p, label: String.fromCharCode(65 + i) }))
    );
  }, []);

  const clearPins = useCallback(() => {
    setPins([]);
  }, []);

  const loadSample = useCallback(() => {
    setPins(
      SAMPLE_PINS.map(([lat, lng], i) => ({
        id: crypto.randomUUID(),
        lat,
        lng,
        label: String.fromCharCode(65 + i),
      }))
    );
  }, []);

  return { pins, addPin, removePin, clearPins, loadSample, maxPins: MAX_PINS };
}
