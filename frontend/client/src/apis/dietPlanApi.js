import axios from './axiosInstance';

export const fetchDietPlans     = ()          => axios.get('/diet-plan');
export const getDietPlan        = (id)        => axios.get(`/diet-plan/${id}`);
export const addDietPlan        = (plan)      => axios.post('/diet-plan', plan);
export const updateDietPlan     = (id, plan)  => axios.put(`/diet-plan/${id}`, plan);
export const deleteDietPlan     = (id)        => axios.delete(`/diet-plan/${id}`);