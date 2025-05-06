import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    fetch("http://localhost:5000/api/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(() => console.error("Failed to load profile data"));
  }, []);

  const addWorkoutToSchedule = (workout) => {
    setSchedule([...schedule, workout]);
  };

  const saveSchedule = () => {
    fetch("http://localhost:5000/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule }),
    })
      .then(() => setMessage("Schedule saved!"))
      .catch(() => setMessage("Failed to save!"));
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    navigate("/login");
    alert("You have been logged out.");
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
        {userData ? (
          <>
            <h2>Welcome to Your Profile!</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Bio: {userData.bio}</p>

            <section className="workout-list">
              <h3>Pick a Workout</h3>
              <button className="add-btn" onClick={() => addWorkoutToSchedule("Burpees")}>Burpees</button>
              <button className="add-btn" onClick={() => addWorkoutToSchedule("Push-ups")}>Push-ups</button>
            </section>

            <section>
              <h3>Workout Schedule</h3>
              <ul>
                {schedule.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button onClick={saveSchedule}>Save Schedule</button>
              <p>{message}</p>
            </section>

            <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
              Logout
            </button>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </main>
    </div>
  );
};

export default Profile;