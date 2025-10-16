import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
const { ApperClient } = window.ApperSDK;
import taskService from "@/services/api/taskService";
import SearchBar from "@/components/molecules/SearchBar";
import FilterBar from "@/components/molecules/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import DeleteConfirmModal from "@/components/organisms/DeleteConfirmModal";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
const [webhookLoading, setWebhookLoading] = useState(false);
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggleComplete = async (task) => {
    try {
      const updated = await taskService.update(task.Id, {
        ...task,
        completed: !task.completed
      });
      setTasks(prev => prev.map(t => t.Id === updated.Id ? updated : t));
      
      if (!task.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as active");
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updated = await taskService.update(editingTask.Id, taskData);
      setTasks(prev => prev.map(t => t.Id === updated.Id ? updated : t));
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await taskService.delete(deletingTask.Id);
      setTasks(prev => prev.filter(t => t.Id !== deletingTask.Id));
      toast.success("Task deleted successfully");
      setIsDeleteModalOpen(false);
      setDeletingTask(null);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleReorder = async (newOrder) => {
    setTasks(newOrder);
    try {
      await taskService.reorder(newOrder);
    } catch (err) {
      toast.error("Failed to save new order");
      loadTasks();
    }
  };
async function handleWebhookTest() {
    setWebhookLoading(true);
    try {
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const result = await apperClient.functions.invoke(
        import.meta.env.VITE_PING_WEBHOOK,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(JSON.stringify(result))
      if (result.success) {
        const responseData = result;
        
        if (responseData.success === false) {
          console.info(`apper_info: An error was received in this function: ${import.meta.env.VITE_PING_WEBHOOK}. The response body is: ${JSON.stringify(responseData)}.`);
          toast.error(responseData.error || "Webhook call failed");
        } else {
          toast.success(responseData.message || "Webhook called successfully!");
        }
      } else {
        console.info(`apper_info: An error was received in this function: ${import.meta.env.VITE_PING_WEBHOOK}. The response body is: ${JSON.stringify(result)}.`);
        toast.error("Failed to invoke webhook function");
      }
    } catch (error) {
      console.info(`apper_info: An error was received in this function: ${import.meta.env.VITE_PING_WEBHOOK}. The error is: ${error.message}`);
      toast.error("An error occurred while calling webhook");
    } finally {
      setWebhookLoading(false);
    }
  }
  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "active" && !task.completed) ||
                         (statusFilter === "completed" && task.completed);
    
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                  TaskFlow
                </h1>
                <p className="text-slate-600 text-lg">Organize your tasks with style</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{activeCount}</div>
                  <div className="text-sm text-slate-600">Active</div>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <div className="text-3xl font-bold text-success">{completedCount}</div>
                  <div className="text-sm text-slate-600">Done</div>
                </div>
              </div>
            </div>

            <div className="flex sm:hidden items-center justify-around py-4 border-t border-slate-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{activeCount}</div>
                <div className="text-xs text-slate-600">Active</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{completedCount}</div>
                <div className="text-xs text-slate-600">Done</div>
              </div>
            </div>
<Button
              variant="secondary"
              onClick={handleWebhookTest}
              disabled={webhookLoading}
            >
              <span className="flex items-center gap-2">
                <ApperIcon name={webhookLoading ? "Loader2" : "Zap"} size={20} className={webhookLoading ? "animate-spin" : ""} />
                {webhookLoading ? "Testing..." : "Test Webhook"}
              </span>
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <SearchBar onSearch={setSearchQuery} />
            <FilterBar
              status={statusFilter}
              priority={priorityFilter}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
            />
          </div>
        </motion.div>

        {filteredTasks.length === 0 ? (
          <Empty
            title={searchQuery || statusFilter !== "all" || priorityFilter !== "all" 
              ? "No tasks found" 
              : "No tasks yet"
            }
            description={searchQuery || statusFilter !== "all" || priorityFilter !== "all"
              ? "Try adjusting your filters or search query"
              : "Get started by creating your first task"
            }
            onAction={openCreateModal}
            actionText="Create Task"
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onReorder={handleReorder}
          />
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-8 z-30"
        >
          <Button
            onClick={openCreateModal}
            variant="accent"
            size="lg"
            className="rounded-full w-16 h-16 shadow-2xl flex items-center justify-center p-0"
          >
            <ApperIcon name="Plus" size={28} />
          </Button>
        </motion.div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingTask(null);
          }}
          onConfirm={handleDeleteTask}
          taskTitle={deletingTask?.title}
        />
      </div>
    </div>
  );
};

export default HomePage;