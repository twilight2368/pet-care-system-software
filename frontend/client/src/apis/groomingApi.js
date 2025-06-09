import axios from './axiosInstance';

export const fetchGroomingServices  = ()          => axios.get('/grooming-service');
export const getGroomingService     = (id)        => axios.get(`/grooming-service/${id}`);
export const addGroomingService     = (svc)       => axios.post('/grooming-service', svc);
export const updateGroomingService  = (id, svc)   => axios.put(`/grooming-service/${id}`, svc);
export const deleteGroomingService  = (id)        => axios.delete(`/grooming-service/${id}`);