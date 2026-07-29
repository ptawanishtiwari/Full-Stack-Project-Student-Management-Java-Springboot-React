import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, phone, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, user);
    
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin") || sessionStorage.getItem("admin");
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        if (admin.role === "ADMIN") {
          navigate("/admin-dashboard");
          return;
        }
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }
    
    // Default navigation for regular users
    navigate("/dashboard");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  // Check if user is admin for back button navigation
  const isAdmin = () => {
    const adminData = localStorage.getItem("admin") || sessionStorage.getItem("admin");
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        return admin.role === "ADMIN";
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h3>Update User Details</h3>
            </div>

            <div className="card-body">
              <form onSubmit={onSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={phone}
                    onChange={onInputChange}
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                  />
                </div>

                {/* Buttons */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success">
                    Update Now
                  </button>
                  
                  <Link
                    to={isAdmin() ? "/admin-dashboard" : "/dashboard"}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}