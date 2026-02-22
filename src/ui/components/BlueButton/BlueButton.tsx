import React from "react";
import styles from "./BlueButton.module.scss";

type BlueButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    disabled?: boolean;
    className?: string;
};

export const BlueButton = ({
    children,
    onClick,
    Icon,
    disabled = false,
    className = "",
}: BlueButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${styles.blueButton} ${className}`}
        >
            <span className={styles.text}>{children}</span>

            {Icon && (
                <span className={styles.icon}>
                    <Icon />
                </span>
            )}
        </button>
    );
};