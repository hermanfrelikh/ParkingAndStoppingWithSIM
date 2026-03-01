import { Text } from '@/ui/components/Text';

import style from './NotFound.module.scss';

export function NotFound() {
  return (
    <>
      <div className={style.block}>
        <Text className={style.title} variant="h1">
          404
        </Text>
        <Text className={style.title} variant="h4">
          Упс, вы свернули не туда :(
        </Text>
        <Text className={style.subtitle} variant="body">
          Страница не доступна.
        </Text>
        <Text
          style={{ marginTop: '-10px' }}
          className={style.subtitle}
          variant="body"
        >
          Попробуйте еще раз.
        </Text>
      </div>
    </>
  );
}
