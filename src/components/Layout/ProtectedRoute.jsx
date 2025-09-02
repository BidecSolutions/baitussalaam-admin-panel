import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ permission, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userPermissions = user?.permissions || [];
  if (!userPermissions.includes(permission)) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>🚫 Access Denied</h2>;
  }

  return children;
};

export default ProtectedRoute;
