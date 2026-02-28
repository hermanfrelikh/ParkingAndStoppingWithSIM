import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './BaseModal.module.scss';

interface BaseModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function BaseModal({
    open,
    onClose,
    children,
    className = '',
}
    : BaseModalProps) {
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]
    );

    if (!open) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={`${styles.sheet} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.handle} />
                {children}
            </div>
        </div>,
        document.body
    );
}