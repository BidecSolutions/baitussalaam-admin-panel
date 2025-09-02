import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from '../utils/constants';
import { codesAPI } from '../services/api';
import CodesList from '../components/Codes/CodesList';
import CodeForm from '../components/Codes/CodeForm';
import { useRoles } from '../Context/PermissionsContext';

const Codes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCodes, setEditingCodes] = useState(null);
  const [pagination, setPagination] = useState({
    current: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
    const { permissions } = useRoles();

  // const { getCodes } = useContext(RoleContext);

  // ✅ Fetch Codeswhenever page or pageSize changes
  useEffect(() => {
    fetchCodes();
  }, [pagination.current, pagination.pageSize]);

  const fetchCodes = async () => {
    try {
      setLoading(true);
      const codesData = await codesAPI.getAll(); 
      setCodes(codesData?.data?.data);
      setPagination(prev => ({
        ...prev,
        total: codesData?.data?.length  ,
      }));
    } catch (error) {
      console.error('Error fetching codes:', error);
      message.error('Failed to fetch codes. Please try again.');
      setCodes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCodes = () => {
    setEditingCodes(null);
    setModalVisible(true);
  };

  const handleEditCodes = (code) => {
    setEditingCodes(code);
    setModalVisible(true);
  };

  const handleDeleteCodes = async (id) => {
    try {
      // Replace codesAPI with your context delete logic if exists
      await codesAPI.delete(id);
      await fetchCodes();
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting code:', error);
      return Promise.reject(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (editingCodes) {
        await codesAPI.update(editingCodes.id, values);
      } else {
        await codesAPI.create(values);
      }
      setModalVisible(false);
      await fetchCodes();
    } catch (error) {
      console.error('Error saving code:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCodes(null);
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
        <h1>Codes</h1>
          {permissions.includes("codes.create") && (

        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCodes}>
          Add Code
        </Button>
          )}
      </div>

      <CodesList
        codes={codes}
        loading={loading}
        onEdit={handleEditCodes}
        onDelete={handleDeleteCodes}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

      <Modal
        title={editingCodes ? 'Edit Code' : 'Add New Code'}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnHidden // ✅ replace deprecated destroyOnClose
      >
        <CodeForm
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSubmit={handleFormSubmit}
          initialValues={editingCodes}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Codes;
