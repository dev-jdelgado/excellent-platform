import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (data) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

export const login = async (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};
