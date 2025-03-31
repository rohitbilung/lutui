import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in (for persistence)
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const isAuthenticated = useMemo(() => {
    return user ? true :  false;
  },[user])

  const login = ({ token, userData }) => {
    // set token in cookie
    setUser(userData);
  };

  const logout = () => {
    // delete cookie
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
