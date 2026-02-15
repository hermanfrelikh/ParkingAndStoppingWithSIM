import axios from 'axios';
import type { ParkingDTO } from '@/shared/types/parking';

const api = axios.create({
  // Используем относительный путь, чтобы запрос проходил через Vite Proxy
  baseURL: '/api',
});

export const parkingApi = {
  getAll: async (): Promise<ParkingDTO[]> => {
    // Запрос пойдет на /api/parkings/all
    const { data } = await api.get<ParkingDTO[]>('/parkings/all');
    return data;
  },

  getById: async (id: number): Promise<ParkingDTO> => {
    // Запрос пойдет на /api/parking/{id}
    const { data } = await api.get<ParkingDTO>(`/parking/${id}`);
    return data;
  },
};
