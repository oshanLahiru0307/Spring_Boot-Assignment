import React from 'react';
import { Modal, Button, Descriptions, Tag, Space, Divider } from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CalendarOutlined,
  UserOutlined,
  FlagOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const TaskDetailModal = ({ visible, task, onCancel, onEdit, onDelete }) => {
  if (!task) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'processing';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'processing';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleOutlined />;
      case 'In Progress':
        return <ClockCircleOutlined />;
      case 'Pending':
        return <ClockCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    return dayjs(task.dueDate).isBefore(dayjs(), 'day');
  };

  const getDaysUntilDue = () => {
    if (!task.dueDate) return null;
    const days = dayjs(task.dueDate).diff(dayjs(), 'day');
    if (days === 0) return 'Due today';
    if (days < 0) return `${Math.abs(days)} day(s) overdue`;
    return `${days} day(s) remaining`;
  };

  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <EyeOutlined className="text-blue-500" />
          <span className="text-lg font-semibold">Task Details</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={
        <div className="flex justify-end space-x-3">
          <Button onClick={onCancel}>
            Close
          </Button>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => onEdit(task)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 hover:from-blue-600 hover:to-blue-700"
          >
            Edit Task
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => onDelete(task.id)}
          >
            Delete Task
          </Button>
        </div>
      }
      width={700}
      className="task-detail-modal"
    >
      <div className="space-y-6">
        {/* Task Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {task.title || task.taskName}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Tag 
              color={getStatusColor(task.status)} 
              icon={getStatusIcon(task.status)}
              className="text-sm font-medium"
            >
              {task.status}
            </Tag>
            <Tag 
              color={getPriorityColor(task.priority)}
              icon={<FlagOutlined />}
              className="text-sm font-medium"
            >
              {task.priority} Priority
            </Tag>
            {isOverdue() && (
              <Tag color="error" className="text-sm font-medium">
                Overdue
              </Tag>
            )}
          </div>
        </div>

        {/* Task Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-gray-700 leading-relaxed">
              {task.description || 'No description provided'}
            </p>
          </div>
        </div>

        {/* Task Details */}
        <Descriptions 
          title="Task Information" 
          bordered 
          column={2}
          size="small"
          className="bg-white rounded-lg"
        >
          <Descriptions.Item 
            label={
              <span className="flex items-center">
                <UserOutlined className="mr-1" />
                Assigned To
              </span>
            }
            span={2}
          >
            {task.assignedTo || 'Unassigned'}
          </Descriptions.Item>
          
          <Descriptions.Item 
            label={
              <span className="flex items-center">
                <CalendarOutlined className="mr-1" />
                Due Date
              </span>
            }
          >
            <div>
              <div className="font-medium">
                {task.dueDate ? dayjs(task.dueDate).format('MMMM DD, YYYY') : 'No due date'}
              </div>
              {task.dueDate && (
                <div className={`text-sm ${isOverdue() ? 'text-red-500' : 'text-gray-500'}`}>
                  {getDaysUntilDue()}
                </div>
              )}
            </div>
          </Descriptions.Item>
          
          <Descriptions.Item 
            label={
              <span className="flex items-center">
                <CheckCircleOutlined className="mr-1" />
                Status
              </span>
            }
          >
            <Tag color={getStatusColor(task.status)}>
              {task.status}
            </Tag>
          </Descriptions.Item>
          
          <Descriptions.Item 
            label={
              <span className="flex items-center">
                <FlagOutlined className="mr-1" />
                Priority
              </span>
            }
          >
            <Tag color={getPriorityColor(task.priority)}>
              {task.priority}
            </Tag>
          </Descriptions.Item>
          
          {task.createdAt && (
            <Descriptions.Item 
              label="Created"
              span={2}
            >
              {dayjs(task.createdAt).format('MMMM DD, YYYY [at] h:mm A')}
            </Descriptions.Item>
          )}
          
          {task.updatedAt && task.updatedAt !== task.createdAt && (
            <Descriptions.Item 
              label="Last Updated"
              span={2}
            >
              {dayjs(task.updatedAt).format('MMMM DD, YYYY [at] h:mm A')}
            </Descriptions.Item>
          )}
        </Descriptions>

        {/* Additional Information */}
        {task.userName && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Created By</h3>
            <div className="bg-gray-50 rounded-lg p-3 border">
              <span className="text-gray-700">{task.userName}</span>
            </div>
          </div>
        )}

        {/* Task ID for reference */}
        <div className="text-center">
          <span className="text-xs text-gray-400">
            Task ID: {task.id}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
