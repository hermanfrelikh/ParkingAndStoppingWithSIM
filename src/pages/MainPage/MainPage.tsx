import { useState } from 'react';
import { Map } from '@/shared/ui/Map';

import { ParkingModal } from '@/widgets/ParkingModal';


export function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, position: 'relative' }}>
          <Map onMarkerClick={() => setIsModalOpen(true)} />
        </main>
        
      </div>

      <ParkingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}