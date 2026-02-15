import { ThemeContext } from '@/app/context/ThemeContext';
import { useContext } from 'react';

// Кастомный хук
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
