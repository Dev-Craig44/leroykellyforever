import { Navigate, Route, Routes } from "react-router-dom";
import Drop from "./pages/Drop/Drop";
import Home from "./pages/Home/Home";
import SubmitVideo from "./pages/SubmitVideo/SubmitVideo";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/drop" element={<Drop />} />
      <Route path="/submit-video" element={<SubmitVideo />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
