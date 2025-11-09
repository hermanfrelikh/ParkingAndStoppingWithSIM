// src/shared/lib/useFavorites.ts
import { useState, useEffect } from 'react';

export type ParkingItem = {
  id: number;
  name_obj: string;
  vid: string;
  name: string | null;
  material_fence: string | null;
  name_ao: string;
  name_raion: string;
  occupied: string;
};

const FAVORITES_KEY = 'parking_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<ParkingItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const addToFavorites = (item: ParkingItem) => {
    const exists = favorites.some(p => p.id === item.id);
    if (!exists) {
      const updated = [...favorites, item];
      setFavorites(updated);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some(p => p.id === id);
  };

  return {
    favorites,
    addToFavorites,
    isFavorite,
  };
}