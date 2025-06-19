import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userID");
    if (user) setIsLoggedIn(true);
  }, []);

  const login = () => {
    localStorage.setItem("userID", "dummy123");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("userID");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
