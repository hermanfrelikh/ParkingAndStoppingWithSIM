import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './GlassModal.module.scss';
import LiquidGlassCard from '@/ui/components/LiquidGlassCard/LiquidGlassCard';

interface GlassModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function GlassModal({
    open,
    onClose,
    children,
    className = '',
}: GlassModalProps) {
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <LiquidGlassCard
                className={`${styles.sheet} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.handle} />
                {children}
            </LiquidGlassCard>
        </div>,
        document.body
    );
}