import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { useSnapshot } from 'valtio';
import { authStore } from '../stores/authStore';
import { authService } from '../services/authService';

const { Title, Text } = Typography;

function RegisterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const snap = useSnapshot(authStore);
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFinish = async (values) => {
    try {
      // Check if passwords match
      if (values.password !== confirmPassword) {
        message.error('Passwords do not match!');
        return;
      }

      // Call registration service
      await authService.register({
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password
      });

      message.success('Registration successful! Please login.');
      navigate('/');
    } catch (error) {
      // Error is already set in the store
      console.error('Registration error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="text-center mb-6">
          <Title level={2} className="text-gray-800 mb-2">
            Create Account
          </Title>
          <Text type="secondary">
            Join us and start managing your tasks efficiently
          </Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: 'Please enter your full name!' },
              { min: 2, message: 'Name must be at least 2 characters!' }
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="text-gray-400" />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please enter a username!' },
              { min: 3, message: 'Username must be at least 3 characters!' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores!' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Choose a username"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter a password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
              { 
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number!'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Create a strong password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              { required: true, message: 'Please confirm your password!' },
              {
                validator: (_, value) => {
                  if (!value || form.getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                }
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          {snap.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <Text type="danger">{snap.error}</Text>
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-base font-medium"
              loading={snap.isLoading}
            >
              {snap.isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form.Item>
        </Form>

        <Divider>
          <Text type="secondary">Already have an account?</Text>
        </Divider>

        <div className="text-center">
          <Link to="/">
            <Button type="link" className="text-base">
              Sign in to your account
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
