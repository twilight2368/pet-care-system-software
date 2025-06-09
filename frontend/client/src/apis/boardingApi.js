import axios from './axiosInstance';

// Booking
export const fetchBookings      = ()          => axios.get('/boarding-booking');
export const getBooking         = (id)        => axios.get(`/boarding-booking/${id}`);
export const createBooking      = (data)      => axios.post('/boarding-booking', data);
export const updateBooking      = (id, data)  => axios.put(`/boarding-booking/${id}`, data);
export const cancelBooking      = (id)        => axios.delete(`/boarding-booking/${id}`);

// Room
export const fetchRooms         = ()          => axios.get('/boarding-room');
export const getRoom            = (id)        => axios.get(`/boarding-room/${id}`);
export const addRoom            = (room)      => axios.post('/boarding-room', room);
export const updateRoom         = (id, room)  => axios.put(`/boarding-room/${id}`, room);
export const deleteRoom         = (id)        => axios.delete(`/boarding-room/${id}`);