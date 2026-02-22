import { useTheme } from '@/app/theme/useTheme';
import style from './LiquidGlassCard.module.scss';
import type { ElementType, HTMLAttributes } from 'react';

interface LiquidGlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: React.ReactNode;
}

export default function LiquidGlassCard({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: LiquidGlassCardProps) {
  const { theme } = useTheme();

  return (
    <Component
      className={`${style.glassCard} ${className}`}
      data-theme={theme}
      {...props}
    >
      {children}
    </Component>
  );
}
