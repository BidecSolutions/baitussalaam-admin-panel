// Mock data for development and testing
export const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Ahmed Khan',
    specialty: ['Cardiology', 'General Medicine'],
    availableDays: ['monday', 'wednesday', 'friday'],
    timeSlots: ['09:00', '17:00'],
  },
  {
    id: 2,
    name: 'Dr. Fatima Ali',
    specialty: ['Pediatrics'],
    availableDays: ['tuesday', 'thursday', 'saturday'],
    timeSlots: ['10:00', '18:00'],
  },
  {
    id: 3,
    name: 'Dr. Muhammad Hassan',
    specialty: ['Neurology'],
    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday'],
    timeSlots: ['08:00', '16:00'],
  },
];

export const mockTests = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    price: 1500.00,
    duration: 30,
    description: 'A blood test that measures several components and features of your blood, including red blood cells, white blood cells, and platelets.',
  },
  {
    id: 2,
    name: 'Blood Glucose Test',
    price: 800.00,
    duration: 15,
    description: 'Measures the amount of glucose (sugar) in your blood.',
  },
  {
    id: 3,
    name: 'Lipid Profile',
    price: 1200.00,
    duration: 45,
    description: 'A group of tests that measure different types of cholesterol and fats in your blood.',
  },
  {
    id: 4,
    name: 'Liver Function Test',
    price: 1800.00,
    duration: 60,
    description: 'A group of blood tests that measure various enzymes, proteins, and other substances produced by the liver.',
  },
];

// Mock API functions that simulate real API behavior
export const mockAPI = {
  doctors: {
    getAll: () => Promise.resolve({ data: mockDoctors }),
    getById: (id) => Promise.resolve({ data: mockDoctors.find(d => d.id === id) }),
    create: (data) => {
      const newDoctor = {
        ...data,
        id: Math.max(...mockDoctors.map(d => d.id)) + 1,
      };
      mockDoctors.push(newDoctor);
      return Promise.resolve({ data: newDoctor });
    },
    update: (id, data) => {
      const index = mockDoctors.findIndex(d => d.id === id);
      if (index !== -1) {
        mockDoctors[index] = { ...mockDoctors[index], ...data };
        return Promise.resolve({ data: mockDoctors[index] });
      }
      return Promise.reject(new Error('Doctor not found'));
    },
    delete: (id) => {
      const index = mockDoctors.findIndex(d => d.id === id);
      if (index !== -1) {
        mockDoctors.splice(index, 1);
        return Promise.resolve({ success: true });
      }
      return Promise.reject(new Error('Doctor not found'));
    },
  },
  tests: {
    getAll: () => Promise.resolve({ data: mockTests }),
    getById: (id) => Promise.resolve({ data: mockTests.find(t => t.id === id) }),
    create: (data) => {
      const newTest = {
        ...data,
        id: Math.max(...mockTests.map(t => t.id)) + 1,
      };
      mockTests.push(newTest);
      return Promise.resolve({ data: newTest });
    },
    update: (id, data) => {
      const index = mockTests.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTests[index] = { ...mockTests[index], ...data };
        return Promise.resolve({ data: mockTests[index] });
      }
      return Promise.reject(new Error('Test not found'));
    },
    delete: (id) => {
      const index = mockTests.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTests.splice(index, 1);
        return Promise.resolve({ success: true });
      }
      return Promise.reject(new Error('Test not found'));
    },
  },
}; 