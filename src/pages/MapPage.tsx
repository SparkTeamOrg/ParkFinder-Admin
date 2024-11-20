import React, { useState, useEffect } from 'react';
import MapManager from '../components/MapManager';
import apiClient from '../axiosConfig';
import { TokenService } from '../services/TokenService';
import { jwtDecode } from 'jwt-decode';
import { parse } from 'path';

interface JwtPayload {
  UserId: string;
}

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

  const getUserId = () => {
    const token = localStorage.getItem('accessToken');
    if(token){
      const decodedToken: JwtPayload = jwtDecode(token)
      return parseInt(decodedToken.UserId)
    }
  }

  const handleLogout = async () => {
    await TokenService.test();
    // var userId = getUserId();
    // console.log(userId)
    // if(userId){
    //   var deleteResponse = await TokenService.deleteRefreshToken(userId);
    //   if(deleteResponse.isSuccessful){
    //     console.log(deleteResponse.data.data)
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');
    //     window.location.href = '/login';
    //   }
    //   else{
    //     console.log(deleteResponse.data.messages[0])
    //   }
    // }
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