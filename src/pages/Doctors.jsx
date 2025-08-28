// Doctors.jsx
import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DoctorsList from "../components/DoctorsList";
import DoctorsForm from "../components/DoctorsForm";
import { doctorsAPI, codesAPI } from "../services/api";
import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from "../utils/constants";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [codes, setCodes] = useState({
    doctor_specialization: [],
    doctor_qualification: [],
    working_day: [],
    timing_slot: [],
  });
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
    fetchCodes();
  }, [pagination.current, pagination.pageSize]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const doctorsData = await doctorsAPI.getAll({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });

      setDoctors(doctorsData?.data?.data || []);
      setPagination((prev) => ({
        ...prev,
        total: doctorsData?.data?.total || 0,
      }));
    } catch (error) {
      message.error("Failed to fetch doctors.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCodes = async () => {
    try {
      const res = await codesAPI.getAll();
      const allCodes = res?.data?.data || [];
      setCodes({
        doctor_specialization: allCodes.filter((c) => c.type === "doctor_specialization"),
        doctor_qualification: allCodes.filter((c) => c.type === "doctor_qualification"),
        working_day: allCodes.filter((c) => c.type === "working_day"),
        timing_slot: allCodes.filter((c) => c.type === "timing_slot"),
      });
    } catch {
      message.error("Failed to fetch codes.");
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
      await fetchDoctors();
      message.success("Doctor deleted successfully");
    } catch {
      message.error("Delete failed!");
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      if (editingDoctor) {
        await doctorsAPI.update(editingDoctor.id, formData);
        message.success("Doctor updated successfully");
      } else {
        await doctorsAPI.create(formData);
        message.success("Doctor added successfully");
      }

      setModalVisible(false);
      await fetchDoctors();
    } catch {
      message.error("Save failed!");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h1>Doctors Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDoctor}>
          Add Doctor
        </Button>
      </div>

      <DoctorsList doctors={doctors} loading={loading} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />

      <Modal
        title={editingDoctor ? "Edit Doctor" : "Add New Doctor"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <DoctorsForm
          codes={codes}
          initialValues={editingDoctor}
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Doctors;
