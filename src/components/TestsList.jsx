import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message, Tag, Drawer, Descriptions } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRoles } from "../Context/PermissionsContext";

const TestsList = ({ tests = [], loading = false, onEdit, onDelete, pagination, onTableChange }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [expandedRows, setExpandedRows] = useState({}); // Track expanded rows for Read More
  const { permissions } = useRoles();

  const showDrawer = (test) => {
    setSelectedTest(test);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedTest(null);
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success("Test deleted successfully!");
    } catch (error) {
      message.error("Failed to delete test. Please try again.");
      console.error("Error deleting test:", error);
    }
  };

  const toggleReadMore = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const columns = [
    {
      title: "Test Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: 250,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      width: 175,
      sorter: true,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      sorter: true,
      render: (price) => (
        <Tag color="green" style={{ fontSize: "14px" }}>
          PKR {(Number(price) || 0).toFixed(2)}
        </Tag>
      ),
    },
    {
      title: "Discounted Price",
      dataIndex: "discounted_price",
      key: "discounted_price",
      sorter: true,
      render: (price) => (
        <Tag color="green" style={{ fontSize: "14px" }}>
          PKR {(Number(price) || 0).toFixed(2)}
        </Tag>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: true,
      render: (duration) => <Tag color="blue">{duration} min</Tag>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description, record) => {
        if (!description) return "-";

        const isExpanded = expandedRows[record.id];
        const displayText = isExpanded ? description : description.substring(0, 30);

        return (
          <div style={{ maxWidth: 300 }}>
            {displayText}
            {description.length > 100 && (
              <Button
                type="link"
                onClick={() => toggleReadMore(record.id)}
                style={{ padding: 0, marginLeft: 5 }}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          {permissions.includes("tests.list") && (
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => showDrawer(record)}>
            View
          </Button>
          )}
          {permissions.includes("tests.edit") && (
          <Button type="default" icon={<EditOutlined />} size="small" onClick={() => onEdit(record)}>
            Edit
          </Button>
          )}
          {permissions.includes("tests.delete") && (

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
    <>
      <Table
        columns={columns}
        dataSource={tests}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} tests`,
        }}
        onChange={onTableChange}
        scroll={{ x: 900 }}
      />

      {/* Drawer */}
      <Drawer title={selectedTest?.name} placement="right" width={450} onClose={closeDrawer} visible={drawerVisible}>
        {selectedTest && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Category">{selectedTest.category?.name || "-"}</Descriptions.Item>
            <Descriptions.Item label="Price">
              <Tag color="green">PKR {(Number(selectedTest.price) || 0).toFixed(2)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Discounted Price">
              <Tag color="blue">PKR {(Number(selectedTest.discounted_price) || 0).toFixed(2)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              <Tag color="purple">{selectedTest.duration} min</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Description">{selectedTest.description || "-"}</Descriptions.Item>
            <Descriptions.Item label="Preparation Instructions">{selectedTest.preparation_instructions || "-"}</Descriptions.Item>
            <Descriptions.Item label="Note">{selectedTest.note || "-"}</Descriptions.Item>
            <Descriptions.Item label="Slug">{selectedTest.slug || "-"}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
};

export default TestsList;
