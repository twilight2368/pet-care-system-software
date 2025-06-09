import axios from './axiosInstance';

export const fetchNotifications   = ()          => axios.get('/notification');
export const getNotification      = (id)        => axios.get(`/notification/${id}`);
export const sendNotification     = (data)      => axios.post('/notification', data);
export const updateNotification   = (id, data)  => axios.put(`/notification/${id}`, data);
export const deleteNotification   = (id)        => axios.delete(`/notification/${id}`);