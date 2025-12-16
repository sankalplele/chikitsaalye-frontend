// LocationContext.js
import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  // We move the state from LandingPage to here
  const [userLocation, setUserLocation] = useState(null); // Stores { lat, lon }
  const [locationQuery, setLocationQuery] = useState(""); // Stores text input

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
