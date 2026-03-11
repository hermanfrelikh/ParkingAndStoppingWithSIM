import axios from 'axios';
import type { ParkingDTO } from '@/shared/types/parking';
import { mockParking } from '@/shared/data/parkingData';
// import { USE_MOCK } from '@/shared/config/env'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL: 'https://backend-c6pd.onrender.com',
});

export const parkingApi = {
  getAll: async (): Promise<ParkingDTO[] | null> => {
    if (USE_MOCK) {
      console.log('📦 Using MOCK GeoJSON');
      return null;
    }

    const { data } = await api.get<ParkingDTO[]>('/api/parkings/all');

    return data;
  },
};