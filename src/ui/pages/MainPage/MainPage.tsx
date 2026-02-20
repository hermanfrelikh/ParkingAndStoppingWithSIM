import { useEffect, useState } from 'react';
import { Map } from '@/ui/components/Map/Map';
import { parkingApi } from '@/shared/api/parkings';
import { mapDtoToModel, mapToGeoJson } from '@/shared/lib/parkingAdapter';
import type { FeatureCollection, Point } from 'geojson';
import type { ParkingUIModel } from '@/shared/types/parking';
import style from './MainPage.module.scss';
import { mockParking } from '@/shared/data/parkingData';


export function MainPage() {
  // ИСПРАВЛЕНИЕ: Явно указываем типы Point и ParkingUIModel
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<
    Point,
    ParkingUIModel
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (import.meta.env.VITE_USE_MOCK === 'true') {
          setGeoJsonData(mockParking as any);
          return;
        }

        const data = await parkingApi.getAll();
        if (!data) return;

        const models = data.map(mapDtoToModel);
        const geoJson = mapToGeoJson(models);
        setGeoJsonData(geoJson);
      } catch (error) {
        console.error('Ошибка загрузки парковок:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className={style.mainPage}>
      <main style={{ flex: 1, position: 'relative' }}>
        {isLoading ? <div>Загрузка карты...</div> : <Map data={geoJsonData} />}
      </main>
    </div>
  );
}
