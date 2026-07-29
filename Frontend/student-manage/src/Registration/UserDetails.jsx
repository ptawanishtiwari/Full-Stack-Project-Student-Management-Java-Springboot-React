import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function UserDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/user/${id}`);
            setUser(result.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setError("Failed to load user details. Please try again.");
            setLoading(false);
        }
    };

    // Handle back button
    const goBack = () => {
        navigate("/");
    };

    // Show loading state
    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading user details...</p>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center" role="alert">
                    <h4 className="alert-heading">Error!</h4>
                    <p>{error}</p>
                    <hr />
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>User Details</h3>
                        </div>

                        <div className="card-body">
                            
                            {/* User Information */}
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th className="bg-light" style={{ width: "40%" }}>User ID</th>
                                            <td>{user.id}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-light">Full Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-light">Email Address</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-light">Phone Number</th>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-light">Password</th>
                                            <td>••••••••</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                                <Link 
                                    to={`/edituser/${user.id}`} 
                                    className="btn btn-warning btn-lg me-md-2"
                                >
                                    <i className="bi bi-pencil"></i> Edit User
                                </Link>

                                <button 
                                    onClick={goBack} 
                                    className="btn btn-secondary btn-lg"
                                >
                                    <i className="bi bi-arrow-left"></i> Back to Home
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Additional Info Card */}
                    <div className="card mt-3 bg-light">
                        <div className="card-body text-center text-muted">
                            <small>
                                <i className="bi bi-info-circle"></i> 
                                Showing details for user #{user.id}
                            </small>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}