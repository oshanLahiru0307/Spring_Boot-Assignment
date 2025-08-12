import axios from 'axios'
const base_uri = 'http://localhost:3001/api/tasks'
const token = localStorage.getItem('token');

class TaskServices{

    static async getAllTasks() {
        try {
            const response = await axios.get(`${base_uri}/getAll`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }

    static async getTaskById(taskId) {
        try {
            const response = await axios.get(`${base_uri}/getTaskById/${taskId}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }

    static async getByUserName(userName) {
        try {
            const response = await axios.get(`${base_uri}/getByUserName/${userName}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }

    static async createTask(taskData) {
        try {
            const response = await axios.post(`${base_uri}/create`, taskData,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

    static async updateTask(taskId, taskData) {
        try {
            const response = await axios.put(`${base_uri}/update/${taskId}`, taskData
                , { headers: { 'Authorization': `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    static async deleteTask(taskId) {
        try {
            const response = await axios.delete(`${base_uri}/delete/${taskId}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }

}

export default TaskServices;