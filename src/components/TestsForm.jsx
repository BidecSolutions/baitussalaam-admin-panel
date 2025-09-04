import { Form, Input, InputNumber, Button, Card, Space, Select, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import api from "../services/api";

const { TextArea } = Input;
const { Option } = Select;

const TestForm = ({ initialValues, loading, onCancel, visible, onSubmit }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (visible) {
      api
        .get("/test-category")
        .then((res) => setCategories(res.data?.data || []))
        .catch((err) => console.error("Failed to fetch categories", err));

      form.setFieldsValue(initialValues || {});
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const onFinish = async (values) => {
    try {
      await onSubmit(values);
      form.resetFields();
    } catch (err) {
      console.error("Error in form submit:", err);
    }
  };

  return (
    <div className="flex justify-center items-start py-6">
      <Card
        title={initialValues ? "Edit Test" : "Create New Test"}
        className="w-full max-w-6xl shadow-lg rounded-xl"
        bordered={false}
        bodyStyle={{ padding: "24px" }}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          {/* 🔹 First Row */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Test Name"
                rules={[{ required: true, message: "Please enter test name" }]}
              >
                <Input placeholder="Enter test name" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: "Please enter slug" }]}
              >
                <Input placeholder="Enter slug" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="category_id"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category">
                  {categories.map((cat) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* 🔹 Second Row */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="preparation_instructions"
                label="Preparation Instructions"
                rules={[{ required: true, message: "Please enter preparation instructions" }]}
              >
                <Input placeholder="Enter preparation instructions" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <InputNumber className="w-full" min={0} placeholder="Enter price" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="discounted_price" label="Discounted Price">
                <InputNumber className="w-full" min={0} placeholder="Enter discounted price" />
              </Form.Item>
            </Col>
          </Row>

          {/* 🔹 Third Row */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[{ required: true, message: "Please enter duration" }]}
              >
                <Input placeholder="e.g. 2 hours, 30 min" />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item name="description" label="Description">
                <TextArea rows={3} placeholder="Enter description" />
              </Form.Item>
            </Col>
          </Row>

          {/* 🔹 Buttons */}
          <Form.Item>
            <Space className="w-full flex justify-end">
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {initialValues ? "Update Test" : "Create Test"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TestForm;
