import React, { useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

const UsersForm = ({
  visible,
  onCancel,
  onSubmit,
  initialValues = null,
  loading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
      form.resetFields();
      message.success(
        initialValues
          ? "User updated successfully!"
          : "User added successfully!"
      );
    } catch (error) {
      message.error("Failed to save user data. Please try again.");
      console.error("Error submitting user form:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        role: "user",
      }}
    >
      {/* Full Name */}
      <Form.Item
        name="name"
        label="Full Name"
        rules={[
          { required: true, message: "Please enter full name" },
          { min: 2, message: "Name must be at least 2 characters" },
        ]}
      >
        <Input placeholder="Enter user's full name" />
      </Form.Item>

      {/* Email */}
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter email address" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter user's email address" />
      </Form.Item>

      {/* Role */}
      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select role" }]}
      >
        <Select placeholder="Select role" allowClear>
          <Option value="admin">Admin</Option>
          <Option value="manager">Manager</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>

      {/* Password */}
      {!initialValues && (
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
      )}

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? "Update User" : "Add User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UsersForm;
