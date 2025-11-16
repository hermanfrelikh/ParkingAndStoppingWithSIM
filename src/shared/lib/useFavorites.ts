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

  const saveToStorage = (updated: ParkingItem[]) => {
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const addToFavorites = (item: ParkingItem) => {
    if (!favorites.some(p => p.id === item.id)) {
      saveToStorage([...favorites, item]);
    }
  };

  const removeFromFavorites = (id: number) => {
    const updated = favorites.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  const toggleFavorite = (item: ParkingItem) => {
    const id = item.id;
    if (favorites.some(p => p.id === id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(item);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some(p => p.id === id);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites, 
    toggleFavorite,      
    isFavorite,
  };
}