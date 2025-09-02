import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Drawer,
  Descriptions,
  Modal,
  Popconfirm,
  Switch,
  Spin,
} from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import BranchesForm from "./BranchesForm";


import { useRoles } from "../Context/PermissionsContext";

const BranchesList = ({
  branches,
  loading = false,
  onEdit,
  onDelete,
  status,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loadingIds, setLoadingIds] = useState([]); // switch loader

  //  const permissions = useRoles();
  const { permissions } = useRoles();

  console.log('permissions', permissions);

  const showDrawer = (branch) => {
    setSelectedBranch(branch);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedBranch(null);
  };

  const showEditForm = (branch) => {
    setSelectedBranch(branch);
    onEdit(branch);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setSelectedBranch(null);
  };

  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
    setFormVisible(false);
    setSelectedBranch(null);
  };

  const handleToggle = async (id, checked) => {
    setLoadingIds((prev) => [...prev, id]);
    try {
      await status(id, checked);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "Active",
      render: (_, record) => (
        <Switch
          checked={record.is_active}
          onChange={(checked) => handleToggle(record.id, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          loading={loadingIds.includes(record.id)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {permissions.includes("branches.list") && (
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showDrawer(record)}
          >
            View
          </Button>
          )}

          {permissions.includes("branches.edit") && (
            <Button
              type="default"
              icon={<EditOutlined />}
              size="small"
              onClick={() => showEditForm(record)}
            >
              Edit
            </Button>
          )}
          {permissions.includes("branches.delete") && (
            <Popconfirm
              title="Are you sure you want to delete this branch?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button type="primary" danger size="small">
                Delete
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading} tip="Loading branches..." size="large">
        <Table
          columns={columns}
          dataSource={branches}
          rowKey="id"
          scroll={{ x: 900 }}
          pagination={{ showSizeChanger: true, showQuickJumper: true }}
        />
      </Spin>

      <Drawer
        title={selectedBranch?.name}
        placement="right"
        width={window.innerWidth < 768 ? "100%" : 500}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {selectedBranch && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">
              {selectedBranch.id}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {selectedBranch.name}
            </Descriptions.Item>
            <Descriptions.Item label="Code">
              {selectedBranch.code}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {selectedBranch.address}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedBranch.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedBranch.email}
            </Descriptions.Item>
            <Descriptions.Item label="Opening Time">
              {selectedBranch.opening_time}
            </Descriptions.Item>
            <Descriptions.Item label="Closing Time">
              {selectedBranch.closing_time}
            </Descriptions.Item>
            <Descriptions.Item label="Active">
              <Tag color={selectedBranch.is_active ? "green" : "red"}>
                {selectedBranch.is_active ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Latitude">
              {selectedBranch.latitude}
            </Descriptions.Item>
            <Descriptions.Item label="Longitude">
              {selectedBranch.longitude}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {selectedBranch.created_at}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {selectedBranch.updated_at}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>

      <Modal
        title={selectedBranch ? "Edit Branch" : "Add Branch"}
        open={formVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={window.innerWidth < 768 ? "90%" : 900}
      >
        <BranchesForm
          visible={formVisible}
          onCancel={handleFormCancel}
          onSubmit={handleFormSubmit}
          initialValues={selectedBranch}
        />
      </Modal>
    </>
  );
};

export default BranchesList;
