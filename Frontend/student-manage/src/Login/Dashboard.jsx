import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userFromStorage = 
        localStorage.getItem("user") || 
        sessionStorage.getItem("user");

      if (userFromStorage) {
        try {
          const user = JSON.parse(userFromStorage);
          console.log("User data from storage:", user); // Debug log
          setUserData(user);
        } catch (error) {
          console.error("Error parsing user data:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  // Handle View Profile
  const handleViewProfile = () => {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log("View Profile - User ID:", user.id); // Debug log
        
        if (user.id) {
          navigate(`/userdetail/${user.id}`);
        } else {
          // If no ID, show error or navigate to user list
          alert("User ID not found. Please login again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  // Handle Update Profile
  const handleUpdateProfile = () => {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log("Update Profile - User ID:", user.id); // Debug log
        
        if (user.id) {
          navigate(`/edituser/${user.id}`);
        } else {
          alert("User ID not found. Please login again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div
        className={`bg-dark text-white d-flex flex-column ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
        style={{
          width: sidebarOpen ? "250px" : "0px",
          minWidth: sidebarOpen ? "250px" : "0px",
          transition: "width 0.3s ease, min-width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div className="p-3">
          <h4 className="text-white">
            <i className="bi bi-grid-1x2-fill me-2"></i>
            {sidebarOpen && "Dashboard"}
          </h4>
          <hr className="border-secondary" />
          
          {sidebarOpen && userData && (
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-3 me-2"></i>
                <div>
                  <small className="text-secondary d-block">{userData.email}</small>
                  <span className="badge bg-primary">{userData.role}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <ul className="nav nav-pills flex-column px-3">
          <li className="nav-item">
            <a href="#" className="nav-link text-white active">
              <i className="bi bi-house-fill me-2"></i>
              {sidebarOpen && "Home"}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-bar-chart-fill me-2"></i>
              {sidebarOpen && "Analytics"}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-people-fill me-2"></i>
              {sidebarOpen && "Users"}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-gear-fill me-2"></i>
              {sidebarOpen && "Settings"}
            </a>
          </li>
        </ul>

        <div className="mt-auto p-3">
          <hr className="border-secondary" />
          <a 
            href="#" 
            className="nav-link text-white"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            {sidebarOpen && "Logout"}
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-4 py-2">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list fs-4"></i>
            </button>
            <span className="navbar-brand mb-0 h5">My Dashboard</span>
          </div>

          <div className="d-flex align-items-center">
            <span className="me-3 text-secondary" style={{ cursor: "pointer" }}>
              <i className="bi bi-bell-fill fs-5"></i>
              <span className="badge bg-danger position-relative" style={{ 
                top: "-10px", 
                right: "10px",
                fontSize: "0.6rem",
                padding: "0.2rem 0.4rem"
              }}>
                3
              </span>
            </span>
            <span className="me-2 text-secondary">
              <i className="bi bi-person-circle fs-4"></i>
            </span>
            <span className="text-secondary">
              {userData?.name || userData?.email?.split('@')[0] || "User"}
            </span>
          </div>
        </nav>

        <div className="p-4 overflow-auto">
          <div className="alert alert-primary mb-4" role="alert">
            <h4 className="alert-heading">
              <i className="bi bi-hand-thumbs-up-fill me-2"></i>
              Welcome back, {userData?.name || userData?.email?.split('@')[0] || "User"}!
            </h4>
            <p className="mb-0">
              You are logged in as <strong>{userData?.role}</strong>. 
              What would you like to do today?
            </p>
          </div>

          <div className="row g-4">
            {/* View Profile Card */}
            <div className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center py-5">
                  <div className="mb-4">
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: "4rem" }}></i>
                  </div>
                  <h4 className="card-title mb-3">View Profile</h4>
                  <p className="card-text text-muted mb-4">
                    View your complete profile information including personal details, 
                    contact information, and account settings.
                  </p>
                  <button 
                    className="btn btn-primary btn-lg px-4"
                    onClick={handleViewProfile}
                  >
                    <i className="bi bi-eye me-2"></i>
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Update Profile Card */}
            <div className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center py-5">
                  <div className="mb-4">
                    <i className="bi bi-pencil-square text-success" style={{ fontSize: "4rem" }}></i>
                  </div>
                  <h4 className="card-title mb-3">Update Profile</h4>
                  <p className="card-text text-muted mb-4">
                    Update your profile information including name, email, phone number,
                    and other personal details.
                  </p>
                  <button 
                    className="btn btn-success btn-lg px-4"
                    onClick={handleUpdateProfile}
                  >
                    <i className="bi bi-pencil me-2"></i>
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;