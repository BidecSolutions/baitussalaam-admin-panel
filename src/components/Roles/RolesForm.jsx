import React, { useEffect, useState, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { permissionsAPI } from "../../services/api"; // ✅ API service
import { RoleContext } from "../../Context/RolesContext"; // ✅ Context

const RolesForm = ({ visible, onCancel, initialValues = null }) => {
  const [form] = Form.useForm();
  const [permissionsData, setPermissionsData] = useState([]);
  const [permissionNames, setPermissionNames] = useState([]);
  const [fetching, setFetching] = useState(false);

  // ✅ Context values
  const { createRole, loading } = useContext(RoleContext);

  // ✅ Fetch Permissions
  const fetchPermissions = async () => {
    try {
      setFetching(true);
      const response = await permissionsAPI.getAll(); // GET /permissions
      const data = response.data || [];

      setPermissionsData(data);

      // unique permission names (ex: view, create, update, delete)
      const uniqueNames = [...new Set(data.map((p) => p.permissionName))];
      setPermissionNames(uniqueNames);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      message.error("Failed to fetch permissions. Please try again.");
      setPermissionsData([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchPermissions();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  // ✅ Handle Submit
  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        guard: "web", // 🔹 static, can be dynamic if needed
        permissions: values.permissions,
      };

      await createRole(payload);

      form.resetFields();
      message.success("Role added successfully!");
      onCancel();
    } catch (error) {
      message.error("Failed to save role. Please try again.");
      console.error("Error submitting role form:", error);
    }
  };

  // ✅ Select All per Module
  const handleSelectAll = (module, checked) => {
    const currentValues = form.getFieldsValue();
    const newPermissions = { ...currentValues.permissions };

    if (!newPermissions[module]) {
      newPermissions[module] = {};
    }

    permissionNames.forEach((perm) => {
      newPermissions[module][perm] = checked;
    });

    form.setFieldsValue({ permissions: newPermissions });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ name: "", permissions: {} }}
    >
      {/* Role Name */}
      <Form.Item
        name="name"
        label="Role Name"
        rules={[
          { required: true, message: "Please enter role name" },
          { min: 2, message: "Role name must be at least 2 characters" },
        ]}
      >
        <Input placeholder="Enter role name" />
      </Form.Item>

      <Divider>Permissions</Divider>

      {/* Permissions Table */}
      <div style={{ overflowX: "auto" }}>
        <Row style={{ fontWeight: "bold", paddingBottom: 8 }}>
          <Col span={6}>Module</Col>
          <Col span={3} style={{ textAlign: "center" }}>
            Select All
          </Col>
          {permissionNames.map((perm) => (
            <Col key={perm} span={3} style={{ textAlign: "center" }}>
              {perm}
            </Col>
          ))}
        </Row>

        {permissionsData.length === 0 && !fetching && (
          <p style={{ textAlign: "center", marginTop: 8 }}>
            No permissions found
          </p>
        )}

        {/* Group by module */}
        {[...new Set(permissionsData.map((p) => p.module))].map((module) => (
          <Row key={module} style={{ paddingBottom: 8 }}>
            <Col span={6}>{module}</Col>

            {/* ✅ Select All Checkbox */}
            <Col span={3} style={{ textAlign: "center" }}>
              <Checkbox
                onChange={(e) => handleSelectAll(module, e.target.checked)}
              />
            </Col>

            {/* Individual Permissions */}
            {permissionNames.map((perm) => (
              <Col key={perm} span={3} style={{ textAlign: "center" }}>
                <Form.Item
                  name={["permissions", module, perm]}
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
      <Form.Item style={{ textAlign: "right", marginTop: 16 }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? "Update Role" : "Add Role"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RolesForm;
