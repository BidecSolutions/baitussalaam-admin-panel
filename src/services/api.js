import axios from 'axios';
import { mockAPI } from './mockData';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://baitussalam.datainovate.com/backend/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
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
      localStorage.removeItem('authToken');
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
  create: (data) => USE_MOCK_DATA ? mockAPI.doctors.create(data) : api.post('/doctors', data),
  update: (id, data) => USE_MOCK_DATA ? mockAPI.doctors.update(id, data) : api.put(`/doctors/${id}`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.doctors.delete(id) : api.delete(`/doctors/${id}`),
};

// Tests API
export const testsAPI = {
  getAll: () => USE_MOCK_DATA ? mockAPI.tests.getAll() : api.get('/tests'),
  getById: (id) => USE_MOCK_DATA ? mockAPI.tests.getById(id) : api.get(`/tests/${id}`),
  create: (data) => USE_MOCK_DATA ? mockAPI.tests.create(data) : api.post('/tests', data),
  update: (id, data) => USE_MOCK_DATA ? mockAPI.tests.update(id, data) : api.put(`/tests/${id}`, data),
  delete: (id) => USE_MOCK_DATA ? mockAPI.tests.delete(id) : api.delete(`/tests/${id}`),
};
// Tests API
export const testCategoriesAPI = {
  getAll: () => api.get('/test-category'),
  getById: (id) => api.get(`/test-category/${id}`),
  create: (data) => api.post('/test-category/store', data),
  update: (id, data) => api.put(`/test-category/${id}/update`, data),
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