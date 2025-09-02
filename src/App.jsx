import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AdminLayout from './components/Layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Tests from './pages/Tests';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import AssignRole from './pages/AssignRole';
import ViewList from './components/Roles/ViewList';
import { RoleProvider } from './Context/RolesContext'; // ✅ import
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Login from './pages/Login';
import TestCategories from './pages/TestCategories';
import Branches from './pages/Branches';
import Codes from './pages/Codes';
import HeroSection from './pages/HeroSection';
import Customer from './pages/Customers';
import { PermissionProvider } from './Context/PermissionsContext';
import ContactPage from './pages/Contact';
import Careers from './pages/Career';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
     <PermissionProvider>

      <RoleProvider>
        <Router>
          <Routes>
            {/* Public route */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Private routes */}
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              {/* Dashboard - accessible to all authenticated users */}
              <Route index element={<Dashboard />} />
              
              {/* Doctors routes - require doctor permissions */}
              <Route 
                path="doctors" 
                element={
                  <ProtectedRoute permissions={["doctor."]}>
                    <Doctors />
                  </ProtectedRoute>
                } 
              />
              
              {/* Codes routes - require codes permissions */}
              <Route 
                path="codes" 
                element={
                  <ProtectedRoute permissions={["codes."]}>
                    <Codes />
                  </ProtectedRoute>
                } 
              />
              
              {/* Test Categories routes - require test category permissions */}
              <Route 
                path="test-categories" 
                element={
                  <ProtectedRoute permissions={["test category."]}>
                    <TestCategories />
                  </ProtectedRoute>
                } 
              />
              
              {/* Tests routes - require tests permissions */}
              <Route 
                path="tests" 
                element={
                  <ProtectedRoute permissions={["tests."]}>
                    <Tests />
                  </ProtectedRoute>
                } 
              />
              
              {/* Users routes - require admin permissions */}
              <Route 
                path="users" 
                element={
                  <ProtectedRoute permissions={["admin."]}>
                    <Users />
                  </ProtectedRoute>
                } 
              />
              
              {/* Roles routes - require role permissions */}
              <Route 
                path="roles" 
                element={
                  <ProtectedRoute permissions={["role."]}>
                    <Roles />
                  </ProtectedRoute>
                } 
              />
              
              {/* Permissions routes - require permission permissions */}
              <Route 
                path="permissions" 
                element={
                  <ProtectedRoute permissions={["permission."]}>
                    <Permissions />
                  </ProtectedRoute>
                } 
              />
              
              {/* Assign Role routes - require assignrole permissions */}
              <Route 
                path="assignRole" 
                element={
                  <ProtectedRoute permissions={["assignrole."]}>
                    <AssignRole />
                  </ProtectedRoute>
                } 
              />
              
              {/* View List - accessible if user has role permissions */}
              <Route 
                path="viewList" 
                element={
                  <ProtectedRoute permissions={["role."]}>
                    <ViewList />
                  </ProtectedRoute>
                } 
              />
              
              {/* Branches routes - require branches permissions */}
              <Route 
                path="/branches" 
                element={
                  <ProtectedRoute permissions={["branches."]}>
                    <Branches />
                  </ProtectedRoute>
                } 
              />
              
              {/* Hero Section routes - require hero permissions */}
              <Route 
                path="/Hero-section" 
                element={
                  <ProtectedRoute permissions={["hero."]}>
                    <HeroSection />
                  </ProtectedRoute>
                } 
              />
              
              {/* Customer routes - require customer permissions */}
              <Route 
                path="/customer" 
                element={
                  <ProtectedRoute permissions={["customer."]}>
                    <Customer />
                  </ProtectedRoute>
                } 
              />
              
              {/* Contact routes - require contact permissions */}
              <Route 
                path="/contact" 
                element={
                  <ProtectedRoute permissions={["contact."]}>
                    <ContactPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Career routes - require career permissions */}
              <Route 
                path="/career" 
                element={
                  <ProtectedRoute permissions={["career."]}>
                    <Careers />
                  </ProtectedRoute>
                } 
              />

            </Route>
          </Routes>
        </Router>
      </RoleProvider>
     </PermissionProvider>

    </ConfigProvider>
  );
};

export default App;
