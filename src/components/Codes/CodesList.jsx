import React from "react";
import { Table, Button, Space, Popconfirm, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CodesList = ({
  codes = [],
  loading = false,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
}) => {
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success("Code deleted successfully!");
    } catch (error) {
      message.error("Failed to delete code. Please try again.");
      console.error("Error deleting code:", error);
    }
  };

  const columns = [ 
    {
      title: "Name",
      dataIndex: "value",
      key: "value",
      sorter: true,
      width: 250,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        if (!type) return "-";
        // Replace underscores with spaces and capitalize first letter of each word
        return type
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      },
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active) => (
        is_active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this code?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={codes}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} codes`,
      }}
      onChange={onTableChange}
      scroll={{ x: 800 }}
    />
  );
};

export default CodesList;
