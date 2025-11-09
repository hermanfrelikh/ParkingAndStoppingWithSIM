import {
  NameIcon,
  EmailIcon,
  PasswordIcon,
  PhoneNumberIcon,
  SubscriptionIcon,
} from "@/shared/assets/icons";

import style from "./Profile.module.scss";
import { Header } from "@/shared/ui/Header";


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

  return (
    <>
        <Header title={"Мой профиль"} />
      
      <section className={style.profileInfo}>
        <ul className={style.profileInfoList}>
          {Object.entries(testUser).map(([key, value]) => {
            const { label, icon: Icon } = fields[key as keyof typeof fields];

            let displayValue = value;
            if (key === "password") {
              displayValue = "*".repeat(String(value).length);
            } else if (key === "subscription") {
              displayValue = value ? "активна" : "неактивна";
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
