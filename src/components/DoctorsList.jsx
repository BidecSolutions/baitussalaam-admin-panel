import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Drawer,
  Descriptions,
  Modal,
  Spin,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DoctorsForm from "./DoctorsForm";
import { RoleContext } from "../Context/RolesContext"; // ✅ context import

const DoctorsList = ({ doctors, onEdit }) => {
  // const { getDoctors } = useContext(RoleContext); // ✅ context function
  // const [doctors, setDoctors] = useState([]); // API data state
  // const [loading, setLoading] = useState(false); // Loader state
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // ✅ Fetch Doctors on Mount
  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     setLoading(true);
  //     const result = await getDoctors();
  //     console.log('result', result);
  //     setDoctors(result); // API se data set
  //     setLoading(false);
  //   };
  //   fetchDoctors();
  // }, []);

  const showDrawer = (doctor) => {
    setSelectedDoctor(doctor);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedDoctor(null);
  };

  const showEditForm = (doctor) => {
    setSelectedDoctor(doctor);
    setFormVisible(true);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setSelectedDoctor(null);
  };

  const handleFormSubmit = async (values) => {
    console.log("Form Submitted:", values);
    // 👉 Yahan API call kar ke update karo
    setFormVisible(false);
    setSelectedDoctor(null);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (text) => (
        <Tag color={text === 1 ? "green" : "red"}>
          {text === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showDrawer(record)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              // onEdit(true)
              showEditForm(record)
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => {console.log("Delete", record)}}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Loader + Table */}
      {/* {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={doctors} rowKey="id" />
      )} */}
      <Table columns={columns} dataSource={doctors} rowKey="id" />

      {/* View Drawer */}
      <Drawer
        title={selectedDoctor?.name}
        placement="right"
        width={500}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {selectedDoctor && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">
              {selectedDoctor.id}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {selectedDoctor.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedDoctor.description}
            </Descriptions.Item>
            <Descriptions.Item label="Slug">
              {selectedDoctor.slug}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedDoctor.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedDoctor.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Bio">
              {selectedDoctor.bio}
            </Descriptions.Item>
            <Descriptions.Item label="Experience">
              {selectedDoctor.experience_years} years
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
