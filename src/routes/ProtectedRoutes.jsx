import { useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, role }) => {
  const { user, userData, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // অথবা একটি লোডার কম্পোনেন্ট
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role-based access control
  if (role && userData?.role !== role) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
