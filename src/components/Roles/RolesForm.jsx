import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Divider } from "antd";

const permissionModules = [
  { group: "Patients", modules: ["Patient Registration", "Patient History"] },
  { group: "Tests", modules: ["Test Category", "Test Master", "Test Booking", "Sample Collection"] },
  { group: "Reports", modules: ["Generate Report", "View Report", "Print Report"] },
  { group: "Billing", modules: ["Invoices", "Payments", "Discounts", "Refunds"] },
  { group: "Inventory", modules: ["Reagents", "Equipments", "Stock Management"] },
  { group: "Staff", modules: ["Doctors", "Technicians", "Receptionists", "Roles & Permissions"] },
];

const permissionActions = ["Create", "List", "Edit", "Delete", "Print"];

const RolesForm = ({ visible, onCancel, onSubmit, initialValues = null, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleSubmit = (values) => {
    const payload = {
      name: values.name,
      permissions: values.permissions || {},
    };
    onSubmit(payload);
    form.resetFields();
    onCancel();
  };

  const handleSelectAll = (module, checked) => {
    const currentValues = form.getFieldsValue();
    const newPermissions = { ...currentValues.permissions };
    if (!newPermissions[module]) newPermissions[module] = {};
    permissionActions.forEach((action) => {
      newPermissions[module][action] = checked;
    });
    form.setFieldsValue({ permissions: newPermissions });
  };

  return (
    <div className="flex justify-center items-start min-h-screen  pt-0 ">
      {/* Horizontal wide container but vertically compact */}
      <div className="bg-white  rounded-xl w-full max-w-7xl">
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleSubmit}
          initialValues={{ name: "", permissions: {} }}
          className="space-y-6"
        >
          {/* Role Name */}
          <Form.Item
            name="name"
            label={<span className="text-lg font-medium">Role Name</span>}
            rules={[
              { required: true, message: "Please enter role name" },
              { min: 2, message: "Role name must be at least 2 characters" },
            ]}
          >
            <Input
              placeholder="Enter role name"
              className="h-12 text-lg"
              style={{ width: "70%" }}
            />
          </Form.Item>

          <Divider>Permissions</Divider>

          {/* Scrollable container for permissions */}
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              border: "1px solid #f0f0f0",
              padding: "8px",
            }}
          >
            {/* Table Header */}
            <Row style={{ fontWeight: "bold", paddingBottom: 8 }}>
              <Col span={6}>Module</Col>
              <Col span={3} style={{ textAlign: "center" }}>
                Select All
              </Col>
              {permissionActions.map((action) => (
                <Col key={action} span={3} style={{ textAlign: "center" }}>
                  {action}
                </Col>
              ))}
            </Row>

            {/* Table Rows */}
            {permissionModules.map((group) => (
              <React.Fragment key={group.group}>
                <Row
                  style={{
                    fontWeight: "bold",
                    background: "#f0f0f0",
                    padding: "6px 0",
                    fontSize: "16px",
                  }}
                >
                  <Col span={24}>{group.group}</Col>
                </Row>
                {group.modules.map((module) => (
                  <Row key={module} style={{ padding: "10px 0", fontSize: "15px" }}>
                    <Col span={6}>{module}</Col>
                    <Col span={3} style={{ textAlign: "center" }}>
                      <Checkbox
                        onChange={(e) => handleSelectAll(module, e.target.checked)}
                        className="scale-125"
                      />
                    </Col>
                    {permissionActions.map((action) => (
                      <Col key={action} span={3} style={{ textAlign: "center" }}>
                        <Form.Item
                          name={["permissions", module, action]}
                          valuePropName="checked"
                          noStyle
                        >
                          <Checkbox className="scale-125" />
                        </Form.Item>
                      </Col>
                    ))}
                  </Row>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Footer Buttons */}
          <Form.Item
            wrapperCol={{ offset: 4, span: 20 }}
            style={{ textAlign: "right", marginTop: 16 }}
          >
            <Button onClick={onCancel} style={{ marginRight: 12 }} size="large">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} size="large">
              {initialValues ? "Update Role" : "Add Role"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RolesForm;
