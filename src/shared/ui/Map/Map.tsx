import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { mockParking } from '@/shared/data/parkingData';

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMarkerClick?: () => void;
}

export const Map = ({
  center = [37.6173, 55.7558],
  zoom = 14,
  className = '',
  onMarkerClick,
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center,
      zoom,
      // Включены стандартные жесты (по умолчанию true, но явно укажем для ясности)
      dragPan: true,        // перемещение перетаскиванием
      scrollZoom: true,     // масштаб колёсиком
      touchZoomRotate: true, // масштаб и поворот двумя пальцами
      doubleClickZoom: true,
      boxZoom: true,
    });

    mapRef.current = map;

    // Контролы
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
    map.addControl(
      new maplibregl.GeolocateControl({
        showUserLocation: true,
        trackUserLocation: false,
      }),
      'top-right'
    );

    // После загрузки — добавляем маркер
    map.on('load', () => {
      // Источник данных
      map.addSource('parking', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: mockParking.coordinates,
              },
              properties: mockParking,
            },
          ],
        },
      });

      // Слой: синий круг
      map.addLayer({
        id: 'parking-circle',
        type: 'circle',
        source: 'parking',
        paint: {
          'circle-radius': 10,
          'circle-color': '#1E90FF',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff',
        },
      });

      // Обработчики
      map.on('click', 'parking-circle', () => {
        onMarkerClick?.();
      });

      map.on('mouseenter', 'parking-circle', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'parking-circle', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    // Очистка
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    
  }, []);

  return (
    <div
      ref={mapContainer}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
};