import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { WEEKDAYS } from '../utils/constants';

const DoctorsList = ({ 
  doctors = [], 
  loading = false, 
  onEdit, 
  onDelete,
  pagination,
  onTableChange 
}) => {
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success('Doctor deleted successfully!');
    } catch (error) {
      message.error('Failed to delete doctor. Please try again.');
      console.error('Error deleting doctor:', error);
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
      title: 'Specialty',
      dataIndex: 'specialty',
      key: 'specialty',
      render: (specialties) => {
        if (Array.isArray(specialties)) {
          return specialties.map((specialty, index) => (
            <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
              {specialty}
            </Tag>
          ));
        }
        return <Tag color="blue">{specialties}</Tag>;
      },
    },
    {
      title: 'Available Days',
      dataIndex: 'availableDays',
      key: 'availableDays',
      render: (days) => {
        if (!Array.isArray(days)) return '-';
        
        const dayLabels = WEEKDAYS.filter(day => 
          days.includes(day.value)
        ).map(day => day.label);
        
        return dayLabels.map((day, index) => (
          <Tag key={index} color="green" style={{ marginBottom: 4 }}>
            {day}
          </Tag>
        ));
      },
    },
    {
      title: 'Time Slots',
      dataIndex: 'timeSlots',
      key: 'timeSlots',
      render: (timeSlots) => {
        if (!Array.isArray(timeSlots) || timeSlots.length !== 2) return '-';
        return `${timeSlots[0]} - ${timeSlots[1]}`;
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
            title="Are you sure you want to delete this doctor?"
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
      dataSource={doctors}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} of ${total} doctors`,
      }}
      onChange={onTableChange}
      scroll={{ x: 800 }}
    />
  );
};

export default DoctorsList; 