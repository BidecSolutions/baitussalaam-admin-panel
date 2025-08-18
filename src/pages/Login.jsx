import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../Context/RolesContext";

const Login = () => {
  const [form] = Form.useForm();
  const { login } = useContext(RoleContext); // login function
  const navigate = useNavigate();

const handleLogin = async (values) => {
  try {
    const response = await login(values); // context se login call
    if (response) {
      if (response.role === "admin") {
        navigate("/");
      } else {
        navigate("/user-dashboard");
      }
    }
  } catch (error) {
    message.error("Login failed. Please check your credentials.");
  }
};


  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 24,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>

      <Form
        form={form}
        layout="vertical"
        name="loginForm"
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
