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
      <Router>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="tests" element={<Tests />} />
            <Route path="users" element={<Users/>} />
            <Route path="roles" element={<Roles/>} />
            <Route path="permissions" element={<Permissions/>} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
