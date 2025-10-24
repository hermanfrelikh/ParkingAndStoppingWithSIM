import {
  ArrowBackIcon,
  NameIcon,
  EmailIcon,
  PasswordIcon,
  PhoneNumberIcon,
  SubscriptionIcon,
} from "@/shared/assets/icons";

import { Text } from "@/shared/ui/Text";
import style from "./Profile.module.scss";
import { useNavigate } from "react-router";


const testUser = {
  name: "Soumitro Sobuj",
  email: "sjdkdnckdk@gmail.com",
  phoneNumber: "+79990003849",
  password: "12345678",
  subscription: true,
};

const fields = {
  name: { label: "ИМЯ", icon: NameIcon },
  email: { label: "EMAIL", icon: EmailIcon },
  phoneNumber: { label: "НОМЕР ТЕЛЕФОНА", icon: PhoneNumberIcon },
  password: { label: "ПАРОЛЬ", icon: PasswordIcon },
  subscription: { label: "ПОДПИСКА", icon: SubscriptionIcon },
};

export function Profile() {
  const navigate = useNavigate();

  return (
    <>
        <Text className={style.title} variant="h4">Мой профиль</Text>
        <button className={style.backButton}>
          <ArrowBackIcon  onClick={() => navigate(-1)} style={{ width: "30px" }} />
        </button>
      

      <section className={style.profileInfo}>
        <ul className={style.profileInfoList}>
          {Object.entries(testUser).map(([key, value]) => {
            const { label, icon: Icon } = fields[key as keyof typeof fields];

            let displayValue = value;
            if (key === "password") {
              displayValue = "*".repeat(String(value).length);
            } else if (key === "subscription") {
              displayValue = value ? "active" : "unactive";
            }

            return (
              <li className={style.profileInfoItem} key={key}>
                <div className={style.profileItem}>
                  <Icon className={style.icon}/>
                  <div className={style.profileText}>
                    <span className={style.profileInfoLabel}><b>{label} </b></span>   
                    <span className={style.profileInfoValue}>{displayValue}</span>
                  </div>
                  
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
