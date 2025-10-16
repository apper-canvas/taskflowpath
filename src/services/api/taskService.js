import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const taskService = {
  getAll: async () => {
    await delay(300);
    return [...tasks].sort((a, b) => a.order - b.order);
  },

  getById: async (id) => {
    await delay(200);
    const task = tasks.find((t) => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  create: async (taskData) => {
    await delay(400);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.Id)) : 0;
    const maxOrder = tasks.length > 0 ? Math.max(...tasks.map((t) => t.order)) : 0;
    
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      order: maxOrder + 1
    };
    
    tasks.push(newTask);
    return { ...newTask };
  },

  update: async (id, taskData) => {
    await delay(300);
    const index = tasks.findIndex((t) => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      ...taskData,
      Id: tasks[index].Id,
      createdAt: tasks[index].createdAt
    };
    
    return { ...tasks[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = tasks.findIndex((t) => t.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  reorder: async (taskList) => {
    await delay(200);
    taskList.forEach((task, index) => {
      const taskIndex = tasks.findIndex((t) => t.Id === task.Id);
      if (taskIndex !== -1) {
        tasks[taskIndex].order = index + 1;
      }
    });
    return [...tasks].sort((a, b) => a.order - b.order);
  }
};

export default taskService;