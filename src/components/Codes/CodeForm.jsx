import React, { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Switch,
  Select,
} from "antd";

const { TextArea } = Input;

const CodeForm = ({
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
      const keyValue =
        typeof values.value === "string"
          ? values.value.trim().toLowerCase().replace(/\s+/g, "_")
          : "";
      const payload = { ...values, key: keyValue };
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, value ? 1 : 0);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      await onSubmit(formData);
      form.resetFields();
      message.success(
        initialValues
          ? "Code updated successfully!"
          : "Code added successfully!"
      );
    } catch (error) {
      message.error("Failed to save test data. Please try again.");
      console.error("Error submitting test form:", error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="value"
        label="Name"
        rules={[
          { required: true, message: "Please enter name" },
          { min: 2, message: "Name must be at least 2 characters" },
        ]}
      >
        <Input placeholder="Enter Name" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Please select Type" }]}
      >
        <Select
          placeholder="Select Type"
          options={[
            { label: "Doctor's Qualification", value: "doctor_qualification" },
            {
              label: "Doctor's Specialization",
              value: "doctor_specialization",
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="sort_order"
        label="Sort Order"
        rules={[
          { required: true, message: "Please enter sort order" }
        ]}
      >
        <InputNumber min={0} placeholder="Enter Sort Order" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="is_active"
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
          {initialValues ? "Update Code" : "Add Code"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CodeForm;
