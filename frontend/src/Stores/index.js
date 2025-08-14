// Export all stores and actions
export { authStore, authActions } from '../Stores/authStore';
export { taskStore, taskActions } from '../Stores/taskStore';

// Combined store for components that need both
export const combinedStore = {
  auth: authStore,
  tasks: taskStore,
};
