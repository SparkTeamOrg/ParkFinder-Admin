import React, { useState, useEffect } from 'react';
import MapManager from './components/MapManager';
import Login from './components/Login';
import apiClient from './axiosConfig';
import './styles/App.css';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [parkingLots, setParkingLots] = useState<any[]>([]);

  useEffect(() => {
    if (accessToken) {
      fetchParkingLots();
    }
  }, [accessToken]);

  const fetchParkingLots = async () => {
    try {
      const response = await apiClient.get('/parking/all');
      const data = await response.data;
      setParkingLots(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  return (
    <div className="App">
      {accessToken ? (
        <MapManager parkingLots={parkingLots} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;