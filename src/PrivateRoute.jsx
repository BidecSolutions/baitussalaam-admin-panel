// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check login
  if (!token) {
    return <Navigate to="/register" replace />; // agar nahi login, register page
  }
  return children;
};

export default PrivateRoute;
