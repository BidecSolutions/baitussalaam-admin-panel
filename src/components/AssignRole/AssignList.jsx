import React from "react";
import { Table, Button, Space, Tag } from "antd";

// Dummy data (isko baad me API se laa sakte ho)
const dataSource = [
  {
    id: 1,
    adminName: "Hassan",
    roles: ["Admin", "Editor"],
  },
  {
    id: 2,
    adminName: "Ali",
    roles: ["Viewer"],
  },
];

const AssignList = ({ onEdit, onDelete }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Admin Name",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <>
          {roles.map((role) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </>
      ),
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
      dataSource={dataSource}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AssignList;
