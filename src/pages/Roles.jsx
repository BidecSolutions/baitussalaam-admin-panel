import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RolesList from "../components/Roles/RolesList";
import RolesForm from "../components/Roles/RolesForm";
import { rolesAPI } from "../services/api";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_CURRENT_PAGE,
} from "../utils/constants";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [pagination, setPagination] = useState({
    current: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });

  useEffect(() => {
    fetchRoles();
  }, [pagination.current, pagination.pageSize]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await rolesAPI.getAll(); // GET /roles
      const rolesData = response.data || [];
      setRoles(rolesData);
      setPagination((prev) => ({
        ...prev,
        total: rolesData.length,
      }));
    } catch (error) {
      console.error("Error fetching roles:", error);
      message.error("Failed to fetch roles. Please try again.");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = () => {
    setEditingRole(null);
    setModalVisible(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setModalVisible(true);
  };

  const handleDeleteRole = async (id) => {
    try {
      await rolesAPI.delete(id); // DELETE /roles/:id
      await fetchRoles();
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting role:", error);
      return Promise.reject(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (editingRole) {
        await rolesAPI.update(editingRole.id, values); // PUT /roles/:id
      } else {
        await rolesAPI.create(values); // POST /roles
      }
      setModalVisible(false);
      await fetchRoles();
    } catch (error) {
      console.error("Error saving role:", error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingRole(null);
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
        <h1>Roles Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddRole}
        >
          Add Role
        </Button>
      </div>

      {/* Roles Table */}
      <RolesList
        roles={roles}
        loading={loading}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

      {/* Modal Form */}
      <Modal
        title={editingRole ? "Edit Role" : "Add New Role"}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <RolesForm
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSubmit={handleFormSubmit}
          initialValues={editingRole}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Roles;
