// src/widgets/ParkingModal/ParkingModal.tsx

import { useEffect, useState } from 'react';
import { BaseModal } from '@/ui/components/BaseModal/BaseModal'; // ⭐ ДОБАВЛЕНО
import { GlassModal } from '@/ui/components/GlassModal/GlassModal'; // ⭐ ДОБАВЛЕНО
import { useFavorites } from '@/shared/lib/useFavorites';
import styles from './ParkingModal.module.scss';
import { ToggleButton } from '@/ui/components/ToggleButton';
import { ParkingSpaces } from '@/ui/components/ParkingSpaces';
import { IsFavoritesFilledIcon, IsFavoritesIcon } from '@/shared/assets/icons';
import type { ParkingUIModel } from '@/shared/types/parking';
import { parkingApi } from '@/shared/api/parkings';
import { mapDtoToModel } from '@/shared/lib/parkingAdapter';

interface ParkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  parkingId: number | null;
  initialData?: ParkingUIModel | null;
  variant?: 'default' | 'glass'; // ⭐ ДОБАВЛЕНО
}

export function ParkingModal({
  isOpen,
  onClose,
  parkingId,
  initialData,
  variant = 'glass', // ⭐ ДОБАВЛЕНО
}: ParkingModalProps) {

  // ⭐ ДОБАВЛЕНО (выбор модалки)
  const ModalComponent = variant === 'glass' ? GlassModal : BaseModal;

  const [parkingData, setParkingData] = useState<ParkingUIModel | null>(
    initialData || null
  );

  const [loading, setLoading] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (initialData) {
      setParkingData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (isOpen && parkingId && !initialData) {
      const loadDetails = async () => {
        setLoading(true);

        try {
          // const dto = await parkingApi.getById(parkingId);
          // setParkingData(mapDtoToModel(dto));
        } catch (e) {
          console.error('Ошибка при загрузке деталей парковки:', e);
        } finally {
          setLoading(false);
        }
      };

      loadDetails();
    }
  }, [isOpen, parkingId, initialData]);

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
      const legacyItem = {
        ...parkingData,
        occupied: String(parkingData.occupied),
      };

      toggleFavorite(legacyItem as any);
    }
  };

  if (!parkingData && !loading) return null;

  const isActive = parkingData ? isFavorite(parkingData.id) : false;

  const occupiedString = parkingData
    ? `${parkingData.occupied}/${parkingData.all_spaces}`
    : '0/0';

  return (
    <ModalComponent className={styles.modalContainer} open={isOpen} onClose={onClose}> {/* ⭐ ИЗМЕНЕНО */}

      {loading && !parkingData && (
        <div className={styles.content}>
          <p>Загрузка данных...</p>
        </div>
      )}

      {parkingData && (
        <>
          <div className={styles.content}>
            <h2>{parkingData.name_obj}</h2>

            <p className={styles.type}>
              Тип: {parkingData.vid}
            </p>

            <p className={styles.district}>
              Район: {parkingData.district}
            </p>

            <ParkingSpaces parkingOccupied={occupiedString} />

            <div className={styles.description}>
              <p>
                {parkingData.commentary ||
                  'Описание временно отсутствует.'}
              </p>
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
        </>
      )}

    </ModalComponent>
  );
}