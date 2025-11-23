import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { mockParking } from '@/shared/data/parkingData';
import { ParkingModal } from '@/widgets/ParkingModal/ParkingModal';
import { useSearchParams, useNavigate } from 'react-router';

type ParkingProperties = import('@/widgets/ParkingModal/ParkingModal').ParkingProperties;

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedParking, setSelectedParking] = useState<ParkingProperties | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const currentSelectedId = useRef<number | null>(null);

  const getPolygonCenter = (coordinates: [number, number][]): [number, number] => {
    let x = 0, y = 0;
    for (const [lng, lat] of coordinates) {
      x += lng;
      y += lat;
    }
    return [x / coordinates.length, y / coordinates.length];
  };

  const highlightParking = useCallback((id: number | null) => {
    const map = mapRef.current;
    if (!map || !map.getSource('parkings')) return;


    if (currentSelectedId.current !== null) {
      map.setFeatureState(
        { source: 'parkings', id: currentSelectedId.current },
        { selected: false }
      );
    }

    if (id === null) {
      setModalOpen(false);
      currentSelectedId.current = null;
      return;
    }

    const feature = mockParking.features.find((f) => f.properties?.id === id);

    if (feature) {

      map.setFeatureState(
        { source: 'parkings', id: id },
        { selected: true }
      );
      currentSelectedId.current = id;


      if (feature.geometry.type === 'Polygon') {
        const coords = feature.geometry.coordinates[0];
        const center = getPolygonCenter(coords);
        map.flyTo({
          center: center,
          zoom: 16,
          speed: 1.5,
          curve: 1,
          essential: true
        });
      }

      const props = feature.properties as any;
      setSelectedParking({
        id: Number(props.id),
        name_obj: props.name_obj || '',
        vid: props.vid || '',
        name: props.name || null,
        material_fence: props.material_fence || null,
        name_ao: props.name_ao || '',
        name_raion: props.name_raion || '',
        occupied: props.occupied || '',
        commentary: props.commentary || '',
      });
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current!,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [37.6173, 55.7558],
      zoom: 11,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      map.addSource('parkings', {
        type: 'geojson',
        data: mockParking,
        promoteId: 'id',
      });

      map.addLayer({
        id: 'parking-polygons',
        type: 'fill',
        source: 'parkings',
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#FF4500',
            '#1E90FF',
          ],
          'fill-opacity': 0.6,
        },
      });

      map.addLayer({
        id: 'parking-outlines',
        type: 'line',
        source: 'parkings',
        paint: {
          'line-color': '#104E8B',
          'line-width': 2,
        },
      });


      const initialParams = new URLSearchParams(window.location.search);
      const initialId = initialParams.get('parkingId');

      if (initialId) {

        highlightParking(Number(initialId));
      } else {

        map.flyTo({
          center: [37.525, 55.835],
          zoom: 14,
          speed: 1.2,
          curve: 1.1,
          essential: true
        });
      }

      map.on('click', 'parking-polygons', (e) => {
        if (e.features && e.features.length > 0) {
          const id = e.features[0].properties.id;
          navigate(`/?parkingId=${id}`, { replace: true });
        }
      });

      map.on('mouseenter', 'parking-polygons', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'parking-polygons', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getSource('parkings')) return;

    const idParam = searchParams.get('parkingId');
    const id = idParam ? Number(idParam) : null;

    if (id !== currentSelectedId.current) {
      highlightParking(id);
    }

  }, [searchParams, highlightParking]);

  const closeModal = () => {
    setModalOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
      <ParkingModal
        isOpen={modalOpen}
        onClose={closeModal}
        data={selectedParking}
      />
    </>
  );
}