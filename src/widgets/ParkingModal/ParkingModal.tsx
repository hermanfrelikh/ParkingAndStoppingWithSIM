import { useEffect } from 'react';
import styles from './ParkingModal.module.scss';
import { mockParking } from '@/shared/data/parkingData';

interface ParkingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ParkingModal({ isOpen, onClose }: ParkingModalProps) {
  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Модалка выезжает снизу */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Полоска для закрытия */}
        <div className={styles.dragHandle} onClick={onClose} />

        {/* Контент */}
        <div className={styles.content}>
          <h2>{mockParking.name}</h2>
          <p>{mockParking.address}</p>
          <p>Свободно: {mockParking.capacity}</p>
        </div>
      </div>
    </div>
  );
}