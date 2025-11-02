import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { mockParking } from '@/shared/data/parkingData';

export interface ParkingProperties {
  id: number;
  name_obj: string;
  vid: string;
  name: string | null;
  material_fence: string | null;
  name_ao: string;
  name_raion: string;
  occupied: string;
}

interface MapProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedParking: React.Dispatch<React.SetStateAction<ParkingProperties | null>>;
}

export const Map = ({ setModalOpen, setSelectedParking }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [37.6173, 55.7558],
      zoom: 14,
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

      map.on('click', 'parking-polygons', (e) => {
        if (!e.features || e.features.length === 0) return;
        const props = e.features[0].properties as any;
        if (props) {
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
  }, [setModalOpen, setSelectedParking]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};
