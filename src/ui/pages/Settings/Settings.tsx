import { Header } from '@/ui/components/Header';
import { ThemeToggle } from '@/ui/components/ThemeToggle';
import style from './Settings.module.scss';
import { useTheme } from '@/app/theme/useTheme';
import { Text } from '@/ui/components/Text';
import { Switch } from '@/ui/components/Switch';
import LiquidGlassCard from '@/ui/components/LiquidGlassCard/LiquidGlassCard';
import { BlueButton } from '@/ui/components/BlueButton/BlueButton';
import ArrowIcon from '@/shared/assets/icons/ButtonArrow.svg?react';

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
      <div className={style.additionalButton}>
        <div className={style.errorAndInfoButtons}>
          <BlueButton Icon={ArrowIcon}>Сообщить об ошибке</BlueButton>
          <BlueButton Icon={ArrowIcon}>О поиложении</BlueButton>

        </div>
        <div className={style.supportButton}>
          <span className={style.supportText}>Возникли трудности? Обратитесь в поддержку</span>
          <BlueButton Icon={ArrowIcon}>Поддержка</BlueButton>
        </div>
      </div>
    </div>

  );
}
