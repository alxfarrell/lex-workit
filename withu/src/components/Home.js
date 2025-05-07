import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <Link to="/home">Home</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </nav>

      <main>
        <h1 className="header">Welcome to WithU Fitness</h1>
        <p className="subtitle">Your Personal Fitness Journey Starts Here</p>

        <div className="content-section">
          {isAuthenticated ? (
            <div className="workout-grid">
              <div className="workout-card">
                <h3>Daily Workout</h3>
                <p>Quick, intense full-body movement to boost heart rate and burn calories.</p>
                <ul>
                  <li>Burpees - 30 seconds</li>
                  <li>Push-ups - 20 reps</li>
                  <li>Squats - 30 reps</li>
                </ul>
                <button className="action-btn">Start Workout</button>
              </div>
              <div className="workout-card">
                <h3>Progress Tracker</h3>
                <p>Track your fitness journey and see your improvements.</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '70%' }}>70%</div>
                </div>
                <button className="action-btn">View Details</button>
              </div>
            </div>
          ) : (
            <div className="welcome-section">
              <h2>Transform Your Fitness Journey Today</h2>
              <p>Join WithU and get access to:</p>
              <ul>
                <li>Personalized workout plans</li>
                <li>Progress tracking</li>
                <li>Expert guidance</li>
                <li>Community support</li>
              </ul>
              <Link to="/register">
                <button className="cta-button">Get Started Now</button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home; 