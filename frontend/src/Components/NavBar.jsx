import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/newlogo.png';
import usrState from '../Stores/UserState';

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    usrState.user = null;
    usrState.token = null;
    navigate('/login');
  };

  const getUserInitial = () => {
    if (usrState.user && usrState.user.name) {
      return usrState.user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl fixed top-0 left-0 right-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Logo Name */}
          <div className="flex items-center space-x-3">

            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TaskManager
            </span>
          </div>

          {/* Right side - Navigation and User */}
          <div className="flex items-center space-x-6">
            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-lg"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/my-account')}
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-lg"
              >
                My Account
              </button>
            </div>

            {/* User Avatar and Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  {getUserInitial()}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl py-1 z-50 border border-gray-700">
                  <div className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700">
                    <p className="font-medium text-white">{usrState.user?.name || 'User'}</p>
                    <p className="text-gray-400">{usrState.user?.email || 'user@example.com'}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/my-account');
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-all duration-200"
                  >
                    My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute right-4 top-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-gray-300 hover:text-blue-400 p-2 rounded-md hover:bg-gray-800 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isDropdownOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                navigate('/dashboard');
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-all duration-200"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/my-account');
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-all duration-200"
            >
              My Account
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-md transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
