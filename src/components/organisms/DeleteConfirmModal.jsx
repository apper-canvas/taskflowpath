import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="bg-gradient-to-br from-error to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ApperIcon name="AlertTriangle" size={32} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 text-center mb-3">
                  Delete Task?
                </h3>
                
                <p className="text-slate-600 text-center mb-2">
                  Are you sure you want to delete
                </p>
                <p className="text-slate-800 font-semibold text-center mb-6">
                  "{taskTitle}"?
                </p>
                
                <p className="text-slate-500 text-sm text-center mb-6">
                  This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={onConfirm}
                    className="flex-1"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ApperIcon name="Trash2" size={18} />
                      Delete
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;