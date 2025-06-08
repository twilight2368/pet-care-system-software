import axios from "axios";

// Base URL constant
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Axios instance (optional but recommended)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); // Replace 'jwt' with your actual key name
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getHelloPawPal = () => api.get(API_URL);
export const loginPawPal = (data) =>
  api.post(API_URL + "/api/auth/login", data);
export const registerPawPal = (data) =>
  api.post(API_URL + "/api/auth/register", data);
export const getUserAppointmentToday = (id) =>
  api.get(API_URL + "/api/appointment/user/today/" + id);
export const getUserAppointment = (id) =>
  api.get(API_URL + "/api/appointment/user/" + id);
export const getPetByUser = (id) => api.get(API_URL + "/api/pets-user/" + id);
export const createPet = (data) => api.post(API_URL + "/api/pets", data);
export const getGroomingServiceBooking = (id) =>
  api.get(API_URL + "/api/grooming/user/" + id);
export const createGroomingServiceBooking = (data) =>
  api.post(API_URL + "/api/grooming", data);
export const createAppointment = (data) =>
  api.post(API_URL + "/api/appointment", data);
export const getUserAppointmentAndType = (id, type) =>
  api.get(`${API_URL}/api/appointment/user/type/${id}`, {
    params: {
      appointmentType: type,
    },
  });
export const getBoardingBooking = (id) => api.get("/api/boarding-user/" + id);
export const createBoardingBooking = (data) => api.post("/api/boarding", data);
export const getRooms = () => api.get("/api/room");
export const getPetById = (id) => api.get("/api/pets/" + id);
export const updatePetById = (id, data) => api.put("/api/pets/" + id, data);
export const makeDietPlan = (data) => api.post("/api/plan", data);
export const getDietById = (id) => api.get("/api/plan/" + id);
export const getMedicalRecordByPetId = (id) =>
  api.get("/api/medical-pet/" + id);
export const getAllUsers = () => api.get("/api/all-users");
export const getAppointmentByVetId = (id) =>
  api.get("/api/appointment/vet/today/" + id);
export const getUpcomingAppointmentByVetId = (id, page, size) =>
  api.get(`${API_URL}/api/appointment/vet/upcoming/${id}`, {
    params: {
      page: page,
      size: size,
    },
  });

export const getHistoryAppointmentByVetId = (id, page, size) =>
  api.get(`${API_URL}/api/appointment/vet/history/${id}`, {
    params: {
      page: page,
      size: size,
    },
  });
