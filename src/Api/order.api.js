import axios from 'axios';

const API = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createOrder = data => API.post('/orders', data);
export const getUserOrders = id => API.get(`/orders/user/${id}`);
export const getOrderById = id => API.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, { status });
export const cancelOrder = id => API.delete(`/orders/${id}`);

export default API;
