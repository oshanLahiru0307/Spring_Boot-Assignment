import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Form, Button, Input, Typography, Row, Col, message} from "antd";
import AuthService from "../Services/AuthService"
import backImage2 from "../assets/backImage2.jpg"

const { Title, Text } = Typography;

const RegisterPage= () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const handleRegister = async (values) => {
        try {
            setLoading(true)
            const response = await AuthService.registerUser(values);
            setLoading(false)
            console.log(response)
            navigate('/login')
        } catch (error) {
            console.error(error)
            message.error("Failed to Register User. Try again later!")
        }
    };

    return (


<div
style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #0f0a1a 0%, #1a0b2e 25%, #2d1b69 50%, #4c1d95 75%, #5b21b6 100%)",
    backgroundSize: "cover",
}}
>
<div
    style={{
        width: '1200px',
        padding: "0",
        borderRadius: "10px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
    }}
>
    <Row style={{ height: "550px" }}>
        {/* Left Side - Image */}
        <Col span={12} style={{ 
            background: "linear-gradient(135deg, #0f0a1a 0%, #1a0b2e 50%, #2d1b69 100%)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
        }}>
            <img
                src={backImage2}
                alt="Register"
                style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover", 
                    position: "relative",
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
                    Start Your Journey
                </Title>
                <Title level={5} style={{ 
                    color: "#c4b5fd", 
                    textAlign: "center",
                    opacity: "0.9"
                }}>
                    Join thousands of users who have transformed their productivity. Create your account and take control of your tasks today.
                </Title>
            </div>
        </Col>

        {/* Right Side - Form */}
        <Col span={12} style={{ padding: "10px 20px" }}>
            <Title level={3} style={{ color: "#5b21b6", textAlign: "center" }}>
                Create an Account
            </Title>
            <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
                Fill in the details to register your account.
            </Text>
            <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleRegister}
                            style={{ width: "100%" }}
                        >
                            <Form.Item
                                label="Full Name"
                                name="name"
                                rules={[{ required: true, message: "Please enter your name!" }]}
                            >
                                <Input placeholder="Enter your full name" />
                            </Form.Item>

                            <Form.Item
                                label="User Name"
                                name="username"
                                rules={[{ required: true, message: "Please enter your name!" }]}
                            >
                                <Input placeholder="Enter your full name" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Please enter your email!" },
                                    { type: "email", message: "Invalid email format!" },
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Please enter your password!" },
                                    { min: 6, message: "Password must be at least 6 characters!" },
                                ]}
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Register
                    </Button>
                </Form.Item>

                <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
                    Already a member? <a href="/">Sign in</a>
                </Text>
            </Form>
        </Col>
    </Row>
</div>
</div>
    );
};

export default RegisterPage;
