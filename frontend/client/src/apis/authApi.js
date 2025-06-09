import axios from './axiosInstance';

export const login = (credentials) => axios.post('/auth/login', credentials);
export const register = (data)   => axios.post('/auth/register', data);