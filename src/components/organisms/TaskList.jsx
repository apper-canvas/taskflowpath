import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import ApperIcon from "@/components/ApperIcon";

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete, onReorder }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  return (
    <div className="space-y-4">
      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={onReorder}
        className="space-y-4"
      >
        {tasks.map((task) => (
          <Reorder.Item
            key={task.Id}
            value={task}
            onDragStart={() => setDraggedTask(task.Id)}
            onDragEnd={() => setDraggedTask(null)}
            className="relative"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-grab active:cursor-grabbing p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ApperIcon name="GripVertical" size={20} />
              </motion.div>
              
              <div className="flex-1">
                <TaskCard
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDragging={draggedTask === task.Id}
                />
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default TaskList;