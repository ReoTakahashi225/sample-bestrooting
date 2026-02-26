import { useState, useCallback } from 'react';
import type { DeliveryPin } from '../types';

const MAX_PINS = 20;

const SAMPLE_PINS: [number, number][] = [
  [34.9756, 138.3827],  // 静岡駅
  [34.9830, 138.3890],  // 呉服町通り
  [34.9700, 138.3950],  // 駿府城公園
  [34.9650, 138.3750],  // 静岡県庁
  [34.9900, 138.3700],  // 静岡浅間神社
  [34.9600, 138.4050],  // 東静岡駅
  [34.9550, 138.3600],  // 丸子
  [34.9850, 138.4100],  // 草薙
  [34.9780, 138.3650],  // 安西
  [34.9680, 138.3880],  // 駿河区役所
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
