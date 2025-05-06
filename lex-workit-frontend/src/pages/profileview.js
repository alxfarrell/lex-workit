import { Link } from "react-router-dom";
import "./styles.css";

const ProfileView = () => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Sena App - Profile Preview" />
        <title>Sena App - Profile Preview</title>
        <link rel="stylesheet" href="styles.css" />
        <link rel="icon" href="assets/favicon.ico" />
      </head>

      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/profile">Profile</a>
        <a href="/sena-form">Form</a>
      </nav>

      <main>
        <h2>Welcome to Your Fitness Journey!</h2>
        <p>Join now and get personalized workouts tailored just for you.</p>
        <img src="/brochure-image.jpg" alt="Fitness Showcase" style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />

        <Link to="/register">
          <button style={{ padding: "10px 20px", backgroundColor: "#ff5722", color: "#fff", border: "none", cursor: "pointer" }}>
            Sign Up Now
          </button>
        </Link>
      </main>
    </>
  );
};

export default ProfileView;