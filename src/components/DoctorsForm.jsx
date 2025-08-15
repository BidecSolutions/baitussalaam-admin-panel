import React, { useEffect } from 'react';
import { Form, Input, Select, TimePicker, Button, message } from 'antd';
import dayjs from 'dayjs';
import { WEEKDAYS, SPECIALTIES, TIME_FORMAT } from '../utils/constants';

const { Option } = Select;
const { RangePicker } = TimePicker;

const DoctorsForm = ({ 
  visible, 
  onCancel, 
  onSubmit, 
  initialValues = null, 
  loading = false 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      // Convert time slots back to dayjs objects for the form
      const formData = {
        ...initialValues,
        timeSlots: initialValues.timeSlots ? [
          dayjs(initialValues.timeSlots[0], TIME_FORMAT),
          dayjs(initialValues.timeSlots[1], TIME_FORMAT)
        ] : undefined
      };
      form.setFieldsValue(formData);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      // Convert time slots to string format for API
      const submitData = {
        ...values,
        timeSlots: values.timeSlots ? [
          values.timeSlots[0].format(TIME_FORMAT),
          values.timeSlots[1].format(TIME_FORMAT)
        ] : undefined
      };

      await onSubmit(submitData);
      form.resetFields();
      message.success(initialValues ? 'Doctor updated successfully!' : 'Doctor added successfully!');
    } catch (error) {
      message.error('Failed to save doctor data. Please try again.');
      console.error('Error submitting doctor form:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        availableDays: [],
        timeSlots: undefined,
      }}
    >
      <Form.Item
        name="name"
        label="Doctor Name"
        rules={[
          { required: true, message: 'Please enter doctor name' },
          { min: 2, message: 'Name must be at least 2 characters' }
        ]}
      >
        <Input placeholder="Enter doctor's full name" />
      </Form.Item>

      <Form.Item
        name="specialty"
        label="Specialty"
        rules={[
          { required: true, message: 'Please select or enter specialty' }
        ]}
      >
        <Select
          placeholder="Select or enter specialty"
          allowClear
          showSearch
          mode="tags"
          options={SPECIALTIES.map(specialty => ({ label: specialty, value: specialty }))}
        />
      </Form.Item>

      <Form.Item
        name="availableDays"
        label="Available Days"
        rules={[
          { required: true, message: 'Please select available days' },
          { type: 'array', min: 1, message: 'Please select at least one day' }
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select available days"
          options={WEEKDAYS}
        />
      </Form.Item>

      <Form.Item
        name="timeSlots"
        label="Time Slots"
        rules={[
          { required: true, message: 'Please select time slots' }
        ]}
      >
        <RangePicker
          format={TIME_FORMAT}
          placeholder={['Start Time', 'End Time']}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? 'Update Doctor' : 'Add Doctor'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DoctorsForm; 