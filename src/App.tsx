import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import './styles/App.css';

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogin = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    window.location.href = '/map';
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/map" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/map" element={isLoggedIn ? <MapPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/map" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;