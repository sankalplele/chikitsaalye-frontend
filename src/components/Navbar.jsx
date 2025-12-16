import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  LogIn,
  LogOut, // Added LogOut icon
  UserPlus,
  LayoutDashboard,
  CircleQuestionMark,
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import Auth Context

function Navbar({ transparent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Get auth state

  const isActive = (path) => location.pathname === path;

  // 1. Defined Content Links (Removed Login/Register from here)
  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/forum", label: "Forum", icon: CircleQuestionMark },
  ];

  // 2. Handle Login Click (The Magic Part)
  const handleLoginClick = () => {
    setMobileMenuOpen(false);
    // Navigate to login, but pass the current location so we can come back
    navigate("/login", { state: { from: location } });
  };

  const handleLogoutClick = () => {
    setMobileMenuOpen(false);
    logout();
    navigate("/"); // Optional: Redirect to home after logout
  };

  const navContainerClass = "absolute top-0 w-full z-50";
  const linkBaseClass =
    "flex items-center space-x-2 px-4 py-2 rounded-full text-sm transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10";
  const activeLinkClass = "bg-white/20 font-semibold shadow-inner";

  return (
    <nav className={navContainerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 hover:opacity-90 transition"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm bg-white/20 backdrop-blur-sm border border-white/30 text-white">
              <span className="font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
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
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-6 w-px bg-white/20 mx-2" />

            {/* Auth Buttons Logic */}
            {isAuthenticated ? (
              // 3. LOGGED IN STATE
              <button onClick={handleLogoutClick} className={linkBaseClass}>
                <LogOut size={16} />
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
                  <LogIn size={16} />
                  <span>Login</span>
                </button>

                <Link
                  to="/register"
                  className={`${linkBaseClass} ${
                    isActive("/register") ? activeLinkClass : ""
                  }`}
                >
                  <UserPlus size={16} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-900/95 backdrop-blur-md shadow-lg border-t border-white/10 py-2 px-4 flex flex-col space-y-2 z-50">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="h-px w-full bg-white/10 my-2" />

            {/* Mobile Auth Logic */}
            {isAuthenticated ? (
              <button
                onClick={handleLogoutClick}
                className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white text-left"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <UserPlus size={18} />
                  <span>Register</span>
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
