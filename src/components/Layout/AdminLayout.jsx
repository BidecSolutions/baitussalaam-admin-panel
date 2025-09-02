import React, { useContext, useState } from "react";
import { Layout, Menu, theme, Button, Avatar } from "antd";
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
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { RoleContext } from "../../Context/RolesContext";
import ProfileDrawer from "./ProfileDrawer"; // ✅ apna component import

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // ✅ Profile Drawer state
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(RoleContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Sidebar Menu Items
  const menuItems = [
    
    { key: "/", icon:  <DashboardOutlined />, label: "Dashboard" },
    { key: "/doctors", icon: <UserOutlined />, label: "Doctors" },
    { key: "/tests", icon: <ExperimentOutlined />, label: "Tests" },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        { key: "/test-categories", label: "Test Category" },
        { key: "/branches", label: "Branches" },
        { key: "/codes", label: "Codes" },
        { key: "/Hero-section", label: "Hero Section" },
      ],
    },
    {
      key: "user-management",
      icon: <TeamOutlined />,
      label: "User Management",
      children: [
        { key: "/users", icon: <UserOutlined />, label: "Admin" },
        { key: "/roles", icon: <IdcardOutlined />, label: "Roles" },
        { key: "/permissions", icon: <SafetyCertificateOutlined />, label: "Permissions" },
        { key: "/AssignRole", icon: <SwapOutlined />, label: "Assign-Role" },
        { key: "/customer", icon: <UserOutlined />, label: "Customer" },
      ],
    },
    { key: "/career", icon: <UserOutlined />, label: "Career Form" },
    { key: "/contact", icon: <UserOutlined />, label: "Contact" },

  ];

  const handleMenuClick = ({ key }) => {
    if (!key.startsWith("/")) return;
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
    return findLabel(menuItems) || "Dashboard";
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorBgContainer }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: borderRadiusLG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1890ff",
            fontWeight: "bold",
            fontSize: collapsed ? "12px" : "16px",
          }}
        >
          {collapsed ? "BS" : "Baitussalam"}
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
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
            <h2 style={{ margin: 0, marginLeft: 16 }}>{getPageTitle()}</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            
            <Button
              type="default"
              shape="round"
              icon={<Avatar size="small" icon={<UserOutlined />} />}
              onClick={() => setIsProfileOpen(true)} 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 12px",
                fontWeight: "500",
                background: "#f0f2f5",
                border: "1px solid #d9d9d9",
              }}
            >
              Profile
            </Button>

            {/* Logout Button */}
            <Button
              type="primary"
              shape="round"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <ProfileDrawer open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
