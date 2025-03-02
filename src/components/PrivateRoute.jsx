import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isAdmin === "1") {
    return <Navigate to="/isStore" />; // Redirect normal users to their page
  }

  return children; // Admin can access the child route (dashboard or other admin pages)
};

export default PrivateRoute;
