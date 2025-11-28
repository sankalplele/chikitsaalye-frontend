import React, { useState } from "react";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      handleInputChange("mobile", value);
    }
  };

  const validateForm = () => {
    const errors = {
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
    };

    let isValid = true;

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Mobile validation
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
      isValid = false;
    } else if (formData.mobile.length !== 10) {
      errors.mobile = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirm_password) {
      errors.confirm_password = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setFieldErrors({
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-7tru.onrender.com/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            confirm_password: formData.confirm_password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        // Success - store token
        localStorage.setItem("authToken", data.token);
        console.log("Registration successful, token stored");
        setRegistrationSuccess(true);
      } else if (response.status === 400 && data.error) {
        // Handle field-specific errors from backend
        const newErrors = {
          email: "",
          mobile: "",
          password: "",
          confirm_password: "",
        };

        // Parse backend error object
        if (data.error.email && Array.isArray(data.error.email)) {
          newErrors.email = data.error.email[0];
        }
        if (data.error.mobile && Array.isArray(data.error.mobile)) {
          newErrors.mobile = data.error.mobile[0];
        }
        if (data.error.password && Array.isArray(data.error.password)) {
          newErrors.password = data.error.password[0];
        }

        setFieldErrors(newErrors);
      } else {
        // Generic error
        setFieldErrors((prev) => ({
          ...prev,
          email: data.message || "Registration failed. Please try again.",
        }));
      }
    } catch (err) {
      console.error("Registration error:", err);
      setFieldErrors((prev) => ({
        ...prev,
        email: "Connection failed. Please check your internet and try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-200 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-3">
              Registration Successful!
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Your account has been created. Welcome to CHikitsaalye!
            </p>
            <button
              onClick={() => alert("Redirecting to dashboard...")}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-lg text-lg flex items-center justify-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => alert("Redirecting to login...")}
              className="w-full mt-4 py-4 border-2 border-blue-900 text-blue-900 font-bold rounded-xl hover:bg-blue-50 text-lg"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Registration form
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

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join thousands using digital healthcare
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
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.email
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-blue-900"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{fieldErrors.email}</span>
                </div>
              )}
            </div>

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
                  value={formData.mobile}
                  onChange={handleMobileChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.mobile
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-blue-900"
                  }`}
                />
              </div>
              {fieldErrors.mobile && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{fieldErrors.mobile}</span>
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
                Create Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Create a strong password"
                  className={`w-full pl-12 pr-12 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.password
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-blue-900"
                  }`}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{fieldErrors.password}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={(e) =>
                    handleInputChange("confirm_password", e.target.value)
                  }
                  placeholder="Re-enter your password"
                  className={`w-full pl-12 pr-12 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.confirm_password
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-blue-900"
                  }`}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {fieldErrors.confirm_password && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{fieldErrors.confirm_password}</span>
                </div>
              )}
            </div>

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
              {loading ? "Creating Account..." : "Register Securely"}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <div className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => alert("Redirecting to login...")}
                className="text-blue-900 hover:underline font-semibold"
              >
                Login Here
              </button>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            By registering, you agree to our Terms of Service and Privacy Policy
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
