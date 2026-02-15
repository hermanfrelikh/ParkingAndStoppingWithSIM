import { useState } from 'react';

import AccountCircle from '../../../shared/assets/icons/profile/account_circle.svg?react';
import BadgeLogin from '../../../shared/assets/icons/profile/badge.svg?react';
import Call from '../../../shared/assets/icons/profile/call.svg?react';
import Crown from '../../../shared/assets/icons/profile/crown.svg?react';
import Key from '../../../shared/assets/icons/profile/key.svg?react';
import Mail from '../../../shared/assets/icons/profile/mail.svg?react';
import Edit from '../../../shared/assets/icons/profile/edit.svg?react';

import { Header } from '@/ui/components/Header';
import style from './Profile.module.scss';
import { ThemeToggle } from '@/ui/components/ThemeToggle';

const testUser = {
  login: 'SoumitroSobuj',
  email: 'sjdkdnckdk@gmail.com',
  phoneNumber: '+79990003849',
  password: '12345678',
  subscription: true,
};

const fields = {
  login: { label: 'ЛОГИН', icon: BadgeLogin },
  email: { label: 'ПОЧТА', icon: Mail },
  phoneNumber: { label: 'НОМЕР ТЕЛЕФОНА', icon: Call },
  password: { label: 'ПАРОЛЬ', icon: Key },
  subscription: { label: 'ПОДПИСКА', icon: Crown },
};

const STORAGE_KEY = 'user_profile_name';

export function Profile() {
  const [displayName, setDisplayName] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || 'Имя';
    }
    return 'Имя';
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    let finalName = displayName.trim();
    if (finalName === '') {
      finalName = 'Имя';
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
    <div>
      <div className={style.headerWrapper}>
        <Header title="Профиль" />

        <button
          className={style.editBtn}
          onClick={() => setIsEditing(true)}
          title="Редактировать имя"
        >
          <Edit className={style.editIcon} />
        </button>
      </div>

      <section className={style.profileContainer}>
        <div className={style.topProfile}>
          <div className={style.avatarCircle}>
            <AccountCircle />
          </div>

          {isEditing ? (
            <input
              className={style.nameInput}
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
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

            const { label, icon: IconComponent } = fields[fieldKey];

            let displayValue: string | number = String(value);
            if (key === 'password') {
              displayValue = '*'.repeat(String(value).length);
            } else if (key === 'subscription') {
              displayValue = value ? 'активна' : 'неактивна';
            }

            return (
              <li className={style.profileInfoItem} key={key}>
                <div className={style.iconWrapper}>
                  <IconComponent className={style.icon} />
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

      <ThemeToggle />
    </div>
  );
}
