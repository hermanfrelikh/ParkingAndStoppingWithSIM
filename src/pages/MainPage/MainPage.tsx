import { Map } from '@/shared/ui/Map/Map';

export function MainPage() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, position: 'relative' }}>
        <Map />
      </main>
    </div>
  );
}