import { Text } from '../Text';
import style from './StaticButton.module.scss';

export interface StaticButtonProps {
  onClick?: () => void;
  text: string;
}

export function StaticButton({ text, onClick }: StaticButtonProps) {
  return (
    <button className={style.staticButton} onClick={onClick}>
      <Text variant="body">{text}</Text>
    </button>
  );
}
