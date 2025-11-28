import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, User, Calendar, FileText, LogOut } from "lucide-react";

function Dashboard() {
  const [token, setToken] = useState("XD");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-900">
                  Welcome to Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your healthcare services
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar size={24} className="text-blue-900" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-blue-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completed Visits</p>
                <p className="text-2xl font-bold text-blue-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Medical Reports</p>
                <p className="text-2xl font-bold text-blue-900">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-900 pl-4 py-2">
              <p className="font-semibold text-gray-800">
                Appointment booked with Dr. Sharma
              </p>
              <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <p className="font-semibold text-gray-800">
                Blood Test Report uploaded
              </p>
              <p className="text-sm text-gray-600">2 days ago</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <p className="font-semibold text-gray-800">
                Prescription refill reminder
              </p>
              <p className="text-sm text-gray-600">3 days ago</p>
            </div>
          </div>
        </div>

        {/* Token Display (for development) */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-600 font-mono break-all">
            <strong>Auth Token (Dev):</strong> {token.substring(0, 20)}...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
