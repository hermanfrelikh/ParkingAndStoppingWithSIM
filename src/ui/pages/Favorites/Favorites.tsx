import { Header } from '@/ui/components/Header/Header';
import { useFavorites, type ParkingItem } from '@/shared/lib/useFavorites';
import { useNavigate } from 'react-router';
import styles from './Favorites.module.scss';
import { Text } from '@/ui/components/Text';
import { ParkingSpaces } from '@/ui/components/ParkingSpaces';
import { StaticButton } from '@/ui/components/StaticButton';
import { ToggleButton } from '@/ui/components/ToggleButton/ToggleButton';
import { IsFavoritesFilledIcon, IsFavoritesIcon } from '@/shared/assets/icons';

export function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleGoTo = (id: number) => {
    navigate(`/?parkingId=${id}`);
  };

  const handleDelete = (id: number) => {
    removeFromFavorites(id);
  };

  return (
    <main className={styles.favorites}>
      <Header title="Избранные" />

      {favorites.length === 0 ? (
        <div>
          <p>Нет избранных парковок</p>
        </div>
      ) : (
        <ul className={styles.favoritesList}>
          {favorites.toReversed().map((parking: ParkingItem) => (
            <li key={parking.id} className={styles.favoritesItem}>
              <div className={styles.favoritesInfo}>
                <Text variant="h3">{parking.name_obj}</Text>
                <Text className={styles.favoritesAddress} variant="h4">
                  {parking.name_raion}
                </Text>
                <ParkingSpaces parkingOccupied={parking.occupied} />
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexDirection: 'column',
                }}
              >
                <StaticButton
                  text="Перейти к парковке"
                  onClick={() => handleGoTo(parking.id)}
                />

                <ToggleButton
                  isActive={true}
                  inactiveText="Добавить в избранное"
                  activeText="Убрать из избранного"
                  inactiveIcon={<IsFavoritesIcon />}
                  activeIcon={<IsFavoritesFilledIcon />}
                  onClick={() => handleDelete(parking.id)}
                  className={styles.customToggleButton}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
