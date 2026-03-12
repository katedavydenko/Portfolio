import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1",
      );
      const userData = await response.json();

      setIsAuthenticated(true);
      setUser({ ...userData, email });
    } catch (error) {
      console.error("Помилка авторизації:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const register = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};