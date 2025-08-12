import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const taskApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
taskApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
taskApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const TaskService = {
  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await taskApi.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await taskApi.get('/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await taskApi.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await taskApi.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      const response = await taskApi.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task status
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await taskApi.patch(`/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get tasks by status
  getTasksByStatus: async (status) => {
    try {
      const response = await taskApi.get(`/tasks/status/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get tasks by priority
  getTasksByPriority: async (priority) => {
    try {
      const response = await taskApi.get(`/tasks/priority/${priority}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get tasks by assignee
  getTasksByAssignee: async (assignee) => {
    try {
      const response = await taskApi.get(`/tasks/assignee/${assignee}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get tasks due soon (within next 7 days)
  getTasksDueSoon: async () => {
    try {
      const response = await taskApi.get('/tasks/due-soon');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get task statistics
  getTaskStats: async () => {
    try {
      const response = await taskApi.get('/tasks/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default TaskService;