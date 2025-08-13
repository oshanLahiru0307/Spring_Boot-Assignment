import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { Form, Button, Input, Typography, message, Row, Col } from "antd";
import AuthService from "../Services/AuthService"
import backImage2 from "../assets/backImage2.jpg"

const { Title, Text } = Typography;

const LoginPage = () => {   

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
      const response = await AuthService.loginUser(values);
      console.log("Login response:", response); // Debugging line
      if (response) {
        //state.userId = response.id;
        //localStorage.setItem("user", JSON.stringify(state.userId));
        message.success("Login successful!");
        navigate("/dashboard"); 
      } else {
        message.error("Login failed. Please check your credentials....");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
<div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: '100%',
                height: "100vh",
                background: "linear-gradient(135deg, #0f0a1a 0%, #1a0b2e 25%, #2d1b69 50%, #4c1d95 75%, #5b21b6 100%)",
                backgroundSize: "cover",
                backgroundPosition: 'center'
            }}
        >
            <div
                style={{
                    width: '1000px',
                    padding: "0",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "white",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                }}
            >
                <Row>
                    {/* Left Side - Image */}
                    <Col span={12} style={{ 
                        background: "linear-gradient(135deg, #0f0a1a 0%, #1a0b2e 50%, #2d1b69 100%)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        position: "relative" 
                    }}>
                        <img
                            src={backImage2}
                            alt="Login"
                            style={{ 
                                width: "100%", 
                                height: "100%", 
                                objectFit: "cover",
                                opacity: "0.2"
                            }}
                        />
                        <div style={{ 
                            color: "white", 
                            textAlign: "center", 
                            position: "absolute", 
                            padding: "20px", 
                            bottom: "40%",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
                        }}>
                            <Title level={1} style={{ 
                                color: "#e9d5ff", 
                                textAlign: "center", 
                                marginBottom:'30px',
                                fontWeight: "bold",
                                textShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
                            }}>
                                Welcome Back!
                            </Title>
                            <Title level={5} style={{ 
                                color: "#c4b5fd", 
                                textAlign: "center",
                                opacity: "0.9"
                            }}>
                                Sign in to access your tasks, track your progress, and stay organized. Your productivity journey continues here.
                            </Title>
                        </div>
                    </Col>

                    {/* Right Side - Form */}
                    <Col span={12} style={{ padding: "40px" }}>
                        <Title level={3} style={{ color: "#5b21b6", textAlign: "center" }}>
                            Sign in Account
                        </Title>
                        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
                            Enter your credentials to access your account.
                        </Text>
                        <Form
                            form={form}
                            layout="vertical"
                            style={{ width: "100%" }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                label="User Name"
                                name="username"
                                rules={[{ required: true, message: "Please enter your User Name!" }]}
                            > 
                                <Input placeholder="Enter your User Name" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Please enter your password!" }]}
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>

                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Sign in
                            </Button>
                    
                            <Text type="secondary" style={{ display: "block", textAlign: "center", marginTop: '10px'  }}>
                                Not a member? <a href="/register">Sign up</a>
                            </Text>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
  );
};

export default LoginPage;
