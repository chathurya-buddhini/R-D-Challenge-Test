// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://your-weavy-cloud-api-endpoint.com/api'; // Replace with the actual base URL

export const createUser = (userData) => axios.post(`${API_BASE_URL}/users`, userData);

export const listUsers = () => axios.get(`${API_BASE_URL}/users`);

export const getUserDetails = (userId) => axios.get(`${API_BASE_URL}/users/${userId}`);

export const updateUser = (userId, userData) => axios.put(`${API_BASE_URL}/users/${userId}`, userData);

export const deleteUser = (userId) => axios.delete(`${API_BASE_URL}/users/${userId}`);
