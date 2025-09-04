import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TestsList from '../components/TestsList';
import TestsForm from '../components/TestsForm';
import {testsAPI} from '../services/api'

import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from '../utils/constants';
import { useRoles } from '../Context/PermissionsContext';
// import { RoleContext } from '../Context/RolesContext';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [pagination, setPagination] = useState({
    current: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
    const { permissions } = useRoles();
  

  // const { getTests } = useContext(RoleContext);

  // ✅ Fetch tests whenever page or pageSize changes
  useEffect(() => {
    fetchTests();
    
  }, [pagination.current, pagination.pageSize]);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const testsData = await testsAPI.getAll(); // ✅ Using context API
      setTests(testsData.data?.data);
      setPagination(prev => ({
        ...prev,
        total: testsData.length,
      }));
    } catch (error) {
      console.error('Error fetching tests:', error);
      message.error('Failed to fetch tests. Please try again.');
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTest = () => {
    setEditingTest(null);
    setModalVisible(true);
  };

  const handleEditTest = (test) => {
    setEditingTest(test);
    setModalVisible(true);
  };
  

  const handleDeleteTest = async (id) => {
    try {
      // Replace testsAPI with your context delete logic if exists
      await testsAPI.delete(id);
      await fetchTests();
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting test:', error);
      return Promise.reject(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (editingTest) {
        await testsAPI.update(editingTest.id, values);
      } else {
        await testsAPI.create(values);
      }
      setModalVisible(false);
      await fetchTests();
    } catch (error) {
      console.error('Error saving test:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingTest(null);
  };

  const handleTableChange = (paginationInfo) => {
    setPagination(prev => ({
      ...prev,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Tests Management</h1>
          {permissions.includes("tests.create") && (
        
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTest}>
          Add Test
        </Button>
          )}
      </div>

      <TestsList
        tests={tests}
        loading={loading}
        onEdit={handleEditTest}
        onDelete={handleDeleteTest}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

   <Modal
  // title={editingTest ? "Edit Test" : "Add New Test"}
  open={modalVisible}
  onCancel={handleModalCancel}
  footer={null}
  width={600}
  // destroyOnClose  
>
  <TestsForm
    visible={modalVisible}
    onCancel={handleModalCancel}
    onSubmit={handleFormSubmit}
    initialValues={editingTest}
    loading={formLoading}
  />
</Modal>

    </div>
  );
};

export default Tests;
