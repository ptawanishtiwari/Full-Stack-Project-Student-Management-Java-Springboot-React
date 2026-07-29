import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          Student Management System
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Menu */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Menu */}
          <ul className="navbar-nav ms-auto">
            {/* Registration Button - Now points to /register (public) */}
            <li className="nav-item me-2">
              <Link className="btn btn-outline-light" to="/register">
                Register
              </Link>
            </li>

            {/* Login Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="loginDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="loginDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/login">
                    Student Login
                  </Link>
                </li>
               
                <li>
                  <Link className="dropdown-item" to="/admin-login">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}