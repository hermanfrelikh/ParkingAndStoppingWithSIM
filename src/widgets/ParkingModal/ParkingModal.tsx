import { useEffect } from 'react';
import styles from './ParkingModal.module.scss';

interface ParkingProperties {
  id: number;
  name_obj: string;
  vid: string;
  name: string | null;
  material_fence: string | null;
  name_ao: string;
  name_raion: string;
  occupied: string
}

interface ParkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ParkingProperties | null;
}

export function ParkingModal({ isOpen, onClose, data }: ParkingModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dragHandle} onClick={onClose} />
        <div className={styles.content}>
          <h2>{data.name_obj}</h2>
          <p>Тип: {data.vid}</p>
          <p>Район: {data.name_raion}</p>
          <p>Занято: {data.occupied}</p>
        </div>
      </div>
    </div>
  );
}
