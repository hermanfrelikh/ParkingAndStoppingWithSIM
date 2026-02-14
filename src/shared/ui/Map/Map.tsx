// src/shared/ui/Map/Map.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ParkingModal } from '@/widgets/ParkingModal/ParkingModal';
import { useSearchParams, useNavigate } from 'react-router';
import type { FeatureCollection, Point } from 'geojson';
import type { ParkingUIModel } from '@/shared/types/parking';

interface MapProps {
  data: FeatureCollection<Point, ParkingUIModel> | null;
}

export function Map({ data }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedParking, setSelectedParking] = useState<ParkingUIModel | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const currentSelectedId = useRef<number | null>(null);

  // Храним data в рефе, чтобы доступ к ней внутри map.on('load') был всегда актуальным
  const dataRef = useRef(data);

  // Обновляем реф при изменении пропсов
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const highlightParking = useCallback((id: number | null) => {
    const map = mapRef.current;
    if (!map || !map.getLayer('parking-points')) return; // Проверка слоя, а не только карты

    // Если данные еще не подгрузились в источник, мы не сможем выделить фичу.
    // Но так как мы передаем data сразу, это должно сработать.

    if (currentSelectedId.current !== null) {
      // Пытаемся снять выделение (может не сработать, если id не найден, поэтому try/catch не нужен, maplibre просто проигнорит)
      if (map.getSource('parkings')) {
        map.setFeatureState(
          { source: 'parkings', id: currentSelectedId.current },
          { selected: false }
        );
      }
    }

    if (id === null) {
      setModalOpen(false);
      currentSelectedId.current = null;
      return;
    }

    // Ищем в пропсах (так надежнее, чем querySourceFeatures)
    const feature = dataRef.current?.features.find(f => f.id === id);

    if (feature) {
      if (map.getSource('parkings')) {
        map.setFeatureState({ source: 'parkings', id: id }, { selected: true });
      }
      currentSelectedId.current = id;

      const [lon, lat] = feature.geometry.coordinates;

      map.flyTo({
        center: [lon, lat],
        zoom: 16,
        speed: 1.5,
        essential: true,
      });

      setSelectedParking(feature.properties);
      setModalOpen(true);
    }
  }, []); // Убрали зависимость от data, используем ref

  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current!,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [37.6173, 55.7558],
      zoom: 10,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      console.log('Map loaded. Initializing source with:', dataRef.current);

      // ! ИСПРАВЛЕНИЕ: Используем dataRef.current сразу при инициализации
      // Если данные уже пришли, они сразу появятся. Если null - пустой массив.
      const initialData = dataRef.current || {
        type: 'FeatureCollection',
        features: [],
      };

      map.addSource('parkings', {
        type: 'geojson',
        data: initialData,
        promoteId: 'id',
      });

      map.addLayer({
        id: 'parking-points',
        type: 'circle',
        source: 'parkings',
        paint: {
          // Делаем фиксированный радиус 10px при любом зуме
          'circle-radius': 10,
          // Ярко-красный цвет
          'circle-color': '#FF0000',
          // Белая обводка
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 1,
        },
      });

      map.on('click', 'parking-points', e => {
        if (e.features && e.features.length > 0) {
          const id = e.features[0].id as number;
          navigate(`/?parkingId=${id}`, { replace: true });
        }
      });

      map.on('mouseenter', 'parking-points', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'parking-points', () => {
        map.getCanvas().style.cursor = '';
      });

      // После загрузки карты проверяем URL, вдруг надо сразу открыть парковку
      const idParam = new URLSearchParams(window.location.search).get(
        'parkingId'
      );
      if (idParam) {
        // Небольшой таймаут, чтобы источник успел "переварить" данные
        setTimeout(() => highlightParking(Number(idParam)), 100);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Пустой массив зависимостей - инициализация 1 раз

  // Реакция на изменение данных (если они подгрузились ПОЗЖЕ инициализации карты)
  useEffect(() => {
    const map = mapRef.current;
    // Проверяем loaded(), чтобы не вызвать setData на незагруженный стиль
    if (map && map.getSource('parkings') && map.isStyleLoaded() && data) {
      console.log('Updating map data via useEffect');
      const source = map.getSource('parkings') as maplibregl.GeoJSONSource;
      source.setData(data);
    }
  }, [data]);

  // Реакция на изменение URL
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getSource('parkings') || !data)
      return;

    const idParam = searchParams.get('parkingId');
    const id = idParam ? Number(idParam) : null;

    if (id !== currentSelectedId.current) {
      highlightParking(id);
    }
  }, [searchParams, highlightParking, data]); // Здесь data нужна, чтобы пересчитать поиск

  const closeModal = () => {
    setModalOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <ParkingModal
        isOpen={modalOpen}
        onClose={closeModal}
        parkingId={selectedParking?.id || null}
        initialData={selectedParking}
      />
    </>
  );
}
