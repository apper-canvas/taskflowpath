import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Get started by adding your first task",
  onAction,
  actionText = "Add Task"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 max-w-md w-full text-center shadow-lg">
        <div className="relative mb-8">
          <div className="bg-gradient-to-br from-primary via-secondary to-accent w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <ApperIcon name="CheckCircle2" size={48} className="text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-xl"
          />
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
          {title}
        </h3>
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">{description}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 active:scale-95 flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="Plus" size={24} />
            {actionText}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;