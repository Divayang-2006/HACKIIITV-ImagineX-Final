import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string, role: 'farmer' | 'customer') => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },
};

export const products = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getFarmerProducts: async (farmerId: string) => {
    const response = await api.get(`/products/farmer/${farmerId}`);
    return response.data;
  },
  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  update: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const cart = {
  get: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  addItem: async (productId: string, quantity: number) => {
    const response = await api.post('/cart/items', { productId, quantity });
    return response.data;
  },
  updateItem: async (productId: string, quantity: number) => {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response.data;
  },
  removeItem: async (productId: string) => {
    const response = await api.delete(`/cart/items/${productId}`);
    return response.data;
  },
  clear: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },
}; 