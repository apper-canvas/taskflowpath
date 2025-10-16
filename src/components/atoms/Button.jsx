import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md",
  className,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:scale-105",
    secondary: "bg-white text-slate-700 border-2 border-slate-200 hover:border-primary hover:text-primary",
    accent: "bg-gradient-to-r from-accent to-pink-500 text-white hover:shadow-xl hover:scale-105",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-xl hover:scale-105",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;