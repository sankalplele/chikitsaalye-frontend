import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  Menu,
  X,
  Home,
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
  CircleQuestionMark,
  Sun,
  Shield,
  Moon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  // 1. Defined Content Links (Dashboard only shown when authenticated)
  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    ...(isAuthenticated
      ? [
          { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { path: "/admin", label: "Admin", icon: Shield },
        ]
      : []),
    { path: "/forum", label: "Forum", icon: CircleQuestionMark },
  ];

  // 2. Handle Login Click
  const handleLoginClick = () => {
    setMobileMenuOpen(false);
    navigate("/login", { state: { from: location } });
  };

  const handleLogoutClick = () => {
    setMobileMenuOpen(false);
    logout();
    navigate("/");
  };

  // --- STYLING CLASSES (Light/Dark Theme) ---
  // Background with blur, supports dark mode - Matches landing page
  const navContainerClass =
    "fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-blue-100 dark:border-slate-700 shadow-sm transition-all";

  // Links with dark mode support - Matches landing page
  const linkBaseClass =
    "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-blue-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-slate-800";

  // Active link with dark mode support - Matches landing page
  const activeLinkClass =
    "bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-white font-bold shadow-sm border border-blue-200 dark:border-slate-700";

  return (
    <nav className={navContainerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 hover:opacity-80 transition"
          >
            {/* Logo Image (project logo) */}
            <img
              src={logo}
              alt="Chikitsaalye Logo"
              className="h-14 w-14 rounded-xl shadow-lg"
            />
            {/* Fallback Logo Icon: Orange Gradient */}
            <div className="w-9 h-9 rounded-xl hidden items-center justify-center shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <span className="font-bold text-lg">C</span>
            </div>
            {/* Logo Text: Matches landing page */}
            <span className="text-xl font-extrabold tracking-tight text-blue-900 dark:text-white drop-shadow-sm">
              Chikitsaalye
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Standard Links */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${linkBaseClass} ${
                    isActive(link.path) ? activeLinkClass : ""
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive(link.path) ? "stroke-[2.5px]" : ""}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full text-blue-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-blue-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* Divider (Darker for visibility) */}
            <div className="h-6 w-px bg-blue-200 dark:bg-slate-700 mx-2" />

            {/* Auth Buttons Logic */}
            {isAuthenticated ? (
              // 3. LOGGED IN STATE
              <button onClick={handleLogoutClick} className={linkBaseClass}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              // 4. LOGGED OUT STATE
              <>
                <button
                  onClick={handleLoginClick}
                  className={`${linkBaseClass} ${
                    isActive("/login") ? activeLinkClass : ""
                  }`}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>

                <Link
                  to="/register"
                  className={`flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-md ${
                    isActive("/register")
                      ? "bg-blue-700 dark:bg-blue-600 text-white border border-blue-300 dark:border-blue-500"
                      : "bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button with Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors text-blue-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-blue-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button
              className="p-2 rounded-lg transition-colors text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (White/Dark Background) */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl border-t border-blue-100 dark:border-slate-700 py-4 px-4 flex flex-col space-y-2 z-50 rounded-b-2xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-white font-bold"
                      : "text-blue-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="h-px w-full bg-blue-100 dark:bg-slate-700 my-2" />

            {/* Mobile Auth Logic */}
            {isAuthenticated ? (
              <button
                onClick={handleLogoutClick}
                className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 text-left transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-900 dark:hover:text-white text-left"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold bg-blue-600 dark:bg-blue-600 text-white shadow-md active:scale-95 transition-transform"
                >
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
