import React, { useEffect, useState } from "react";
import { Form, Select, Button, message } from "antd";
import { rolesAPI, usersAPI, AssignRoleAdmins } from "../../services/api";

const { Option } = Select;

const AssignForm = ({ onSuccess, onCancel, initialValues = null, loading }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await rolesAPI.getAll();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setRoles(data.filter((r) => r.guard_name === "admin-api"));
    } catch (error) {
      message.error("Failed to fetch roles!");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setUsers(data);
    } catch (error) {
      message.error("Failed to fetch users!");
    }
  };

  // Populate edit values
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        admin_id: initialValues.admin_id,
        role: initialValues.roles || [],
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        admin_id: values.admin_id,
        roles: values.role, // array of role names
      };

      if (initialValues) {
        await AssignRoleAdmins.update(values.admin_id, payload);
        message.success("Role updated successfully!");
      } else {
        await AssignRoleAdmins.create(payload);
        message.success("Role assigned successfully!");
      }

      form.resetFields();
      onSuccess();
    } catch (e) {
      console.error("Assign role error:", e);
      message.error("Failed to save role!");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="admin_id"
        label="Select Admin"
        rules={[{ required: true, message: "Please select an admin" }]}
      >
        <Select placeholder="Choose admin">
          {users.map((u) => (
            <Option key={u.id} value={u.id}>
              {u.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="role"
        label="Select Roles"
        rules={[{ required: true, message: "Please select at least one role" }]}
      >
        <Select mode="multiple" placeholder="Choose roles" allowClear>
          {roles.map((r) => (
            <Option key={r.id} value={r.name}>
              {r.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? "Update" : "Assign"}
        </Button>
      </div>
    </Form>
  );
};

export default AssignForm;
