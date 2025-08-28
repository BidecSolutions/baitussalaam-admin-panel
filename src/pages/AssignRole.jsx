import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AssignList from "../components/AssignRole/AssignList";
import RolesForm from "../components/AssignRole/AssignForm";
import { AssignRoleAdmins, rolesAPI } from "../services/api";

const AssignRole = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); 
  const [assignments, setAssignments] = useState([]); // ✅ FIX: added state

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AssignRoleAdmins.getAll(); 
        const apiUsers = response.data?.data || [];
        console.log("apiUsers", apiUsers);

        
        const formatted = apiUsers.map((u) => ({
          id: u.admin_id,
          admin_name: u.admin_name,
          roles: u.roles || [], 
        }));

        setAssignments(formatted);
        setUsers(apiUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);


  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const selectedUser = users.find((u) => u.id === values.userId);
      const adminName = selectedUser ? selectedUser.name : "Unknown";

      // ✅ roles API se role names
      const allRoles = await rolesAPI.getAll();
      const roleNames = allRoles.data?.data
        .filter((r) => values.roles.includes(r.id))
        .map((r) => r.name);

      const newRecord = {
        id: editingRecord ? editingRecord.id : assignments.length + 1,
        adminName,
        roles: roleNames,
      };
      console.log("newRecord" , newRecord.roles);
      

      if (editingRecord) {
        setAssignments((prev) =>
          prev.map((item) => (item.id === editingRecord.id ? newRecord : item))
        );
        message.success("Role updated successfully!");
      } else {
        setAssignments((prev) => [...prev, newRecord]);
        message.success("Role assigned successfully!");
      }

      setModalVisible(false);
      setEditingRecord(null);
    } catch (error) {
      console.error("Error saving role assignment:", error);
      message.error("Failed to save role assignment!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setAssignments((prev) => prev.filter((item) => item.id !== id));
    message.success("Role deleted successfully!");
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1>Assign Roles</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Assign Role
        </Button>
      </div>

      {/* Table */}
      <AssignList
        data={assignments} // ✅ now properly coming from API
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        title={editingRecord ? "Edit Assigned Role" : "Assign New Role"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingRecord(null);
        }}
        footer={null}
        destroyOnClose
      >
        <RolesForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingRecord(null);
          }}
          onSubmit={handleSubmit}
          initialValues={editingRecord}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default AssignRole;
