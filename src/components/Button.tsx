import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none";

    const variants = {
      primary:
        "bg-black text-white hover:bg-zinc-900 active:scale-[0.98] hover:-translate-y-0.5",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-[0.98]",
      outline:
        "border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={classes}
          {...(props as any)}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
