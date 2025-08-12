import React from 'react';
import { Card, Progress, Statistic, Row, Col, Divider } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  FireOutlined,
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons';

const TaskAnalytics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  
  const criticalTasks = tasks.filter(task => task.priority === 'Critical').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High').length;
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'Completed';
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const progressRate = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const pendingRate = totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return '#ff4d4f';
      case 'High':
        return '#fa8c16';
      case 'Medium':
        return '#faad14';
      case 'Low':
        return '#52c41a';
      default:
        return '#d9d9d9';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#52c41a';
      case 'In Progress':
        return '#1890ff';
      case 'Pending':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  };

  return (
    <div className="space-y-6">

      {/* Alerts and Warnings */}
      {(overdueTasks > 0 || criticalTasks > 0) && (
        <Card title="⚠️ Alerts & Warnings" className="shadow-lg border-orange-200">
          <div className="space-y-3">
            {overdueTasks > 0 && (
              <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <ExclamationCircleOutlined className="text-red-500 mr-3 text-lg" />
                <div>
                  <div className="font-semibold text-red-700">
                    {overdueTasks} task(s) overdue
                  </div>
                  <div className="text-sm text-red-600">
                    These tasks need immediate attention
                  </div>
                </div>
              </div>
            )}
            
            {criticalTasks > 0 && (
              <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <FireOutlined className="text-orange-500 mr-3 text-lg" />
                <div>
                  <div className="font-semibold text-orange-700">
                    {criticalTasks} critical priority task(s)
                  </div>
                  <div className="text-sm text-orange-600">
                    High priority tasks require urgent attention
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card title="Quick Actions" className="shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
            <CalendarOutlined className="text-2xl text-blue-500 mb-2" />
            <div className="font-medium">View All Tasks</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
            <CheckCircleOutlined className="text-2xl text-green-500 mb-2" />
            <div className="font-medium">Completed Tasks</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
            <ExclamationCircleOutlined className="text-2xl text-orange-500 mb-2" />
            <div className="font-medium">High Priority</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
            <UserOutlined className="text-2xl text-purple-500 mb-2" />
            <div className="font-medium">My Tasks</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskAnalytics;
