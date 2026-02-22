import { Switch as SwitchMui } from '@mui/material';

import { useTheme } from '@/app/theme/useTheme';

interface SwitchProps {
  onChange?: () => void;
  checked?: boolean;
}

export function Switch({ onChange, checked }: SwitchProps) {
  const { theme } = useTheme();
  const style = theme === 'dark' ? { color: 'var(--color-primary)' } : {};
  return <SwitchMui style={style} checked={checked} onChange={onChange} />;
}
