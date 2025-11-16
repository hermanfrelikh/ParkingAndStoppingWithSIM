import { Text } from "../Text";
import styles from './ParkingSpaces.module.scss';

export function ParkingSpaces({parkingOccupied}) {
  return (
    <div className={styles.parkingSpaces}>
      <Text variant="h4">
        Занятость на парковке 
      </Text>
      <div className={styles.parkingSpacesCount}>
        {parkingOccupied}
      </div>
    </div>
  )
}
