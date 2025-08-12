# Redux State Management Setup

This project now uses Redux Toolkit for state management, providing a centralized and predictable way to manage application state.

## 🏗️ Architecture Overview

### Store Structure
```
store/
├── authSlice.js      # Authentication state management
├── taskSlice.js      # Task management state
├── store.js          # Main store configuration
└── hooks.js          # Custom hooks for easy Redux usage
```

### State Shape
```javascript
{
  auth: {
    user: null | UserObject,
    token: null | string,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: null | string
  },
  tasks: {
    tasks: Task[],
    isLoading: boolean,
    error: null | string,
    currentTask: null | TaskObject
  }
}
```

## 🚀 Getting Started

### 1. Store Configuration
The main store is configured in `src/Stores/store.js` and wrapped around the app in `src/index.js`.

### 2. Using Redux in Components
Import the custom hooks from `src/Stores/hooks.js`:

```javascript
import { useAuth, useTasks } from '../Stores/hooks';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  
  // Use the state and actions...
}
```

## 🔐 Authentication Management

### Auth Slice Features
- **Login**: `loginUser(credentials)` - Authenticates user and stores token + user data
- **Logout**: `logoutUser()` - Clears authentication state
- **Check Auth**: `checkAuthStatus()` - Verifies stored authentication on app load
- **Error Handling**: Automatic error display and clearing

### Usage Example
```javascript
const { login, isLoading, error, isAuthenticated } = useAuth();

const handleLogin = async (credentials) => {
  try {
    await login(credentials);
    // Redirect or show success message
  } catch (error) {
    // Error is automatically handled by Redux
  }
};
```

## 📋 Task Management

### Task Slice Features
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Automatic Token Handling**: Uses auth token from store for API calls
- **Loading States**: Track operation status
- **Error Handling**: Centralized error management

### Usage Example
```javascript
const { tasks, createTask, updateTask, deleteTask, isLoading } = useTasks();

// Create a new task
await createTask({ title: 'New Task', description: 'Task description' });

// Update existing task
await updateTask(taskId, { title: 'Updated Title' });

// Delete task
await deleteTask(taskId);
```

## 🎣 Custom Hooks

### useAuth()
Provides authentication state and actions:
```javascript
const {
  user,           // Current user object
  token,          // JWT token
  isAuthenticated, // Authentication status
  isLoading,      // Loading state
  error,          // Error message
  login,          // Login function
  logout,         // Logout function
  checkAuth,      // Check auth status
  clearError      // Clear error
} = useAuth();
```

### useTasks()
Provides task management state and actions:
```javascript
const {
  tasks,          // Array of tasks
  isLoading,      // Loading state
  error,          // Error message
  currentTask,    // Currently selected task
  fetchTasks,     // Fetch all tasks
  createTask,     // Create new task
  updateTask,     // Update existing task
  deleteTask,     // Delete task
  setCurrentTask, // Set current task
  clearCurrentTask, // Clear current task
  clearError      // Clear error
} = useTasks();
```

## 🔄 Async Operations

All async operations use Redux Toolkit's `createAsyncThunk` for:
- **Automatic Loading States**: `isLoading` flag for UI feedback
- **Error Handling**: Automatic error state management
- **Optimistic Updates**: Immediate UI updates for better UX
- **Rollback on Error**: Automatic state rollback if operation fails

## 🛡️ Protected Routes

The `ProtectedRoute` component automatically:
- Checks authentication status
- Redirects unauthenticated users to login
- Shows loading state while checking auth
- Wraps protected components

```javascript
import ProtectedRoute from '../Components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 📱 Component Integration

### Login Page
- Uses `useAuth()` hook for login functionality
- Automatic error display and loading states
- Redirects to dashboard on success

### Dashboard
- Tabbed interface with different sections
- Real-time task statistics
- User profile information
- Quick navigation to task management

### Task Manager
- Full CRUD operations for tasks
- Modal forms for create/edit
- Confirmation dialogs for delete
- Real-time task list updates

## 🎨 UI Components

Built with Ant Design components:
- **Layout**: Responsive sidebar navigation
- **Cards**: Information display and organization
- **Forms**: Modal-based task creation/editing
- **Lists**: Task display with actions
- **Buttons**: Action triggers with icons
- **Messages**: Success/error notifications

## 🔧 Development

### Adding New Slices
1. Create new slice file in `src/Stores/`
2. Add reducer to `store.js`
3. Create custom hooks in `hooks.js`
4. Use in components

### Debugging
- Redux DevTools enabled in development
- Console logging for state changes
- Error boundaries for component errors

### Testing
- Redux Toolkit provides testing utilities
- Mock store setup for component testing
- Async thunk testing with `extraReducers`

## 📚 Best Practices

1. **Use Custom Hooks**: Always use the provided hooks instead of direct `useSelector`/`useDispatch`
2. **Error Handling**: Let Redux handle errors automatically
3. **Loading States**: Use `isLoading` flags for UI feedback
4. **Protected Routes**: Wrap authenticated components with `ProtectedRoute`
5. **State Updates**: Use Redux actions instead of local state for shared data

## 🚨 Common Issues

### Authentication Lost on Refresh
- Use `checkAuthStatus()` in `useEffect` on protected components
- Store token in localStorage (handled automatically)

### API Calls Failing
- Ensure backend is running on port 3001
- Check JWT token validity
- Verify API endpoints match backend routes

### State Not Updating
- Check if component is wrapped in Redux Provider
- Verify correct hook usage
- Check for console errors

## 🔮 Future Enhancements

- **Persistence**: Add Redux Persist for state persistence
- **Middleware**: Custom middleware for logging/analytics
- **Selectors**: Memoized selectors for performance
- **Sagas**: Complex async workflows if needed
- **Real-time**: WebSocket integration for live updates

