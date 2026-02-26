import styles from './Demo.module.css';
import { MapView } from './MapView';
import { useMapPins } from '../../hooks/useMapPins';
import { useRouteOptimizer } from '../../hooks/useRouteOptimizer';

export function Demo() {
  const { pins, addPin, removePin, clearPins, loadSample, maxPins } = useMapPins();
  const { result, isOptimizing, optimize, reset } = useRouteOptimizer();

  const handleOptimize = () => optimize(pins);

  const handleClear = () => {
    clearPins();
    reset();
  };

  const handleSample = () => {
    reset();
    loadSample();
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (!result) addPin(lat, lng);
  };

  return (
    <section id="demo" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>試してください。</h2>
        <p className={styles.sectionSub}>地図をクリックするだけで、最適ルートが見えます。</p>
      </div>

      <div className={styles.demoWrapper}>
        {/* Side Panel */}
        <div className={styles.panel}>
          <span className={styles.panelTitle}>配送先</span>

          {pins.length === 0 && !result && (
            <p className={styles.instruction}>
              地図をクリックして配送先を追加してください。
            </p>
          )}

          <span className={styles.counter}>
            {pins.length} / {maxPins}
          </span>

          {/* Pin list */}
          <div className={styles.pinList}>
            {pins.map(pin => (
              <div key={pin.id} className={styles.pinItem}>
                <span className={styles.pinBadge}>{pin.label}</span>
                <span className={styles.pinCoords}>
                  {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                </span>
                {!result && (
                  <button
                    className={styles.pinRemove}
                    onClick={() => removePin(pin.id)}
                    aria-label={`${pin.label}を削除`}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          {!result && (
            <div className={styles.panelActions}>
              <button
                className={styles.optimizeBtn}
                onClick={handleOptimize}
                disabled={pins.length < 3 || isOptimizing}
              >
                {isOptimizing ? '計算中...' : 'ルートを最適化'}
              </button>
              <div className={styles.secondaryBtns}>
                <button className={styles.sampleBtn} onClick={handleSample}>
                  サンプルデータ
                </button>
                {pins.length > 0 && (
                  <button className={styles.clearBtn} onClick={handleClear}>
                    クリア
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className={styles.results}>
              <span className={styles.resultLabel}>最適化結果</span>

              <div className={styles.resultRow}>
                <span className={styles.resultKey}>最適化前</span>
                <span className={`${styles.resultValue} ${styles.resultBefore}`}>
                  {result.originalDistance.toFixed(1)} km
                </span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultKey}>最適化後</span>
                <span className={`${styles.resultValue} ${styles.resultAfter}`}>
                  {result.optimizedDistance.toFixed(1)} km
                </span>
              </div>

              <div className={styles.savings}>
                <span className={styles.savingsValue}>
                  {result.savingsPercent.toFixed(0)}%
                </span>
                <span className={styles.savingsLabel}>削減</span>
              </div>

              <div className={styles.resultRow}>
                <span className={styles.resultKey}>時間</span>
                <span className={`${styles.resultValue} ${styles.resultAfter}`}>
                  {result.optimizedTime.toFixed(0)}分
                </span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultKey}>短縮</span>
                <span className={styles.resultValue} style={{ color: 'var(--color-accent)' }}>
                  {(result.originalTime - result.optimizedTime).toFixed(0)}分
                </span>
              </div>

              <button className={styles.resetBtn} onClick={handleClear}>
                リセットして再試行
              </button>
            </div>
          )}
        </div>

        {/* Map */}
        <div className={styles.mapContainer}>
          <MapView pins={pins} result={result} onMapClick={handleMapClick} />
          <div className={styles.mapNotice}>
            デモ用に無料地図（OpenStreetMap / CARTO）を使用しています。本番環境では Google Maps 等の商用地図に対応可能です。
          </div>
        </div>
      </div>
    </section>
  );
}
