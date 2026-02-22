import { useTheme } from '@/app/theme/useTheme';
import { Switch } from '@/ui/components/Switch';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return <Switch onChange={() => toggleTheme()} checked={theme === 'dark'} />;
};
