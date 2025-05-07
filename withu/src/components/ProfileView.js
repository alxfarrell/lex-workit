import React from 'react';
import { Link } from "react-router-dom";
import "../styles.css";

const ProfileView = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/sena-form">Form</Link>
      </nav>

      <main>
        <h2>Welcome to Your Fitness Journey!</h2>
        <p>Join now and get personalized workouts tailored just for you.</p>
        <img 
          src="/brochure-image.jpg" 
          alt="Fitness Showcase" 
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} 
        />

        <Link to="/register">
          <button 
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#ff5722", 
              color: "#fff", 
              border: "none", 
              cursor: "pointer" 
            }}
          >
            Sign Up Now
          </button>
        </Link>
      </main>
    </div>
  );
};

export default ProfileView; 