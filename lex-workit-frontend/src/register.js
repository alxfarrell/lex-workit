import React from "react";
import "./styles.css"; // Make sure this file exists in the same or correct relative path

const Register = () => {
  return (
    <>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/profile">Profile</a>
        <a href="/sena-form">Form</a>
      </nav>

      <main>
        <h2>Register</h2>
        <form>
          <label>
            Username<br />
            <input type="text" name="username" required />
          </label>
          <br />
          <label>
            Email<br />
            <input type="email" name="email" required />
          </label>
          <br />
          <label>
            Password<br />
            <input type="password" name="password" required minLength="6" />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </main>
    </>
  );
};

export default Register;
