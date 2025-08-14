import { proxy } from 'valtio';
import AuthService from '../Services/AuthService';

// Auth state store
export const authStore = proxy({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
});

// Auth actions
export const authActions = {
  // Set loading state
  setLoading: (loading) => {
    authStore.loading = loading;
  },

  // Clear error
  clearError: () => {
    authStore.error = null;
  },

  // Login user
  loginUser: async (credentials) => {
    try {
      authStore.loading = true;
      authStore.error = null;
      
      const response = await AuthService.loginUser(credentials);
      
      authStore.user = response.username;
      authStore.token = response.token;
      authStore.isAuthenticated = true;
      authStore.loading = false;
      authStore.error = null;
      
      return response;
    } catch (error) {
      authStore.loading = false;
      authStore.error = error.response?.data?.message || 'Login failed';
      authStore.isAuthenticated = false;
      authStore.user = null;
      authStore.token = null;
      throw error;
    }
  },

  // Register user
  registerUser: async (userData) => {
    try {
      authStore.loading = true;
      authStore.error = null;
      
      await AuthService.registerUser(userData);
      
      authStore.loading = false;
      authStore.error = null;
      
      return { message: 'Registration successful' };
    } catch (error) {
      authStore.loading = false;
      authStore.error = error.response?.data?.message || 'Registration failed';
      throw error;
    }
  },

  // Logout user
  logoutUser: async () => {
    try {
      authStore.loading = true;
      
      AuthService.logout();
      
      authStore.loading = false;
      authStore.isAuthenticated = false;
      authStore.user = null;
      authStore.token = null;
      authStore.error = null;
      
      return { message: 'Logout successful' };
    } catch (error) {
      authStore.loading = false;
      authStore.error = 'Logout failed';
      throw error;
    }
  },

  // Check authentication status
  checkAuthStatus: async () => {
    try {
      authStore.loading = true;
      
      const token = AuthService.getToken();
      const user = AuthService.getUser();
      
      if (token && user) {
        authStore.loading = false;
        authStore.isAuthenticated = true;
        authStore.user = user;
        authStore.token = token;
        authStore.error = null;
        return { token, user };
      } else {
        throw new Error('No valid authentication found');
      }
    } catch (error) {
      authStore.loading = false;
      authStore.isAuthenticated = false;
      authStore.user = null;
      authStore.token = null;
      throw error;
    }
  },

  // Initialize auth state from localStorage
  initializeAuth: () => {
    const token = AuthService.getToken();
    const user = AuthService.getUser();
    
    if (token && user) {
      authStore.isAuthenticated = true;
      authStore.user = user;
      authStore.token = token;
    }
  }
};
