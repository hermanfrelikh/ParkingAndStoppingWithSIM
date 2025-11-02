import { FavoritesIcon, HomeIcon, ProfileIcon } from "@/shared/assets/icons";
import style from "./BottomNav.module.scss";
import { useNavigate } from "react-router";

const navItems = {
  main: { label: "Главная", icon: HomeIcon, link: "/" },
  favorites: { label: "Избранное", icon: FavoritesIcon, link: "/favorites" },
  profile: { label: "Профиль", icon: ProfileIcon, link: "/profile" },
};



export function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav className={style.nav}>
      {Object.entries(navItems).map(([key, item]) => (
        <button onClick={()=>navigate(item.link)} key={key} className={style.navButton}>
          <item.icon />
          <span className={style.navLabel}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}