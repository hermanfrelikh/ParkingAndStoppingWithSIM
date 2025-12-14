
export interface ParkingDTO {
  id: number;
  description: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  name: string;
  name_obj: string;
  adm_area: string;
  district: string;
  occupancy: number;
}

export interface ParkingUIModel {
  id: number;
  name_obj: string;
  vid: string;
  name: string | null;
  
  // Новые поля (чистые)
  address?: string;
  adm_area: string;
  district: string;
  occupied: number; 
  coordinates: [number, number];
  commentary?: string;

  name_ao: string;      
  name_raion: string;    
  material_fence: string | null; 
}