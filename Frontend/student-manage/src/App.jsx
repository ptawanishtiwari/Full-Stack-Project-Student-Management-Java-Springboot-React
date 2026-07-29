import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

import Home from "./Home/Home.jsx";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Login/Dashboard.jsx";
import AdminDashboard from "./Login/AdminDashboard.jsx";
import Login from "./Login/Login.jsx";
import AddUser from "./Registration/AddUser.jsx";
import EditUser from "./Registration/EditUser.jsx";
import UserDetails from "./Registration/UserDetails.jsx";
import AdminLogin from "./Login/AdminLogin.jsx";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const adminData = localStorage.getItem("admin") || sessionStorage.getItem("admin");
  
  if (!adminData) {
    return <Navigate to="/admin-login" replace />;
  }
  
  try {
    const admin = JSON.parse(adminData);
    if (admin.role !== "ADMIN") {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      {/* Show navbar on all pages except login, register, dashboard, and admin dashboard */}
      {/* Navbar shows on admin-login but hides on admin-dashboard */}
      {window.location.pathname !== '/login' && 
       window.location.pathname !== '/register' && 
       window.location.pathname !== '/dashboard' && 
       window.location.pathname !== '/admin-dashboard' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AddUser />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } 
        />

        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/addUser" 
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/edituser/:id" 
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/userdetail/:id" 
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;