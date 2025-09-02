import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BranchesList from "../components/BranchesList"; // Table component
import BranchesForm from "../components/BranchesForm"; // Form component
import { BranchesAPI } from "../services/api"; // API service
import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from "../utils/constants";
import { useRoles } from "../Context/PermissionsContext";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [pagination, setPagination] = useState({
    current: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
  const { permissions } = useRoles();

  useEffect(() => {
    fetchBranches();
  }, [pagination.current, pagination.pageSize]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const result = await BranchesAPI.getAll(); // API call
      console.log("branchesData", result);
      setBranches(result.data?.data);
      setPagination((prev) => ({
        ...prev,
        total: result.length,
      }));
    } catch (error) {
      console.error("Error fetching branches:", error);
      message.error("Failed to fetch branches. Please try again.");
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBranch = () => {
    setEditingBranch(null);
    setModalVisible(true);
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setModalVisible(true);
  };

  const toggleStatus = async (id , checked)=>{
   try {
    await BranchesAPI.toggleStatus(id); // API call
    // state update karna zaroori hai
    await fetchBranches(); // refresh table
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === id ? { ...branch, is_active: checked } : branch
      )
    )
    message.success(`Branch ${checked ? "activated" : "deactivated"} successfully`);
  } catch (error) {
    message.error("Failed to update status");
    console.error("Toggle status error:", error);
  }
  }

  const handleDeleteBranch = async (id) => {
    try {
      await BranchesAPI.delete(id);
      await fetchBranches(); // refresh table
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting branch:", error);
      return Promise.reject(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (editingBranch) {
        await BranchesAPI.update(editingBranch.id, values);
      } else {
        await BranchesAPI.create(values);
      }
      setModalVisible(false);
      await fetchBranches(); // refresh table
    } catch (error) {
      console.error("Error saving branch:", error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingBranch(null);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1>Branches Management</h1>
          {permissions.includes("branches.create") && (

        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBranch}>
          Add Branch
        </Button>
          )}
      </div>

      <BranchesList
        branches={branches}
        loading={loading}
        onEdit={handleEditBranch}
        onDelete={handleDeleteBranch}
        status = {toggleStatus}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

      <Modal
        title={editingBranch ? "Edit Branch" : "Add New Branch"}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <BranchesForm
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSubmit={handleFormSubmit}
          initialValues={editingBranch}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Branches;
