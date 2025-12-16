import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., https://excellent-platform.onrender.com/api/auth
  withCredentials: true, // ensures cookies and credentials are sent
});

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
