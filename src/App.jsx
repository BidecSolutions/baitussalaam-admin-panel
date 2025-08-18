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
import { RoleProvider } from './Context/RolesContext';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute'; // ✅ import
import Login from './pages/Login';

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
              <Route index element={<Dashboard />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="tests" element={<Tests />} />
              <Route path="users" element={<Users />} />
              <Route path="roles" element={<Roles />} />
              <Route path="permissions" element={<Permissions />} />
              <Route path="assignRole" element={<AssignRole />} />
              <Route path="viewList" element={<ViewList />} />
            </Route>
          </Routes>
        </Router>
      </RoleProvider>
    </ConfigProvider>
  );
};

export default App;
