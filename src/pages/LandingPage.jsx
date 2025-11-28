import React, { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  FileText,
  Phone,
  Shield,
  CheckCircle,
  Building2,
  Hospital,
  Microscope,
  Ambulance,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("doctors");
  const [language, setLanguage] = useState("english");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold text-blue-900 mb-4">
              Health Services for Bharat
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              Connecting you with trusted healthcare providers in Tier 2 & Tier
              3 cities
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 mb-4 border-b pb-4">
              <button
                onClick={() => setActiveTab("doctors")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "doctors"
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Doctors
              </button>
              <button
                onClick={() => setActiveTab("hospitals")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "hospitals"
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Hospitals
              </button>
              <button
                onClick={() => setActiveTab("labs")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "labs"
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Labs
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={`Search for ${activeTab} in Kanpur...`}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-900 focus:outline-none"
                />
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-lg text-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-10">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "Book Appointment",
                desc: "Schedule with verified doctors",
                color: "blue",
              },
              {
                icon: MapPin,
                title: "Find Labs Near Me",
                desc: "Locate diagnostic centers",
                color: "green",
              },
              {
                icon: FileText,
                title: "Digitize Reports",
                desc: "For diagnostic centers",
                color: "purple",
              },
              {
                icon: Ambulance,
                title: "Emergency Services",
                desc: "24/7 helpline support",
                color: "red",
              },
            ].map((action, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-${action.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <action.icon
                    size={32}
                    className={`text-${action.color}-600`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600">{action.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-10">
            Why Choose CHikitsaalye?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Verified Doctors",
                desc: "All healthcare providers are government verified and licensed",
              },
              {
                icon: Shield,
                title: "100% Secure",
                desc: "Your health data is encrypted and protected",
              },
              {
                icon: Building2,
                title: "Government Compliant",
                desc: "Fully aligned with Digital India and ABHA standards",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon size={40} className="text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Partners */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            For Healthcare Partners
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Are you a clinic, hospital, or diagnostic lab? Join our digital
            healthcare revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 shadow-lg text-lg">
              Register Your Centre
            </button>
            <button className="px-8 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 shadow-lg text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CHikitsaalye</h3>
              <p className="text-blue-200">Digitizing healthcare for Bharat</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Partners</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Register Centre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Partner Login
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Emergency Helpline</h4>
              <div className="flex items-center space-x-2 text-blue-200 mb-2">
                <Phone size={20} />
                <span className="text-xl font-bold">108</span>
              </div>
              <p className="text-sm text-blue-200">24/7 Emergency Services</p>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 text-center text-blue-200 text-sm">
            <p>
              © 2024 CHikitsaalye.com | A Digital India Initiative | All Rights
              Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
