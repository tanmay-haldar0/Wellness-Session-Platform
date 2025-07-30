import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (!storedToken || !storedUser) {
      return false;
    }
    
    try {
      // Basic token validation - you can add more sophisticated checks here
      const userData = JSON.parse(storedUser);
      return storedToken && userData && Object.keys(userData).length > 0;
    } catch (error) {
      return false;
    }
  };

  // Effect to check authentication on mount and clear localStorage if not authenticated
  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        localStorage.clear();
        setUser(null);
        setToken("");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
