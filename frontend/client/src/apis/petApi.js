import axios from './axiosInstance';

export const fetchPets   = ()          => axios.get('/pet');
export const getPet      = (id)        => axios.get(`/pet/${id}`);
export const addPet      = (pet)       => axios.post('/pet', pet);
export const updatePet   = (id, pet)   => axios.put(`/pet/${id}`, pet);
export const deletePet   = (id)        => axios.delete(`/pet/${id}`);