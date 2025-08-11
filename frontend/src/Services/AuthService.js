import axios from 'axios';
import { authStore } from '../stores/authStore';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Register a new user
  async register(userData) {
    try {
      authStore.setLoading(true);
      authStore.clearError();
      
      const response = await api.post('/auth/register', userData);
      
      authStore.setLoading(false);
      return response.data;
    } catch (error) {
      authStore.setLoading(false);
      const errorMessage = error.response?.data || error.message || 'Registration failed';
      authStore.setError(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Login user
  async login(credentials) {
    try {
      authStore.setLoading(true);
      authStore.clearError();
      
      const response = await api.post('/auth/login', credentials);
      const token = response.data;
      
      // Store token in store and localStorage
      authStore.setToken(token);
      authStore.setLoading(false);
      
      return token;
    } catch (error) {
      authStore.setLoading(false);
      const errorMessage = error.response?.data || error.message || 'Login failed';
      authStore.setError(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Logout user
  logout() {
    authStore.logout();
  },

  // Get current user info (if you have an endpoint for this)
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      authStore.setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return authStore.isAuthenticated;
  },

  // Get stored token
  getToken() {
    return authStore.token;
  }
};
