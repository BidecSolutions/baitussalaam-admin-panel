import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message, Tag , Drawer , Descriptions} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const TestsList = ({
  tests = [],
  loading = false,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
}) => {
  // Drawer state
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const showDrawer = (test) => {
    setSelectedTest(test);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedTest(null);
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success("Test deleted successfully!");
    } catch (error) {
      message.error("Failed to delete test. Please try again.");
      console.error("Error deleting test:", error);
    }
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
      render: (description) => {
        if (!description) return "-";
        return (
          <div style={{ maxWidth: 300 }}>
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </div>
        );
      },
    },
   
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (description) => {
    //     if (!description) return "-";
    //     return (
    //       <div style={{ maxWidth: 300 }}>
    //         {description.length > 100
    //           ? `${description.substring(0, 100)}...`
    //           : description}
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Actions",
      key: "actions",
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showDrawer(record)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this test?"
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
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} tests`,
        }}
        onChange={onTableChange}
        scroll={{ x: 900 }}
      />

      {/* Drawer for viewing test details */}
      <Drawer
        title={selectedTest?.name}
        placement="right"
        width={450}
        onClose={closeDrawer}
        visible={drawerVisible} // v4 uses `visible`
      >
        {selectedTest && (
          <Descriptions
            column={1} // one field per row
            bordered
            size="small"
          >
            <Descriptions.Item label="Category">
              {selectedTest.category?.name || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Price">
              <Tag color="green">
                PKR {(Number(selectedTest.price) || 0).toFixed(2)}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Discounted Price">
              <Tag color="blue">
                PKR {(Number(selectedTest.discounted_price) || 0).toFixed(2)}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Duration">
              <Tag color="purple">{selectedTest.duration} min</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Description">
              {selectedTest.description || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Preparation Instructions">
              {selectedTest.preparation_instructions || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Note">
              {selectedTest.note || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Slug">
              {selectedTest.slug || "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
};

export default TestsList;
