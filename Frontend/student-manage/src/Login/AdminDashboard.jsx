import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    email: "",
    password: ""
  });
  const [createAdminError, setCreateAdminError] = useState("");
  const [createAdminSuccess, setCreateAdminSuccess] = useState("");
  const [adminExists, setAdminExists] = useState(false);
  const [showAdminListModal, setShowAdminListModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    newUsersToday: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminFromStorage = 
          localStorage.getItem("admin") || 
          sessionStorage.getItem("admin");

        if (!adminFromStorage) {
          navigate("/admin-login");
          return;
        }

        const admin = JSON.parse(adminFromStorage);
        
        if (admin.role !== "ADMIN") {
          navigate("/login");
          return;
        }
        
        setAdminData(admin);
        await loadUsers();
        await checkAdminExists();
        await loadAdmins();
        
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          navigate("/admin-login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const userList = response.data || [];
      const usersArray = Array.isArray(userList) ? userList : [];
      setUsers(usersArray);
      
      const totalUsers = usersArray.filter(u => u.role === "USER").length;
      const totalAdmins = usersArray.filter(u => u.role === "ADMIN").length;
      
      setStats({
        totalUsers,
        totalAdmins,
        newUsersToday: usersArray.filter(u => {
          if (!u.createdAt) return false;
          const today = new Date();
          const createdDate = new Date(u.createdAt);
          return createdDate.toDateString() === today.toDateString();
        }).length
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const checkAdminExists = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/admin/exists", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      if (response.data.success) {
        setAdminExists(response.data.data.exists);
      }
    } catch (error) {
      console.error("Error checking admin exists:", error);
    }
  };

  const loadAdmins = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/admin/details", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      if (response.data.success) {
        setAdmins([response.data.data]);
      }
    } catch (error) {
      console.error("Error loading admins:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    sessionStorage.removeItem("admin");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/admin-login");
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.delete(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      await loadUsers();
      alert("User deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleEditUser = (userId) => {
    navigate(`/edituser/${userId}`);
  };

  // Handle Password Update
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setPasswordError("");
    setPasswordSuccess("");
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/admin/update-password?email=${adminData.email}&oldPassword=${passwordData.oldPassword}&newPassword=${passwordData.newPassword}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data.success) {
        setPasswordSuccess("Password updated successfully!");
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError(error.response?.data?.message || "Failed to update password");
    }
  };

  // Handle Create Admin
  const handleCreateAdminChange = (e) => {
    setNewAdminData({
      ...newAdminData,
      [e.target.name]: e.target.value
    });
    setCreateAdminError("");
    setCreateAdminSuccess("");
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (newAdminData.password.length < 6) {
      setCreateAdminError("Password must be at least 6 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/admin/register",
        newAdminData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data.success) {
        setCreateAdminSuccess("Admin created successfully!");
        setNewAdminData({
          email: "",
          password: ""
        });
        await checkAdminExists();
        await loadAdmins();
        setTimeout(() => {
          setShowCreateAdminModal(false);
          setCreateAdminSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      setCreateAdminError(error.response?.data?.message || "Failed to create admin");
    }
  };

  // Handle Delete Admin
  const handleDeleteAdmin = async (email) => {
    if (!window.confirm(`Are you sure you want to delete admin with email: ${email}?`)) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.delete(`http://localhost:8080/api/admin/delete/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (response.data.success) {
        alert("Admin deleted successfully!");
        await loadAdmins();
        await checkAdminExists();
        setShowAdminListModal(false);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert(error.response?.data?.message || "Failed to delete admin");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole.toUpperCase();
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!adminData) {
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
            <i className="bi bi-shield-lock-fill me-2"></i>
            {sidebarOpen && "Admin Panel"}
          </h4>
          <hr className="border-secondary" />
          
          {sidebarOpen && adminData && (
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-3 me-2"></i>
                <div>
                  <small className="text-secondary d-block">{adminData.email}</small>
                  <span className="badge bg-danger">Admin</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <ul className="nav nav-pills flex-column px-3">
          <li className="nav-item">
            <a href="#" className="nav-link text-white active" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-speedometer2 me-2"></i>
              {sidebarOpen && "Dashboard"}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-people-fill me-2"></i>
              {sidebarOpen && "Users Management"}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-shield-fill me-2"></i>
              {sidebarOpen && "Roles & Permissions"}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white" onClick={(e) => e.preventDefault()}>
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
      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-4 py-2">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list fs-4"></i>
            </button>
            <span className="navbar-brand mb-0 h5">Admin Dashboard</span>
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
                {users.filter(u => u.role === "USER").length}
              </span>
            </span>
            <span className="me-2 text-secondary">
              <i className="bi bi-person-circle fs-4"></i>
            </span>
            <span className="text-secondary">
              {adminData?.email?.split('@')[0] || "Admin"}
            </span>
          </div>
        </nav>

        <div className="p-4">
          {/* Admin Management Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">
                        <i className="bi bi-shield-lock text-primary me-2"></i>
                        Admin Management
                      </h5>
                      <p className="card-text text-muted">Manage admin accounts</p>
                    </div>
                    <span className="badge bg-info">
                      {adminExists ? "Admin Exists" : "No Admin"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-primary me-2 mb-2"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      <i className="bi bi-key me-1"></i>
                      Change Password
                    </button>
                    {!adminExists && (
                      <button
                        className="btn btn-success mb-2"
                        onClick={() => setShowCreateAdminModal(true)}
                      >
                        <i className="bi bi-person-plus me-1"></i>
                        Create Admin
                      </button>
                    )}
                    {adminExists && (
                      <button
                        className="btn btn-info mb-2"
                        onClick={() => setShowAdminListModal(true)}
                      >
                        <i className="bi bi-eye me-1"></i>
                        View Admins
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-info-circle text-info me-2"></i>
                    Admin Info
                  </h5>
                  <div className="mt-2">
                    <p className="mb-1">
                      <strong>Email:</strong> {adminData?.email}
                    </p>
                    <p className="mb-1">
                      <strong>Role:</strong> 
                      <span className="badge bg-danger ms-2">ADMIN</span>
                    </p>
                    <p className="mb-0">
                      <strong>Created:</strong> 
                      <span className="text-muted ms-2">
                        {adminData?.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-database text-success me-2"></i>
                    Quick Stats
                  </h5>
                  <div className="mt-2">
                    <p className="mb-1">
                      <strong>Total Admins:</strong> {stats.totalAdmins}
                    </p>
                    <p className="mb-1">
                      <strong>Total Users:</strong> {stats.totalUsers}
                    </p>
                    <p className="mb-0">
                      <strong>Total Records:</strong> {stats.totalUsers + stats.totalAdmins}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Total Users</h6>
                      <h3 className="mb-0">{stats.totalUsers}</h3>
                    </div>
                    <div className="bg-primary bg-opacity-10 rounded p-3">
                      <i className="bi bi-people-fill text-primary fs-3"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Admins</h6>
                      <h3 className="mb-0">{stats.totalAdmins}</h3>
                    </div>
                    <div className="bg-danger bg-opacity-10 rounded p-3">
                      <i className="bi bi-shield-fill text-danger fs-3"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">New Today</h6>
                      <h3 className="mb-0">{stats.newUsersToday}</h3>
                    </div>
                    <div className="bg-success bg-opacity-10 rounded p-3">
                      <i className="bi bi-person-plus-fill text-success fs-3"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Total</h6>
                      <h3 className="mb-0">{stats.totalUsers + stats.totalAdmins}</h3>
                    </div>
                    <div className="bg-info bg-opacity-10 rounded p-3">
                      <i className="bi bi-person-badge-fill text-info fs-3"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h5 className="mb-0">
                    <i className="bi bi-people-fill me-2"></i>
                    All Users
                  </h5>
                </div>
                <div className="col-md-8">
                  <div className="row g-2">
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-select"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                      >
                        <option value="all">All Roles</option>
                        <option value="user">Users</option>
                        <option value="admin">Admins</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => {
                          setSearchTerm("");
                          setFilterRole("all");
                        }}
                      >
                        <i className="bi bi-arrow-clockwise me-1"></i>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-circle me-2"></i>
                              {user.name || "N/A"}
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.phone || "N/A"}</td>
                          <td>
                            <span className={`badge ${
                              user.role === "ADMIN" ? "bg-danger" : "bg-primary"
                            }`}>
                              {user.role || "USER"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-info me-1"
                              onClick={() => handleViewUser(user)}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-primary me-1"
                              onClick={() => handleEditUser(user.id)}
                              title="Edit User"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Delete User"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError("");
                    setPasswordSuccess("");
                    setPasswordData({
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: ""
                    });
                  }}
                ></button>
              </div>
              <form onSubmit={handleUpdatePassword}>
                <div className="modal-body">
                  {passwordError && (
                    <div className="alert alert-danger">{passwordError}</div>
                  )}
                  {passwordSuccess && (
                    <div className="alert alert-success">{passwordSuccess}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                    <small className="text-muted">Password must be at least 6 characters</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordError("");
                      setPasswordSuccess("");
                      setPasswordData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check me-1"></i>
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Admin Modal */}
      {showCreateAdminModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-plus me-2"></i>
                  Create New Admin
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowCreateAdminModal(false);
                    setCreateAdminError("");
                    setCreateAdminSuccess("");
                    setNewAdminData({
                      email: "",
                      password: ""
                    });
                  }}
                ></button>
              </div>
              <form onSubmit={handleCreateAdmin}>
                <div className="modal-body">
                  {createAdminError && (
                    <div className="alert alert-danger">{createAdminError}</div>
                  )}
                  {createAdminSuccess && (
                    <div className="alert alert-success">{createAdminSuccess}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newAdminData.email}
                      onChange={handleCreateAdminChange}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={newAdminData.password}
                      onChange={handleCreateAdminChange}
                      required
                      minLength="6"
                    />
                    <small className="text-muted">Password must be at least 6 characters</small>
                  </div>
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Admin will be created with role <strong>ADMIN</strong>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowCreateAdminModal(false);
                      setCreateAdminError("");
                      setCreateAdminSuccess("");
                      setNewAdminData({
                        email: "",
                        password: ""
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-person-plus me-1"></i>
                    Create Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Admins Modal */}
      {showAdminListModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-shield-fill me-2"></i>
                  Admin List
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAdminListModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {admins.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Created At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map((admin, index) => (
                          <tr key={admin.id}>
                            <td>{index + 1}</td>
                            <td>{admin.email}</td>
                            <td>
                              <span className="badge bg-danger">ADMIN</span>
                            </td>
                            <td>
                              {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}
                            </td>
                            <td>
                              {admins.length > 1 && admin.email !== adminData?.email && (
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeleteAdmin(admin.email)}
                                  title="Delete Admin"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              )}
                              {admin.email === adminData?.email && (
                                <span className="badge bg-info">Current</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <i className="bi bi-shield-slash fs-1 d-block mb-2"></i>
                    <p>No admins found</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAdminListModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-circle me-2"></i>
                  User Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowUserModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="fw-bold">ID</label>
                  <p className="text-muted">#{selectedUser.id}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Name</label>
                  <p className="text-muted">{selectedUser.name || "N/A"}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Email</label>
                  <p className="text-muted">{selectedUser.email}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Phone</label>
                  <p className="text-muted">{selectedUser.phone || "N/A"}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Role</label>
                  <p>
                    <span className={`badge ${
                      selectedUser.role === "ADMIN" ? "bg-danger" : "bg-primary"
                    }`}>
                      {selectedUser.role || "USER"}
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Created At</label>
                  <p className="text-muted">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUserModal(false)}
                >
                  Close
                </button>
                <Link
                  className="btn btn-primary"
                  to={`/edituser/${selectedUser.id}`}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit User
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;