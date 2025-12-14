// src/shared/lib/parkingAdapter.ts
import type { FeatureCollection, Feature, Point } from 'geojson';
import type { ParkingDTO, ParkingUIModel } from '@/shared/types/parking';

export const mapDtoToModel = (dto: ParkingDTO): ParkingUIModel => {
  return {
    id: dto.id,
    name_obj: dto.name_obj,
    vid: dto.description || 'Парковка', // Берем описание как тип
    name: dto.name,
    
    // Новые поля
    adm_area: dto.adm_area,
    district: dto.district,
    occupied: dto.occupancy,
    coordinates: [dto.coordinates.lon, dto.coordinates.lat],
    
    // --- ЗАПОЛНЯЕМ СТАРЫЕ ПОЛЯ ---
    name_ao: dto.adm_area,       // Просто копируем значение
    name_raion: dto.district,    // Просто копируем значение
    material_fence: null,        // Данных нет, ставим null
    commentary: dto.description, // Можно использовать описание как комментарий
  };
};

// Функция для GeoJSON остается прежней
export const mapToGeoJson = (parkings: ParkingUIModel[]): FeatureCollection<Point, ParkingUIModel> => {
  const features: Feature<Point, ParkingUIModel>[] = parkings.map((p) => ({
    type: 'Feature',
    id: p.id,
    properties: p,
    geometry: {
      type: 'Point',
      coordinates: p.coordinates,
    },
  }));

  return {
    type: 'FeatureCollection',
    features,
  };
};