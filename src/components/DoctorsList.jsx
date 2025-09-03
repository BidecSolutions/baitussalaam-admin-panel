// DoctorsList.jsx
import React, { useState } from "react";
import { Table, Button, Space, Drawer, Descriptions, Image, Grid } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRoles } from "../Context/PermissionsContext";

const { useBreakpoint } = Grid;

const DoctorsList = ({ doctors, loading, onEdit, onDelete }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { permissions } = useRoles();
  const screens = useBreakpoint();

  const showDrawer = (doctor) => {
    setSelectedDoctor(doctor);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedDoctor(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", responsive: ["xs", "sm", "md", "lg"] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ["md", "lg"] },
    { title: "Phone", dataIndex: "phone", key: "phone", responsive: ["sm", "md", "lg"] },
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
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, doctor) => (
        <Space wrap>
          {permissions.includes("doctor.list") && (
            <Button type="link" icon={<EyeOutlined />} onClick={() => showDrawer(doctor)}>
              View
            </Button>
          )}
          {permissions.includes("doctor.edit") && (
            <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(doctor)}>
              Edit
            </Button>
          )}
          {permissions.includes("doctor.delete") && (
            <Button danger type="link" icon={<DeleteOutlined />} onClick={() => onDelete(doctor.id)}>
              Delete
            </Button>
          )}
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={doctors}
        rowKey="id"
        loading={loading}
        scroll={{ x: true }} // ✅ mobile par horizontal scroll enable
      />

      <Drawer
        title={selectedDoctor?.name}
        placement="right"
        width={screens.xs ? "100%" : 500} // ✅ mobile par full width
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {selectedDoctor && (
          <Descriptions
            column={screens.xs ? 1 : 2} // ✅ mobile par ek column, desktop par 2
            bordered
            size="small"
          >
            <Descriptions.Item label="ID">{selectedDoctor.id}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedDoctor.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedDoctor.phone}</Descriptions.Item>
            <Descriptions.Item label="Bio">{selectedDoctor.bio}</Descriptions.Item>
            <Descriptions.Item label="Experience">
              {selectedDoctor.experience_years} years
            </Descriptions.Item>
            <Descriptions.Item label="Working days">
              {selectedDoctor?.working_days?.join(", ") || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Start Time">{selectedDoctor.start_time}</Descriptions.Item>
            <Descriptions.Item label="End Time">{selectedDoctor.end_time}</Descriptions.Item>
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
