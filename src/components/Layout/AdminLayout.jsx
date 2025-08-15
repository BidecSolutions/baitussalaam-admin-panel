import React, { useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ExperimentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Sidebar Menu Items
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/doctors',
      icon: <UserOutlined />,
      label: 'Doctors',
    },
    {
      key: '/tests',
      icon: <ExperimentOutlined />,
      label: 'Tests',
    },
    {
      key: 'user-management', // parent menu key
      icon: <TeamOutlined />,
      label: 'User Management',
      children: [
        {
          key: '/users',
          icon: <UserOutlined />,
          label: 'Users',
        },
        {
          key: '/roles',
          icon: <IdcardOutlined />,
          label: 'Roles',
        },
        {
          key: '/permissions',
          icon: <SafetyCertificateOutlined />,
          label: 'Permissions',
        },
      ],
    },
  ];

  const handleMenuClick = ({ key }) => {
    // Parent menu click se navigation na ho, sirf child se ho
    if (!key.startsWith('/')) return;
    navigate(key);
  };

  const getPageTitle = () => {
    const findLabel = (items) => {
      for (const item of items) {
        if (item.key === location.pathname) return item.label;
        if (item.children) {
          const childLabel = findLabel(item.children);
          if (childLabel) return childLabel;
        }
      }
      return null;
    };
    return findLabel(menuItems) || 'Dashboard';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
        }}
      >
        <div style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: borderRadiusLG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1890ff',
          fontWeight: 'bold',
          fontSize: collapsed ? '12px' : '16px',
        }}>
          {collapsed ? 'BS' : 'Baitussalam'}
        </div>

        {/* Sidebar Menu */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <h2 style={{ margin: 0, marginLeft: 16 }}>
              {getPageTitle()}
            </h2>
          </div>
          <div>
            <span>Admin User</span>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
