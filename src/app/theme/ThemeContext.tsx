import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Создаём контекст
export const ThemeContext = createContext<ThemeContextType | null>(null);
