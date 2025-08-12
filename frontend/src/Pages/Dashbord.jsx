import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import CreateTaskModal from '../Components/CreateTaskModal';

function Dashbord() {
  const navigate = useNavigate();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleCreateTaskSuccess = (newTask) => {
    // You can update your dashboard stats here or refresh data
    console.log('New task created:', newTask);
    // Optionally refresh dashboard data or update stats
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4'>
      <NavBar/>
      <div className='max-w-4xl mx-auto'>
        
        {/* Welcome Card */}
        <div className='bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-600'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className='text-2xl font-semibold text-white mb-2'>Welcome Back!</h2>
            <p className='text-gray-300 text-lg'>Your task management dashboard is ready</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg border border-blue-500/30'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-blue-100 text-sm font-medium'>Total Tasks</p>
                <p className='text-2xl font-bold text-white'>24</p>
              </div>
              <div className='w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg border border-purple-500/30'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-purple-100 text-sm font-medium'>Completed</p>
                <p className='text-2xl font-bold text-white'>18</p>
              </div>
              <div className='w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg border border-green-500/30'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-green-100 text-sm font-medium'>In Progress</p>
                <p className='text-2xl font-bold text-white'>6</p>
              </div>
              <div className='w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl p-8 border border-gray-600'>
          <h3 className='text-xl font-semibold text-white mb-6'>Quick Actions</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                         <button 
               onClick={() => setIsCreateModalVisible(true)}
               className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
             >
               Create New Task
             </button>
                         <button 
               onClick={() => navigate('/all-tasks')}
               className='bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
             >
               View All Tasks
             </button>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onSuccess={handleCreateTaskSuccess}
      />
    </div>
  );
}

export default Dashbord;
