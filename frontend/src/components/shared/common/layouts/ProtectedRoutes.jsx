import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Loader/Spinner";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner text="Just a moment..." variant="overlay" sizeClass="w-36" />;

  if (!user) return <Navigate to={{ pathname: "/login", search: "?authorized=false" }} replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={{ pathname: "/", search: "?authorized=false" }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
