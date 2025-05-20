import { Route, Routes, Outlet } from "react-router";
import "./App.css";
import LoginPage from "./auth/LoginPage";
import HomePage from "./pages/home/HomePage";
// Supports weights 100-900
import "@fontsource-variable/montserrat";
import "@fontsource/fredoka-one";
import RegisterPage from "./auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { ToastContainer } from "react-toastify";
import PetDetailPage from "./pages/pets/PetDetailPage";
import AddPetPage from "./pages/pets/AddPetPage";
import OnePetDetailPage from "./pages/pets/OnePetDetailPage";
import BathTrimPage from "./pages/grooming/BathTrimPage";
import SpaPage from "./pages/grooming/SpaPage";
import VaccinationAppointmentFormPage from "./pages/vet/VaccinationAppointmentFormPage";
import CheckUpAppointmentFormPage from "./pages/vet/CheckUpAppointmentPage";
import BoardingBookingPage from "./pages/boarding/BoardingBookingPage";
import AppointmentAllPage from "./pages/vet/AppointmentAllPage";
import NotificationPage from "./pages/noti/NotificationPage";
import UserInfoCardPage from "./pages/user/UserInfoCardPage";
import CenterWelcomePage from "./pages/center/CenterWelcomePage";
import StaffCenterLayout from "./layouts/StaffCenterLayout";
import VetCenterLayout from "./layouts/VetCenterLayout";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home/*" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentAllPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="pets" element={<PetDetailPage />} />
          <Route path="pets/:id" element={<OnePetDetailPage />} />
          <Route path="add-pet" element={<AddPetPage />} />
          <Route path="services/grooming/bath" element={<BathTrimPage />} />
          <Route path="services/grooming/spa" element={<SpaPage />} />
          <Route
            path="services/vet/injection"
            element={<VaccinationAppointmentFormPage />}
          />
          <Route
            path="services/vet/health-check"
            element={<CheckUpAppointmentFormPage />}
          />
          <Route path="services/boarding" element={<BoardingBookingPage />} />
          <Route path="settings" element={<UserInfoCardPage />} />
        </Route>
        <Route path="/center/*">
          <Route index element={<CenterWelcomePage />} />
          <Route path="vet/*" element={<VetCenterLayout />}>
            <Route index element={<>Content</>} />
          </Route>
          <Route path="staff/*" />
          <Route path="admin/*" />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
