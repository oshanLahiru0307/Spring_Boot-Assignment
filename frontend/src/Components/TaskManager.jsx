import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Dropdown, Space, message, Popconfirm } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import TaskService from '../Services/TaskServices';

const { Option } = Select;
const { Search } = Input;

const TaskManager = ({ 
  tasks, 
  setTasks, 
  onEditTask, 
  onViewTask, 
  onDeleteTask, 
  onRefresh,
  loading = false 
}) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = task.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchText.toLowerCase()) ||
                           task.assignedTo?.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title?.toLowerCase() || '';
          bValue = b.title?.toLowerCase() || '';
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        case 'priority':
          aValue = a.priority || '';
          bValue = b.priority || '';
          break;
        case 'dueDate':
          aValue = new Date(a.dueDate || '1900-01-01');
          bValue = new Date(b.dueDate || '1900-01-01');
          break;
        case 'assignedTo':
          aValue = a.assignedTo?.toLowerCase() || '';
          bValue = b.assignedTo?.toLowerCase() || '';
          break;
        default:
          aValue = a[sortBy] || '';
          bValue = b[sortBy] || '';
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) {
      message.warning('Please select tasks to delete');
      return;
    }

    try {
      const deletePromises = selectedTasks.map(taskId => TaskService.deleteTask(taskId));
      await Promise.all(deletePromises);
      
      message.success(`Successfully deleted ${selectedTasks.length} task(s)`);
      setSelectedTasks([]);
      onRefresh();
    } catch (error) {
      console.error('Error deleting tasks:', error);
      message.error('Failed to delete some tasks');
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedTasks.length === 0) {
      message.warning('Please select tasks to update');
      return;
    }

    try {
      const updatePromises = selectedTasks.map(taskId => 
        TaskService.updateTask(taskId, { status: newStatus })
      );
      await Promise.all(updatePromises);
      
      message.success(`Successfully updated ${selectedTasks.length} task(s) to ${newStatus}`);
      setSelectedTasks([]);
      onRefresh();
    } catch (error) {
      console.error('Error updating tasks:', error);
      message.error('Failed to update some tasks');
    }
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredAndSortedTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredAndSortedTasks.map(task => task.id));
    }
  };

  const handleSelectTask = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const clearFilters = () => {
    setSearchText('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSortBy('dueDate');
    setSortOrder('asc');
    setSelectedTasks([]);
  };

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
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          <Search
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-lg"
            prefix={<SearchOutlined className="text-gray-400" />}
          />
          
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
            className="rounded-lg"
            prefix={<FilterOutlined />}
          >
            <Option value="all">All Status</Option>
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
          
          <Select
            value={priorityFilter}
            onChange={setPriorityFilter}
            placeholder="Filter by priority"
            className="rounded-lg"
          >
            <Option value="all">All Priorities</Option>
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
            <Option value="Critical">Critical</Option>
          </Select>
          
          <Select
            value={`${sortBy}-${sortOrder}`}
            onChange={(value) => {
              const [field, order] = value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            placeholder="Sort by"
            className="rounded-lg"
            prefix={<SortAscendingOutlined />}
          >
            <Option value="dueDate-asc">Due Date (Oldest First)</Option>
            <Option value="dueDate-desc">Due Date (Newest First)</Option>
            <Option value="title-asc">Title (A-Z)</Option>
            <Option value="title-desc">Title (Z-A)</Option>
            <Option value="priority-asc">Priority (Low to High)</Option>
            <Option value="priority-desc">Priority (High to Low)</Option>
            <Option value="status-asc">Status (A-Z)</Option>
            <Option value="status-desc">Status (Z-A)</Option>
          </Select>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              onClick={clearFilters}
              className="rounded-lg"
            >
              Clear Filters
            </Button>
            <Button
              onClick={onRefresh}
              loading={loading}
              icon={<ReloadOutlined />}
              className="rounded-lg"
            >
              Refresh
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">
                {selectedTasks.length} task(s) selected
              </span>
              <Button
                onClick={handleSelectAll}
                className="text-blue-100 hover:text-white"
              >
                {selectedTasks.length === filteredAndSortedTasks.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <Space>
              <Dropdown
                menu={{
                  items: [
                    { key: 'pending', label: 'Mark as Pending', onClick: () => handleBulkStatusUpdate('Pending') },
                    { key: 'in-progress', label: 'Mark as In Progress', onClick: () => handleBulkStatusUpdate('In Progress') },
                    { key: 'completed', label: 'Mark as Completed', onClick: () => handleBulkStatusUpdate('Completed') },
                  ]
                }}
              >
                <Button className="rounded-lg">
                  Update Status
                </Button>
              </Dropdown>
              
              <Popconfirm
                title="Delete selected tasks?"
                description="This action cannot be undone."
                onConfirm={handleBulkDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button 
                  danger 
                  icon={<DeleteOutlined />}
                  className="rounded-lg"
                >
                  Delete Selected
                </Button>
              </Popconfirm>
            </Space>
          </div>
        </div>
      )}

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedTasks.map((task) => (
          <div 
            key={task.id} 
            className={`bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${
              selectedTasks.includes(task.id) 
                ? 'border-blue-500 ring-2 ring-blue-500/50' 
                : 'border-gray-600'
            }`}
          >
            {/* Task Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleSelectTask(task.id)}
                  className="rounded border-gray-400 text-blue-600 focus:ring-blue-500"
                />
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
              </div>
              
              <Dropdown
                menu={{
                  items: [
                    { 
                      key: 'view', 
                      label: 'View Details', 
                      icon: <EyeOutlined />,
                      onClick: () => onViewTask(task)
                    },
                    { 
                      key: 'edit', 
                      label: 'Edit Task', 
                      icon: <EditOutlined />,
                      onClick: () => onEditTask(task)
                    },
                    { 
                      key: 'delete', 
                      label: 'Delete Task', 
                      icon: <DeleteOutlined />,
                      danger: true,
                      onClick: () => onDeleteTask(task.id)
                    },
                  ]
                }}
              >
                <Button 
                  type="text" 
                  icon={<MoreOutlined />} 
                  className="text-gray-400 hover:text-white"
                />
              </Dropdown>
            </div>
            
            {/* Status and Priority Badges */}
            <div className="flex space-x-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{task.description}</p>
            
            {/* Task Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {task.assignedTo || 'Unassigned'}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Due: {task.dueDate || 'No due date'}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={() => onViewTask(task)}
                className="flex-1 rounded-lg"
                icon={<EyeOutlined />}
              >
                View
              </Button>
              <Button
                onClick={() => onEditTask(task)}
                className="flex-1 rounded-lg"
                icon={<EditOutlined />}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            {tasks.length === 0 ? 'No tasks found' : 'No tasks match your filters'}
          </h3>
          <p className="text-gray-400">
            {tasks.length === 0 ? 'Create your first task to get started' : 'Try adjusting your search or filters'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
