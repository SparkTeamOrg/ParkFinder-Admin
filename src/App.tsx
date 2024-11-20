import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import { jwtDecode } from 'jwt-decode' 
import './styles/App.css';
import { TokenService } from './services/tokenService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsLoggedIn(true)
  };

  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      return decodedToken.exp < currentTime;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkToken = async() => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!isTokenExpired(accessToken)) {
        setIsLoggedIn(true);
      } 
      else if (accessToken && refreshToken) {
        var response = await TokenService.refreshToken(accessToken, refreshToken);
        if(response.isSuccessful){
          console.log(response)
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          setIsLoggedIn(true);
        }
        else{
          setIsLoggedIn(false);
          clearTokens();
        }
      }
      else{
        setIsLoggedIn(false);
        clearTokens();
      }
    }

    checkToken();
  }, []);

  const clearTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
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