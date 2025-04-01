import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import { COOKIES_NAME } from "../config";
import { useGetCurrentUser } from "../lib/queries/queries";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIES_NAME]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isPending } = useGetCurrentUser();

  // Check if user is logged in (for persistence)
  useEffect(() => {
    if (!isPending) {
      if (data && data.success) {
        setUser(data.data);
      }
      setIsLoading(false);
    }
  }, [data, isPending]);

  const isAuthenticated = useMemo(() => {
    return user ? true : false;
  }, [user]);

  const login = async ({ token, userData }) => {
    setIsLoading(true);
    setUser(userData);
    // set token in cookie
    setCookie(COOKIES_NAME, token);
    setIsLoading(false);
  };

  const logout = () => {
    // delete cookie
    removeCookie(COOKIES_NAME);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
