import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProfileView from './components/ProfileView';
import Home from './components/Home';

// Simplified PrivateRoute that just checks localStorage
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>
    </Router>
  );
}

export default App; 