import React, { useEffect, useState } from "react";
import { Table, Card, message } from "antd";
import axios from "axios";
import { contactApi } from "../services/api";

export default function Contacts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await contactApi.getAll()
      
      setData(res.data?.data);
      console.log("res" , data);
      
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while fetching contacts");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  return (
    <Card title="Contact Messages" style={{ margin: 20 }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        bordered
      />
    </Card>
  );
}
