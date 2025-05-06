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

      const data = await response.json();
      if (data.token) {
        // Store JWT in localStorage instead of cookies
        localStorage.setItem("sessionToken", data.token);

        // Redirect to profile page
        navigate("/profile");
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
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/profile">Profile</a>
        <a href="/sena-form">Form</a>
      </nav>

      <main>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username or Email
            <br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <br />
          <label>
            Password
            <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "1rem",
            backgroundColor: "#d32f2f",
            color: "white",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </main>
    </div>
  );
};

export default Login;