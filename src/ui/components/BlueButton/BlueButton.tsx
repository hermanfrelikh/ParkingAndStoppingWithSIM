import React from 'react';
import style from './BlueButton.module.scss';
import { useTheme } from '@/app/theme/useTheme';

type BlueButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  className?: string;
};

export const BlueButton = ({
  children,
  onClick,
  Icon,
  disabled = false,
  className = '',
}: BlueButtonProps) => {
  const { theme } = useTheme();
  return (
    <div className={style[theme]}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${style.blueButton} ${className}`}
      >
        <span className={style.text}>{children}</span>

        {Icon && (
          <span className={style.icon}>
            <Icon />
          </span>
        )}
      </button>
    </div>
  );
};
