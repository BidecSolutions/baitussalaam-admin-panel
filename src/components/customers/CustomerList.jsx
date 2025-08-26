import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, message } from 'antd';
import { EditOutlined, StopOutlined, CheckOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons';

const CustomerList = ({
  users = [],
  loading = false,
  onEdit,
  onToggleStatus, // new handler instead of delete
  pagination,
  onTableChange
}) => {
  const handleToggleStatus = async (id, status) => {
    try {
      await onToggleStatus(id, status);
      message.success(
        status === 1 ? 'Customer activated successfully!' : 'Customer deactivated successfully!'
      );
    } catch (error) {
      message.error('Failed to update status. Please try again.');
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => (
        <Tag color={gender === 'Male' ? 'blue' : gender === 'Female' ? 'pink' : 'purple'}>
          {gender}
        </Tag>
      ),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip_code',
      key: 'zip_code',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
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
          {record.status === 1 ? (
            <Popconfirm
              title="Are you sure you want to delete this code?"
              onConfirm={() => handleToggleStatus(record.id, "delete")}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} size="small">
                Delete
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Do you want to restore this code?"
              onConfirm={() => handleToggleStatus(record.id, "restore")}
              okText="Yes"
              cancelText="No"
            >
              <Button type="dashed" icon={<RollbackOutlined />} size="small">
                Restore
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    }
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   fixed: 'right',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button
    //         type="primary"
    //         icon={<EditOutlined />}
    //         size="small"
    //         onClick={() => onEdit(record)}
    //       >
    //         Edit
    //       </Button>
    //       <Popconfirm
    //         title={`Are you sure you want to ${record.status === 1 ? 'deactivate' : 'activate'} this customer?`}
    //         onConfirm={() =>
    //           handleToggleStatus(record.id, record.status === 1 ? 2 : 1)
    //         }
    //         okText="Yes"
    //         cancelText="No"
    //         placement="topRight"
    //       >
    //         <Button
    //           type={record.status === 1 ? 'default' : 'primary'}
    //           danger={record.status === 1}
    //           icon={record.status === 1 ? <StopOutlined /> : <CheckOutlined />}
    //           size="small"
    //         >
    //           {record.status === 1 ? 'Delete' : 'Undo'}
    //         </Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={Array.isArray(users) ? users : []}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} customers`,
      }}
      onChange={onTableChange}
      scroll={{ x: 1200 }}
    />
  );
};

export default CustomerList;
