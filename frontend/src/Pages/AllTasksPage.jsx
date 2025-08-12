import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

function AllTasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Project Documentation",
      description: "Write comprehensive documentation for the new feature",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-15",
      assignedTo: "John Doe"
    },
    {
      id: 2,
      title: "Review Code Changes",
      description: "Review pull request #123 for the authentication module",
      status: "Completed",
      priority: "Medium",
      dueDate: "2024-01-10",
      assignedTo: "Jane Smith"
    },
    {
      id: 3,
      title: "Update User Interface",
      description: "Redesign the dashboard layout based on user feedback",
      status: "Pending",
      priority: "High",
      dueDate: "2024-01-20",
      assignedTo: "Mike Johnson"
    },
    {
      id: 4,
      title: "Fix Bug in Login System",
      description: "Resolve the authentication timeout issue",
      status: "In Progress",
      priority: "Critical",
      dueDate: "2024-01-12",
      assignedTo: "Sarah Wilson"
    },
    {
      id: 5,
      title: "Prepare Team Meeting",
      description: "Organize weekly team sync and prepare agenda",
      status: "Completed",
      priority: "Low",
      dueDate: "2024-01-08",
      assignedTo: "Alex Brown"
    },
    {
      id: 6,
      title: "Database Optimization",
      description: "Optimize database queries for better performance",
      status: "Pending",
      priority: "Medium",
      dueDate: "2024-01-25",
      assignedTo: "David Lee"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4'>
      <NavBar/>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              All Tasks
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className='bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </div>
          
          {/* Stats Summary */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 shadow-lg border border-blue-500/30'>
              <p className='text-blue-100 text-sm font-medium'>Total Tasks</p>
              <p className='text-2xl font-bold text-white'>{tasks.length}</p>
            </div>
            <div className='bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 shadow-lg border border-green-500/30'>
              <p className='text-green-100 text-sm font-medium'>Completed</p>
              <p className='text-2xl font-bold text-white'>{tasks.filter(t => t.status === 'Completed').length}</p>
            </div>
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 shadow-lg border border-blue-500/30'>
              <p className='text-blue-100 text-sm font-medium'>In Progress</p>
              <p className='text-2xl font-bold text-white'>{tasks.filter(t => t.status === 'In Progress').length}</p>
            </div>
            <div className='bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl p-4 shadow-lg border border-yellow-500/30'>
              <p className='text-yellow-100 text-sm font-medium'>Pending</p>
              <p className='text-2xl font-bold text-white'>{tasks.filter(t => t.status === 'Pending').length}</p>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {tasks.map((task) => (
            <div key={task.id} className='bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg border border-gray-600 p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-lg font-semibold text-white mb-2'>{task.title}</h3>
                <div className='flex space-x-2'>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              
              <p className='text-gray-300 text-sm mb-4 line-clamp-2'>{task.description}</p>
              
              <div className='space-y-2 mb-4'>
                <div className='flex items-center text-sm text-gray-400'>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {task.assignedTo}
                </div>
                <div className='flex items-center text-sm text-gray-400'>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Due: {task.dueDate}
                </div>
              </div>
              
              <div className='flex space-x-2'>
                <button className='flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200'>
                  Edit
                </button>
                <button className='flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200'>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className='text-center py-12'>
            <div className='w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-300 mb-2'>No tasks found</h3>
            <p className='text-gray-400'>Create your first task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllTasksPage;
