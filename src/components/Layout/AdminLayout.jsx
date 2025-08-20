import React, { useContext, useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ExperimentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  SwapOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { RoleContext } from '../../Context/RolesContext';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
const {logout} = useContext(RoleContext)

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
      key: 'settings', // parent menu key
      icon: <SettingOutlined />,
      label: 'Settings',
      children: [
        {
          key: '/test-categories',
          // icon: <UserOutlined />,
          label: 'Test Category',
        },
         {
          key: '/branches',
          // icon: <UserOutlined />,
          label: 'Branches',
        },
        // {
        //   key: '/roles',
        //   icon: <IdcardOutlined />,
        //   label: 'Roles',
        // },
        // {
        //   key: '/permissions',
        //   icon: <SafetyCertificateOutlined />,
        //   label: 'Permissions',
        // },
        // {
        //   key: '/AssignRole',
        //   icon: <SwapOutlined />,
        //   label: 'Assign-Role',
        // },
      ],
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
        {
          key: '/AssignRole',
          icon: <SwapOutlined />,
          label: 'Assign-Role',
        },
      ],
    },
  ];

  const handleMenuClick = ({ key }) => {
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

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // remove token
    message.success("Logged out successfully!");
    navigate('/login'); // redirect to login page
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorBgContainer }}
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

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
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
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <h2 style={{ margin: 0, marginLeft: 16 }}>{getPageTitle()}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* <span>Admin User</span> */}
            <Button type="primary" onClick={logout}>
              Logout
            </Button>
          </div>
        </Header>

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
