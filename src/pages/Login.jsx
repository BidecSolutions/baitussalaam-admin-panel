import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const Login = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper function to trigger permission update
  const triggerPermissionUpdate = (userData) => {
    const event = new CustomEvent("userChange", {
      detail: { type: "login", userData },
    });
    window.dispatchEvent(event);
  };

  // 🔹 Handle Login
  const handleLogin = async (values) => {
    try {
      let response = await authAPI.loginAdmin(values);
      if (response.data.success) {
        const user = response.data?.data;
        const token = response.data.token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        triggerPermissionUpdate(user);

        message.success("Admin Login successful!");
        navigate("/"); // Admin dashboard
        return;
      } else {
        message.error("Invalid admin credentials!");
      }
    } catch (adminError) {
      try {
        let response = await authAPI.loginUser(values);
        if (response.data.success) {
          const user = response.data.data;
          const token = response.data.token;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);

          triggerPermissionUpdate(user);

          message.success("User Login successful!");
          navigate("/user-dashboard");
          return;
        } else {
          Modal.error({
            title: "User Login Failed",
            content: "Invalid user credentials!",
          });
        }
      } catch (userError) {
        Modal.error({
          title: "Login Failed",
          content: "Something went wrong. Please try again later.",
        });
      }
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

      {/* Login Form */}
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

      {/* Styled Register link */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <span style={{ marginRight: 8 }}>Don’t have an account?</span>
        <Link
          to="/register"
          style={{
            color: "#1890ff",
            fontWeight: 500,
            textDecoration: "underline",
          }}
        >
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
