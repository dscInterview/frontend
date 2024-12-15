// context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Provide AuthContext to the app
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const login = () => setIsLogged(true);
  const logout = () => setIsLogged(false);

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
