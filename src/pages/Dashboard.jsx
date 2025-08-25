import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Spin } from 'antd';
import { UserOutlined, ExperimentOutlined, CalendarOutlined } from '@ant-design/icons';
import { doctorsAPI, testsAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalTests: 0,
    todayAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch doctors and tests data
        const [doctorsResponse, testsResponse] = await Promise.all([
          doctorsAPI.getAll(),
          testsAPI.getAll(),
        ]);

        setStats({
          totalDoctors: doctorsResponse.data?.length || 0,
          totalTests: testsResponse.data?.data?.length || 0,
          todayAppointments: 0, // Placeholder for now
        });
        // console.log(stats.totalTests);
        
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Set default values on error
        setStats({
          totalDoctors: 0,
          totalTests: 0,
          todayAppointments: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Dashboard Overview</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Doctors"
              value={stats.totalDoctors}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Tests"
              value={stats.totalTests}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Today's Appointments"
              value={stats.todayAppointments}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Quick Actions" size="small">
            <p>Welcome to Baitussalam Laboratory Admin Panel</p>
            <p>Use the sidebar navigation to manage doctors and laboratory tests.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 