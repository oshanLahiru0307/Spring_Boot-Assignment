import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const API_CREATE_TASK_URL = 'http://localhost:3001/api/tasks/create';

const Sample = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission.
   * This function collects form data, formats the due date,
   * retrieves the token from localStorage, and sends a POST request
   * to the backend to create a new task.
   * * @param {Object} values - The validated form values from Ant Design.
   */
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }
      
      const formattedValues = {
        ...values,
        // Format the dayjs object to a 'YYYY-MM-DD' string for the backend
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
      };

      const response = await axios.post(API_CREATE_TASK_URL, formattedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Task created successfully:', response.data);
      message.success('Task created successfully!');
      form.resetFields(); // Clear the form fields after successful submission

    } catch (error) {
      console.error('Error creating task:', error);
      message.error(
        `Error: ${error.response?.data?.message || error.message || 'Failed to create task'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          priority: 'Medium',
          status: 'Pending',
        }}
        className="w-full max-w-xl p-8 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Create New Task</h2>

        <Form.Item
          name="taskName"
          label="Task Title"
          rules={[{ required: true, message: 'Please enter a task title!' }]}
        >
          <Input placeholder="Enter task title" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a task description!' }]}
        >
          <TextArea rows={4} placeholder="Enter a detailed task description" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select a priority!' }]}
        >
          <Select placeholder="Select a priority" size="large">
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
            <Option value="Critical">Critical</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Select placeholder="Select a status" size="large">
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: 'Please select a due date!' }]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" placeholder="Select due date" size="large" />
        </Form.Item>

        <Form.Item className="mt-8">
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            loading={loading}
            className="w-full h-12 text-lg font-bold"
            icon={<SaveOutlined />}
          >
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sample;
