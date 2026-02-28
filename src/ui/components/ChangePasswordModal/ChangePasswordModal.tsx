import { useState } from 'react';
import { BaseModal } from '@/ui/components/BaseModal/BaseModal';
import { GlassModal } from '@/ui/components/GlassModal/GlassModal';
import styles from './ChangePasswordModal.module.scss';
import { BlueButton } from '@/ui/components/BlueButton/BlueButton';
import { ShowEyeIcon, NotShowEyeIcon } from '@/shared/assets/icons';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit?: (password: string) => void;
    variant?: 'default' | 'glass'; // ВОТ ТУТ ПЕРЕКЛЮЧЕНИЕ
}

export function ChangePasswordModal({
    open,
    onClose,
    onSubmit,
    variant = 'glass',
}: Props) {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);

    const ModalComponent = variant === 'glass' ? GlassModal : BaseModal;

    const handleSubmit = () => {
        if (!password || password !== confirm) {
            alert('Пароли не совпадают');
            return;
        }

        onSubmit?.(password);
        onClose();
    };

    return (
        <ModalComponent open={open} onClose={onClose}>
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Смена пароля</h3>

                <div className={styles.inputGroup}>
                    <input
                        id="new-password"
                        name="newPassword"
                        type={show ? 'text' : 'password'}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShow(!show)}>
                        {show ? <ShowEyeIcon /> : <NotShowEyeIcon />}
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        id="confirm-password"
                        name="confirmPassword"
                        type={show ? 'text' : 'password'}
                        placeholder="Подтверждение пароля"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>

                <BlueButton onClick={handleSubmit}>
                    Сменить пароль
                </BlueButton>
            </div>
        </ModalComponent>
    );
}