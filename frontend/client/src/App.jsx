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
import VaccinationAppointmentFormPage from "./pages/vet/VaccinationAppointmentFormPage";
import CheckUpAppointmentFormPage from "./pages/vet/CheckUpAppointmentPage";
import BoardingBookingPage from "./pages/boarding/BoardingBookingPage";
import AppointmentAllPage from "./pages/vet/AppointmentAllPage";
import NotificationPage from "./pages/noti/NotificationPage";
import UserInfoCardPage from "./pages/user/UserInfoCardPage";
import CenterWelcomePage from "./pages/center/CenterWelcomePage";
import StaffCenterLayout from "./layouts/StaffCenterLayout";
import VetCenterLayout from "./layouts/VetCenterLayout";
import AdminCenterLayout from "./layouts/AdminCenterLayout";
import StaffHomePage from "./pages/center/staff/StaffHomePage";
import StaffTodayAppointmentPage from "./pages/center/staff/appointments/StaffTodayAppointmentPage";
import StaffHistoryAppointmentPage from "./pages/center/staff/appointments/StaffHistoryAppointmentPage";
import StaffAllAppointmentPage from "./pages/center/staff/appointments/StaffAllAppointmentPage";
import ManageGroomingPage from "./pages/center/staff/groomings/ManageGroomingPage";
import NewGroomingBooksPage from "./pages/center/staff/groomings/NewGroomingBooksPage";
import PeriodGroomBookingPage from "./pages/center/staff/groomings/PeriodGroomBookingPage";
import HistoryGroomingBookingPage from "./pages/center/staff/groomings/HistoryGroomingBookingPage";
import RoomManagementPage from "./pages/center/staff/boarding/RoomManagementPage";
import BookingManagementPage from "./pages/center/staff/boarding/BookingManagementPage";
import BookingHistoryPage from "./pages/center/staff/boarding/BookingHistoryPage";
import BookingDetailPage from "./pages/center/staff/boarding/BookingDetailPage";
import HomeVetPage from "./pages/center/vet/HomeVetPage";
import TodayVetAppointmentPage from "./pages/center/vet/TodayVetAppointmentPage";
import HistoryVetAppointment from "./pages/center/vet/HistoryVetAppointment";
import UpcomingAppointmentPage from "./pages/center/vet/UpcomingAppointmentPage";
import DetailAppointmentPage from "./pages/center/vet/DetailAppointmentPage";
import PetProfileDetailVetPage from "./pages/center/vet/PetProfileDetailVetPage";
import StaffNewAppointmentPage from "./pages/center/staff/appointments/StaffNewAppointmentPage";
import UserManagePage from "./pages/center/admin/UserManagePage";
import DashboardAdminPage from "./pages/center/admin/DashboardAdminPage";
import GroomingPage from "./pages/grooming/GroomingPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Dashboard Routes */}
        <Route path="/home" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentAllPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="pets" element={<PetDetailPage />} />
          <Route path="pets/:id" element={<OnePetDetailPage />} />
          <Route path="add-pet" element={<AddPetPage />} />

          {/* Grooming Services */}
          <Route path="services/grooming" element={<GroomingPage />} />

          {/* Vet Services */}
          <Route path="services/vet">
            <Route
              path="injection"
              element={<VaccinationAppointmentFormPage />}
            />
            <Route
              path="health-check"
              element={<CheckUpAppointmentFormPage />}
            />
          </Route>

          {/* Boarding and Settings */}
          <Route path="services/boarding" element={<BoardingBookingPage />} />
          <Route path="settings" element={<UserInfoCardPage />} />
        </Route>

        {/* Center Routes */}
        <Route path="/center" element={<Outlet />}>
          <Route index element={<CenterWelcomePage />} />

          {/* Vet Center */}
          <Route path="vet" element={<VetCenterLayout />}>
            <Route index element={<HomeVetPage />} />
            <Route path="appointments">
              <Route path="today" element={<TodayVetAppointmentPage />} />
              <Route path="history" element={<HistoryVetAppointment />} />
              <Route path="upcoming" element={<UpcomingAppointmentPage />} />
              <Route path="details/:id" element={<DetailAppointmentPage />} />
            </Route>
            <Route
              path="pet-profile/:id"
              element={<PetProfileDetailVetPage />}
            />
            <Route path="settings" element={<UserInfoCardPage />} />
          </Route>

          {/* Staff Center */}
          <Route path="staff" element={<StaffCenterLayout />}>
            <Route index element={<StaffHomePage />} />
            <Route path="appointments">
              <Route path="today" element={<StaffTodayAppointmentPage />} />
              <Route path="new" element={<StaffNewAppointmentPage />} />
              <Route path="history" element={<StaffHistoryAppointmentPage />} />
              <Route path="all" element={<StaffAllAppointmentPage />} />
            </Route>
            <Route path="grooming">
              <Route path="manage" element={<ManageGroomingPage />} />
              <Route path="new" element={<NewGroomingBooksPage />} />
              <Route path="repeats" element={<PeriodGroomBookingPage />} />
              <Route path="history" element={<HistoryGroomingBookingPage />} />
            </Route>
            <Route path="boarding">
              <Route path="rooms" element={<RoomManagementPage />} />
              <Route path="bookings" element={<BookingManagementPage />} />
              <Route path="bookings/:id" element={<BookingDetailPage />} />
              <Route path="history" element={<BookingHistoryPage />} />
            </Route>
            <Route path="settings" element={<UserInfoCardPage />} />
          </Route>

          {/* Admin Center */}
          <Route path="admin" element={<AdminCenterLayout />}>
            <Route index element={<DashboardAdminPage />} />
            <Route path="users" element={<UserManagePage />} />
            <Route path="settings" element={<UserInfoCardPage />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
