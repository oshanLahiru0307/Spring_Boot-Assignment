import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import TaskService from '../Services/TaskServices';
import dayjs from 'dayjs';
import AuthService from '../Services/AuthService'; 

const { TextArea } = Input;
const { Option } = Select;

const EditTaskModal = ({ visible, task, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const user = AuthService.getUser();

  useEffect(() => {
    if (visible && task) {
      form.setFieldsValue({
        taskName: task.title || task.taskName,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
        assignedTo: task.assignedTo,
      });
    }
  }, [visible, task, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      console.log("Submitting form with values:", values);
      // Format the date for backend
      const formattedValues = {
        id: task.id,
        username: user,
        ...values,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
      };

      console.log("Form values:", formattedValues);

      // Make API call to update task using TaskService
      const updatedTask = await TaskService.updateTask(task.id, formattedValues);
      
      message.success('Task updated successfully!');
      onSuccess(updatedTask); // Pass the updated task data back
      onCancel(); // Close the modal
    } catch (error) {
      console.error('Error updating task:', error);
      if (error.response) {
        message.error(`Error: ${error.response.data?.message || 'Failed to update task'}`);
      } else {
        message.error(`Error: ${error.message || 'An unexpected error occurred.'}`);
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
          <EditOutlined className="text-blue-500" />
          <span className="text-lg font-semibold">Edit Task</span>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="edit-task-modal"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="taskName"
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
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select size="large" className="rounded-lg">
              <Option value="Pending">Pending</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
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

          <Form.Item
            name="assignedTo"
            label="Assigned To"
            rules={[{ required: true, message: 'Please enter assignee' }]}
          >
            <Input 
              placeholder="Enter assignee name" 
              size="large"
              className="rounded-lg"
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
              {loading ? 'Updating...' : 'Update Task'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
