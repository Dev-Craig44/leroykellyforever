import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  rounded = "2xl",
}: CardProps) {
  const variants = {
    default: "border border-kelly-brown/10 bg-sand",
    elevated:
      "border border-kelly-brown/10 bg-white shadow-[0_4px_24px_-2px_rgba(59,42,24,0.08),0_2px_6px_-1px_rgba(59,42,24,0.04)] hover:shadow-[0_8px_32px_-4px_rgba(59,42,24,0.12),0_4px_8px_-2px_rgba(59,42,24,0.06)]",
    bordered: "border-2 border-kelly-brown bg-white shadow-sm",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const roundedStyles = {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-2xl",
    "2xl": "rounded-3xl",
    "3xl": "rounded-3xl",
  };

  return (
    <div
      className={`${variants[variant]} ${paddings[padding]} ${roundedStyles[rounded]} transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
