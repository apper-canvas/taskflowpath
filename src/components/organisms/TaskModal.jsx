import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import DatePicker from "@/components/molecules/DatePicker";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskModal = ({ isOpen, onClose, onSubmit, task = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: ""
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {task ? "Edit Task" : "Create New Task"}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={24} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <FormField
                  label="Task Title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter task title"
                  error={errors.title}
                />

                <FormField
                  label="Description (Optional)"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Add more details about this task"
                  multiline
                  rows={4}
                />

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["low", "medium", "high"].map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => handleChange("priority", priority)}
                        className={cn(
                          "px-4 py-3 rounded-xl font-semibold text-sm capitalize transition-all duration-200",
                          "border-2",
                          formData.priority === priority
                            ? priority === "high" 
                              ? "bg-gradient-to-r from-error to-red-600 text-white border-error shadow-lg scale-105"
                              : priority === "medium"
                              ? "bg-gradient-to-r from-warning to-orange-500 text-white border-warning shadow-lg scale-105"
                              : "bg-gradient-to-r from-success to-green-600 text-white border-success shadow-lg scale-105"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        )}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>

                <DatePicker
                  label="Due Date (Optional)"
                  value={formData.dueDate}
                  onChange={(value) => handleChange("dueDate", value)}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ApperIcon name={task ? "Save" : "Plus"} size={20} />
                      {task ? "Save Changes" : "Create Task"}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;