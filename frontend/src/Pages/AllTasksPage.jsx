import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import TaskManager from '../Components/TaskManager';
import CreateTaskModal from '../Components/CreateTaskModal';
import EditTaskModal from '../Components/EditTaskModal';
import TaskDetailModal from '../Components/TaskDetailModal';
import TaskService from '../Services/TaskServices';

function AllTasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const userName = localStorage.getItem('user');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      console.log("Fetching tasks for user:", userName);
      const response = await TaskService.getByUserName(userName);
      if (response) {
        setTasks(response);
      } else {
        console.error('Failed to fetch tasks');
        message.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Error fetching tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      await fetchTasks(); // Refresh the task list
      message.success('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setDetailModalVisible(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      await fetchTasks(); // Refresh the task list
      message.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Failed to delete task. Please try again.');
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await fetchTasks(); // Refresh the task list
      message.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleRefresh = () => {
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [tasks.length]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4'>
      <NavBar />
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              Task Management
            </h1>
            <div className='flex items-center space-x-4'>
              <Button
                onClick={() => setCreateModalVisible(true)}
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                className="bg-gradient-to-r from-green-500 to-green-600 border-0 hover:from-green-600 hover:to-green-700 rounded-lg"
              >
                Create Task
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                icon={<ArrowLeftOutlined />}
                size="large"
                className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white border-0 rounded-lg"
              >
                Back to Dashboard
              </Button>
            </div>
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

        {/* Task Manager Component */}
        <TaskManager
          tasks={tasks}
          setTasks={setTasks}
          onEditTask={handleEditTask}
          onViewTask={handleViewTask}
          onDeleteTask={handleDeleteTask}
          onRefresh={handleRefresh}
          loading={loading}
        />

        {/* Create Task Modal */}
        <CreateTaskModal
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          onSuccess={handleCreateTask}
        />

        {/* Edit Task Modal */}
        <EditTaskModal
          visible={editModalVisible}
          task={selectedTask}
          onCancel={() => {
            setEditModalVisible(false);
            setSelectedTask(null);
          }}
          onSuccess={handleUpdateTask}
        />

        {/* Task Detail Modal */}
        <TaskDetailModal
          visible={detailModalVisible}
          task={selectedTask}
          onCancel={() => {
            setDetailModalVisible(false);
            setSelectedTask(null);
          }}
          onEdit={(task) => {
            setDetailModalVisible(false);
            handleEditTask(task);
          }}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default AllTasksPage;
