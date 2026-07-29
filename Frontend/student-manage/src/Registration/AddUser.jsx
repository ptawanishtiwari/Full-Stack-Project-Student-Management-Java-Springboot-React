import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {

  let navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })

  const { name, email, phone, password } = user

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user", user)
    navigate("/login") // Redirect to login after registration
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h3>User Registration</h3>
            </div>

            <div className="card-body">

              <form onSubmit={onSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Full Name
                  </label>
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
                  <label className="form-label fw-bold">
                    Email Address
                  </label>
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
                  <label className="form-label fw-bold">
                    Phone Number
                  </label>
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
                  <label className="form-label fw-bold">
                    Password
                  </label>
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Register
                  </button>

                  <Link
                    className="btn btn-outline-secondary"
                    to="/login" // Change this to go to login page
                  >
                    Already have an account? Login
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