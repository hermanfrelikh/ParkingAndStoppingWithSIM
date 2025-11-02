import { FavoritesIcon, HomeIcon, ProfileIcon } from "@/shared/assets/icons";
import style from "./BottomNav.module.scss";
import { useLocation, useNavigate } from "react-router";
import { Text } from "@/shared/ui/Text";

const navItems = {
  main: { label: "Главная", icon: HomeIcon, link: "/" },
  favorites: { label: "Избранное", icon: FavoritesIcon, link: "/favorites" },
  profile: { label: "Профиль", icon: ProfileIcon, link: "/profile" },
};

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={style.nav}>
      {Object.entries(navItems).map(([key, item]) => {
        const isActive = location.pathname === item.link;
        const color = isActive ? "#0F172A" : "#64748B";

        return (
          <button
            key={key}
            className={style.navButton}
            onClick={() => navigate(item.link)}
            aria-label={item.label}
          >
  
            <item.icon style={{ color, height: "24px", width: "24px"   }} />
            <Text variant="bodySm" className={style.navLabel} style={{ color }}>
              {item.label}
            </Text>
          </button>
        );
      })}
    </nav>
  );
}