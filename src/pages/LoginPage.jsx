import React, { useState } from "react";
import {
  Phone,
  Lock,
  AlertCircle,
  Loader2,
  Shield,
  CheckCircle,
  ArrowLeft, // Added back arrow
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Added for navigation

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setMobile(value);
      setMobileError("");
      setError("");
    }
  };

  const validateMobile = () => {
    if (mobile.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMobileError("");

    if (!validateMobile()) return;

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobile,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        alert("Login Successful! Token stored.");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Connection failed. Please check your internet and try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // UPDATED: bg-blue-900 to match Landing Page
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* UPDATED: Background Pattern (Same as Landing) */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Back Button 
      <button
        onClick={() => navigate("/")}
        className="absolute top-1/2 left-6 text-white/70 hover:text-white flex items-center gap-2 z-20"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>*/}

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 mt-12 border-white/10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Login to access your health services
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <Shield size={14} className="text-blue-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <CheckCircle size={14} className="text-green-600" />
              <span>Verified</span>
            </div>
          </div>

          <div className="space-y-5">
            {/* Mobile Number Input */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Mobile Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={handleMobileChange}
                  onBlur={validateMobile}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full pl-12 pr-4 py-3.5 text-lg font-medium border-2 rounded-xl focus:outline-none transition-colors ${
                    mobileError
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-blue-600 bg-gray-50 focus:bg-white"
                  }`}
                />
              </div>
              {mobileError && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{mobileError}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3.5 text-lg font-medium border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border-2 border-red-100 rounded-xl p-3 flex items-start space-x-3">
                <AlertCircle
                  className="text-red-600 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-3 flex items-center justify-center space-x-3">
                <Loader2 className="text-blue-600 animate-spin" size={20} />
                <p className="text-blue-700 text-sm font-medium">
                  Connecting securely...
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {loading ? "Please Wait..." : "Login Securely"}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4 border-t border-gray-100 pt-6">
            <button
              onClick={() => alert("Password reset feature coming soon!")}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              Forgot Password?
            </button>
            <div className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")} // Fixed navigation
                className="text-orange-600 hover:text-orange-700 font-bold ml-1 hover:underline"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
