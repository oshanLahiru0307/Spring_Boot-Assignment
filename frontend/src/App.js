import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Registerpage from '../src/Pages/RegisterPage';
import Loginpage from '../src/Pages/Loginpage';
import Dashbord from '../src/Pages/Dashbord';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/dashboard" element={<Dashbord />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
