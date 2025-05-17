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
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
