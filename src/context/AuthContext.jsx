import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      // Optional: You could validate the token with an API call here
      setToken(storedToken);
      // For now, let's assume if token exists, we are logged in.
      // In a real app, you'd decode the JWT to get the user name/email
      setUser({ name: "User", token: storedToken });
    }
    setLoading(false);
  }, []);

  // Login Function (Global)
  const login = (newToken, userData) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    setUser(userData);
  };

  // Logout Function (Global)
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, isAuthenticated: !!token }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);
