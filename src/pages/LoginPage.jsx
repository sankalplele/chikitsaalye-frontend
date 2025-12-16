import React, { useState } from "react";
import {
  Phone,
  Lock,
  Mail,
  AlertCircle,
  Loader2,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
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

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // This stops the page refresh on Enter key
    setError("");
    setMobileError("");
    setEmailError("");

    const isMobileValid = validateMobile();
    const isEmailValid = validateEmail();

    if (!isMobileValid || !isEmailValid) return;

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
          email: email,
          mobile: mobile,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        login(data.token, {
          email: email,
          phone: mobile,
        });

        alert("Login Successful!");
        navigate(from, { replace: true });
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
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 mt-12 border-white/10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Login to access your health services
            </p>
          </div>

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

          {/* 1. Changed div to form and added onSubmit */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                    setError("");
                  }}
                  onBlur={validateEmail}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3.5 text-lg font-medium border-2 rounded-xl focus:outline-none transition-colors ${
                    emailError
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-blue-600 bg-gray-50 focus:bg-white"
                  }`}
                />
              </div>
              {emailError && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{emailError}</span>
                </div>
              )}
            </div>

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

            {/* 2. Changed Button type to submit and removed onClick */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {loading ? "Please Wait..." : "Login Securely"}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => alert("Password reset feature coming soon!")}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              Forgot Password?
            </button>
            <div className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
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
