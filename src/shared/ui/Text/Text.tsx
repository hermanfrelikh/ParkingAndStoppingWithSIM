import type {
  ElementType,
  HTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import cls from "./Text.module.css";

/**
 * Варианты типографики, соответствуют классам в CSS-модуле
 */
type Variant = "h1" | "h2" | "h4" | "body" | "bodySm" | "caption" | "link";

/**
 * Отображение варианта в HTML-тег по умолчанию
 */
type AsMap = Record<Variant, ElementType>;
const asMap: AsMap = {
  h1: "h1",
  h2: "h2",
  h4: "h4",
  body: "p",
  bodySm: "p",
  caption: "span",
  link: "a",
};

/**
 * Упрощённые пропсы:
 * - variant: вариант типографики
 * - as: переопределение тега
 * - остальные HTML-атрибуты (включая href для ссылок) пробрасываются
 */
type Props = {
  variant?: Variant;
  as?: ElementType;
} & HTMLAttributes<HTMLElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function Text({
  variant = "body",
  as,
  className,
  ...rest
}: Props) {
  const Tag = (as ?? asMap[variant]) as ElementType;

  return (
    <Tag
      className={[cls[variant], className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
