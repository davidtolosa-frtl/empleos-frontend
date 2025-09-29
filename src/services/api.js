import axios from 'axios';

// Configurar la URL base de tu backend
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;