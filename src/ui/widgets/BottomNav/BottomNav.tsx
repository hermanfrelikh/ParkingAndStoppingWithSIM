import {
  FavoritesIcon,
  HomeIcon,
  ProfileIcon,
} from '../../../shared/assets/icons';
import style from './BottomNav.module.scss';
import { useLocation, useNavigate } from 'react-router';
import { Text } from '@/ui/components/Text';
import { useTheme } from '@/context/useTheme';

const navItems = {
  main: { label: 'Главная', icon: HomeIcon, link: '/' },
  favorites: { label: 'Избранное', icon: FavoritesIcon, link: '/favorites' },
  profile: { label: 'Профиль', icon: ProfileIcon, link: '/profile' },
};

export function BottomNav() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const activeColor = theme === 'light' ? '#0F172A' : '#66ccff';
  const inactiveColor = theme === 'light' ? '#64748B' : '#999999';

  return (
    <div className={style[theme]}>
      <nav className={style.nav}>
        {Object.entries(navItems).map(([key, item]) => {
          const isActive = location.pathname === item.link;

          const color = isActive ? activeColor : inactiveColor;

          return (
            <button
              key={key}
              className={style.navButton}
              onClick={() => navigate(item.link)}
              aria-label={item.label}
            >
              <item.icon style={{ color, height: '24px', width: '24px' }} />
              <Text
                variant="bodySm"
                className={style.navLabel}
                style={{ color }}
              >
                {item.label}
              </Text>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
