import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterPage from '../src/Pages/RegisterPage';
import Dashbord from '../src/Pages/Dashbord';
import LoginPage from '../src/Pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashbord />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
