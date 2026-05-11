import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

// Примерные границы МКАД для фильтрации "вылетов" за город
const BOUNDS = {
  latMin: 55.58,
  latMax: 55.90,
  lonMin: 37.38,
  lonMax: 37.84
};

const generateRealisticParking = (count: number) => {
  const features = [];

  for (let i = 0; i < count; i++) {
    // Генерируем случайные координаты внутри границ
    const lon = BOUNDS.lonMin + Math.random() * (BOUNDS.lonMax - BOUNDS.lonMin);
    const lat = BOUNDS.latMin + Math.random() * (BOUNDS.latMax - BOUNDS.latMin);

    // Определяем округ "на глаз" для реалистичности метаданных
    let ao = "ЦАО";
    if (lat > 55.82) ao = "САО";
    else if (lat < 55.65) ao = "ЮАО";
    else if (lon < 37.50) ao = "ЗАО";
    else if (lon > 37.75) ao = "ВАО";
    else if (lat > 55.78 && lon > 37.65) ao = "СВАО";

    features.push({
      "type": "Feature",
      "id": 5000 + i,
      "properties": {
        "id": 5000 + i,
        "name_obj": `Муниципальная парковка №${Math.floor(Math.random() * 9000 + 1000)}`,
        "vid": "Автостоянка",
        "name_ao": ao,
        "name_raion": "Городская территория",
        "occupied": `${Math.floor(Math.random() * 11)}/10`,
        "status": Math.random() > 0.3 ? "active" : "maintenance"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [lon, lat],
          [lon + 0.002, lat],
          [lon + 0.002, lat + 0.001],
          [lon, lat + 0.001],
          [lon, lat]
        ]]
      }
    });
  }
  return features;
};

export const mockParking: FeatureCollection<Geometry, GeoJsonProperties> = {
  type: 'FeatureCollection',
  "features": generateRealisticParking(60) // Генерируем 60 объектов для плотного, но разрозненного покрытия
};