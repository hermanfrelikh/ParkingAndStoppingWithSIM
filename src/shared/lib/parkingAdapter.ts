import type { FeatureCollection, Feature, Point } from 'geojson';
import type { ParkingDTO, ParkingUIModel } from '@/shared/types/parking';

export const mapDtoToModel = (dto: ParkingDTO): ParkingUIModel => {
  // Вытаскиваем первую точку полигона: coordinates[0] - внешнее кольцо, [0] - первая точка
  // В GeoJSON порядок ВСЕГДА [longitude, latitude]
  const firstCoord = dto.coordinates.coordinates[0][0];
  const lon = firstCoord[0];
  const lat = firstCoord[1];

  return {
    id: dto.id,
    name_obj: dto.name_obj,
    vid: dto.description.split(',')[0] || 'Парковка', // Берем первое слово из описания как тип
    name: dto.name,

    // Новые поля из бэка
    adm_area: dto.adm_area,
    district: dto.district,
    occupied: dto.occupancy,
    all_spaces: dto.all_spaces,

    // Передаем как [lon, lat] для MapLibre
    coordinates: [lon, lat],

    // Маппинг для старых полей (совместимость с Favorites и остальным UI)
    name_ao: dto.adm_area,
    name_raion: dto.district,
    material_fence: null,
    commentary: dto.description,
  };
};

export const mapToGeoJson = (
  parkings: ParkingUIModel[]
): FeatureCollection<Point, ParkingUIModel> => {
  const features: Feature<Point, ParkingUIModel>[] = parkings.map(p => ({
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