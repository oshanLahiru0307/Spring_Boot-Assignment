import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message, Spin } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import TaskService from '../Services/TaskServices';

const { TextArea } = Input;
const { Option } = Select;

const CreateTaskModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // Format the date for backend
      const formattedValues = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
        status: 'Pending', // Default status for new tasks
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };



      // Make API call to create task using TaskService
      const newTask = await TaskService.createTask(formattedValues);
      
      message.success('Task created successfully!');
      form.resetFields();
      onSuccess(newTask); // Pass the new task data back
      onCancel(); // Close the modal
    } catch (error) {
      console.error('Error creating task:', error);
      
      if (error.response) {
        // Server responded with error
        if (error.response.status === 401) {
          message.error('Authentication failed. Please login again.');
        } else if (error.response.status === 400) {
          message.error('Invalid data. Please check your input.');
        } else if (error.response.status === 500) {
          message.error('Server error. Please try again later.');
        } else {
          message.error(`Error: ${error.response.data?.message || 'Failed to create task'}`);
        }
      } else if (error.request) {
        // Network error
        message.error('Network error. Please check your connection.');
      } else {
        // Other error
        message.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <PlusOutlined className="text-blue-500" />
          <span className="text-lg font-semibold">Create New Task</span>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="create-task-modal"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          priority: 'Medium',
          status: 'Pending'
        }}
        className="mt-4"
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[
            { required: true, message: 'Please enter task title' },
            { min: 3, message: 'Title must be at least 3 characters' },
            { max: 100, message: 'Title cannot exceed 100 characters' }
          ]}
        >
          <Input 
            placeholder="Enter task title" 
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter task description' },
            { min: 10, message: 'Description must be at least 10 characters' },
            { max: 500, message: 'Description cannot exceed 500 characters' }
          ]}
        >
          <TextArea 
            placeholder="Enter detailed task description" 
            rows={4}
            className="rounded-lg"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select size="large" className="rounded-lg">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
              <Option value="Critical">Critical</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select due date' }]}
          >
            <DatePicker 
              size="large" 
              className="w-full rounded-lg"
              format="YYYY-MM-DD"
              placeholder="Select due date"
            />
          </Form.Item>
        </div>

        <Form.Item className="mb-0">
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              size="large" 
              onClick={handleCancel}
              className="rounded-lg px-6"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              loading={loading}
              icon={<SaveOutlined />}
              className="rounded-lg px-6 bg-gradient-to-r from-blue-500 to-blue-600 border-0 hover:from-blue-600 hover:to-blue-700"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
