// src/shared/types/parking.ts

export interface ParkingDTO {
  id: number;
  description: string;
  name: string;
  name_obj: string;
  adm_area: string;
  district: string;
  occupancy: number;
  all_spaces: number;
  // Теперь координаты — это объект GeoJSON
  coordinates: {
    type: "Polygon";
    coordinates: number[][][]; // Массив колец, внутри которых массивы точек [lon, lat]
  };
}

export interface ParkingUIModel {
  id: number;
  name_obj: string;
  vid: string;
  name: string;
  adm_area: string;
  district: string;
  occupied: number;
  all_spaces: number;
  coordinates: [number, number]; // [lon, lat] для маркера
  name_ao: string;
  name_raion: string;
  material_fence: string | null;
  commentary: string;
}