// src/pages/TestForm.jsx
import React, { useContext } from "react";
import { Form, Input, InputNumber, Button, Card } from "antd";
import { RoleContext } from "../Context/RolesContext";

const { TextArea } = Input;

const TestForm = () => {
  const { createTest } = useContext(RoleContext);

  const onFinish = async (values) => {
    const res = await createTest(values);
    console.log("Created Test:", res);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Create New Test" className="w-[500px] shadow-lg">
        <Form layout="vertical" onFinish={onFinish}>
          {/* Test Name */}
          <Form.Item
            name="name"
            label="Test Name"
            rules={[{ required: true, message: "Please enter test name" }]}
          >
            <Input placeholder="Enter test name" />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Please enter category ID" }]}
          >
            <Input placeholder="Enter category ID" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              placeholder="Enter price"
            />
          </Form.Item>

          {/* Discounted Price */}
          <Form.Item name="discounted_price" label="Discounted Price">
            <InputNumber
              className="w-full"
              min={0}
              placeholder="Enter discounted price"
            />
          </Form.Item>

          {/* Duration */}
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input placeholder="e.g. 2 hours, 30 min" />
          </Form.Item>

          {/* Description */}
          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Test
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TestForm;
