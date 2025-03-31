import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import { COOKIES_NAME } from "../config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIES_NAME])
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in (for persistence)
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const isAuthenticated = useMemo(() => {
    return user ? true :  false;
  },[user])

  const login = async ({ token, userData }) => {
    setIsLoading(true)
    // set token in cookie
    setCookie(COOKIES_NAME, token);
    setUser(userData);
    setIsLoading(false)
  };

  const logout = () => {
    // delete cookie
    removeCookie(COOKIES_NAME)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
