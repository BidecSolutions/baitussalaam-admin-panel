import React from "react";
import { Table, Tag } from "antd";

const TestsCategory = () => {
  // ✅ Dummy categories data (static for now)
  const dataSource = [
    {
      id: 1,
      name: "Hematology",
      description: "Blood related tests",
      slug: "hematology",
      is_active: 1,
    },
    {
      id: 2,
      name: "Neurology",
      description: "Brain aur nervous system",
      slug: "neurology",
      is_active: 1,
    },
    {
      id: 3,
      name: "Nephrology",
      description: "Kidneys ka system",
      slug: "nephrology",
      is_active: 0,
    },
  ];

  // ✅ Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active) =>
        is_active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Test Categories</h2>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TestsCategory;
