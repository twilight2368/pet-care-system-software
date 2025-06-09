import axios from './axiosInstance';

export const fetchAppointments = ()          => axios.get('/appointment');
export const getAppointment    = (id)        => axios.get(`/appointment/${id}`);
export const createAppointment = (data)      => axios.post('/appointment', data);
export const updateAppointment = (id, data)  => axios.put(`/appointment/${id}`, data);
export const cancelAppointment = (id)        => axios.delete(`/appointment/${id}`);