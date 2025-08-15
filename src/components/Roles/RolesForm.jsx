import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Divider, message } from 'antd';

const permissionColumns = ['Select All', 'Create', 'List', 'Edit', 'Delete', 'Print'];
const permissionCategories = ['Category', 'Product', 'SubCategory', 'Unit'];

const RolesForm = ({ 
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
      message.success(initialValues ? 'Role updated successfully!' : 'Role added successfully!');
    } catch (error) {
      message.error('Failed to save role. Please try again.');
      console.error('Error submitting role form:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ name: '', permissions: {} }}
    >
      {/* Role Name */}
      <Form.Item
        name="name"
        label="Role Name"
        rules={[
          { required: true, message: 'Please enter role name' },
          { min: 2, message: 'Role name must be at least 2 characters' }
        ]}
      >
        <Input placeholder="Enter role name" />
      </Form.Item>

      <Divider>Permissions</Divider>

      {/* Permissions Table */}
      <div style={{ overflowX: 'auto' }}>
        <Row style={{ fontWeight: 'bold', paddingBottom: 8 }}>
          <Col span={6}>Category</Col>
          {permissionColumns.map((col) => (
            <Col key={col} span={3} style={{ textAlign: 'center' }}>
              {col}
            </Col>
          ))}
        </Row>
        {permissionCategories.map((category) => (
          <Row key={category} style={{ paddingBottom: 8 }}>
            <Col span={6}>{category}</Col>
            {permissionColumns.map((perm) => (
              <Col key={perm} span={3} style={{ textAlign: 'center' }}>
                <Form.Item
                  name={['permissions', category, perm]}
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox />
                </Form.Item>
              </Col>
            ))}
          </Row>
        ))}
      </div>

      {/* Buttons */}
      <Form.Item style={{ textAlign: 'right', marginTop: 16 }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? 'Update Role' : 'Add Role'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RolesForm;
