import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useSnackbar } from 'notistack';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import CreateTaskModal from '../Components/CreateTaskModal';
import TaskAnalytics from '../Components/TaskAnalytics';
import { useSnapshot } from 'valtio';
import { taskStore, taskActions } from '../Stores/taskStore';
import { authStore, authActions } from '../Stores/authStore'; 

function Dashbord() {
  const navigate = useNavigate();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { tasks, loading, error } = useSnapshot(taskStore);
  const { user, isAuthenticated } = useSnapshot(authStore);

  const loadTasks = async () => {
    try {
      if (!user) {
        console.error('No user found');
        enqueueSnackbar('Please login to view tasks', { variant: 'error' });
        navigate('/');
        return;
      }
      
      console.log("Fetching tasks for user:", user);
      await taskActions.fetchTasks(user);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      enqueueSnackbar('Error fetching tasks. Please try again.', { variant: 'error' });
    }
  };

  const handleCreateTaskSuccess = async (newTask) => {
    try {
      await loadTasks(); // Refresh the task list
      enqueueSnackbar('Task created successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    // Check authentication status and load tasks
    const initializeApp = async () => {
      try {
        await authActions.checkAuthStatus();
        if (isAuthenticated && user) {
          await loadTasks();
        } else {
          console.log('Not authenticated, redirecting to login');
          navigate('/');
        }
      } catch (error) {
        console.log('Authentication check failed, redirecting to login');
        navigate('/');
      }
    };

    initializeApp();
  }, [isAuthenticated, user, navigate]);

  // Handle error display
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      taskActions.clearError();
    }
  }, [error, enqueueSnackbar]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4'>
      <NavBar />
      <div className='max-w-7xl mx-auto'>
        
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
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg border border-blue-500/30'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-blue-100 text-sm font-medium'>Total Tasks</p>
                <p className='text-2xl font-bold text-white'>{totalTasks}</p>
              </div>
              <div className='w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg border border-green-500/30'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-green-100 text-sm font-medium'>Completed</p>
                <p className='text-2xl font-bold text-white'>{completedTasks}</p>
              </div>
              <div className='w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg border border-blue-500/30'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-blue-100 text-sm font-medium'>In Progress</p>
                <p className='text-2xl font-bold text-white'>{inProgressTasks}</p>
              </div>
              <div className='w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 shadow-lg border border-yellow-500/30'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-yellow-100 text-sm font-medium'>Pending</p>
                <p className='text-2xl font-bold text-white'>{pendingTasks}</p>
              </div>

            </div>
          </div>
        </div>

        {/* Task Analytics */}
        <div className='mb-8'>
          <TaskAnalytics tasks={tasks} />
        </div>

        {/* Quick Actions */}
        <div className='bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl p-8 border border-gray-600'>
          <h3 className='text-xl font-semibold text-white mb-6'>Quick Actions</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Button
              onClick={() => setIsCreateModalVisible(true)}
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 hover:from-blue-600 hover:to-blue-700 h-12 text-lg rounded-xl"
            >
              Create New Task
            </Button>
            <Button
              onClick={() => navigate('/all-tasks')}
              icon={<ArrowRightOutlined />}
              size="large"
              className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 hover:from-purple-600 hover:to-purple-700 text-white h-12 text-lg rounded-xl"
            >
              View All Tasks
            </Button>
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
