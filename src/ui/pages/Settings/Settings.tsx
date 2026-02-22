import { Header } from '@/ui/components/Header';
import { ThemeToggle } from '@/ui/components/ThemeToggle';
import style from './Settings.module.scss';
import { useTheme } from '@/app/theme/useTheme';
import { Text } from '@/ui/components/Text';
import { Switch } from '@/ui/components/Switch';
import { ToggleButton } from '@/ui/components/ToggleButton';
import LiquidGlassCard from '@/ui/components/LiquidGlassCard/LiquidGlassCard';

export function Settings() {
  const { theme } = useTheme();
  return (
    <div className={style[theme]}>
      <Header title="Настройки" />
      <LiquidGlassCard className={style.settingsCard}>
        <div className={style.settingsCardItem}>
          <Text variant="body">Тёмная тема</Text>
          <ThemeToggle />
        </div>
        <div className={style.settingsCardItem}>
          <Text variant="body">Отображать СИМ</Text>
          <Switch />
        </div>
        <div className={style.settingsCardItem}>
          <Text variant="body">Отображать парковки</Text>
          <Switch />
        </div>
        <div className={style.settingsCardItem}>
          <Text variant="body">Отображать остановки </Text>
          <Switch />
        </div>
      </LiquidGlassCard>
    </div>
  );
}
