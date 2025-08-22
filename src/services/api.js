import axios from 'axios';
import { mockAPI } from './mockData';
import { meta } from '@eslint/js';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
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

// Response interceptor for handling common errors
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

// For development, use mock data. For production, uncomment the real API calls
const USE_MOCK_DATA = false; // Set to false when real API is available

// Doctors API
export const doctorsAPI = {
  getAll: () => USE_MOCK_DATA ? mockAPI.doctors.getAll() : api.get('/doctors'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.doctors.getById(id) : api.get(`/doctors/${id}`),
  create: (data) =>  api.post('/admin/doctors/store', data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.doctors.delete(id) : api.delete(`/doctors/${id}`),
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
  getAll: () => USE_MOCK_DATA ? mockAPI.users.getAll() : api.get('/users'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.users.getById(id) : api.get(`/users/${id}`),
  create: (data) => USE_MOCK_DATA ? mockAPI.users.create(data) : api.post('/users', data),
  update: (id, data) => USE_MOCK_DATA ? mockAPI.users.update(id, data) : api.put(`/users/${id}`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.users.delete(id) : api.delete(`/users/${id}`),
};


export const rolesAPI = {
  getAll: () => USE_MOCK_DATA ? mockAPI.roles.getAll() : api.get('/roles'),
  create: (data) => USE_MOCK_DATA ? mockAPI.roles.create(data) : api.post('/roles', data),
  update: (id, data) => USE_MOCK_DATA ? mockAPI.roles.update(id, data) : api.put(`/roles/${id}`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.roles.delete(id) : api.delete(`/roles/${id}`),
};

export const permissionsAPI = {
  getAll: () => USE_MOCK_DATA ? mockAPI.permissions.getAll() : api.get('/permissions'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.permissions.getById(id) : api.get(`/permissions/${id}`),
  create: (data) => USE_MOCK_DATA ? mockAPI.permissions.create(data) : api.post('/permissions', data),
  update: (id, data) => USE_MOCK_DATA ? mockAPI.permissions.update(id, data) : api.put(`/permissions/${id}`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.permissions.delete(id) : api.delete(`/permissions/${id}`),
};



export default api; 