// src/pages/MainPage.tsx
import { useState } from 'react';
import { Map } from '@/shared/ui/Map';

import { ParkingModal } from '@/widgets/ParkingModal';
import { BottomNav } from '@/widgets/BottomNav/BottomNav';

export function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, position: 'relative' }}>
          <Map onMarkerClick={() => setIsModalOpen(true)} />
        </main>
        <BottomNav />
      </div>

      <ParkingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}