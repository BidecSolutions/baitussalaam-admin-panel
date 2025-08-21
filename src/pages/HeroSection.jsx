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
      console.log("Hero API Response:", data);
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
    try {
      setFormLoading(true);
      if (editingHero) {
        await heroAPI.update(editingHero.id, values);
      } else {
        await heroAPI.create(values);
      }
      setModalVisible(false);
      await fetchHeroItems();
    } catch (error) {
      console.error("Error saving hero item:", error);
      message.error("Failed to save hero section item.");
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
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
        width={600}
        destroyOnClose
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
