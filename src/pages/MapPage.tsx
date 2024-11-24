import React, { useState, useEffect } from 'react';
import MapManager from '../components/MapManager';
import apiClient from '../axiosConfig';
import { TokenService } from '../services/TokenService';
import { clearTokens, getUserIdFromToken } from '../utilis/TokenUtilis';
import { ParkingService } from '../services/ParkingLotService';

const MapPage: React.FC = () => {
  const [parkingLots, setParkingLots] = useState<any[]>([]);

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const data = await ParkingService.getParkingLots()
      setParkingLots(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    var userId = getUserIdFromToken();
    if(userId){
      var deleteResponse = await TokenService.deleteRefreshToken(userId);
      if(deleteResponse.isSuccessful){
        clearTokens()
        window.location.href = '/login';
      }
      else{
        console.log(deleteResponse.data.messages[0])
      }
    }
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