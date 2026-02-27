import { Header } from '@/ui/components/Header';
import { ThemeToggle } from '@/ui/components/ThemeToggle';
import style from './Settings.module.scss';
import { useTheme } from '@/app/theme/useTheme';
import { Text } from '@/ui/components/Text';
import { Switch } from '@/ui/components/Switch';
import LiquidGlassCard from '@/ui/components/LiquidGlassCard/LiquidGlassCard';
import { BlueButton } from '@/ui/components/BlueButton/BlueButton';
import ArrowIcon from '@/shared/assets/icons/buttonArrow.svg?react';
import { useState } from 'react';
import { NotShowEyeIcon, ShowEyeIcon } from '@/shared/assets/icons';

export function Settings() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const password = 'SoumitroSobuj';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={style[theme]}>
      <Header title="Настройки" />
      <div style={{ marginTop: '20px' }}></div>
      <Text className={style.settingsCardTitle} variant="body">
        Интрерфейс
      </Text>
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

      <Text className={style.settingsCardTitle} variant="body">
        Личные данные
      </Text>
      <LiquidGlassCard className={style.settingsCard}>
        <div className={style.settingsCardItem}>
          <div className={style.personData}>
            <Text variant="body">Логин</Text>
            <p>SoumitroSobuj</p>
          </div>
        </div>
        <div className={style.settingsCardItem}>
          <div className={style.personData}>
            <p>Пароль</p>
            <div className={style.passwordWrapper}>
              <p className={style.passwordText}>
                {showPassword ? password : '••••••••••'}
              </p>
              <button
                className={style.showPasswordButton}
                onClick={togglePasswordVisibility}
                type="button"
              >
                {showPassword ? <ShowEyeIcon /> : <NotShowEyeIcon />}
              </button>
            </div>
          </div>
        </div>
      </LiquidGlassCard>
      <span className={style.supportTextChangePassword}>Изменить пароль</span>
      <LiquidGlassCard className={style.subscription}>
        <p className={style.subscriptionTitle}>ПОДПИСКА</p>
        <span>активна</span>
      </LiquidGlassCard>
      <div className={style.additionalButton}>
        <div className={style.errorAndInfoButtons}>
          <BlueButton Icon={ArrowIcon}>Сообщить об ошибке</BlueButton>
          <BlueButton Icon={ArrowIcon}>О поиложении</BlueButton>
        </div>
        <div style={{ marginBottom: '70px' }} className={style.supportButton}>
          <span className={style.supportText}>
            Возникли трудности? Обратитесь в поддержку
          </span>
          <BlueButton Icon={ArrowIcon}>Поддержка</BlueButton>
        </div>
      </div>
    </div>
  );
}
