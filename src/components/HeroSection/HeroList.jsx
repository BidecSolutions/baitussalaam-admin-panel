import React from "react";
import { Row, Col, Tag, Descriptions, Button, Image, Card, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useRoles } from "../../Context/PermissionsContext";

const HeroList = ({ items = [], onEdit, loading = false }) => {
      const { permissions } = useRoles();
  
  return (
    <Spin
      spinning={loading}
      tip="Loading Heroes..."
      size="large"
      style={{ top: 150 }}
    >
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={24} sm={24} md={24} lg={24} key={item.id}>
            <Card
              hoverable
              actions={permissions.includes("hero.edit") &&  [
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(item)}
                  size="middle"
                  style={{ borderRadius: "6px" }}
                >
                  Edit
                </Button>,
              ]}
            >
              <Row gutter={16}>
                {/* Image Left */}
                <Col xs={24} sm={8} md={6}>
                  <Image
                    width="100%"
                    src={
                      item.image_path
                        ? `${import.meta.env.VITE_BASE_IMAGE_URL_LIVE}${
                            item.image_path
                          }`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSExbOmh2VFMws-98GmjgBD0RTlPf39LwFf-Q&s"
                    }
                    alt={item.image_alt || "hero image"}
                    style={{ objectFit: "cover" }}
                  />
                </Col>

                {/* Fields Right */}
                <Col xs={24} sm={16} md={18}>
                  <Descriptions
                    column={2}
                    size="small"
                    bordered
                    layout="horizontal"
                  >
                    <Descriptions.Item label="Heading">
                      {item.heading}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sub Heading">
                      {item.sub_heading}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                      {item.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Image Alt">
                      {item.image_alt || "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Button 1">
                      <a
                        href={item.button1_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.button1_text}
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Button 2">
                      <a
                        href={item.button2_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.button2_text}
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag color={item.is_active ? "green" : "red"}>
                        {item.is_active ? "Active" : "Inactive"}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default HeroList;
