import { Navigate, Route, Routes } from "react-router-dom";
import Drop from "./pages/Drop/Drop";
import Home from "./pages/Home/Home";
import SubmitVideo from "./pages/SubmitVideo/SubmitVideo";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/drop" element={<Drop />} />
      <Route path="/submit-video" element={<SubmitVideo />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
