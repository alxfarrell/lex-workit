import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/verify', {
          credentials: 'include'
        });
        setAuthorized(response.ok);
      } catch (error) {
        setAuthorized(false);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/sena-form">Sena Form</Link>
      </nav>

      <main>
        <h3 className="header">Start Your Fitness Journey Today</h3>
        <p>Discover workouts that match your goals. Train smart. Stay strong.</p>
        <img src="/ss1.gif" alt="Workout" style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />

        {authorized ? (
          <div>
            <section className="workout-grid">
              <div className="workout-card">
                <h3>Burpees</h3>
                <p>Quick, intense full-body movement to boost heart rate and burn calories.</p>
                <p><strong>Duration:</strong> 30sec</p>
                <p><strong>Times:</strong> 3 rounds</p>
                <a href="https://health.clevelandclinic.org/how-to-do-burpee" target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </div>
            </section>
          </div>
        ) : (
          <p>You are not authorized to view this page. Please log in.</p>
        )}
      </main>
    </div>
  );
};

export default Home; 