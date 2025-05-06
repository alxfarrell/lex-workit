import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is in data.token

        // Store token in localStorage
        localStorage.setItem('authToken', token);

        // Redirect to the home or protected page
        window.location.href = 'index.html';
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("sessionToken")}` },
      });

      localStorage.removeItem("sessionToken");
      navigate("/login");

      alert("You have been logged out.");
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    }
  });
}

// LOGOUT BUTTON HANDLING
const logoutButton = document.getElementById('logoutBtn');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    // Remove token
    localStorage.removeItem('authToken');
    sessionStorage.clear(); // Optional: clear temporary session data

    // Optionally clear cookies (example: sessionToken)
    document.cookie = 'sessionToken=; Max-Age=0; path=/;';

    // Redirect to login page
    window.location.href = 'login.html';

    alert('You have been logged out.');
  });
}
