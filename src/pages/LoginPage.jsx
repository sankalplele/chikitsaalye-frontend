import React, { useState } from "react";
import {
  Phone,
  Lock,
  Mail,
  AlertCircle,
  Loader2,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 flex items-start justify-center pt-24 pb-10 px-4 relative overflow-hidden transition-colors duration-300">
      {/* Dark mode background overlay */}
      <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />
      
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-blue-200 dark:border-slate-700 transition-colors duration-300">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Login to access your health services
            </p>
          </div>

          {/* 1. Changed div to form and added onSubmit */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
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
                  className={`w-full pl-12 pr-4 py-3.5 text-lg font-medium border-2 rounded-xl focus:outline-none transition-colors dark:text-white dark:placeholder-gray-500 ${
                    emailError
                      ? "border-red-500 dark:border-red-500 focus:border-red-600 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-200 dark:border-slate-600 focus:border-blue-600 dark:focus:border-blue-500 bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-700"
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
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
              >
                Mobile Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={handleMobileChange}
                  onBlur={validateMobile}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full pl-12 pr-4 py-3.5 text-lg font-medium border-2 rounded-xl focus:outline-none transition-colors dark:text-white dark:placeholder-gray-500 ${
                    mobileError
                      ? "border-red-500 dark:border-red-500 focus:border-red-600 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-200 dark:border-slate-600 focus:border-blue-600 dark:focus:border-blue-500 bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-700"
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

            {/* Password Input with Show/Hide */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-11 py-3.5 text-lg font-medium border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 focus:bg-white dark:focus:bg-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-800 rounded-xl p-3 flex items-start space-x-3">
                <AlertCircle
                  className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 rounded-xl p-3 flex items-center justify-center space-x-3">
                <Loader2 className="text-blue-600 dark:text-blue-400 animate-spin" size={20} />
                <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
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

          <div className="mt-8 text-center space-y-4 border-t border-gray-100 dark:border-slate-700 pt-6">
            <button
              type="button"
              onClick={() => alert("Password reset feature coming soon!")}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-semibold"
            >
              Forgot Password?
            </button>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-bold ml-1 hover:underline"
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
