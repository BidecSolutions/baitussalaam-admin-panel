import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Drawer,
  Descriptions,
  Modal,
  Image,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DoctorsForm from "./DoctorsForm";

const DoctorsList = ({ doctors, onEdit, onDelete }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // ✅ View Drawer
  const showDrawer = (doctor) => {
    setSelectedDoctor(doctor);
    setDrawerVisible(true);
  };

  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
    setFormVisible(false);
    setSelectedDoctor(null);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedDoctor(null);
  };

  // ✅ Edit Modal
  const showEditForm = (doctor) => {
    setSelectedDoctor(doctor);
    setFormVisible(true);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setSelectedDoctor(null);
  };

  // ✅ Table Columns (sirf basic info show karega)
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Image",
      key: "image",
      render: (_, doctor) => (
        <Image
          width={80}
          src={
            doctor.image_path
              ? `${import.meta.env.VITE_BASE_IMAGE_URL_LIVE}${doctor.image_path}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSExbOmh2VFMws-98GmjgBD0RTlPf39LwFf-Q&s"
          }
          alt={doctor.image_alt || "Doctor Image"}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, doctor) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => showDrawer(doctor)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditForm(doctor)}
          >
            Edit
          </Button>
          <Button
            danger
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(doctor.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Doctor Table */}
      <Table columns={columns} dataSource={doctors} rowKey="id" />

      {/* Drawer - Full Details */}
      <Drawer
        title={selectedDoctor?.name}
        placement="right"
        width={500}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {selectedDoctor && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{selectedDoctor.id}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedDoctor.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedDoctor.phone}</Descriptions.Item>
            <Descriptions.Item label="Bio">{selectedDoctor.bio}</Descriptions.Item>
            <Descriptions.Item label="Experience">
              {selectedDoctor.experience_years} years
            </Descriptions.Item>
            <Descriptions.Item label="Qualifications">
              {selectedDoctor.qualifications?.map((q) => q.value).join(", ") || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Specializations">
              {selectedDoctor.specializations?.map((s) => s.value).join(", ") || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Schedule">
  {selectedDoctor.doctor_schedules
    ?.map((s) => `${s.day_of_week} (${s.start_time} - ${s.end_time})`)
    .join(", ") || "-"}
</Descriptions.Item>

          </Descriptions>
        )}
      </Drawer>

      {/* Edit Modal */}
      <Modal
        title={selectedDoctor ? "Edit Doctor" : "Add Doctor"}
        open={formVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={900}
      >
        <DoctorsForm
          visible={formVisible}
          onCancel={handleFormCancel}
          onSubmit={handleFormSubmit}
          initialValues={selectedDoctor}
        />
      </Modal>
    </>
  );
};

export default DoctorsList;
