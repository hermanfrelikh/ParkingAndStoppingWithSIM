import { Authorization } from '@/ui/pages/Authorization';
import { Favorites } from '@/ui/pages/Favorites';
import { MainPage } from '@/ui/pages/MainPage';
import { NotFound } from '@/ui/pages/NotFound';
import { Profile } from '@/ui/pages/Profile';
import { Registration } from '@/ui/pages/Registration';
import { Route, Routes } from 'react-router';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
