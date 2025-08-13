import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/task';
const token = localStorage.getItem('token');

console.log("token", token)
class TaskService {

  static async createTask(taskData) {
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      const response = await axios.post(`${API_BASE_URL}/createTask`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response) {
        throw new Error('Task failed to save');
      }
      return response.data;
    } catch (error) {
      console.error("Error at create task:", error);
      throw error;
    }
  }

  static async getAllTasks() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log(" token not found")
      }

      if (token) {
        console.log('Token found');
      }
      const response = await axios.get(`${API_BASE_URL}/getAll`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(" response", response)
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  static async getTaskById(taskId) {
    try {
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      const response = await axios.get(`${API_BASE_URL}/getTaskById/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  }

  static async updateTask(taskId, taskData) {
    try {
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      const response = await axios.put(`${API_BASE_URL}/update/${taskId}`, taskData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  static async deleteTask(taskId) {
    try {
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      const response = await axios.delete(`${API_BASE_URL}/delete/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  static async getByUserName(userName) {
    try {
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      const response = await axios.get(`${API_BASE_URL}/getByUserName/${userName}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks by username:", error);
      throw error;
    }
  }
}

export default TaskService;