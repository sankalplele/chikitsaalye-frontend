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
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
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
      errors.email = "Invalid email";
      isValid = false;
    }

    // Mobile validation
    if (!formData.mobile) {
      errors.mobile = "Mobile required";
      isValid = false;
    } else if (formData.mobile.length !== 10) {
      errors.mobile = "Must be 10 digits";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Min 6 chars";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirm_password) {
      errors.confirm_password = "Confirm password";
      isValid = false;
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords mismatch";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    setFieldErrors({
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
    });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register/", {
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
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        setRegistrationSuccess(true);
      } else if (response.status === 400 && data.error) {
        const newErrors = { ...fieldErrors };
        if (data.error.email) newErrors.email = data.error.email[0];
        if (data.error.mobile) newErrors.mobile = data.error.mobile[0];
        if (data.error.password) newErrors.password = data.error.password[0];
        setFieldErrors(newErrors);
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          email: data.message || "Registration failed.",
        }));
      }
    } catch (err) {
      console.error("Registration error:", err);
      setFieldErrors((prev) => ({
        ...prev,
        email: "Connection failed.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // --- SUCCESS SCREEN ---
  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-white/10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Registration Successful!
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Your account has been created.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg text-lg flex items-center justify-center space-x-2 transition-transform active:scale-95"
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- REGISTRATION FORM (2-COLUMN LAYOUT) ---
  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Changed max-w-md to max-w-2xl for wider 2-column layout */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-6">
          <p className="text-blue-200 text-lg">Health Services for Bharat</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-white/10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm">
              Join thousands using digital healthcare
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <Shield size={14} className="text-blue-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <CheckCircle size={14} className="text-green-600" />
              <span>Verified</span>
            </div>
          </div>

          {/* FORM GRID: 1 Column on Mobile, 2 Columns on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Input */}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="name@email.com"
                  className={`w-full pl-12 pr-4 py-3 text-base font-medium border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.email
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-blue-600 bg-gray-50 focus:bg-white"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <div className="flex items-center space-x-2 mt-1 text-red-600 text-xs">
                  <AlertCircle size={12} />
                  <span>{fieldErrors.email}</span>
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
                  value={formData.mobile}
                  onChange={handleMobileChange}
                  placeholder="10-digit mobile"
                  className={`w-full pl-12 pr-4 py-3 text-base font-medium border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.mobile
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-blue-600 bg-gray-50 focus:bg-white"
                  }`}
                />
              </div>
              {fieldErrors.mobile && (
                <div className="flex items-center space-x-2 mt-1 text-red-600 text-xs">
                  <AlertCircle size={12} />
                  <span>{fieldErrors.mobile}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 mb-2"
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
                  placeholder="Min 6 chars"
                  className={`w-full pl-12 pr-12 py-3 text-base font-medium border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.password
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-blue-600 bg-gray-50 focus:bg-white"
                  }`}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <div className="flex items-center space-x-2 mt-1 text-red-600 text-xs">
                  <AlertCircle size={12} />
                  <span>{fieldErrors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-bold text-gray-700 mb-2"
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
                  placeholder="Re-enter password"
                  className={`w-full pl-12 pr-12 py-3 text-base font-medium border-2 rounded-xl focus:outline-none transition-colors ${
                    fieldErrors.confirm_password
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-blue-600 bg-gray-50 focus:bg-white"
                  }`}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {fieldErrors.confirm_password && (
                <div className="flex items-center space-x-2 mt-1 text-red-600 text-xs">
                  <AlertCircle size={12} />
                  <span>{fieldErrors.confirm_password}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button & Links - Full Width below grid */}
          <div className="mt-6">
            {loading && (
              <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-3 flex items-center justify-center space-x-3 mb-3">
                <Loader2 className="text-blue-600 animate-spin" size={20} />
                <p className="text-blue-700 text-sm font-medium">
                  Creating secure account...
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {loading ? "Please Wait..." : "Register Securely"}
            </button>

            <div className="mt-6 text-center space-y-3 border-t border-gray-100 pt-4">
              <div className="text-gray-500 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-orange-600 hover:text-orange-700 font-bold ml-1 hover:underline"
                >
                  Login Here
                </button>
              </div>
              <div className="text-xs text-gray-400">
                By registering, you agree to our Terms of Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
