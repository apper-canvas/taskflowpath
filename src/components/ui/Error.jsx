import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="bg-gradient-to-br from-error to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <ApperIcon name="AlertTriangle" size={40} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-slate-600 mb-6 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-error to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;