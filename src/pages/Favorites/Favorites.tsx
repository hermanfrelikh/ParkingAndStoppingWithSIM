
import { Header } from '@/shared/ui/Header/Header';
import { useFavorites } from '@/shared/lib/useFavorites';
import { useNavigate } from 'react-router';
import styles from './Favorites.module.scss';
import { Text } from '@/shared/ui/Text';
import { ParkingSpaces } from '@/shared/ui/ParkingSpaces';
import { StaticButton } from '@/shared/ui/StaticButton';

export function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleGoTo = (id: number) => {
    navigate(`/?parkingId=${id}`);
  };

  return (
    <main className={styles.favorites}>
      <Header title="Избранные" />
      
      {favorites.length === 0 ? (
        <div >
          <p>Нет избранных парковок</p>
        </div>
      ) : (
        <ul className={styles.favoritesList}>
          {favorites.toReversed().map((parking) => (
            <li key={parking.id} className={styles.favoritesItem}>
              <div className={styles.favoritesInfo}>
                <Text variant="h3">
                  {parking.name_obj}
                </Text>
                <Text className={styles.favoritesAddress} variant="h4">
                  {parking.name_raion}
                </Text>
                <ParkingSpaces parkingOccupied={parking.occupied} />
              </div>
              
              <StaticButton text={"Перейти к парковке"} onClick={()=>handleGoTo(parking.id)}/>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}