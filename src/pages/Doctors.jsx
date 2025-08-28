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

  // 🔹 Doctors fetch
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
      console.error("Error fetching doctors:", error);
      message.error("Failed to fetch doctors.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Codes fetch (specialization, qualification, etc.)
  const fetchCodes = async () => {
    try {
      const res = await codesAPI.getAll();
      const allCodes = res?.data?.data || [];

      console.log('allCodes', allCodes);
      

      setCodes({
        doctor_specialization: allCodes.filter((c) => c.type === "doctor_specialization"),
        doctor_qualification: allCodes.filter((c) => c.type === "doctor_qualification"),
        working_day: allCodes.filter((c) => c.type === "working_day"),
        timing_slot: allCodes.filter((c) => c.type === "timing_slot"),
      });
    } catch (err) {
      console.error("Error fetching codes:", err);
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
    } catch (error) {
      console.error("Error deleting doctor:", error);
      message.error("Delete failed!");
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);

      const formData = new FormData();

      // Basic fields
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("bio", values.bio);
      formData.append("experience_years", values.experience_years);
      formData.append(`start_time`, values.start_time);
      formData.append(`end_time`, values.end_time);

      // 🔹 Qualifications
      if (values.qualifications && values.qualifications.length > 0) {
        values.qualifications.forEach((q, i) => {
          formData.append(`qualifications[${i}]`, q);
        });
      }

      // 🔹 Specializations (sirf code_id bhejna hoga)
      if (values.specializations && values.specializations.length > 0) {
        values.specializations.forEach((s, i) => {
          formData.append(`specializations[${i}][code_id]`, s.code_id || s);
        });
      }

      
      if (values.working_days && values.working_days.length > 0) {
        values.working_days.forEach((day, i) => {
          formData.append(`working_days[${i}]`, day);
        });
      }

      // 🔹 Image Upload
      if (values.image && values.image.file) {
        formData.append("image", values.image_path);
      }

      // 🔹 Create or Update
      if (editingDoctor) {
        await doctorsAPI.update(editingDoctor.id, formData);
        message.success("Doctor updated successfully");
      } else {
        await doctorsAPI.create(formData);
        message.success("Doctor added successfully");
      }

      setModalVisible(false);
      await fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
      message.error("Save failed!");
    } finally {
      setFormLoading(false);
    }
  };

  console.log('codes', codes);


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h1>Doctors Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDoctor}>
          Add Doctor
        </Button>
      </div>

      <DoctorsList
        doctors={doctors}
        loading={loading}
        onEdit={handleEditDoctor}
        onDelete={handleDeleteDoctor}
        pagination={pagination}
        onTableChange={(info) =>
          setPagination((prev) => ({
            ...prev,
            current: info.current,
            pageSize: info.pageSize,
          }))
        }
      />

      <Modal
        title={editingDoctor ? "Edit Doctor" : "Add New Doctor"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800} // 🔹 thoda wide rakha for horizontal form
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
