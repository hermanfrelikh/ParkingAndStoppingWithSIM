import { useNavigate } from "react-router";
import { Text } from "../Text";
import style from "./Header.module.scss";
import { ArrowBackIcon } from "@/shared/assets/icons";

interface HeaderProps {
  title: string;
}

export function Header({title}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className={style.header}>
      <button className={style.headerBackButton}>
          <ArrowBackIcon  onClick={() => navigate(-1)} style={{ width: "30px" }} />
      </button>
      <Text className={style.headerTitle} variant="h4">{title}</Text>
    </header>
  )
}
