import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import './styles/App.css';
import { TokenService } from './services/TokenService';
import { clearTokens, isTokenExpired, setTokens } from './utilis/TokenUtilis';
import { RingLoader } from 'react-spinners';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken)
    setIsLoggedIn(true)
  };

  useEffect(() => {
    const checkToken = async() => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!isTokenExpired(accessToken)) {
        setIsLoggedIn(true);
      } 
      else if (accessToken && refreshToken) {
        setLoading(true);
        var response = await TokenService.refreshToken(accessToken, refreshToken);
        if(response.isSuccessful){
          setTokens(response.data.accessToken, response.data.refreshToken)
          setIsLoggedIn(true);
        }
        else{
          setIsLoggedIn(false);
          clearTokens();
        }
        setLoading(false);
      }
      else{
        setIsLoggedIn(false);
        clearTokens();
      }
    }

    checkToken();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader size={120} color={"#36D7B7"} loading={loading} />
      </div>
    ); 
  }

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