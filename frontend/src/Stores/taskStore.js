import { proxy } from 'valtio';
import TaskService from '../Services/TaskServices';

// Task state store
export const taskStore = proxy({
  tasks: [],
  loading: false,
  error: null,
  selectedTasks: [],
});

// Task actions
export const taskActions = {
  // Set loading state
  setLoading: (loading) => {
    taskStore.loading = loading;
  },

  // Clear error
  clearError: () => {
    taskStore.error = null;
  },

  // Set selected tasks
  setSelectedTasks: (taskIds) => {
    taskStore.selectedTasks = taskIds;
  },

  // Clear selected tasks
  clearSelectedTasks: () => {
    taskStore.selectedTasks = [];
  },

  // Add task to selection
  addToSelectedTasks: (taskId) => {
    if (!taskStore.selectedTasks.includes(taskId)) {
      taskStore.selectedTasks.push(taskId);
    }
  },

  // Remove task from selection
  removeFromSelectedTasks: (taskId) => {
    taskStore.selectedTasks = taskStore.selectedTasks.filter(id => id !== taskId);
  },

  // Toggle task selection
  toggleTaskSelection: (taskId) => {
    if (taskStore.selectedTasks.includes(taskId)) {
      taskStore.selectedTasks = taskStore.selectedTasks.filter(id => id !== taskId);
    } else {
      taskStore.selectedTasks.push(taskId);
    }
  },

  // Select all tasks
  selectAllTasks: (allTaskIds) => {
    if (taskStore.selectedTasks.length === allTaskIds.length) {
      taskStore.selectedTasks = [];
    } else {
      taskStore.selectedTasks = allTaskIds;
    }
  },

  // Fetch tasks by username
  fetchTasks: async (userName) => {
    try {
      taskStore.loading = true;
      taskStore.error = null;
      
      const response = await TaskService.getByUserName(userName);
      
      taskStore.tasks = response;
      taskStore.loading = false;
      taskStore.error = null;
      
      return response;
    } catch (error) {
      taskStore.loading = false;
      taskStore.error = error.response?.data?.message || 'Failed to fetch tasks';
      throw error;
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      taskStore.loading = true;
      taskStore.error = null;
      
      const response = await TaskService.createTask(taskData);
      
      taskStore.tasks.push(response);
      taskStore.loading = false;
      taskStore.error = null;
      
      return response;
    } catch (error) {
      taskStore.loading = false;
      taskStore.error = error.response?.data?.message || 'Failed to create task';
      throw error;
    }
  },

  // Update existing task
  updateTask: async (taskId, taskData) => {
    try {
      taskStore.loading = true;
      taskStore.error = null;
      
      const response = await TaskService.updateTask(taskId, taskData);
      
      const index = taskStore.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        taskStore.tasks[index] = response;
      }
      
      taskStore.loading = false;
      taskStore.error = null;
      
      return response;
    } catch (error) {
      taskStore.loading = false;
      taskStore.error = error.response?.data?.message || 'Failed to update task';
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      taskStore.loading = true;
      taskStore.error = null;
      
      await TaskService.deleteTask(taskId);
      
      taskStore.tasks = taskStore.tasks.filter(task => task.id !== taskId);
      taskStore.selectedTasks = taskStore.selectedTasks.filter(id => id !== taskId);
      taskStore.loading = false;
      taskStore.error = null;
      
      return taskId;
    } catch (error) {
      taskStore.loading = false;
      taskStore.error = error.response?.data?.message || 'Failed to delete task';
      throw error;
    }
  },

  // Bulk delete tasks
  bulkDeleteTasks: async (taskIds) => {
    try {
      taskStore.loading = true;
      taskStore.error = null;
      
      const deletePromises = taskIds.map(taskId => TaskService.deleteTask(taskId));
      await Promise.all(deletePromises);
      
      taskStore.tasks = taskStore.tasks.filter(task => !taskIds.includes(task.id));
      taskStore.selectedTasks = [];
      taskStore.loading = false;
      taskStore.error = null;
      
      return taskIds;
    } catch (error) {
      taskStore.loading = false;
      taskStore.error = 'Failed to delete some tasks';
      throw error;
    }
  },

  // Bulk update task status
  bulkUpdateTaskStatus: async (taskIds, newStatus) => {
    try {
      taskStore.loading = true;
      taskStore.error = null;
      
      const updatePromises = taskIds.map(taskId => 
        TaskService.updateTask(taskId, { status: newStatus })
      );
      await Promise.all(updatePromises);
      
      taskStore.tasks = taskStore.tasks.map(task => 
        taskIds.includes(task.id) ? { ...task, status: newStatus } : task
      );
      taskStore.selectedTasks = [];
      taskStore.loading = false;
      taskStore.error = null;
      
      return { taskIds, newStatus };
    } catch (error) {
      taskStore.loading = false;
      taskStore.error = 'Failed to update some tasks';
      throw error;
    }
  }
};
