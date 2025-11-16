import { useEffect } from 'react';
import { useFavorites } from '@/shared/lib/useFavorites';
import styles from './ParkingModal.module.scss';
import { ToggleButton } from '@/shared/ui/ToggleButton';
import { ParkingSpaces } from '@/shared/ui/ParkingSpaces';
import { IsFavoritesFilledIcon, IsFavoritesIcon } from '@/shared/assets/icons';

export type ParkingProperties = {
  id: number;
  name_obj: string;
  vid: string;
  name: string | null;
  material_fence: string | null;
  name_ao: string;
  name_raion: string;
  occupied: string;
};

interface ParkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ParkingProperties | null;
}

export function ParkingModal({ isOpen, onClose, data }: ParkingModalProps) {

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleToggleFavorite = () => {
    if (data) {
      toggleFavorite(data); 
    }
  };

  if (!isOpen || !data) return null;

  const isActive = isFavorite(data.id);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dragHandle} onClick={onClose} />
        <div className={styles.content}>
          <h2>{data.name_obj}</h2>
          <p>Тип: {data.vid}</p>
          <p>Район: {data.name_raion}</p>
          <ParkingSpaces parkingOccupied={data.occupied} />
          
        </div>
        
        <ToggleButton
          isActive={isActive}
          inactiveText="Добавить в избранное"
          activeText="Убрать из избранного"
          inactiveIcon={<IsFavoritesIcon/>}
          activeIcon={<IsFavoritesFilledIcon/>}
          onClick={handleToggleFavorite} 
        />
        
      </div>
    </div>
  );
}