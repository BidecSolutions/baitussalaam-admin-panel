import axios from 'axios';
import { mockAPI } from './mockData';
import { meta } from '@eslint/js';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_BASE_URL,
  timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const USE_MOCK_DATA = false; // Set to false when real API is available

export const authAPI = {
  loginAdmin: (data) => api.post("/admin/login", data),
  loginUser: (data) => api.post("/user/login", data),
  updateProfile : (data) => api.post(`admin/${id}/update` ,data),
  changePassword: (data) => api.post("/admin/change-password", data),
};

// Doctors API
export const doctorsAPI = {
  getAll: () =>  api.get('/doctors'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.doctors.getById(id) : api.get(`/doctors/${id}`),
  create: (data) =>  api.post('/admin/doctors/store', data , {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, data) => api.post(`/admin/doctors/${id}/update`, data),
  delete: (id) => api.delete(`/admin/doctors/${id}/delete`),
};

// Tests API
export const testsAPI = {
  getAll: () =>   api.get('/tests'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.tests.getById(id) : api.get(`/tests/${id}`),
  create: (data) => api.post('/admin/tests/store', data),
  update: (id, data) => api.post(`/admin/tests/${id}/update`, data),
  delete: (id) =>  api.delete(`/admin/tests/${id}/delete`),
};

// Branches API
export const BranchesAPI = {
  getAll: () => api.get('/branches'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.tests.getById(id) : api.get(`/tests/${id}`),
  create: (data) => api.post('/admin/branches/store', data),
  update: (id, data) => api.post(`/admin/branches/${id}/update`, data),
  delete: (id) => api.delete(`/admin/branches/${id}/delete`),
  toggleStatus: (id) => api.delete(`admin/branches/${id}/toggle-status`),
};
// category API
export const testCategoriesAPI = {
  getAll: () => api.get('/test-category'),
  getById: (id) => api.get(`/test-category/${id}`),
  create: (data) => api.post('admin/test-category/store', data),
  update: (id, data) => api.post(`/test-category/${id}/update`, data),
  delete: (id) => api.delete(`/test-category/${id}`),
};

// Codes API
export const codesAPI = {
  getAll: () => api.get('/admin/codes'),
  getById: (id) => api.get(`/admin/codes/${id}`),
  getCodesByType: (type) => api.get(`/admin/codes/${type}`),
  create: (data) => api.post('/admin/codes/store', data),
  update: (id, data) => api.post(`/admin/codes/${id}`, data),
  delete: (id) => api.delete(`/test-category/${id}`),
};

// Hero Section

export const heroAPI = {
  getAll: () => api.get('/admin/hero'),
  getById: (id) => api.get(`/test-category/${id}`),
  create: (data) =>
    api.post('admin/hero/store', data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
   update: (id, data) =>
    api.post(`admin/hero/${id}/update`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/test-category/${id}`),
};

// Users API
export const usersAPI = {
  getAll: () =>  api.get('/admin/list'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.users.getById(id) : api.get(`/users/${id}`),
  create: (data) =>  api.post('/admin/store', data),
  update: (id, data) =>  api.post(`/admin/${id}/update`, data),
  delete: (id) =>  api.delete(`/admin/${id}/delete`),
};


export const rolesAPI = {
  getAll: () =>  api.get('/admin/roles'),
  create: (data) =>  api.post('/admin/create-role', data),
  update: (id, data) => api.post(`/admin/update-role/${id}`, data),
  delete: (id) =>  api.delete(`/admin/delete-role/${id}`),
};

export const AssignRoleAdmins = {
  getAll: () =>  api.get('/admin/list-admin-roles'),
  create: (data) =>  api.post('/admin/assign-role-admin', data),
  update: (id, data) => api.post(`/admin/update-roles/${id}`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.roles.delete(id) : api.delete(`/roles/${id}`),
};

export const permissionsAPI = {
  getAll: () => api.get('/admin/permissions/list'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.permissions.getById(id) : api.get(`/permissions/${id}`),
  create: (data) =>  api.post('/admin/create-permission', data),
  update: (id, data) =>  api.post(`/admin/update-permission/${id}`, data),
  delete: (id) =>api.delete(`/admin/permissions/destroy/${id}`),
};
export const customersAPI = {
  getAll: () => USE_MOCK_DATA ? mockAPI.users.getAll() : api.get('admin/user'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.users.getById(id) : api.get(`admin/user/${id}/edit`),
  create: (data) => USE_MOCK_DATA ? mockAPI.users.create(data) : api.post('admin/user/store', data),
  update: (id, data) => USE_MOCK_DATA ? mockAPI.users.update(id, data) : api.post(`admin/user/${id}/update`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.users.delete(id) : api.delete(`admin/user/${id}/changeactiveInactive`),
};

export const contactApi = {
  getAll: () => api.get('/admin/contacts'),
};
export const CareerApi = {
  getAll: () => api.get('/admin/careers'),
  delete: (id) => api.delete(`/admin/careers/${id}/delete`),
};


export default api; 