import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "dark";
type Size = "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  /** Renders trailing content (an icon) inside the pill. */
  trailing?: ReactNode;
  className?: string;
};

/**
 * Pill button from the Figma component set.
 * - `primary` — Light Blue 2 fill, uppercase 16/26 with 4% tracking
 * - `outline` — 1px white border, 18/28 sentence case (used on dark fields)
 * - `dark`    — solid ink fill for use on the light canvas
 *
 * Sizes match the two paddings in the design: header (18/10) and hero (24/14).
 */
const base =
  "inline-flex items-center justify-center gap-[10px] rounded-full whitespace-nowrap transition-all duration-[350ms] ease-[var(--ease-in-out)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-light-blue-2 text-white text-eyebrow uppercase hover:bg-light-blue hover:shadow-[0_8px_30px_-6px_var(--color-light-blue)]",
  outline:
    "border border-white text-white text-body-18 font-medium hover:bg-white hover:text-night",
  dark: "bg-black text-white text-eyebrow uppercase hover:bg-primary",
};

const sizes: Record<Size, string> = {
  md: "px-[18px] py-[10px]",
  lg: "px-[24px] py-[14px]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  trailing,
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
    >
      <span>{children}</span>
      {trailing}
    </Link>
  );
}
