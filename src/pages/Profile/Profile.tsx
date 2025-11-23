import { useState } from "react";
import accountCircle from '../../shared/assets/icons/profile/account_circle.svg';
import badgeLogin from '../../shared/assets/icons/profile/badgeLogin.svg';
import call from '../../shared/assets/icons/profile/call.svg';
import crown from '../../shared/assets/icons/profile/crown.svg';
import key from '../../shared/assets/icons/profile/key.svg';
import mail from '../../shared/assets/icons/profile/mail.svg';
import edit from '../../shared/assets/icons/profile/edit.svg';

import { Header } from "@/shared/ui/Header";
import style from "./Profile.module.scss";

const testUser = {
  login: "SoumitroSobuj",
  email: "sjdkdnckdk@gmail.com",
  phoneNumber: "+79990003849",
  password: "12345678",
  subscription: true,
};

const fields = {
  login: { label: "ЛОГИН", icon: badgeLogin },
  email: { label: "ПОЧТА", icon: mail },
  phoneNumber: { label: "НОМЕР ТЕЛЕФОНА", icon: call },
  password: { label: "ПАРОЛЬ", icon: key },
  subscription: { label: "ПОДПИСКА", icon: crown },
};

const STORAGE_KEY = "user_profile_name";

export function Profile() {
  const [displayName, setDisplayName] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || "Имя";
    }
    return "Имя";
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    let finalName = displayName.trim();
    if (finalName === "") {
      finalName = "Имя";
    }
    setDisplayName(finalName);
    localStorage.setItem(STORAGE_KEY, finalName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <>
      <div className={style.headerWrapper}>
        <Header title="Профиль" />

        <button
          className={style.editBtn}
          onClick={() => setIsEditing(true)}
          title="Редактировать имя"
        >
          {/* ЗАМЕНА: Иконка карандаша заменена на картинку edit */}
          <img src={edit} className={style.editIcon} alt="edit" />
        </button>
      </div>

      <section className={style.profileContainer}>
        <div className={style.topProfile}>
          <div className={style.avatarCircle}>
            <img src={accountCircle} alt="Avatar" />
          </div>

          {isEditing ? (
            <input
              className={style.nameInput}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <h2
              className={style.mainName}
              onDoubleClick={() => setIsEditing(true)}
              title="Дважды кликните для редактирования"
            >
              {displayName}
            </h2>
          )}

          <div className={style.divider}></div>
        </div>

        <ul className={style.profileInfoList}>
          {Object.entries(testUser).map(([key, value]) => {
            const fieldKey = key as keyof typeof fields;
            if (!fields[fieldKey]) return null;

            const { label, icon } = fields[fieldKey];

            let displayValue: string | number = value;
            if (key === "password") {
              displayValue = "*".repeat(String(value).length);
            } else if (key === "subscription") {
              displayValue = value ? "активна" : "неактивна";
            }

            return (
              <li className={style.profileInfoItem} key={key}>
                <div className={style.iconWrapper}>
                  <img src={icon} className={style.icon} alt={label} />
                </div>
                <div className={style.textWrapper}>
                  <span className={style.label}>{label}</span>
                  <span className={style.value}>{displayValue}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}