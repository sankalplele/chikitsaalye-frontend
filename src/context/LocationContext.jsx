// LocationContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  // We move the state from LandingPage to here
  // Persist location across reloads using localStorage
  const [userLocation, setUserLocation] = useState(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("userLocation");
    return saved ? JSON.parse(saved) : null;
  }); // Stores { lat, lon }

  const [locationQuery, setLocationQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("locationQuery") || "";
  }); // Stores text input

  useEffect(() => {
    if (userLocation) {
      localStorage.setItem("userLocation", JSON.stringify(userLocation));
    } else {
      localStorage.removeItem("userLocation");
    }
  }, [userLocation]);

  useEffect(() => {
    if (locationQuery) {
      localStorage.setItem("locationQuery", locationQuery);
    } else {
      localStorage.removeItem("locationQuery");
    }
  }, [locationQuery]);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        locationQuery,
        setLocationQuery,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
