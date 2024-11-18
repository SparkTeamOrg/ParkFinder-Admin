import React, { useState, useEffect } from 'react';
import MapManager from './components/MapManager';
import Login from './components/Login';
import './styles/App.css';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [parkingLots, setParkingLots] = useState<any[]>([]);

  useEffect(() => {
    if (accessToken) {
      fetchParkingLots();
    }
  }, [accessToken]);

  const fetchParkingLots = async () => {
    try {
      const response = await fetch('http://localhost:5009/parking/all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch parking lots');
      }

      const data = await response.json();
      setParkingLots(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
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