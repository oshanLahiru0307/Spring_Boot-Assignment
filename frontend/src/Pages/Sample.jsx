import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;

const TaskCreationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const postData = {
      ...values,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
    };

    try {
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      const response = await axios.post('http://localhost:3001/api/tasks/createTask', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      message.success('Task created successfully!');
      console.log('Success:', response.data);
      form.resetFields(); // Reset form after successful submission
    } catch (error) {
      console.error('Error creating task:', error);
      message.error(`Failed to create task: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="createTask"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: 'auto', padding: 24, border: '1px solid #d9d9d9', borderRadius: 8 }}
    >
      <Form.Item
        name="userName"
        label="User Name"
        rules={[{ required: true, message: 'Please input the username!' }]}
      >
        <Input placeholder="Enter username" />
      </Form.Item>

      <Form.Item
        name="taskName"
        label="Task Name"
        rules={[{ required: true, message: 'Please input the task name!' }]}
      >
        <Input placeholder="Enter task name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea placeholder="Enter task description" autoSize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select a status!' }]}
      >
        <Select placeholder="Select a status">
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please select a priority!' }]}
      >
        <Select placeholder="Select a priority">
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskCreationForm;