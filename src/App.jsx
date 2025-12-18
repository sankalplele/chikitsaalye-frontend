import React from "react";
import { AuthProvider } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ForumPage from "./pages/ForumPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";
import LabProfile from "./pages/LabProfile.jsx";
import HospitalProfile from "./pages/HospitalProfile.jsx";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import NotFound from "./components/NotFound.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/lab/:id" element={<LabProfile />} />
          <Route path="/hospital/:id" element={<HospitalProfile />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
export default App;
