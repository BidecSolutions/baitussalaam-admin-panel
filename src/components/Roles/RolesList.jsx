import React from 'react';
import { Table, Button, Space, Popconfirm, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const RolesList = ({
  roles = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
  pagination,
  onTableChange
}) => {

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success('Role deleted successfully!');
    } catch (error) {
      message.error('Failed to delete role. Please try again.');
      console.error('Error deleting role:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      width: 80,
      align: 'center',
    },
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text) => <Tag color="blue">{text}</Tag>, // 👈 styled with Tag
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
        
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="middle"
            style={{ borderRadius: 6, backgroundColor: "#1677ff" }}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this role?"
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
              size="middle"
              style={{ borderRadius: 6 }}
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
      dataSource={roles}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} roles`,
      }}
      onChange={onTableChange}
      scroll={{ x: 700 }}
      bordered
    />
  );
};

export default RolesList;
