import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from '../utils/constants';
import TestCategoriesList from '../components/TestCategoriesList';
import { testCategoriesAPI } from '../services/api';
import TestCategoryForm from '../components/TestCategoryForm';
import { useRoles } from '../Context/PermissionsContext';

const TestCategories = () => {
  const [tests, setTestCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTestCategory, setEditingTestCategory] = useState(null);
  const [pagination, setPagination] = useState({
    current: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
  const { permissions } = useRoles();

  // const { getTestCategories } = useContext(RoleContext);

  // ✅ Fetch Test Categorieswhenever page or pageSize changes
  useEffect(() => {
    fetchTestCategories();
  }, [pagination.current, pagination.pageSize]);

  const fetchTestCategories = async () => {
    try {
      setLoading(true);
      const testCategoriesData = await testCategoriesAPI.getAll(); 
      setTestCategories(testCategoriesData?.data?.data);
      setPagination(prev => ({
        ...prev,
        total: testCategoriesData?.data?.length  ,
      }));
    } catch (error) {
      console.error('Error fetching tests:', error);
      message.error('Failed to fetch tests. Please try again.');
      setTestCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestCategory = () => {
    setEditingTestCategory(null);
    setModalVisible(true);
  };

  const handleEditTestCategory = (test) => {
    setEditingTestCategory(test);
    setModalVisible(true);
  };

  const handleDeleteTestCategory = async (id) => {
    try {
      // Replace testCategoriesAPI with your context delete logic if exists
      await testCategoriesAPI.delete(id);
      await fetchTestCategories();
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting test:', error);
      return Promise.reject(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (editingTestCategory) {
        await testCategoriesAPI.update(editingTestCategory.id, values);
      } else {
        await testCategoriesAPI.create(values);
      }
      setModalVisible(false);
      await fetchTestCategories();
    } catch (error) {
      console.error('Error saving test:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingTestCategory(null);
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
        <h1>Test Categories</h1>
          {permissions.includes("testCategory.create") && (

        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTestCategory}>
          Add Category
        </Button>
          )}
      </div>

      <TestCategoriesList
        tests={tests}
        loading={loading}
        onEdit={handleEditTestCategory}
        onDelete={handleDeleteTestCategory}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

      <Modal
        title={editingTestCategory ? 'Edit Test Category' : 'Add New Test Category'}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnHidden // ✅ replace deprecated destroyOnClose
      >
        <TestCategoryForm
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSubmit={handleFormSubmit}
          initialValues={editingTestCategory}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default TestCategories;
