import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Profile from './profile';
import ProfileView from './profileview';
import Home from './index';

// PrivateRoute component definition
const PrivateRoute = ({ element }) => {
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/verify', {
        credentials: 'include'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    checkAuth().then(auth => {
      setIsAuthenticated(auth);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>
    </Router>
  );
}

export default App;