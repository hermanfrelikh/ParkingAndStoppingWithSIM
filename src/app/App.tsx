import { BrowserRouter } from 'react-router';
import { AppRouter } from './AppRouter';
import { BottomNav } from '@/widgets/BottomNav/BottomNav';
import { ThemeProvider } from '@/app/context/ThemeProvider';

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <AppRouter />
          <BottomNav />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
