import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";
import LabProfile from "./pages/LabProfile.jsx";
import HospitalProfile from "./pages/HospitalProfile.jsx";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/lab/:id" element={<LabProfile />} />
          <Route path="/hospital/:id" element={<HospitalProfile />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
