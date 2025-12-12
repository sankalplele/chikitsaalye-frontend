import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  User,
  Calendar,
  FileText,
  LogOut,
  Activity as ActivityIcon,
} from "lucide-react";

function Dashboard() {
  const [token, setToken] = useState("XD");
  const navigate = useNavigate();
  {
    /*
  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // Redirect to login if no token
      navigate("/login");
    } else {
      setToken(authToken);
    }
  }, [navigate]);
  */
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="opacity-80">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    // 1. BACKGROUND & PADDING: Matches theme
    <div className="min-h-screen bg-blue-900 relative font-sans pt-28 pb-10">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none fixed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Welcome Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-4 border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome Back!
                </h1>
                <p className="text-gray-500 mt-1">
                  Manage your healthcare services & reports
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors shadow-sm"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 flex items-center space-x-4 transition-transform hover:scale-[1.02]">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                Appointments
              </p>
              <p className="text-2xl font-bold text-gray-900">3 Upcoming</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 flex items-center space-x-4 transition-transform hover:scale-[1.02]">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                Completed
              </p>
              <p className="text-2xl font-bold text-gray-900">12 Visits</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 flex items-center space-x-4 transition-transform hover:scale-[1.02]">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                Reports
              </p>
              <p className="text-2xl font-bold text-gray-900">8 Available</p>
            </div>
          </div>
        </div>

        {/* Main Content (Activity) */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-white/10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ActivityIcon size={24} className="mr-2 text-blue-600" />
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 bg-blue-50/50 pl-4 py-3 rounded-r-lg hover:bg-blue-50 transition-colors">
              <p className="font-bold text-gray-800">
                Appointment booked with Dr. Sharma
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Tomorrow at 10:00 AM • Swaroop Nagar
              </p>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50/50 pl-4 py-3 rounded-r-lg hover:bg-green-50 transition-colors">
              <p className="font-bold text-gray-800">
                Blood Test Report uploaded
              </p>
              <p className="text-sm text-gray-500 mt-1">
                2 days ago • Dr. Lal PathLabs
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50/50 pl-4 py-3 rounded-r-lg hover:bg-orange-50 transition-colors">
              <p className="font-bold text-gray-800">
                Prescription refill reminder
              </p>
              <p className="text-sm text-gray-500 mt-1">
                3 days ago • General Physician
              </p>
            </div>
          </div>
        </div>

        {/* Token Display (for development) */}
        <div className="mt-8 bg-white/10 border border-white/20 rounded-xl p-4 text-center">
          <p className="text-xs text-blue-200 font-mono break-all">
            <strong>Auth Token (Dev):</strong> {token.substring(0, 20)}...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
