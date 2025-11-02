import { useState } from 'react';
import { Map, } from '@/shared/ui/Map';
import type { ParkingProperties } from '@/shared/ui/Map/Map';
import { ParkingModal } from '@/widgets/ParkingModal';
import { BottomNav } from '@/widgets/BottomNav/BottomNav';

export function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParking, setSelectedParking] = useState<ParkingProperties | null>(null);

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, position: 'relative' }}>
          <Map setModalOpen={setModalOpen} setSelectedParking={setSelectedParking} />
        </main>
      </div>

      <ParkingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedParking}
      />

      {modalOpen ? null : <BottomNav />}
    </>
  );
}
