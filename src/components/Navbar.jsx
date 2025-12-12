import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LogIn, UserPlus, LayoutDashboard } from "lucide-react";

function Navbar({ transparent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/register", label: "Register", icon: UserPlus },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  // Dynamic Styles
  const navContainerClass = transparent
    ? "absolute top-0 w-full z-50 transition-colors duration-300"
    : "bg-white shadow-sm sticky top-0 z-50 border-b border-blue-100";

  const linkClass = (path) =>
    transparent
      ? `text-white/90 hover:text-white hover:bg-white/10 ${
          isActive(path) ? "bg-white/20 font-semibold" : ""
        }`
      : `text-gray-600 hover:text-blue-900 hover:bg-blue-50 ${
          isActive(path) ? "bg-blue-50 text-blue-900 font-semibold" : ""
        }`;

  const logoTextClass = transparent ? "text-white" : "text-blue-900";
  const logoBgClass = transparent
    ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white"
    : "bg-gradient-to-br from-blue-900 to-blue-700 text-white";

  return (
    <nav className={navContainerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 hover:opacity-90 transition"
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm ${logoBgClass}`}
            >
              <span className="font-bold text-lg">C</span>
            </div>
            <span
              className={`text-xl font-bold tracking-tight ${logoTextClass}`}
            >
              CHikitsaalye
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm transition-all duration-200 ${linkClass(
                    link.path
                  )}`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              transparent
                ? "text-white hover:bg-white/10"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu (Background always white for readability) */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-2 px-4 flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
