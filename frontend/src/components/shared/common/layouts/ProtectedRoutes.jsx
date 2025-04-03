import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth();

  return (
    <>{isLoading ? "Loading..." : user ? <Outlet /> : <Navigate to="/" />}</>
  );
};

export default ProtectedRoutes;
