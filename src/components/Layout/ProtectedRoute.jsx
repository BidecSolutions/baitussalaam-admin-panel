import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ permission, children }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");

  if (permission && !permissions.includes(permission)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
