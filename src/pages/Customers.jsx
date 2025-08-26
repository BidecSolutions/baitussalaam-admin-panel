import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { customersAPI } from "../services/api";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_CURRENT_PAGE,
} from "../utils/constants";
import CustomerList from "../components/customers/CustomerList";
import CustomerForm from "../components/customers/CustomerForm";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [pagination, setPagination] = useState({
    current: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });

  useEffect(() => {
    fetchCustomers();
  }, [pagination.current, pagination.pageSize]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customersAPI.getAll(); // GET /customers

      const usersData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setCustomers(usersData);
      setPagination((prev) => ({
        ...prev,
        total: usersData.length,
      }));
    } catch (error) {
      console.error("Error fetching customers:", error);
      console.error("Failed to fetch customers. Please try again.");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingUser(customer);
    setModalVisible(true);
  };

  // ✅ Toggle Active/Inactive
  const handleToggleStatus = async (id, newStatus) => {
    try {
      await customersAPI.delete(id, { status: newStatus }); // PUT /customers/:id
      await fetchCustomers();
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating status:", error);
      return Promise.reject(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (editingUser) {
        await customersAPI.update(editingUser.id, values); // PUT /customers/:id
      } else {
        await customersAPI.create(values); // POST /customers
      }
      setModalVisible(false);
      await fetchCustomers();
    } catch (error) {
      console.error("Error saving customer:", error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingUser(null);
  };

  const handleTableChange = (paginationInfo) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1>Customers Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
      </div>

      {/* Customers Table */}
      <CustomerList
        users={customers}
        loading={loading}
        onEdit={handleEditCustomer}
        onToggleStatus={handleToggleStatus}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

      {/* Modal Form */}
      <Modal
        title={editingUser ? "Edit Customer" : "Add New Customer"}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <CustomerForm
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSubmit={handleFormSubmit}
          initialValues={editingUser}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Customer;
