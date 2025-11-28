import React, { useState } from "react";
import {
  Phone,
  Lock,
  AlertCircle,
  Loader2,
  Shield,
  CheckCircle,
} from "lucide-react";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");

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
    console.log("Attempting Login...");
    console.log("Sending URL:", "/api/auth/login/");
    console.log(
      "Sending Body:",
      JSON.stringify({
        mobile: mobile,
        password: password,
      })
    );
    setError("");
    setMobileError("");

    // Validate mobile number
    if (!validateMobile()) {
      return;
    }

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
        // Success - store token
        localStorage.setItem("authToken", data.token);
        console.log("Redirecting...");
        console.log("Received Token:", data.token);
        // Here you would typically redirect to dashboard
        setError("");
        alert("Login Successful! Token stored.");
      } else {
        // Error from server
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <span className="text-3xl font-bold text-blue-900">
              CHikitsaalye
            </span>
          </div>
          <p className="text-gray-600 text-lg">Health Services for Bharat</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Login to access your health services
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield size={16} className="text-blue-900" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Verified</span>
            </div>
          </div>

          <div className="space-y-5">
            {/* Mobile Number Input */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                  className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors ${
                    mobileError
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-blue-900"
                  }`}
                />
              </div>
              {mobileError && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{mobileError}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Indian mobile number (10 digits)
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle
                  className="text-red-600 flex-shrink-0 mt-0.5"
                  size={20}
                />
                <div>
                  <p className="text-red-800 font-medium">Login Failed</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Loader2 className="text-blue-900 animate-spin" size={24} />
                  <div>
                    <p className="text-blue-900 font-medium">
                      Connecting to Secure Server...
                    </p>
                    <p className="text-blue-700 text-sm mt-1">
                      This may take up to 30 seconds. Please wait.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              }`}
            >
              {loading ? "Connecting..." : "Login Securely"}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-3">
            <button
              onClick={() => alert("Password reset feature coming soon!")}
              className="text-blue-900 hover:underline font-medium block w-full"
            >
              Forgot Password?
            </button>
            <div className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => alert("Registration page coming soon!")}
                className="text-orange-600 hover:underline font-semibold"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🔒 Your data is encrypted and secure</p>
          <p className="mt-1">A Digital India Initiative</p>
        </div>
      </div>
    </div>
  );
}
