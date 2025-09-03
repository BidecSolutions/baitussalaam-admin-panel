import React, { useEffect, useState } from "react";
import { Table, Card, message, Popconfirm, Button } from "antd";
import { CareerApi } from "../services/api";

export default function Careers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Careers
  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await CareerApi.getAll();
      console.log("API Response:", res.data);
      setData(res.data?.data);
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while fetching careers");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // ✅ Delete Career
  const handleDelete = async (id) => {
    try {
      await CareerApi.delete(id); 
      message.success("Career deleted successfully");
      fetchCareers(); 
    } catch (err) {
      console.error(err);
      message.error("Failed to delete career");
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Cover Letter",
      dataIndex: "cover_letter",
      key: "cover_letter",
    },
    {
      title: "CV",
      dataIndex: "cv_path",
      key: "cv_path",
      render: (text) => {
        if (!text) return "No CV";

        // ✅ Agar text already full URL hai toh direct use karo
        const fileUrl = text.startsWith("http")
          ? text
          : `${import.meta.env.VITE_BASE_CV_URL_LIVE}${text}`;

        return (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View CV
          </a>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this application?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card title="Career Applications" style={{ margin: 20 }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id || record._id}
        loading={loading}
        bordered
      />
    </Card>
  );
}
