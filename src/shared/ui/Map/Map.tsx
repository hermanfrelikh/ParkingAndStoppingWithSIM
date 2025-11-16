import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [37.6173, 55.7558],
      zoom: 14,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      const bounds: [[number, number], [number, number]] = [
        [37.5415, 55.8320],
        [37.5462, 55.8375],
      ];
      map.fitBounds(bounds, { padding: 40 });

      map.addSource('parkings', {
        type: 'geojson',
        data: mockParking,
      });

      map.addLayer({
        id: 'parking-polygons',
        type: 'fill',
        source: 'parkings',
        paint: {
          'fill-color': '#1E90FF',
          'fill-opacity': 0.5,
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

      const parkingIdParam = searchParams.get('parkingId');
      if (parkingIdParam) {
        const id = Number(parkingIdParam);
        const feature = mockParking.features.find(f => f.properties?.id === id);
        if (feature && feature.geometry.type === 'Polygon') {
          const coords = feature.geometry.coordinates[0];
          const center = getPolygonCenter(coords);
          map.easeTo({ center, zoom: 16, duration: 500 });

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
          });
          setModalOpen(true);
        }
      }

      map.on('click', 'parking-polygons', (e) => {
        if (!e.features?.[0]?.properties) return;
        const props = e.features[0].properties as any;
        const parkingData: ParkingProperties = {
          id: Number(props.id),
          name_obj: props.name_obj || '',
          vid: props.vid || '',
          name: props.name || null,
          material_fence: props.material_fence || null,
          name_ao: props.name_ao || '',
          name_raion: props.name_raion || '',
          occupied: props.occupied || '',
        };

        if (e.features[0].geometry.type === 'Polygon') {
          const coords = e.features[0].geometry.coordinates[0];
          const center = getPolygonCenter(coords);
          map.easeTo({ center, zoom: 16, duration: 300 });
        }

        setSelectedParking(parkingData);
        setModalOpen(true);
        navigate(`/?parkingId=${parkingData.id}`, { replace: true });
      });

      map.on('mouseenter', 'parking-polygons', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'parking-polygons', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedParking(null);
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

function getPolygonCenter(coordinates: [number, number][]): [number, number] {
  let x = 0, y = 0;
  for (const [lng, lat] of coordinates) {
    x += lng;
    y += lat;
  }
  return [x / coordinates.length, y / coordinates.length];
}