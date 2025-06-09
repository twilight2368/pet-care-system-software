import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/swagger-ui/index.html',
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;