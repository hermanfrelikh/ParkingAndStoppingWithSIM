import { BrowserRouter } from 'react-router';
import { AppRouter } from './AppRouter';
import { BottomNav } from '@/widgets/BottomNav/BottomNav';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
        <BottomNav />
      </BrowserRouter>
    </>
  );
}

export default App;
