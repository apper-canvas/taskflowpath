import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  checked = false,
  onChange,
  className,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
        "hover:scale-110 active:scale-95",
        checked 
          ? "bg-gradient-to-br from-success to-green-600 border-success shadow-lg" 
          : "border-slate-300 bg-white hover:border-primary",
        className
      )}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <ApperIcon name="Check" size={16} className="text-white" />
        </motion.div>
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;