import React from 'react';
import styles from './ToggleButton.module.scss';
import { Text } from '../Text';

export interface ToggleButtonProps {
  isActive: boolean;
  activeText: string;
  inactiveText: string;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function ToggleButton({
  isActive,
  activeText,
  inactiveText,
  activeIcon,
  inactiveIcon,
  onClick,
  disabled,
  className,
}: ToggleButtonProps) {
  const text = isActive ? activeText : inactiveText;
  const icon = isActive ? activeIcon : inactiveIcon;

  return (
    <button
      className={[
        styles.toggleButton,
        isActive ? styles.toggleButtonActive : styles.toggleButtonInactive,
        className, 
      ]
        .filter(Boolean) 
        .join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.toggleButtonIcon}>{icon}</span>}
      <Text variant="body">{text}</Text>
      
    </button>
  );
}