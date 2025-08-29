// DoctorsList.jsx
import React, { useState } from "react";
import { Table, Button, Space, Drawer, Descriptions, Image } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const DoctorsList = ({ doctors, loading, onEdit, onDelete }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const showDrawer = (doctor) => {
    setSelectedDoctor(doctor);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedDoctor(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Image",
      key: "image",
      render: (_, doctor) => (
        <Image
          width={50}
          height={40}
          src={
            doctor.image_path
              ? `https://baitussalam.datainovate.com/backend/storage/app/public/${doctor.image_path}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSExbOmh2VFMws-98GmjgBD0RTlPf39LwFf-Q&s"
          }
          alt={doctor.image_alt || "doctor image"}
          style={{ objectFit: "cover" }}
        />

      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, doctor) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => showDrawer(doctor)}>
            View
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(doctor)}>
            Edit
          </Button>
          <Button danger type="link" icon={<DeleteOutlined />} onClick={() => onDelete(doctor.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={doctors} rowKey="id" loading={loading} />

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
            {/* example */}
            <Descriptions.Item label="Working days">
              {selectedDoctor?.working_days?.join(", ") || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Start Time">
              {selectedDoctor.start_time}
            </Descriptions.Item>
            <Descriptions.Item label="End Time">
              {selectedDoctor.end_time}
            </Descriptions.Item>



            <Descriptions.Item label="Qualifications">
              {selectedDoctor.qualifications?.map((q) => q.value).join(", ") || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Specializations">
              {selectedDoctor.specializations?.map((s) => s.value).join(", ") || "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
};

export default DoctorsList;