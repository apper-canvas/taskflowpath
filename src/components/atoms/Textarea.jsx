import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className,
  error,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800",
        "focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none",
        "transition-all duration-200 resize-none",
        "placeholder:text-slate-400",
        error && "border-error focus:border-error focus:ring-error/10",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;