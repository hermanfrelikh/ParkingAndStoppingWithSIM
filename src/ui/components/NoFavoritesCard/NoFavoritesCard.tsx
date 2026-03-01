import { BlueButton } from '@/ui/components/BlueButton/BlueButton';
import LiquidGlassCard from '@/ui/components/LiquidGlassCard/LiquidGlassCard';

import { Text } from '@/ui/components/Text';
import style from './NoFavoritesCard.module.scss';
import { useNavigate } from 'react-router';

export function NoFavoritesCard() {
  const navigate = useNavigate();

  return (
    <LiquidGlassCard className={style.card}>
      <Text className={style.cardTitle} variant="h4">
        Здесь пока пусто
      </Text>
      <Text className={style.cardSubtitle} variant="body">
        Добавьте парковку в избранное, чтобы быстро находить ее снова
      </Text>
      <BlueButton onClick={() => navigate('/')} className={style.cardButton}>
        Найти парковку
      </BlueButton>
    </LiquidGlassCard>
  );
}
