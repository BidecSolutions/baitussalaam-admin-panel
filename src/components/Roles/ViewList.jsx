import React from "react";
import { Table, Tag } from "antd";

const ViewList = ({ role }) => {
  if (!role) return null;

  // Table columns
  const columns = [
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
  ];

  // Agar role.permissions array of objects hai to use yeh map karega
  const data = role.permissions
    ? role.permissions.map((perm, index) => ({
        key: index,
        module: perm.module || "-",        // module ka naam
        permission: perm.permissionName || perm, // permission ka naam
      }))
    : [];

  return (
    <div>
      <h3>
        <strong>Role Name:</strong> {role.name}
      </h3>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default ViewList;
