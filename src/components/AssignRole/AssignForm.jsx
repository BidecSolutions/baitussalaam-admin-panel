import React, { useContext, useEffect, useState } from "react";
import { Form, Select, Button, message } from "antd";
import { rolesAPI, usersAPI , AssignRoleAdmins} from "../../services/api"; // ✅ Users API bhi import kiya
// import { RoleContext } from "../../Context/RolesContext";

// import { RoleContext } from "../../Context/RolesContext"; // ✅ Context

const { Option } = Select;

const AssignForm = ({
  onSubmit,
  onCancel,
  initialValues = null,
  loading = false,
  set
}) => {
 
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchingRoles, setFetchingRoles] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  
  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  // ✅ Roles Fetch
  const fetchRoles = async () => {
    try {
      setFetchingRoles(true);
      const response = await rolesAPI.getAll(); // GET /roles
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      const filteredUsers = data.filter((data) => {
        return data.guard_name === "admin-api"
      });
      console.log(filteredUsers)
      setRoles(filteredUsers);
    } catch (error) {
      console.error("Error fetching roles:", error);
      message.error("Failed to fetch roles. Please try again.");
      setRoles([]);
    } finally {
      setFetchingRoles(false);
    }
  };

  // ✅ Users Fetch
  const fetchUsers = async () => {
    try {
      setFetchingUsers(true);
      const response = await usersAPI.getAll(); // GET /users
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users. Please try again.");
      setUsers([]);
    } finally {
      setFetchingUsers(false);
    }
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
   try {
         const payLoad = {
           admin_id: values.admin_id,
           role: values.role,
         };
            const res = await AssignRoleAdmins.create(payLoad);
            console.log("admin id" , payLoad.admin_id);
            console.log("admin id" , payLoad.values.role);
            
        
         console.log("res " , res.data);
         form.resetFields();
      
         set(false)
       } catch (e) {
       
         console.log(e);
       }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      style={{ marginTop: 10 }}
    >
      {/* ✅ Select User */}
      <Form.Item
        name="admin_id"
        label="Select Admin"
        rules={[{ required: true, message: "Please select a admin" }]}
      >
        <Select placeholder="Choose a user" loading={fetchingUsers} >
          {users?.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* ✅ Select Roles */}
      <Form.Item
        name="role"
        label="Select Roles"
        rules={[{ required: true, message: "Please select at least one role" }]}
      >
        <Select
          mode="multiple"
          placeholder="Choose roles"
          allowClear
          loading={fetchingRoles}
        >
          {roles.map((role) => (
            <Option key={role.id} value={role.name}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Buttons */}
      <Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Assign
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AssignForm;
