import { cn } from "@/utils/cn";

const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    high: "bg-gradient-to-r from-error to-red-600 text-white shadow-lg",
    medium: "bg-gradient-to-r from-warning to-orange-500 text-white shadow-lg",
    low: "bg-gradient-to-r from-success to-green-600 text-white shadow-lg"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;