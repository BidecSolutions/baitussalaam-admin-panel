import React, { useEffect } from "react";
import { Form, Input, Select, Button, message, Row, Col } from "antd";

const { Option } = Select;

const CustomerForm = ({
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
          ? "Customer updated successfully!"
          : "Customer added successfully!"
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
      initialValues={{ role: "user" }}
    >
      {/* Full Name */}
      <Form.Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: "Please enter full name" }]}
      >
        <Input placeholder="Enter user's full name" />
      </Form.Item>

      {/* Email + Phone in one row */}
      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Billing Address + Gender */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="billing_address"
            label="Billing Address"
            rules={[{ required: true, message: "Please enter billing address" }]}
          >
            <Input placeholder="Enter billing address" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select placeholder="Select gender" allowClear>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Street + Apartment */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="street_address"
            label="Street Address"
            rules={[{ required: true, message: "Please enter street address" }]}
          >
            <Input placeholder="Enter street address" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="apartment" label="Apartment">
            <Input placeholder="Enter apartment (optional)" />
          </Form.Item>
        </Col>
      </Row>

      {/* City + State */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please enter country" }]}
          >
            <Input placeholder="Enter Country" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: "Please enter state" }]}
          >
            <Input placeholder="Enter state" />
          </Form.Item>
        </Col>
      </Row>
      {/* City + State */}
      <Row gutter={16}>
        <Col span={12}>
          {/* Zip Code */}
          <Form.Item
            name="zip_code"
            label="Zip Code"
            rules={[{ required: true, message: "Please enter zip code" }]}
          >
            <Input placeholder="Enter zip code" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please enter city" }]}
          >
            <Input placeholder="Enter city" />
          </Form.Item>
        </Col>
      </Row>



      {/* Password (only for add, not edit) */}
      {/* {!initialValues && (
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
      )} */}

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? "Update Customer" : "Add Customer"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
