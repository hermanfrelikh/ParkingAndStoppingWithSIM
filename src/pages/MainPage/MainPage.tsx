import { useState } from 'react';
import { Map } from '@/shared/ui/Map';

import { ParkingModal } from '@/widgets/ParkingModal';
import type { ParkingProperties } from '@/widgets/ParkingModal/ParkingModal';


export function MainPage() {
  const [selectedParking, setSelectedParking] = useState<ParkingProperties | null>(null);

  const closeModal = () => {
    setSelectedParking(null);
  };

  return (
    <>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, position: 'relative' }}>
          <Map onMarkerClick={(parking) => setSelectedParking(parking)} />
        </main>

      </div>

      <ParkingModal
        isOpen={!!selectedParking}
        onClose={closeModal}
        data={selectedParking}
      />
    </>
  );
}