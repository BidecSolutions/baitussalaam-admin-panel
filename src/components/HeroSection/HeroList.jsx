import React, { useState } from "react";
import { Card, Row, Col, Button, Space, Popconfirm, message, Drawer, Descriptions, Tag } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const HeroList = ({ items = [], loading = false, onEdit, onDelete }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);

  const showDrawer = (hero) => {
    setSelectedHero(hero);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedHero(null);
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success("Hero item deleted successfully!");
    } catch (error) {
      message.error("Failed to delete hero item. Please try again.");
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              title={item.heading || "No Heading"}
              bordered
              hoverable
              actions={[
                <EyeOutlined key="view" onClick={() => showDrawer(item)} />,
                <EditOutlined key="edit" onClick={() => onEdit(item)} />,
                <Popconfirm
                  title="Are you sure to delete this hero item?"
                  onConfirm={() => handleDelete(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <p>{item.sub_heading || "-"}</p>
              <Tag color={item.is_active ? "green" : "red"}>
                {item.is_active ? "Active" : "Inactive"}
              </Tag>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Drawer Detail View */}
      <Drawer
        title={selectedHero?.heading}
        placement="right"
        width={500}
        onClose={closeDrawer}
        open={drawerVisible} // v5 -> `open`, v4 -> `visible`
      >
        {selectedHero && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Heading">{selectedHero.heading}</Descriptions.Item>
            <Descriptions.Item label="Sub Heading">{selectedHero.sub_heading}</Descriptions.Item>
            <Descriptions.Item label="Description">{selectedHero.description}</Descriptions.Item>
            <Descriptions.Item label="Image Alt">{selectedHero.image_alt || "-"}</Descriptions.Item>
            <Descriptions.Item label="Button 1">
              {selectedHero.button1_text} ({selectedHero.button1_link})
            </Descriptions.Item>
            <Descriptions.Item label="Button 2">
              {selectedHero.button2_text} ({selectedHero.button2_link})
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedHero.is_active ? "green" : "red"}>
                {selectedHero.is_active ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">{selectedHero.created_at}</Descriptions.Item>
            <Descriptions.Item label="Updated At">{selectedHero.updated_at}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
};

export default HeroList;
