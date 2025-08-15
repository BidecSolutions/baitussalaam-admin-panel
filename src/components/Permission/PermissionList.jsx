import React from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const PermissionsList = ({
  permissions = [],
  loading = false,
  onEdit,
  onDelete,
  pagination,
  onTableChange
}) => {

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success('Permission deleted successfully!');
    } catch (error) {
      message.error('Failed to delete permission. Please try again.');
      console.error('Error deleting permission:', error);
    }
  };

  const columns = [
    {
      title: 'S.NO',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
    {
      title: 'Module Name',
      dataIndex: 'module',
      key: 'module',
      sorter: true,
    },
    {
      title: 'Permission Name',
      dataIndex: 'permissionName', // corrected field name
      key: 'permissionName',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
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
            title="Are you sure you want to delete this permission?"
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
      dataSource={permissions}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} permissions`,
      }}
      onChange={onTableChange}
      scroll={{ x: 800 }}
    />
  );
};

export default PermissionsList;
