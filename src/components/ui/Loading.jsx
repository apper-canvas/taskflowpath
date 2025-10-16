import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-4 px-4">
      {[1, 2, 3, 4].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-3/4 mb-3 animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-full mb-2 animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-5/6 animate-pulse" />
            </div>
            <div className="h-6 w-20 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full ml-4 animate-pulse" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-24 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg animate-pulse" />
              <div className="h-8 w-8 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;