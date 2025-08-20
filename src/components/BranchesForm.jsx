import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, message, Row, Col, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '../utils/constants';

const { RangePicker } = TimePicker;

const BranchesForm = ({ visible, onCancel, onSubmit, initialValues = null, loading = false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        opening_time: initialValues.opening_time ? dayjs(initialValues.opening_time, TIME_FORMAT) : null,
        closing_time: initialValues.closing_time ? dayjs(initialValues.closing_time, TIME_FORMAT) : null,
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        opening_time: values.opening_time?.format(TIME_FORMAT),
        closing_time: values.closing_time?.format(TIME_FORMAT),
      };
      await onSubmit(formData);

      form.resetFields();
      message.success(initialValues ? 'Branch updated successfully!' : 'Branch added successfully!');
    } catch (error) {
      message.error('Failed to save branch data. Please try again.');
      console.error('Error submitting branch form:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ width: '100%' }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="name"
            label="Branch Name"
            rules={[{ required: true, message: 'Please enter branch name' }]}
          >
            <Input placeholder="Enter branch name" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="code"
            label="Branch Code"
            rules={[{ required: true, message: 'Please enter branch code' }]}
          >
            <Input placeholder="Enter branch code" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="03001234567" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Enter valid email' }]}
          >
            <Input placeholder="branch@example.com" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input placeholder="Enter branch address" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="is_active"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="opening_time"
            label="Opening Time"
            rules={[{ required: true, message: 'Select opening time' }]}
          >
            <TimePicker format={TIME_FORMAT} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="closing_time"
            label="Closing Time"
            rules={[{ required: true, message: 'Select closing time' }]}
          >
            <TimePicker format={TIME_FORMAT} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="latitude"
            label="Latitude"
          >
            <Input placeholder="e.g. 24.8607" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="longitude"
            label="Longitude"
          >
            <Input placeholder="e.g. 67.0011" />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {initialValues ? 'Update Branch' : 'Add Branch'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default BranchesForm;
