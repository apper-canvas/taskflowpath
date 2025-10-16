import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ status, priority, onStatusChange, onPriorityChange }) => {
  const statusOptions = [
    { value: "all", label: "All", icon: "List" },
    { value: "active", label: "Active", icon: "Circle" },
    { value: "completed", label: "Completed", icon: "CheckCircle2" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStatusChange(option.value)}
            className={cn(
              "px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2",
              status === option.value
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200"
            )}
          >
            <ApperIcon name={option.icon} size={16} />
            {option.label}
          </motion.button>
        ))}
      </div>

      <div className="relative w-full sm:w-auto">
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className={cn(
            "w-full sm:w-auto px-4 py-2 pr-10 rounded-xl font-semibold text-sm",
            "border-2 border-slate-200 bg-white text-slate-700",
            "focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none",
            "transition-all duration-200 appearance-none cursor-pointer"
          )}
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          size={18} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default FilterBar;