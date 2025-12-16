import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // should be like https://excellent-platform.onrender.com/api/auth
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
