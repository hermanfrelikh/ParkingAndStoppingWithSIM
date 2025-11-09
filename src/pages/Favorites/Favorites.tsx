
import { Header } from '@/shared/ui/Header/Header';
import { useFavorites } from '@/shared/lib/useFavorites';
import { useNavigate } from 'react-router';
import styles from './Favorites.module.scss';

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
              <h3>{parking.name_obj}</h3>
              <p>Район: {parking.name_raion}</p>
              <p>Занято: {parking.occupied}</p>
              <button onClick={() => handleGoTo(parking.id)}>
                Перейти к парковке
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}