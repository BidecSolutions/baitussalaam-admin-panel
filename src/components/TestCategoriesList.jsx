import React from "react";
import { Table, Button, Space, Popconfirm, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRoles } from "../Context/PermissionsContext";

const TestCategoriesList = ({
  tests = [],
  loading = false,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
}) => {
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success("Test deleted successfully!");
    } catch (error) {
      message.error("Failed to delete test. Please try again.");
      console.error("Error deleting test:", error);
    }
  };

  const { permissions } = useRoles();

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: 200,
      fixed: "left", 
      render: (text) => <strong>{text}</strong>,
      responsive: ["xs", "sm", "md", "lg"], 
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["sm", "md", "lg"], 
      render: (description) => {
        if (!description) return "-";
        return (
          <div style={{ maxWidth: 300, whiteSpace: "normal" }}>
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </div>
        );
      },
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      width: 120,
      render: (is_active) =>
        is_active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
      responsive: ["sm", "md", "lg"], 
    },
    {
      title: "Actions",
      key: "actions",
      width: 220,
      fixed: "right", 
      render: (_, record) => (
        <Space size="middle" wrap>
          {permissions.includes("test category.edit") && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => onEdit(record)}
            >
              Edit
            </Button>
          )}
          {permissions.includes("test category.delete") && (
            <Popconfirm
              title="Are you sure you want to delete this test?"
              description="This action cannot be undone."
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} size="small">
                Delete
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
   <Table
  columns={columns}
  dataSource={tests}
  rowKey="id"
  loading={loading}
  pagination={{
    ...pagination,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} of ${total} tests`,
  }}
  onChange={onTableChange}
  scroll={{ x: "max-content" }} 
  style={{ whiteSpace: "nowrap" }} 
/>

  );
};

export default TestCategoriesList;
