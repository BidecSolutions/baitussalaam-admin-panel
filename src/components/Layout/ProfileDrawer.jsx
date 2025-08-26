import React from "react";
import { Drawer, Avatar, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ProfileDrawer = ({ open, onClose }) => {
  // localStorage se user data nikal lo
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Drawer
      title="User Profile"
      placement="right"
      width={400}
      onClose={onClose}
      open={open}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar size={80} icon={<UserOutlined />} />
        <h2 style={{ marginTop: "10px" }}>{user.name || "Guest User"}</h2>
        <p style={{ color: "gray" }}>{user.email || "No email"}</p>
      </div>

      <Descriptions column={1} bordered>
        <Descriptions.Item label="Full Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        <Descriptions.Item label="Joined">{user.created_at}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ProfileDrawer;
