import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className,
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800",
        "focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none",
        "transition-all duration-200",
        "placeholder:text-slate-400",
        error && "border-error focus:border-error focus:ring-error/10",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;