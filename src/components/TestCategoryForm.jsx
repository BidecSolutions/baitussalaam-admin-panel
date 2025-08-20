import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, message, Switch } from "antd";
import { testsAPI } from "../services/api";

const { TextArea } = Input;

const TestCategoryForm = ({
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
      // INSERT_YOUR_CODE
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        // For booleans, convert to string to avoid FormData issues
        if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      await onSubmit(formData);
      form.resetFields();
      message.success(
        initialValues
          ? "Test Category updated successfully!"
          : "Test Category added successfully!"
      );
    } catch (error) {
      message.error("Failed to save test data. Please try again.");
      console.error("Error submitting test form:", error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Category Name"
        rules={[
          { required: true, message: "Please enter Category name" },
          { min: 2, message: "Category name must be at least 2 characters" },
        ]}
      >
        <Input placeholder="Enter Test Category Name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { max: 500, message: "Description cannot exceed 500 characters" },
        ]}
      >
        <TextArea
          placeholder="Enter test description (optional)"
          rows={4}
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="slug"
        label="Slug"
        rules={[
          { required: true, message: "Please enter slug" },
          { min: 2, message: "Slug must be at least 2 characters" },
        ]}
      >
        <Input placeholder="Enter Slug" />
      </Form.Item>

      <Form.Item
        name="active"
        label="Active"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? "Update Category" : "Add Category"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestCategoryForm;
