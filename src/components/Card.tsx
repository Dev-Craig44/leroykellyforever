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
    default: "border border-zinc-200 bg-zinc-50",
    elevated: "border border-zinc-200 bg-white shadow-lg",
    bordered: "border-2 border-zinc-900 bg-white",
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
