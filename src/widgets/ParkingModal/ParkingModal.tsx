// src/widgets/ParkingModal/ParkingModal.tsx
import { useEffect, useState } from 'react';
import { useFavorites } from '@/shared/lib/useFavorites';
import styles from './ParkingModal.module.scss';
import { ToggleButton } from '@/shared/ui/ToggleButton';
import { ParkingSpaces } from '@/shared/ui/ParkingSpaces';
import { IsFavoritesFilledIcon, IsFavoritesIcon } from '@/shared/assets/icons';
import type { ParkingUIModel } from '@/shared/types/parking';
import { parkingApi } from '@/shared/api/parkings';
import { mapDtoToModel } from '@/shared/lib/parkingAdapter';

interface ParkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  parkingId: number | null;
  initialData?: ParkingUIModel | null; // Предзагруженные данные с карты
}

export function ParkingModal({ isOpen, onClose, parkingId, initialData }: ParkingModalProps) {
  // Используем initialData как начальное состояние, если они есть
  const [parkingData, setParkingData] = useState<ParkingUIModel | null>(initialData || null);
  const [loading, setLoading] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  // Синхронизируем стейт, если initialData изменился (например, кликнули на другую парковку)
  useEffect(() => {
    if (initialData) {
      setParkingData(initialData);
    }
  }, [initialData]);

  // Загрузка детальных данных при открытии по ID (если данных с карты недостаточно или нужно обновить)
  useEffect(() => {
    if (isOpen && parkingId && !initialData) {
      const loadDetails = async () => {
        setLoading(true);
        try {
          const dto = await parkingApi.getById(parkingId);
          setParkingData(mapDtoToModel(dto));
        } catch (e) {
          console.error('Ошибка при загрузке деталей парковки:', e);
        } finally {
          setLoading(false);
        }
      };
      loadDetails();
    }
  }, [isOpen, parkingId, initialData]);

  // Обработка закрытия по клавише Esc
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
    if (parkingData) {
      // Адаптируем данные под старый интерфейс ParkingItem, который ожидает useFavorites
      // (превращаем число occupied в строку, чтобы избежать ошибок типизации)
      const legacyItem = {
        ...parkingData,
        occupied: String(parkingData.occupied)
      };

      toggleFavorite(legacyItem as any);
    }
  };

  if (!isOpen) return null;

  // Состояние загрузки
  if (loading && !parkingData) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.content}>
            <p>Загрузка данных...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!parkingData) return null;

  const isActive = isFavorite(parkingData.id);

  // Формируем строку для компонента ParkingSpaces (если он ждет формат "число/число")
  const occupiedString = `${parkingData.occupied}/100`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dragHandle} onClick={onClose} />

        <div className={styles.content}>
          <h2>{parkingData.name_obj}</h2>
          <p className={styles.type}>Тип: {parkingData.vid}</p>
          <p className={styles.district}>Район: {parkingData.district}</p>

          <ParkingSpaces parkingOccupied={occupiedString} />

          <div className={styles.description}>
            <p>{parkingData.commentary || "Описание временно отсутствует."}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <ToggleButton
            isActive={isActive}
            inactiveText="Добавить в избранное"
            activeText="Убрать из избранного"
            inactiveIcon={<IsFavoritesIcon />}
            activeIcon={<IsFavoritesFilledIcon />}
            onClick={handleToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}