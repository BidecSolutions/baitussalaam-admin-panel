import React from "react";
import { Table, Tag } from "antd";

const TestsCategory = () => {
  // ✅ Dummy test data (abhi ke liye static)
  const dataSource = [
    {
      id: 1,
      name: "Blood Test",
      category: "Hematology",
      price: 1000,
      discounted_price: 800,
      duration: "2 hours",
      description: "Complete blood count",
      is_active: 1,
    },
    {
      id: 2,
      name: "Brain Scan",
      category: "Neurology",
      price: 5000,
      discounted_price: 4500,
      duration: "1 hour",
      description: "MRI brain scan",
      is_active: 1,
    },
  ];

  // ✅ Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Test Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discounted Price",
      dataIndex: "discounted_price",
      key: "discounted_price",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      <h2 className="text-xl font-semibold mb-4">Tests List</h2>
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
