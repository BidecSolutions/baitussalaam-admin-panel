import React, { useState, useEffect } from 'react';
import { Button, Modal, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DoctorsList from '../components/DoctorsList';
import DoctorsForm from '../components/DoctorsForm';
import { doctorsAPI } from '../services/api';
import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from '../utils/constants';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [pagination, setPagination] = useState({
    current: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });

  useEffect(() => {
    fetchDoctors();
  }, [pagination.current, pagination.pageSize]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorsAPI.getAll();
      const doctorsData = response.data || [];
      setDoctors(doctorsData);
      setPagination(prev => ({
        ...prev,
        total: doctorsData.length,
      }));
    } catch (error) {
      console.error('Error fetching doctors:', error);
      message.error('Failed to fetch doctors. Please try again.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setModalVisible(true);
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setModalVisible(true);
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await doctorsAPI.delete(id);
      await fetchDoctors(); // Refresh the list
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      return Promise.reject(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (editingDoctor) {
        await doctorsAPI.update(editingDoctor.id, values);
      } else {
        await doctorsAPI.create(values);
      }
      setModalVisible(false);
      await fetchDoctors(); // Refresh the list
    } catch (error) {
      console.error('Error saving doctor:', error);
      throw error; // Re-throw to let the form handle the error
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingDoctor(null);
  };

  const handleTableChange = (paginationInfo, filters, sorter) => {
    setPagination(prev => ({
      ...prev,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    }));
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16 
      }}>
        <h1>Doctors Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddDoctor}
        >
          Add Doctor
        </Button>
      </div>

      <DoctorsList
        doctors={doctors}
        loading={loading}
        onEdit={handleEditDoctor}
        onDelete={handleDeleteDoctor}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

      <Modal
        title={editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <DoctorsForm
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSubmit={handleFormSubmit}
          initialValues={editingDoctor}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Doctors; 