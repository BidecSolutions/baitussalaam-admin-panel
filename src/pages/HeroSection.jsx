import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import HeroForm from "../components/HeroSection/HeroForm";
import HeroList from "../components/HeroSection/HeroList";
import { heroAPI } from "../services/api";

const HeroSection = () => {
  const [heroItems, setHeroItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHero, setEditingHero] = useState(null);

  // ✅ Fetch Hero Data on mount
  useEffect(() => {
    fetchHeroItems();
  }, []);

  const fetchHeroItems = async () => {
    try {
      setLoading(true);
      const res = await heroAPI.getAll();

      // Agar response array nahi to array banado
      const data = Array.isArray(res.data?.data)
        ? res.data.data
        : [res.data?.data].filter(Boolean);

      setHeroItems(data);
      // console.log("Hero API Response:", data);
    } catch (error) {
      console.error("Error fetching hero data:", error);
      message.error("Failed to fetch hero section data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHero = () => {
    setEditingHero(null);
    setModalVisible(true);
  };

  const handleEditHero = (item) => {
    setEditingHero(item);
    console.log(item);

    setModalVisible(true);
  };

  const handleDeleteHero = async (id) => {
    try {
      await heroAPI.delete(id);
      await fetchHeroItems();
    } catch (error) {
      console.error("Error deleting hero item:", error);
      message.error("Failed to delete item.");
    }
  };

const handleFormSubmit = async (values) => {
  const formData = new FormData();

  formData.append("heading", values.heading);
  formData.append("sub_heading", values.sub_heading);
  formData.append("description", values.description);
  formData.append("is_active", values.is_active ? 1 : 0);
  formData.append("button1_text", values.button1_text || "");
  formData.append("button1_link", values.button1_link || "");
  formData.append("button2_text", values.button2_text || "");
  formData.append("button2_link", values.button2_link || "");
  formData.append("image_alt", values.image_alt || "");

  if (values.image_path) {
    // const file = values.image_path[0].originFileObj; // get File object
    // if (file) {
      //   formData.append("image_path", file); // append binary
      // }
        formData.append("image_path", values.image_path); // append binary
  }

  try {
    setFormLoading(true);

    if (editingHero) {
      // Update existing hero
      await heroAPI.update(editingHero.id, formData);
      message.success("Hero updated successfully!");
    } else {
      // Add new hero
      await heroAPI.create(formData);
      message.success("Hero added successfully!");
    }

    // Refresh list
    await fetchHeroItems();

    // Close modal
    setModalVisible(false);
    setEditingHero(null);
  } catch (error) {
    console.error("Error submitting hero form:", error);
    message.error("Failed to save hero data.");
  } finally {
    setFormLoading(false);
  }
};


  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingHero(null);
  };

  return (
    <div>
      {/* Hero Section Heading */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1>Hero Section Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddHero}>
          Add Hero Content
        </Button>
      </div>

      {/* Hero List */}
      <HeroList
        items={heroItems}
        loading={loading}
        onEdit={handleEditHero}
        onDelete={handleDeleteHero}
      />

      {/* Modal for Add/Edit */}
      <Modal
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        // width={600}
        destroyOnClose
        title={editingHero ? "Edit Hero Content" : "Add Hero Content"}
        width={window.innerWidth < 768 ? "90%" : 900}
        style={{ top: 20 }}
        bodyStyle={{ paddingTop: 10 }}
      >
        <HeroForm
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSubmit={handleFormSubmit}
          initialValues={editingHero}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};
export default HeroSection;
