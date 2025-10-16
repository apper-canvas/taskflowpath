import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isPast, isToday } from "date-fns";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isDragging 
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate)) && !task.completed;

  const priorityVariants = {
    high: "high",
    medium: "medium",
    low: "low"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={!isDragging ? { scale: 1.01 } : {}}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-200",
        "border-2 border-slate-100",
        task.completed && "bg-gradient-to-br from-green-50 to-emerald-50",
        isDragging && "opacity-50 cursor-grabbing"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "text-lg font-bold text-slate-800 mb-1 transition-all duration-200",
                task.completed && "line-through text-slate-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-sm text-primary hover:text-secondary font-medium flex items-center gap-1 transition-colors"
                >
                  <ApperIcon 
                    name={showDescription ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                  {showDescription ? "Hide" : "Show"} details
                </button>
              )}
            </div>

            <Badge variant={priorityVariants[task.priority]}>
              {task.priority}
            </Badge>
          </div>

          <AnimatePresence>
            {showDescription && task.description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg">
                  {task.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {task.dueDate ? (
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold",
                isOverdue && "bg-red-100 text-error",
                isDueToday && "bg-yellow-100 text-warning",
                !isOverdue && !isDueToday && "bg-slate-100 text-slate-600"
              )}>
                <ApperIcon name="Calendar" size={16} />
                {format(new Date(task.dueDate), "MMM d, yyyy")}
              </div>
            ) : (
              <div className="text-sm text-slate-400 font-medium">No due date</div>
            )}

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(task)}
                className="p-2 text-slate-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                <ApperIcon name="Edit2" size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(task)}
                className="p-2 text-slate-600 hover:text-error hover:bg-error/10 rounded-lg transition-all"
              >
                <ApperIcon name="Trash2" size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;