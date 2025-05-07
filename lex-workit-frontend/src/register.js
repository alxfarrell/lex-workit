import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeredUsernames, setRegisteredUsernames] = useState([]);
  const [registeredEmails, setRegisteredEmails] = useState([]);

  // Load registered usernames and emails from localStorage on component mount
  useEffect(() => {
    const savedUsernames = localStorage.getItem('registeredUsernames');
    const savedEmails = localStorage.getItem('registeredEmails');
    if (savedUsernames) {
      setRegisteredUsernames(JSON.parse(savedUsernames));
    }
    if (savedEmails) {
      setRegisteredEmails(JSON.parse(savedEmails));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Check if username is already registered
    if (registeredUsernames.includes(formData.username)) {
      setError("This username is already taken. Please choose a different one.");
      return;
    }

    // Check if email is already registered
    if (registeredEmails.includes(formData.email)) {
      setError("This email is already registered. Please use a different email address.");
      return;
    }

    // Log the registration information to console
    console.log("New User Registration:");
    console.log("Username:", formData.username);
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    
    // Add new username and email to registered lists
    const updatedUsernames = [...registeredUsernames, formData.username];
    const updatedEmails = [...registeredEmails, formData.email];
    setRegisteredUsernames(updatedUsernames);
    setRegisteredEmails(updatedEmails);
    localStorage.setItem('registeredUsernames', JSON.stringify(updatedUsernames));
    localStorage.setItem('registeredEmails', JSON.stringify(updatedEmails));
    
    setSuccess("Registration successful! Your account has been created.");
    setFormData({ username: "", email: "", password: "" });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/sena-form" className="nav-link">Form</Link>
        </div>
      </nav>

      <main className="register-container">
        <div className="register-card">
          <h2 className="register-title">Create Your Account</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
