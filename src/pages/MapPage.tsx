import React, { useState, useEffect } from 'react';
import MapManager from '../components/MapManager';
import apiClient from '../axiosConfig';

const MapPage: React.FC = () => {
  const [parkingLots, setParkingLots] = useState<any[]>([]);

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const response = await apiClient.get('/parking/all');
      const data = await response.data;
      setParkingLots(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <button onClick={handleLogout} style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 1000 }}>
        Logout
      </button>
      <MapManager parkingLots={parkingLots} />
    </div>
  );
};

export default MapPage;