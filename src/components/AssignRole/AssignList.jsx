import React from "react";
import { Table, Button, Space, Tag } from "antd";

// Dummy data (isko baad me API se laa sakte ho)


const AssignList = ({ onEdit, onDelete, data, loading = false, }) => {
  const dataSource = data;
  console.log(dataSource)
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Admin Name",
      dataIndex: "admin_name",
      key: "admin_name",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (text) => (text?.map((d) => (<Tag color="blue">{d}</Tag>)))
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button danger type="link" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      loading={loading}
      dataSource={Array.isArray(dataSource) ? dataSource : []}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AssignList;
