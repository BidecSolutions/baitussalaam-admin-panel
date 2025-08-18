import React from 'react';
import { Table, Button, Space, Popconfirm, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TestsList = ({ 
  tests = [], 
  loading = false, 
  onEdit, 
  onDelete,
  pagination,
  onTableChange 
}) => {
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success('Test deleted successfully!');
    } catch (error) {
      message.error('Failed to delete test. Please try again.');
      console.error('Error deleting test:', error);
    }
  };

  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text) => <strong>{text}</strong>,
    },
     {
      title: 'Test Name',
      dataIndex: `category.name`,
      key: 'category.name',
      sorter: true,
      render: (text) => <strong>{text}</strong>,
    },
    
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
     render: (price) => (
  <Tag color="green" style={{ fontSize: '14px' }}>
    PKR {Number(price)?.toFixed(2)}
  </Tag>
),
    },
     {
      title: 'discounted_price',
      dataIndex: 'discounted_price',
      key: 'discounted_price',
      sorter: true,
     render: (price) => (
  <Tag color="green" style={{ fontSize: '14px' }}>
    PKR {Number(price)?.toFixed(2)}
  </Tag>
),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: true,
      render: (duration) => (
        <Tag color="blue">
          {duration} min
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => {
        if (!description) return '-';
        return (
          <div style={{ maxWidth: 300 }}>
            {description.length > 100 
              ? `${description.substring(0, 100)}...` 
              : description
            }
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
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
      scroll={{ x: 800 }}
    />
  );
};

export default TestsList; 