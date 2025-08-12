import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from '../src/Pages/RegisterPage';
import Dashbord from '../src/Pages/Dashbord';
import LoginPage from '../src/Pages/LoginPage';
import AllTasksPage from '../src/Pages/AllTasksPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
                <Dashbord />
            } 
          />
          <Route 
            path="/all-tasks" 
            element={
                <AllTasksPage />
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
