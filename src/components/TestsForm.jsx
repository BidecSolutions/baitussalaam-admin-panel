import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { testsAPI } from '../services/api';

const { TextArea } = Input;

const TestsForm = ({ 
  visible, 
  onCancel, 
  onSubmit, 
  initialValues = null, 
  loading = false 
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
      message.success(initialValues ? 'Test updated successfully!' : 'Test added successfully!');
    } catch (error) {
      message.error('Failed to save test data. Please try again.');
      console.error('Error submitting test form:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        label="Test Name"
        rules={[
          { required: true, message: 'Please enter test name' },
          { min: 2, message: 'Test name must be at least 2 characters' }
        ]}
      >
        <Input placeholder="Enter laboratory test name" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[
          { required: true, message: 'Please enter test price' },
          { type: 'number', min: 0, message: 'Price must be a positive number' }
        ]}
      >
        <InputNumber
          placeholder="Enter price"
          min={0}
          step={0.01}
          precision={2}
          style={{ width: '100%' }}
          addonAfter="PKR"
        />
      </Form.Item>

      <Form.Item
        name="duration"
        label="Duration (minutes)"
        rules={[
          { required: true, message: 'Please enter test duration' },
          { type: 'number', min: 1, message: 'Duration must be at least 1 minute' }
        ]}
      >
        <InputNumber
          placeholder="Enter duration in minutes"
          min={1}
          step={1}
          style={{ width: '100%' }}
          addonAfter="min"
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { max: 500, message: 'Description cannot exceed 500 characters' }
        ]}
      >
        <TextArea
          placeholder="Enter test description (optional)"
          rows={4}
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? 'Update Test' : 'Add Test'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestsForm; 