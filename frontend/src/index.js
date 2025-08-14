import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { authActions } from './Stores/authStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Initialize auth state from localStorage
authActions.initializeAuth();

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

